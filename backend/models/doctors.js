"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctors.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fullname: DataTypes.STRING,
      medicallicensenumber: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      specialization: DataTypes.STRING,
      yearsofexperience: DataTypes.NUMBER,
      bio: DataTypes.STRING,
      consultationfee: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Doctors",
      tableName: "doctors",
    },
  );
  return Doctors;
};
