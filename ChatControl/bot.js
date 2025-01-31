//
//
//   ____ _           _    ____            _             _ 
//  / ___| |__   __ _| |_ / ___|___  _ __ | |_ _ __ ___ | |
// | |   | '_ \ / _` | __| |   / _ \| '_ \| __| '__/ _ \| |
// | |___| | | | (_| | |_| |__| (_) | | | | |_| | | (_) | |
//  \____|_| |_|\__,_|\__|\____\___/|_| |_|\__|_|  \___/|_|v1.0
//
//   created by
//             ______   ___   __ _    
//            |__  / | | \ \ / // \   
//              / /| |_| |\ V // _ \  
//             / /_|  _  | | |/ ___ \ 
//            /____|_| |_| |_/_/   \_\ 
//    
// https://github.com/zzzhya/ChatControl-Discord-Bot-v1.0/blob/main/README.md

const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs'); // File system module to read/write files
const chalk = require('chalk'); // Import chalk for coloring
const path = require('path'); // Handle file paths reliably
const readline = require('readline'); // Import readline module to handle console input
console.clear();
// Initialize bot client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// Path to the restricted words file
const restrictedWordsFilePath = path.join(__dirname, 'restrictedwords.txt');
const mutedRoleIdFilePath = path.join(__dirname, 'mutedroleid.txt');

// Object for tracking user warnings
const userWarnings = {};
let muteRoleId = null;

// A Map to store mute expiration times (user ID -> mute end timestamp)
const muteTimers = new Map();

// Default mute duration (1 hour in ms)
let MUTE_DURATION = 60 * 60 * 1000; // 1 hour = 60 minutes = 3600 seconds = 1 hour

// Setup readline interface to read console input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to parse duration input
function parseDuration(input) {
    const regex = /^(\d+)(s|m|h)$/i; // Regex to capture number and time unit (s, m, h) Don't mess with any of this
    const match = input.match(regex);
    
    if (!match) {
        console.log(chalk.red('Invalid format! Enter valid duration include h, s, or m after time'));
        return null;
    }

    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    switch (unit) {
        case 's':
            return value * 1000; // secs to millis
        case 'm':
            return value * 60 * 1000; // mins to millis
        case 'h':
            return value * 60 * 60 * 1000; // hrs to millis
        default:
            return null;
    }
}

// Ask the user for mute duration when the bot starts
client.once('ready', () => {
    process.stdout.write('\x1b]0;[IDLE] ChatControl Discord Bot\x07');
    console.log(chalk.yellow('│                              ╔═╗┬ ┬┌─┐┌┬┐╔═╗┌─┐┌┐┌┌┬┐┬─┐┌─┐┬'));
    console.log(chalk.yellow('│                              ║  ├─┤├─┤ │ ║  │ ││││ │ ├┬┘│ ││'));
    console.log(chalk.yellow('├──────────────────────────────╚═╝┴ ┴┴ ┴ ┴ ╚═╝└─┘┘└┘ ┴ ┴└─└─┘┴─┘v1_created_by_zhya'));
    console.log(chalk.yellow('│'));

    // Check and create restrictedwords.txt if not exists
    if (!fs.existsSync(restrictedWordsFilePath)) {
        fs.writeFileSync(restrictedWordsFilePath, '', 'utf8');  // Create an empty file if it doesn't exist
        console.log(chalk.yellow('│') + chalk.green(' ERROR ') + chalk.bgRed.white('> restrictedwords.txt was not found') + chalk.green(''));
        console.log(chalk.yellow('│') + chalk.bgRed.white('[!]') + chalk.green(' File has been created RESTART REQUIRED import words   ') + chalk.bgRed.white('[!]') + chalk.green(''));
        console.log(chalk.yellow('├─────────────────────────────────────────────────────────────'));
    } else {
        console.log(chalk.yellow('├──') + chalk.green(' Found restrictedwords.txt!'));
    }

    // Check and create mutedroleid.txt if not exists
    if (!fs.existsSync(mutedRoleIdFilePath)) {
        // Setting a default role ID
        fs.writeFileSync(mutedRoleIdFilePath, 'PASTE YOUR MUTED ROLE ID HERE', 'utf8'); // <--- PASTE YOUR MUTED ROLE ID INSIDE OF TXT
        console.log(chalk.yellow('│') + chalk.green(' ERROR ') + chalk.bgRed.white('> mutedroleid.txt was not found') + chalk.green(''));
        console.log(chalk.yellow('│') + chalk.bgRed.white('[!]') + chalk.green(' File has been created RESTART REQUIRED import ID      ') + chalk.bgRed.white('[!]') + chalk.green(''));
        console.log(chalk.yellow('├─────────────────────────────────────────────────────────────'));
    } else {
        // Load the role ID from mutedroleid.txt
        muteRoleId = fs.readFileSync(mutedRoleIdFilePath, 'utf8').trim();
        console.log(chalk.yellow('├───────') + chalk.green(' Found mutedroleid.txt!'));
        console.log(chalk.yellow('├────────────') + chalk.green(' Loaded role ID:', muteRoleId));
    }

    console.log(chalk.yellow('│'));

    // Prompt the user to input the mute duration
    rl.question('Set the mute duration (e.g., 1h, 3600s, 120m): ', (input) => {
        const parsedDuration = parseDuration(input);
        if (parsedDuration !== null) {
            MUTE_DURATION = parsedDuration; // Set the mute duration dynamically
            console.log(chalk.yellow('│'));
            console.log(chalk.yellow('├─────────────────') + chalk.green(` Mute duration set to ${input}`));
            console.log(chalk.yellow('│'));
            rl.close();
        } else {
            console.log(chalk.yellow('│') + chalk.bgRed.white('[!]') + chalk.bgRed.white('RESTART BOT AND ENTER A VALID DURATION INPUT.') + chalk.bgRed.white('[!]'));
            rl.close(); // Close the readline interface
            process.exit(1); // Exit the process if invalid input
        }

        // Spinner code
        const spinnerSymbols = ['\\', '|', '/', '-'];
        let i = 0;
    
        // Spinning function
        const spinner = setInterval(() => {
            process.stdout.write(`\r${chalk.green(spinnerSymbols[i++ % spinnerSymbols.length])} ${chalk.yellow('ChatControl is running...')}`);
            process.stdout.write('\x1b]0;[ACTIVE] ChatControl Discord Bot\x07');
        }, 200);
        
    });
});

// Check for restricted words in the incoming message
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Load the restricted words from the file
    const restrictedWords = fs.readFileSync(restrictedWordsFilePath, 'utf8').split('\n').map(word => word.trim());

    // Check if the message contains any restricted word
    let foundWord = null;
    for (let word of restrictedWords) {
        if (message.content.toLowerCase().includes(word.toLowerCase())) {
            foundWord = word;
            break;
        }
    }

    if (foundWord) {
        // Checking and handling incrementing the user's warning count
        const userId = message.author.id;
        if (!userWarnings[userId]) {
            userWarnings[userId] = { count: 1, lastWarning: Date.now(), lastWarningMessage: null };
        } else {
            const timeElapsed = Date.now() - userWarnings[userId].lastWarning;
            if (timeElapsed > 86400000) {  // 86400000 ms = 24 hours
                userWarnings[userId].count = 1;
            } else {
                userWarnings[userId].count++;
            }

            userWarnings[userId].lastWarning = Date.now();
        }

        // Send a warning to the user and remove the previous one (if it exists)
        const warningCount = userWarnings[userId].count;
        
        if (userWarnings[userId].lastWarningMessage) {
            // If there's an existing warning message, delete it
            await userWarnings[userId].lastWarningMessage.delete();
        }

        // Send new warning message
        userWarnings[userId].lastWarningMessage = await message.channel.send(`Warning ${warningCount}/3 for <@${userId}>!`);
        message.delete(); // Delete the user's message that contains restricted word

        // If user reaches 3 warnings, silence them
        if (warningCount >= 3) {
            const member = await message.guild.members.fetch(userId); // Get the member from the guild

            // Use the loaded muteRoleId
            const muteRole = message.guild.roles.cache.get(muteRoleId);  // Get the mute role using the ID from the file

            if (muteRole) {
                // Store the user's current roles
                const originalRoles = member.roles.cache.filter(role => role.id !== muteRoleId).map(role => role.id);

                // Remove all other roles (except the mute role)
                await member.roles.set([muteRole.id]); // Assign only the mute role

                // Stores the user's original roles
                member.originalRoles = originalRoles;

                // Sets the timer to unmute after the specified duration
                const unmuteTime = Date.now() + MUTE_DURATION;
                muteTimers.set(userId, unmuteTime); // Store the unmute time for this user
                
                // Sets a timeout to unmute the user after the mute duration
                setTimeout(async () => {
                    await unmuteUser(member);
                }, MUTE_DURATION);

                // Print to the console when users are muted
                console.log(`${member.user.tag} has been muted.`);
                message.channel.send(`<@${userId}> has been muted.`);

                // Resets warnings after mute
                userWarnings[userId].count = 0; // Resets warning count after muting
            } else {
                message.channel.send(`Muted role not found. Unable to mute <@${userId}>.`);
                console.log(`Unable to find muted role ID. Cannot silence ${member.user.tag}`);
            }
        }
    }
});

// Function to unmute a user
async function unmuteUser(member) {
    if (member.originalRoles) {
        // Restore the user's original roles
        await member.roles.set(member.originalRoles);
        // Removes the mute role
        const muteRole = member.guild.roles.cache.get(muteRoleId);
        if (muteRole) {
            await member.roles.remove(muteRole);
        }
        // Clear the stored roles and timer
        delete member.originalRoles;
        muteTimers.delete(member.id); // Remove from the muteTimers map

        console.log(`${member.user.tag} mute expired roles restored.`);
    }
}

// COPY AND PASTE YOUR KEY BELOW
client.login('YOUR_PRIVATE_API_BOT_TOKEN_HERE');
//
//
//   ____ _           _    ____            _             _ 
//  / ___| |__   __ _| |_ / ___|___  _ __ | |_ _ __ ___ | |
// | |   | '_ \ / _` | __| |   / _ \| '_ \| __| '__/ _ \| |
// | |___| | | | (_| | |_| |__| (_) | | | | |_| | | (_) | |
//  \____|_| |_|\__,_|\__|\____\___/|_| |_|\__|_|  \___/|_|v1.0
//
//   created by
//             ______   ___   __ _    
//            |__  / | | \ \ / // \   
//              / /| |_| |\ V // _ \  
//             / /_|  _  | | |/ ___ \ 
//            /____|_| |_| |_/_/   \_\ 
//    
// https://github.com/zzzhya/ChatControl-Discord-Bot-v1.0/blob/main/README.md