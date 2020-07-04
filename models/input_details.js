/* eslint-disable func-names */
/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'InputDetails',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      input_bill_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      unit_price: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'input_details',
      underscored: true,
      timestamps: false,
    },
  );
};
