const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('grade')
		.setDescription('Grade your resume with an ATS.')
		.addAttachmentOption(option =>
			option.setName('resume')
				.setDescription('Attach the resume you want to grade (.pdf or .docx).')
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('private')
				.setDescription('Instead of making a thread, the bot will DM you the grade.')
				.setRequired(true)),
	async execute(interaction) {
		const attachment = interaction.options.getAttachment('resume');
		if (interaction.options.getBoolean('private') ?? true) {
			await interaction.reply(`Received ${attachment.name}, creating thread...`);
		}
	},
};
