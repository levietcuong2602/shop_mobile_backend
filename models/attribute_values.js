/* eslint-disable func-names */
/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'AttributeValues',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      product_attribute_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      value: {
        type: DataTypes.TEXT(65535),
        allowNull: false,
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
      tableName: 'attribute_values',
      underscored: true,
      timestamps: false,
    },
  );
};
