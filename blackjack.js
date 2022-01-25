    const Discord = require("discord.js")
    const { Client, Collection, Intents } = require('discord.js');
    const blackjack = require("discord-blackjack")
    const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_SCHEDULED_EVENTS"] })
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('/home/ubuntu/streamlabs-api-demo/db.sqlite');

    const prefix = "!"
    const token = "OTM0Njc5MTc3NzYyODMyNDE0.Yezl0Q.8ovYwEaHvKdflEsxMRpHZMSlYiQ"
    
    client.on("ready", () => {
      console.log("Bot has logged in!")
    })
    
client.on("messageCreate", async message => {
    if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;

    else if (message.content.startsWith(`${prefix}blackjack`) || message.content.startsWith(`${prefix}bj`)) {
        const bjMessage = message.content
        const splitMessage = bjMessage.split(" ");
        console.log(splitMessage[1])
        const wamount = splitMessage[1]
        const damount = 2*wamount
        const bjamount = 1.5*wamount
        if (wamount <= 5000) {
        let game = await blackjack(message, Discord)
                db.get("SELECT alias FROM `aliases` WHERE did = ?",[message.author.id], (err, orow) => {
                message.guild.members.fetch();  
                const bjp = (typeof orow == 'undefined') ?
                guild.members.cache.find(m => m.user.id === message.author.id).displayName : 
                orow.alias
                console.log(bjp)
                db.run("INSERT INTO `scoreboard` (name, holdings, notes) VALUES (?,?,?)", [bjp, -wamount, `Blackjack Bet ${bjp}`], (err, updated) => {
                });
        switch (game.result) {

                case 'Win':
                    db.run("INSERT INTO `scoreboard` (name, holdings, notes) VALUES (?,?,?)", [bjp, 2*wamount, `Blackjack Win ${bjp}`], (err, updated) => {
                    });
                    message.channel.send(`You won TLC${wamount} with a total of ${game.yvalue} points ${message.author}!`)
                    break;
                case 'Tie':
                    db.run("INSERT INTO `scoreboard` (name, holdings, notes) VALUES (?,?,?)", [bjp, wamount, `Blackjack Push ${bjp}`], (err, updated) => {
                    });
                    message.channel.send(`You tied with a total of ${game.yvalue} points ${message.author}!`)
                    break;
                case 'Lose':
                    message.channel.send(`You lost TLC${wamount} with a total of ${game.yvalue} points ${message.author}!`)
                    break;
                case 'Double Win':
                    db.run("INSERT INTO `scoreboard` (name, holdings, notes) VALUES (?,?,?)", [bjp, 4*wamount, `Blackjack Double Win ${bjp}`], (err, updated) => {
                    });
                    message.channel.send(`You won TLC${damount} (double) with a total of ${game.yvalue} points ${message.author}!`)
                    break;
                case 'Double Lose':
                    db.run("INSERT INTO `scoreboard` (name, holdings, notes) VALUES (?,?,?)", [bjp, -wamount, `Blackjack Double Loss ${bjp}`], (err, updated) => {
                    });
                    message.channel.send(`You lost TLC${damount} (double) with a total of ${game.yvalue} points ${message.author}!`)
                    break;
                case 'Blackjack':
                    db.run("INSERT INTO `scoreboard` (name, holdings, notes) VALUES (?,?,?)", [bjp, bjamount, `Blackjack Blackjack ${bjp}`], (err, updated) => {
                    });
                    message.channel.send(`You won TLC${bjamount} (Blackjack) with a total of ${game.yvalue} points ${message.author}!`)
                    break;
                case 'ERROR':
                    // do whatever you want
                    break;
        
        }

         })  
         }
         else {
                    message.channel.send(`You can't bet TLC${wamount}. The maximum bet is TLC5,000 ${message.author}!`);
         } 
    }
     })
 
     client.login(token)