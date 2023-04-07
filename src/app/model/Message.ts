import { DataTypes } from "sequelize";
import sequelize from "../../database";

const Message = sequelize.define('Messages', {
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
    message: {
        type: DataTypes.STRING,
        allowNull: true
    },
    refsMessage: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Messages',
            key: 'id'
        }
    }
})

export default Message;