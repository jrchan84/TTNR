const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

let rawdata = fs.readFileSync('./public/socials.json');
let social = JSON.parse(rawdata);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('socials')
		.setDescription('Replies with DSC\'s socials!'),
	async execute(interaction) {
		await interaction.reply('Website: ' + social.website + '\n' +
                            'Email: ' + social.email + '\n' +
                            'Instagram: ' + social.instagram + '\n' +
                            'Linkedin: ' + social.linkedin + '\n' +
                            'Github: ' + social.github + '\n');
    console.log('TTNR replied with social links to: ' + interaction.user.tag
			+ ' in server: ' + interaction.guild.name);
	},
};
