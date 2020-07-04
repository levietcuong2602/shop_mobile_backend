/* eslint-disable func-names */
/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Products',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      product_images: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      unit: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      base_price: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      product_type_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      provider_id: {
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
      tableName: 'products',
      underscored: true,
      timestamps: false,
    },
  );
};
