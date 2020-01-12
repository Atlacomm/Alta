const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const col = require('colors');
let configFile;

function FileCheck(){
    let blank = { };
    let blankJson = JSON.stringify(blank);
    let settingsFile = {
        "prefix": "ata:",
        "version": "0.0.1",
        "color": "0xFF00FF",
        "directory": "C:\\Users\\cjtho\\OneDrive\\Documents\\Altacomm\\Alta"
    };
    let settingsJson = JSON.stringify(settingsFile);
    let tokenFile = {
        token: "YOUR_TOKEN_HERE"
    };
    let tokenJson = JSON.stringify(tokenFile);
    console.log('initializing...');
    console.log('checking for database...');
    fs.stat('./database', function(err) {
        if (!err) {
            console.log('database found');
            console.log('checking for database files...');

            fs.stat('./database/settings.json', function(err) {
                if(!err) {
                    console.log('settings file found')
                } else if (err.code === 'ENOENT') {
                    console.log('settings file not found, creating new file \"settings\"');
                    fs.writeFile('./database/settings.json', settingsJson, function(err) {
                        if(err) console.log('there was an error creating a file', err)
                    });
                }
            });

            fs.stat('./database/prefixes.json', function(err) {
                if(!err) {
                    console.log('prefixes file found')
                } else if (err.code === 'ENOENT') {
                    console.log('prefixes file not found, creating new file \"prefixes\"');
                    fs.writeFile('./database/prefixes.json', blankJson, function(err) {
                        if(err) console.log('there was an error creating a file', err)
                    });
                }
            });

            fs.stat('./database/colors.json', function(err) {
                if(!err) {
                    console.log('colors file found')
                } else if (err.code === 'ENOENT') {
                    console.log('colors file not found, creating new file \"colors\"');
                    fs.writeFile('./database/colors.json', blankJson, function(err) {
                        if(err) console.log('there was an error creating a file', err)
                    });
                }
            });

            fs.stat('./database/token.json', function(err) {
                if(!err) {
                    console.log('token file found');
                    configFile = JSON.parse(fs.readFileSync('./database/token.json', 'utf8'));
                } else if (err.code === 'ENOENT') {
                    console.log('token file not found, creating new file \"token\"');
                    fs.writeFile('./database/token.json', tokenJson, function(err) {
                        if(err) console.log('there was an error creating a file', err)
                    });
                    console.log('please open the token.json file in the database folder and paste in your bot token. the bot will now exit.'.red);
                    process.exit(0)
                }
            });
        }
        else if (err.code === 'ENOENT') {
            console.log('database directory not found, creating folder \"database\"');
            fs.mkdir('./database',function(err){
                if (err) {
                    console.log('an error occurred while making the database directory.')
                } else {
                    console.log('creating database files...');
                    fs.writeFile('./database/settings.json', settingsJson, function(err) {
                        if(err) console.log('there was an error creating a file', err)
                    });
                    fs.writeFile('./database/prefixes.json', blankJson, function(err) {
                        if(err) console.log('there was an error creating a file', err)
                    });
                    fs.writeFile('./database/colors.json', blankJson, function(err) {
                        if(err) console.log('there was an error creating a file', err)
                    });
                    fs.writeFile('./database/token.json', tokenJson, function(err) {
                        if(err) console.log('there was an error creating a file', err)
                    });
                    console.log('please open the token.json file in the database folder and paste in your bot token. the bot will now exit.'.red);
                    process.exit(0)
                }
            })
        }
    });
}
FileCheck();
client.on('ready', async () => {
    console.log('self-check complete'.green)
});

setTimeout(() => {
    client.login(configFile.token).catch(function() {
        console.log('please open the token.json file in the database folder and paste in your bot token. the bot will now exit.'.red);
        process.exit(0)
    });
}, 3000);

