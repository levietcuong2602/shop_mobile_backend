/* eslint-disable func-names */
/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Ratings',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: 'ratings',
      underscored: true,
      timestamps: false,
    },
  );
};
