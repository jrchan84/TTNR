module.exports = {
	name: 'messageCreate',
	async execute(db, message) {
		console.log(`EVENT: message is created -> ${message}`);
    const docRef = db.collection('messages').doc(message.id);
    await docRef.set({
      author_id: message.author.id,
      author_name: message.author.username,
      timestamp: message.createdTimestamp,
      body: message.content
    });
    console.log('Entered new data into the DB');
	},
};
