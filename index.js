const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const bot = new Discord.Client({ intents });


// Too many faceit api's mixed with eachother, I know I'll fix it later.

const Faceit = require("faceit-js-api");
const faceit = new Faceit(process.env.FACEITAPIKEY);
const Faceit2 = require("faceit-js");
const api = new Faceit2(process.env.FACEITAPIKEY);
const { countryCodeEmoji, emojiCountryCode } = require('country-code-emoji');
var Regex = require("regex");
const FaceitAPI = require('@cstools-app/faceit-wrapper');
const client = new FaceitAPI(process.env.FACEITAPIKEY);
var db = require('quick.db')

process.on('uncaughtException', function (err) {
   console.error(err);
   console.log("Node NOT Exiting...");
 });

bot.on('ready', () =>{
   console.log('Bot Online')
   bot.user.setActivity('FACEIT', { type: 'PLAYING' });
   db.set(`timer`, { time: 0})
})

function everyTime() {
   if (db.get(`timer.time`) === null || db.get(`timer.time`) === 0) return;

   db.subtract('timer.time', 1)
}

setInterval(everyTime, 1000);

async function ss(url) {
  
}

function sleep(milliseconds) {
   const date = Date.now();
   let currentDate = null;
   do {
     currentDate = Date.now();
   } while (currentDate - date < milliseconds);
}

const PREFIX = '!';

let t1score = 0;
let t2score = 0;
let eloneeded = 0;
let status = "";

bot.on('messageCreate', async msg=>{

   let args = msg.content.substring(PREFIX.length).split(' ');

      async function getProfile(name) {    
            faceit.getPlayerInfo(name).then( info => {

               try {
                  const { nickname, country, avatar, raw } = info;
                  const { player_id, memberships, games, friends_ids, settings, platforms } = raw;
                  const { krunker } = games;
                  const { game_player_name, skill_level, faceit_elo } = krunker;
                  const { language } = settings;


                  api
                  .players(player_id, "history").then(data =>  {


                  const url = `https://www.faceit.com/${language}/players/${nickname}`
                  const statsurl = `https://www.faceit.com/${language}/players-modal/${nickname}/stats/krunker`

                  let friends = []

                  Array.prototype.push.apply(friends, friends_ids);

                  const lvl1elo = 0
                  const lvl2elo = 300
                  const lvl3elo = 600
                  const lvl4elo = 900
                  const lvl5elo = 1200
                  const lvl6elo = 1500
                  const lvl7elo = 1800
                  const lvl8elo = 2100
                  const lvl9elo = 2250
                  const lvl10elo = 2400
                  let nextlvl = 0

                  if (skill_level == 1) {

                     eloneeded = lvl2elo - faceit_elo
                     nextlvl = `--> Level 2`

                  } else if (skill_level == 2) {

                     eloneeded = lvl3elo - faceit_elo
                     nextlvl = `--> Level 3`

                  } else if (skill_level == 3) {

                     eloneeded = lvl4elo - faceit_elo
                     nextlvl = `--> Level 4`

                  } else if (skill_level == 4) {

                     eloneeded = lvl5elo - faceit_elo
                     nextlvl = `--> Level 5`

                  } else if (skill_level == 5) {

                     eloneeded = lvl6elo - faceit_elo
                     nextlvl = `--> Level 6`

                  } else if (skill_level == 6) {

                     eloneeded = lvl7elo - faceit_elo
                     nextlvl = `--> Level 7`

                  } else if (skill_level == 7) {

                     eloneeded = lvl8elo - faceit_elo
                     nextlvl = `--> Level 8`

                  } else if (skill_level == 8) {

                     eloneeded = lvl9elo - faceit_elo
                     nextlvl = `--> Level 9`

                  } else if (skill_level == 9) {

                     eloneeded = lvl10elo - faceit_elo
                     nextlvl = `--> Level 10`


                  } else if (skill_level == 10) {

                     eloneeded = "Max level"
                     nextlvl = ""

                  }
                  const membership = String(memberships[0])
                  const membership2 = membership.charAt(0).toUpperCase() + membership.slice(1)
   
                  let countryemoji = countryCodeEmoji(String(country).toUpperCase())
         
                  let embed = new Discord.MessageEmbed()
                     .setColor('RANDOM')
                     .setAuthor({ name: nickname , iconURL: avatar })
                     .setThumbnail(avatar)
                     .addFields(
                        { name: 'FaceIT Profile Name: ', value: nickname },
                        { name: 'Player Page: ', value: url},
                        { name: 'FaceIT Player ID ', value: player_id},
                        { name: 'Country: ', value: `${String(country).toUpperCase()} | ${countryemoji}`},
                        { name: 'Membership: ', value: membership2},
                        { name: 'Friends: ', value: String(friends.length)},
                        { name: 'Krunker Name: ', value: game_player_name},
                        { name: 'Krunker ELO: ', value: `${String(faceit_elo)} | ${eloneeded} ${nextlvl}`},
                        { name: 'Krunker Skill Level: ', value: String(skill_level)},
                     )
                     .setTimestamp()
   
                  const { items } = data;
                     
                  const match_id1 = items[0]['match_id']
                  const region1 = items[0]['region']
                  const url1 = `https://www.faceit.com/${language}/krunker/room/${match_id1}`
                  const score1 = `${items[0]['results']['score']['faction1']} - ${items[0]['results']['score']['faction2']}`

                  const match_id2 = items[1]['match_id']
                  const region2 = items[1]['region']
                  const url2 = `https://www.faceit.com/${language}/krunker/room/${match_id2}`
                  const score2 = `${items[1]['results']['score']['faction1']} - ${items[1]['results']['score']['faction2']}`

                  const match_id3 = items[2]['match_id']
                  const region3 = items[2]['region']
                  const url3 = `https://www.faceit.com/${language}/krunker/room/${match_id3}`
                  const score3 = `${items[2]['results']['score']['faction1']} - ${items[2]['results']['score']['faction2']}`

                  embed.addField("Recent Games: ", "\u200b");
                  embed.addField('Game 1: ', `Match ID: ${match_id1} \n Region: ${region1} | Score: ${score1} | [Link](${url1})`)
                  embed.addField('Game 2: ', `Match ID: ${match_id2} \n Region: ${region2} | Score: ${score2} | [Link](${url2})`)
                  embed.addField('Game 3: ', `Match ID: ${match_id3} \n Region: ${region3} | Score: ${score3} | [Link](${url3})`)

   
                  msg.channel.send({embeds: [embed]});
   
                  })

               } catch(err) {
                  msg.channel.send(`Error fetching profile of ${name}`)
               }
               
            })
         
      }

      async function getMatchFromId(id) {
            client.matches.show({ match_id: id }).then( info => {

               let roster = []
               let t1score = 0;
               let t2score = 0;
               let levels = []
               let chosenmap = "";
               let timestarted = 0;
               let timeended = 0;
               let dayss = 0;
               let hourss = 0;
               let minutess = 0;
               let startedat = 0;
               let dayse = 0;
               let hourse = 0;
               let minutese = 0;
               let endedat = 0;

               const { teams, region, competition_name, match_id, status} = info;


               const { faction1, faction2 } = teams;

               const url = `https://www.faceit.com/en/krunker/room/${match_id}`

               const team1 = faction1['name']
               const team2 = faction2['name']

               if (String(status) == "FINISHED") {
                  t1score = info['results']['score']['faction1']
                  t2score = info['results']['score']['faction2']
                  timeended = info['finished_at']

                  dayse = Math.floor(timeended / (3600*24));
                  timeended  -= dayse*3600*24;
                  hourse   = Math.floor(timeended / 3600);
                  timeended  -= hourse*3600;
                  minutese = Math.floor(timeended / 60);
                  timeended  -= minutese*60;
                  hourse += 1
                  endedat = `Ended at ${hourse}:${minutese} CET`

               }

               if (String(status) == "FINISHED" || String(status) == "ONGOING") {

                  if (info['voting']['map']['pick'][0] == 2) {
                     chosenmap = "Sandstorm"
                  } else if (info['voting']['map']['pick'][0] == 4) {
                     chosenmap = "Undergrowth"
                  } else if (info['voting']['map']['pick'][0] == 14) {
                     chosenmap = "Site"
                  } else if (info['voting']['map']['pick'][0] == 17) {
                     chosenmap = "Bureau"
                  } else if (info['voting']['map']['pick'][0] == 11) {
                     chosenmap = "Industry"
                  }

                  timestarted = info['started_at']
                  dayss = Math.floor(timestarted / (3600*24));
                  timestarted  -= dayss*3600*24;
                  hourss   = Math.floor(timestarted / 3600);
                  timestarted  -= hourss*3600;
                  minutess = Math.floor(timestarted / 60);
                  timestarted  -= minutess*60;
                  hourss += 1
                  startedat = `Started at ${hourss}:${minutess} CET`
               }
         
               const p1n = faction1['roster'][0]['nickname'];
               const p1lvl = faction1['roster'][0]['game_skill_level'];
               const p2n = faction1['roster'][1]['nickname'];
               const p2lvl = faction1['roster'][1]['game_skill_level'];
               const p3n = faction1['roster'][2]['nickname'];
               const p3lvl = faction1['roster'][2]['game_skill_level'];
               const p4n = faction1['roster'][3]['nickname'];
               const p4lvl = faction1['roster'][3]['game_skill_level'];

               const p5n = faction2['roster'][0]['nickname'];
               const p5lvl = faction1['roster'][0]['game_skill_level'];
               const p6n = faction2['roster'][1]['nickname'];
               const p6lvl = faction1['roster'][1]['game_skill_level'];
               const p7n = faction2['roster'][2]['nickname'];
               const p7lvl = faction1['roster'][2]['game_skill_level'];
               const p8n = faction2['roster'][3]['nickname'];
               const p8lvl = faction1['roster'][3]['game_skill_level'];
               
               const p1 = String(p1n) + " (" + String(p1lvl) + ")"
               const p2 = String(p2n) + " (" + String(p2lvl) + ")"
               const p3 = String(p3n) + " (" + String(p3lvl) + ")"
               const p4 = String(p4n) + " (" + String(p4lvl) + ")"
               const p5 = String(p5n) + " (" + String(p5lvl) + ")"
               const p6 = String(p6n) + " (" + String(p6lvl) + ")"
               const p7 = String(p7n) + " (" + String(p7lvl) + ")"
               const p8 = String(p8n) + " (" + String(p8lvl) + ")"


               roster.push(p1, p2, p3, p4, p5, p6, p7, p8)

               const midIndex = Math.ceil(roster.length / 2);

               const firstRow = roster.slice(0, midIndex);
               const secondRow = roster.slice(midIndex);

               const embed2 = new Discord.MessageEmbed()
                  .setTitle(`${team1} VS ${team2}`)
                  .setColor('RANDOM')
                  .setDescription(competition_name)
                  .setURL(url)
                  .addFields(
                     { name: 'Region: ', value: region, inline: true },
                     { name: 'Status: ', value: status, inline: true },
                     { name: 'Score: ', value: `${String(t1score)} - ${String(t2score)}`, inline: true },
               )
                  .addField("Teams", firstRow.join(`\n `), true);

               if (secondRow.length) { 
                  embed2.addField("\u200b", secondRow.join(`\n `), true);
               }

               if (chosenmap != "") {
                  embed2.addField("Map: ", chosenmap)
               }

               if(timestarted != 0 && timeended != 0) {
                  let startedandended = `${startedat} | ${endedat}`
                  embed2.setFooter(startedandended)
               }

               if (timestarted != 0 && timeended == 0) {
                  embed2.setFooter(startedat)
               }

               msg.channel.send({embeds: [embed2]});


               })
   
               client.matches.stats({ match_id: id }).then( info2 => {

                  const { rounds } = info2;
                  const { match_id } = rounds[0]

                  const team1s = rounds[0]['teams'][0]['team_stats']
                  const team2s = rounds[0]['teams'][1]['team_stats']


                  let stats = []

                  const sburl = `https://www.faceit.com/en/krunker/room/${match_id}/scoreboard`


                  let team1n = team1s['Team']
                  let team2n = team2s['Team']

                  let avgps1 = `Avg Player Score: ${team1s['Team Avg Player Score']}`
                  let avgps2 = `Avg Player Score: ${team2s['Team Avg Player Score']}`

                  let totalk1 = `Total kills: ${team1s['Team Total Kills']}`
                  let totalk2 = `Total kills: ${team2s['Team Total Kills']}`

                  let totald1 = `Total deaths: ${team1s['Team Total Deaths']}`
                  let totald2 = `Total deaths: ${team2s['Team Total Deaths']}`

                  let totalh1 = `Total headshots: ${team1s['Team Total Headshots']}`
                  let totalh2 = `Total headshots: ${team2s['Team Total Headshots']}`


                  stats.push("Team 1: \n", avgps1, totalk1, totald1, totalh1, "Team 2: \n", avgps2, totalk2,  totald2, totalh2)

                  const midIndex = Math.ceil(stats.length / 2);

                  const firstRow = stats.slice(0, midIndex);
                  const secondRow = stats.slice(midIndex);

                  const embed3 = new Discord.MessageEmbed()
                     .setTitle(`Stats: ${team1n} VS Stats: ${team2n}`)
                     .setColor('RANDOM')
                     .setURL(sburl)
                     .addField(`Average Stats`, firstRow.join(`\n `), true);


                  if (secondRow.length) { 
                     embed3.addField("\u200b", secondRow.join(`\n `), true);
                  }

                  embed3.setImage(`https://api.apiflash.com/v1/urltoimage?access_key=${process.env.apiflashkey}&height=800&url=${sburl}&width=800`)

                  msg.channel.send({embeds: [embed3]});

                  sleep(500)

                  msg.channel.send('Generating Scoreboard Image ...')
                  .then(msg => {
                     setTimeout(() => msg.delete(), 7500)
                  })
                  .catch();


               })
      }

      async function getLeaderboard(region) {


         if (region == "EU" || region == "NA" || region == "AS" || region == "OC" || region == "SA" || region == "eu" || region == "na" || region == "as" || region == "oc" || region == "sa") {
            api.rankings("krunker", region).then( data => {

               const { items } = data;

               const url = `https://www.faceit.com/en/dashboard/rankings`

               // Yea... For loop didn't work

               msg.reply( `${items[0]['nickname']} | Position: ${items[0]['position']} | Country: ${String(items[0]['country']).toUpperCase()} ${countryCodeEmoji(String(items[0]['country']).toUpperCase())} | Elo: ${items[0]['faceit_elo']} | Level: ${items[0]['game_skill_level']} \n\n ${items[1]['nickname']} | Position: ${items[1]['position']} | Country: ${String(items[1]['country']).toUpperCase()} ${countryCodeEmoji(String(items[1]['country']).toUpperCase())} | Elo: ${items[1]['faceit_elo']} | Level: ${items[1]['game_skill_level']} \n\n ${items[2]['nickname']} | Position: ${items[2]['position']} | Country: ${String(items[2]['country']).toUpperCase()} ${countryCodeEmoji(String(items[2]['country']).toUpperCase())} | Elo: ${items[2]['faceit_elo']} | Level: ${items[2]['game_skill_level']} \n\n${items[3]['nickname']} | Position: ${items[3]['position']} | Country: ${String(items[3]['country']).toUpperCase()} ${countryCodeEmoji(String(items[3]['country']).toUpperCase())} | Elo: ${items[3]['faceit_elo']} | Level: ${items[3]['game_skill_level']} \n\n${items[4]['nickname']} | Position: ${items[4]['position']} | Country: ${String(items[4]['country']).toUpperCase()} ${countryCodeEmoji(String(items[4]['country']).toUpperCase())} | Elo: ${items[4]['faceit_elo']} | Level: ${items[4]['game_skill_level']} \n\n${items[5]['nickname']} | Position: ${items[5]['position']} | Country: ${String(items[5]['country']).toUpperCase()} ${countryCodeEmoji(String(items[5]['country']).toUpperCase())} | Elo: ${items[5]['faceit_elo']} | Level: ${items[5]['game_skill_level']} \n\n${items[6]['nickname']} | Position: ${items[6]['position']} | Country: ${String(items[6]['country']).toUpperCase()} ${countryCodeEmoji(String(items[6]['country']).toUpperCase())} | Elo: ${items[6]['faceit_elo']} | Level: ${items[6]['game_skill_level']} \n\n${items[7]['nickname']} | Position: ${items[7]['position']} | Country: ${String(items[7]['country']).toUpperCase()} ${countryCodeEmoji(String(items[7]['country']).toUpperCase())} | Elo: ${items[7]['faceit_elo']} | Level: ${items[7]['game_skill_level']} \n\n${items[8]['nickname']} | Position: ${items[8]['position']} | Country: ${String(items[8]['country']).toUpperCase()} ${countryCodeEmoji(String(items[8]['country']).toUpperCase())} | Elo: ${items[8]['faceit_elo']} | Level: ${items[8]['game_skill_level']} \n\n${items[9]['nickname']} | Position: ${items[9]['position']} | Country: ${String(items[9]['country']).toUpperCase()} ${countryCodeEmoji(String(items[9]['country']).toUpperCase())} | Elo: ${items[9]['faceit_elo']} | Level: ${items[9]['game_skill_level']} \n\n https://www.faceit.com/en/dashboard/rankings`)
            })
         }


      }

   switch(args[0]){

      case 'profile':

      if (!args[1]) return;

      if (!args[1].match(/^[0-9a-zA-Z_-]+$/)) {
         msg.channel.send("Only use alphanumeric characters in the username, with excpetion of _ and -")
         return;
      }
      getProfile(args[1])

      break;

      case 'levels':
         let embed = new Discord.MessageEmbed()
            .addFields(
               { name: 'Level 1', value: `0 ELO   <:level1:927932450783526922>`, inline: true},
               { name: 'Level 1', value: `300 ELO   <:level2:927932804833107978>`, inline: true},
               { name: 'Level 1', value: `600 ELO   <:level3:927932450825453629>`, inline: true},
               { name: 'Level 4', value: `900 ELO   <:level4:927932450598957116>`, inline: true},
               { name: 'Level 5', value: `1200 ELO   <:level5:927932450703802468>`, inline: true},
               { name: 'Level 6', value: `1500 ELO   <:level6:927932450859016243>`, inline: true},
               { name: 'Level 7', value: `1800 ELO   <:level7:927932450577973248>`, inline: true},
               { name: 'Level 8', value: `2100 ELO   <:level8:927932450313764875>`, inline: true},
               { name: 'Level 9', value: `2250 ELO   <:level9:927932450699616307>`, inline: true},
               { name: 'Level 10', value: `2400 ELO   <:level10:927932450691252335>`, inline: true},
         )
         msg.channel.send({embeds: [embed]});
      
      break;

      case 'match':
         if (!args[1]) return;

         getMatchFromId(args[1]);

      break;

      case 'leaderboard':

         if (!args[1]) {
            msg.reply("Please supply any of the following regions: EU | NA | AS | OC | SA")
         }

         getLeaderboard(args[1])

      break;

      case 'lb':

         if (!args[1]) {
            msg.reply("Please supply any of the following regions: EU | NA | AS | OC | SA")
         }

         getLeaderboard(args[1])
      
      break;
          

      case 'w':
         if (!args[1]) return;

         if (!msg.member.roles.cache.find(r => r.id === "927907014447861781")) return;

         let role1 = msg.guild.roles.cache.find(r => r.id === "927701321845461002");

         let member1 = msg.mentions.members.first();

         member1.roles.add(role1)
         msg.channel.send(`${member1.user} has been validated.`)
         
      break;

      case 'uw':
         if (!args[1]) return;

         if (!msg.member.roles.cache.find(r => r.id === "927907014447861781")) return;

         let role2 = msg.guild.roles.cache.find(r => r.id === "927701321845461002");

         let member2 = msg.mentions.members.first();

         member2.roles.remove(role2)
         msg.channel.send(`${member2.user} has been unvalidated.`)
      break;

      case 'lft':

         if (db.get(`timer.time`) === null) {
            db.set(`timer`, { time: 0})
        }

        if (db.get(`timer.time`) === 0) {
           msg.channel.send(`<@&928003826026434580> ${msg.author.username} is looking for a teammate`)
           db.set(`timer`, { time: 180})
        } else {
            var minutes = Math.floor(db.get(`timer.time`) / 60);
            var seconds = db.get(`timer.time`) - minutes * 60;
           msg.reply(`Wait for ${minutes} minutes and ${seconds} seconds.`)
        }

      break;

   }

})

bot.login(process.env.DISCORD_TOKEN);