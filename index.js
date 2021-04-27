const Discord = require("discord.js");

const Client = new Discord.Client;

const prefix = "n!";

Client.on("ready", () => {
    console.log("Nesolia Modération est prêt!");
});

Client.on("guildMemberAdd", member => {
  member.guild.channels.cache.get("835951354437435412").send(new Discord.MessageEmbed()
    .setDescription(`${member} nous a rejoinds. Nous sommes maintenant ${member.guild.memberCount}! 🎉`)
    .setColor("#00ff00"))
  member.roles.add("835948216117624952")
});

Client.on("guildMemberRemove", member => {
  member.guild.channels.cache.get("835951354437435412").send(new Discord.MessageEmbed() 
  .setDescription(`${member.user.tag} a quitté le serveur mais nous restont fort !`)
  .setColor("#ff0000"))
});

Client.on("message", message =>{
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;
  
  if(message.content.startsWith(prefix + "help")){
  var embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**HELP**")
      .addField("n!ban","sert a ban un joueur")
      .addField("n!kick","sert a kick un membre")
      .addField("n!clear","sert a clear les message")
      .setFooter("Nesolia","https://cdn.discordapp.com/attachments/830489270375809064/836574354393268264/logo_128x128.png")
      .setTimestamp()
  }

  message.channel.send(embed);

  if(message.member.permissions.has("MANAGE_MESSAGES")){
    if(message.content.startsWith(prefix + "clear")){
      let args = message.content.split(" ");
      
      if(args[1] == undefined){
        message.reply("Nombre de message non ou mal définie");
      }
      else {
        let number = parseInt(args[1]);
        if(isNaN(number)){
          message.reply("Nombre de message non ou mal défini.")
        }
        else {
          message.channel.bulkDelete(number).then(message =>{
            console.log("Suppression de " + message.size + "message réussi !");
          }).catch(err => {
            console.log("Erreur de clear" + err);
          });
        }
      }
    }

  }

  if(message.member.hasPermission("ADMINISTRATOR")){
    if(message.content.startsWith(prefix + "ban")){
      let mention = message.mentions.members.first();

      if(mention == undefined){
        message.reply("Veullier mentioner un membre.");
      }
      else {
        if(mention.bannable){
          mention.ban();
          message.channel.send(mention.displayName + " a éte bannis avec succès");
        }
        else {
          message.reply("Impossible de bannir ce membre!");
        }
      }
    }
    else if(message.content.startsWith(prefix + "kick")){
      let mention = message.mentions.members.first();

      if(mention == undefined){
        message.reply("Veullier mentioner un membre.");

      }
      else {
        if(mention.kickable){
          mention.kick();
          message.channel.send(mention.displayName + " kick avec succès.");
        }
        else {
          message.reply("Impossible de kick ce membre.");
        }
      }
    }
  }
});

Client.login(process.env.TOKEN);








































