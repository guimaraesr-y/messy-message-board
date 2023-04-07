import App from "./app";
import config from "./config";
import sequelize from "./database";
import Message from "./app/model/Message";
import Reaction from "./app/model/Reaction";
import User from "./app/model/User";


const { PORT } = config;
const app = new App();

// (async() => {
//     await User.sync();
//     await Message.sync();
//     await Reaction.sync();
// })()

User.hasMany(Message);
Message.belongsTo(User, {
    foreignKey: 'userId'
});
Message.belongsTo(Message, {
    foreignKey: 'refsMessage'
});
Reaction.belongsTo(Message, {
    foreignKey: 'messageId'
});
Reaction.belongsTo(User, {
    foreignKey: 'userId'
});
Message.hasMany(Reaction);

sequelize.sync();

app.server.listen(PORT, () => console.log('[+] server listening on', PORT));