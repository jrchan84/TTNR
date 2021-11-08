const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');

let rawData = fs.readFileSync('./public/socials.json');
let social = JSON.parse(rawData);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('socials')
		.setDescription('Replies with DSC\'s socials!'),
	async execute(interaction) {

		const socialEmbed = new MessageEmbed()
			.setColor('#34A853')
			.setTitle('Social Links')
			.setDescription('a list of UBC DSC\'s socials')
			.setThumbnail('https://i.ibb.co/Dz11mV3/DSC-logo-color.png')
			.addFields(
				{ name: 'Website', value: social.website },
				{ name: 'Email', value: social.email },
				{ name: 'Instagram', value: social.instagram },
				{ name: 'Linkedin', value: social.linkedin },
				{ name: 'Github', value: social.github }
			)

		await interaction.reply({ embeds: [socialEmbed] });

    console.log('TTNR replied with social links to: ' + interaction.user.tag
			+ ' in server: ' + interaction.guild.name);
	},
};
