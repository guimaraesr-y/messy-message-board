import { DataTypes } from "sequelize";
import sequelize from "../../database";

const Reaction = sequelize.define('Reactions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    messageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Messages',
            key: 'id'
        }
    },
    liked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

export default Reaction