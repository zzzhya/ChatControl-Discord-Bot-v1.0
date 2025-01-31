┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│   $$$$$$\  $$\                  $$\      $$$$$$\                       $$\                         $$\   │
│  $$  __$$\ $$ |                 $$ |    $$  __$$\                      $$ |                        $$ |  │
│  $$ /  \__|$$$$$$$\   $$$$$$\ $$$$$$\   $$ /  \__| $$$$$$\  $$$$$$$\ $$$$$$\    $$$$$$\   $$$$$$\  $$ |  │
│  $$ |      $$  __$$\  \____$$\\_$$  _|  $$ |      $$  __$$\ $$  __$$\\_$$  _|  $$  __$$\ $$  __$$\ $$ |  │
│  $$ |      $$ |  $$ | $$$$$$$ | $$ |    $$ |      $$ /  $$ |$$ |  $$ | $$ |    $$ |  \__|$$ /  $$ |$$ |  │
│  $$ |  $$\ $$ |  $$ |$$  __$$ | $$ |$$\ $$ |  $$\ $$ |  $$ |$$ |  $$ | $$ |$$\ $$ |      $$ |  $$ |$$ |  │
│  \$$$$$$  |$$ |  $$ |\$$$$$$$ | \$$$$  |\$$$$$$  |\$$$$$$  |$$ |  $$ | \$$$$  |$$ |      \$$$$$$  |$$ |  │
│   \______/ \__|  \__| \_______|  \____/  \______/  \______/ \__|  \__|  \____/ \__|       \______/ \__|  │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘v1.0

	  _____________  ____ _/ /____  ____/ /  / /_  __  __  ____  / /_  __  ______ _
	 / ___/ ___/ _ \/ __ `/ __/ _ \/ __  /  / __ \/ / / / /_  / / __ \/ / / / __ `/
	/ /__/ /  /  __/ /_/ / /_/  __/ /_/ /  / /_/ / /_/ /   / /_/ / / / /_/ / /_/ / 
	\___/_/   \___/\__,_/\__/\___/\__,_/  /_.___/\__, /   /___/_/ /_/\__, /\__,_/  
	                                            /____/              /____/         
Copyright 2025 ChatControl v1 Discord Bot by zhya

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “ChatControl”), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of this Software.
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

#############################################################################################################################
   -----> -----> Thank you for installing ChatControl Discord Bot. Follow setup instructions to avoid errors <----- <-----

You will need to download a few prerequisites before you can use ChatControl
-> Here's a breakdown of what needs to be installed:
_____________________________________________________________________________________________________________________________
(#1) Download Node.js ( DOWNLOAD HERE-> https://nodejs.org/ )									(#1)
After installation, verify in cmd or powershell by running:

node -v
_____________________________________________________________________________________________________________________________
(#2) Setup npm (Node Package Manager)												(#2)
npm comes bundled with Node.js, it's used to install the dependencies for ChatControl
You can verify npm by running the following command with cmd or powershell:

npm -v
_____________________________________________________________________________________________________________________________
(#3) Create necessary text files:												(#3)
(restrictedwords.txt and mutedroleid.txt), these files must be in the bot's directory folder.
You can create these manually, or allow the bot to create them if they don't exist ( RESTART REQUIRED )
_____________________________________________________________________________________________________________________________
(#4) Installing required libraries - Navigate to the project folder:								(#4)
Using cmd or powershell cd to the directory of where bot.js file is located. EXAMPLE:

cd C:\Users\Me\Desktop\ChatControl

Once inside the project folder, install necessary libraries (discord.js and chalk) by running:

npm install discord.js chalk

These libraries are used for interacting with Discord's API and coloring the terminal.
_____________________________________________________________________________________________________________________________
(#5) Copy and paste your Dicord Bot's API token into the bot.js file, save. EXAMPLE:						(#5)
client.login('YOUR_BOT_TOKEN_HERE'); <= Replace with your token from the Discord Developer Portal.
_____________________________________________________________________________________________________________________________
(#6) Mute Role ID: You will need to specify the role ID for the muted role in the mutedroleid.txt file.				(#6)
The bot will read this file to determine the mute role ID to apply to users who mention your restricted words.
_____________________________________________________________________________________________________________________________
(#7) Any words you wish to blacklist goes into restrictedwords.txt with each new word on it's own individual line EXAMPLE:	(#7)
badwordexample1
badwordexample2
badwordexample3
badwordexample4
badwordexample5
_____________________________________________________________________________________________________________________________
(#8) Setup Complete! CD inside of your bot directory then run the following command:						(#8)

node bot.js 
_____________________________________________________________________________________________________________________________
 ____       _                  ____                      _      _       _ 
/ ___|  ___| |_ _   _ _ __    / ___|___  _ __ ___  _ __ | | ___| |_ ___| |
\___ \ / _ \ __| | | | '_ \  | |   / _ \| '_ ` _ \| '_ \| |/ _ \ __/ _ \ |
 ___) |  __/ |_| |_| | |_) | | |__| (_) | | | | | | |_) | |  __/ ||  __/_|
|____/ \___|\__|\__,_| .__/   \____\___/|_| |_| |_| .__/|_|\___|\__\___(_)
                     |_|                          |_|                     

Ctrl + C inside of terminal to stop running the bot :)

############################################################################################################################


 _______  _______ ____      _      ___ _   _ _____ ___  
| ____\ \/ /_   _|  _ \    / \    |_ _| \ | |  ___/ _ \ 
|  _|  \  /  | | | |_) |  / _ \    | ||  \| | |_ | | | |
| |___ /  \  | | |  _ <  / ___ \   | || |\  |  _|| |_| |
|_____/_/\_\ |_| |_| \_\/_/   \_\ |___|_| \_|_|   \___/ ...

READ IF YOU'RE HAVING ISSUES --> Unlikely but possible problems/solutions you might run into with setup
????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
(?) Bot isn't muting?														(?)
Make sure your discord channel's roles are setup correctly 
( if you're testing on an admin account muting won't work, test on a different account )
Make sure you are copying the correct NUMERICAL role ID for your muted role, EXAMPLE:
1492053453626326 ( NOT THE NAME OF ROLE !!! )
_____________________________________________________________________________________________________________________________
(?) Update or downgrade your version of chalk (I'm using v5)									(?)
_____________________________________________________________________________________________________________________________
(?) File Permissions issues? 													(?)
Ensure that the txts (restrictedwords & mutedroleid) are in the correct directory, and are accessible by the bot.
_____________________________________________________________________________________________________________________________
(?) Node.js not working?													(?)
You might have to restart your computer, if it's your first time installing node.js for the system to recognize any commands,
or you might've downloaded an incompatible version for your system.
_____________________________________________________________________________________________________________________________
(?) Verify you CORRECTLY installed all of the required prerequisites ( node.js, libraries, etc )				(?)
_____________________________________________________________________________________________________________________________
(?) Working but UI is bugging out after a couple restarts / not clearing? 							(?)
Simply clear your terminal window. cmd EXAMPLE: 
cls 
Then restart bot again by running the following command:
node bot.js

( if this doesn't work try removing line 6: console.clear(); 
( very unlikely but it could be incompatible with your terminal )

############################################################################################################################




Your terminal should look like this when correctly setup (CMD EXAMPLE)

C:\Users\Me\Desktop\ChatControl>node bot.js
│                              ╔═╗┬ ┬┌─┐┌┬┐╔═╗┌─┐┌┐┌┌┬┐┬─┐┌─┐┬
│                              ║  ├─┤├─┤ │ ║  │ ││││ │ ├┬┘│ ││
├──────────────────────────────╚═╝┴ ┴┴ ┴ ┴ ╚═╝└─┘┘└┘ ┴ ┴└─└─┘┴─┘v1_created_by_zhya
│
├── Found restrictedwords.txt!
├─────── Found mutedroleid.txt!
├──────────── Loaded role ID: 324576745675865894
│
Set the mute duration (e.g., 1h, 3600s, 120m): 10s
│
├───────────────── Mute duration set to 10s
│
/ ChatControl is running...



############################################################################################################################


IF YOU ENCOUNTER ANY UNKNOWN ISSUES OR HAVE SUGGESTIONS FOR FUTURE UPDATES REFER TO GITHUB