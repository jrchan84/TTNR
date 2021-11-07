const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with Server Info!'),
	async execute(interaction) {
        serverInfo = await this.getServerInfo(interaction);
		await interaction.reply(serverInfo);
	},
    async getServerInfo(interaction) {
        console.log("entereed here");
        console.log(interaction);
        console.log(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
        return `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`;
    }
};
