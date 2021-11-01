const { SlashCommandBuilder, channelMention } = require('@discordjs/builders');
const { MessageEmbed, Channel } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('learn more about this bot!'),
	async execute(interaction) {

		const infoembed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle("Info")
			.setImage('https://i.imgur.com/26UBWBp.gif')
			.addFields(
				{name: "Do you like programming?", value: "xmgg"}
			)
		
		
		await interaction.reply({ 
			content: "something",
			embeds: [infoembed],
			ephemeral: true
		});
		
	}
};
