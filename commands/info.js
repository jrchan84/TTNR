const { SlashCommandBuilder, channelMention } = require('@discordjs/builders');
const { MessageEmbed, Channel, Client } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Learn more about this bot!'),
	async execute(interaction) {

		const commands = [];

		const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`./${file}`);
			commands.push(command.data.toJSON());
		}

		let commandfields = commands.map(x => {
			return {
				name: "/" + x.name,
				value: x.description,
				inline: true
			}
		})


		const infoembed = new MessageEmbed()
			.setColor('#42f590')
			.setTitle("Hi, I'm TTNR!")
			.setURL('https://www.google.com/')
			.setImage('https://i.imgur.com/26UBWBp.gif')
			.setDescription("I'm a custom discord bot designed for the DSC UBC General Server. My main purpose is to increase DSC's community engagement in discord through general purpose use, gamified user interaction, and networking encouragement. Let me know if I'm doing a good job by clicking the title.")
			.addFields(commandfields)
			
	
		await interaction.reply({ 
			content: "Hello " + interaction.user.tag +"!",
			embeds: [infoembed],
			ephemeral: true
		});
		
	}
};
