import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

const Student = sequelize.define("Student", {
    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    zip: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: "students",
    timestamps: false
});

export default Student;