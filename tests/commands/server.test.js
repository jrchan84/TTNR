const serverModule = require('../../commands/server.js');
const getServerInfo = serverModule.getServerInfo;

// test
test("Returns corect server information to output.", () => {
    // mock data
    const interaction = {
        guild : { 
            name : "test-name", 
            memberCount : 10
        }
    };
    // testing correctness
    getServerInfo(interaction).then(data => {
        expect(data).toBe(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    });
});