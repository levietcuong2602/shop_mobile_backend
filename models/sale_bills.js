/* eslint-disable func-names */
/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'SaleDetails',
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
      shiper: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      delivery_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      book_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      ship_fee: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      status_order: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      destination_address: {
        type: DataTypes.TEXT,
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
      tableName: 'sale_bills',
      underscored: true,
      timestamps: false,
    },
  );
};
