/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
const Sequelize = require('sequelize');
const { AttributeValues, Products } = require('../models');

async function getAttributes({ productTypeId, categoryName }) {
  Products.hasMany(AttributeValues, {
    foreignKey: 'product_id',
    sourceKey: 'id',
  });
  AttributeValues.belongsTo(Products, {
    foreignKey: 'product_id',
    targetKey: 'id',
  });

  return await AttributeValues.findAll({
    attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('value')), 'value']],
    include: [
      {
        model: Products,
        where: {
          // id: Sequelize.col('attribute_values.product_id'),
          product_type_id: productTypeId,
        },
        attributes: ['product_type_id'],
      },
    ],
    order: [['value', 'DESC']],
    raw: true,
  });
}

module.exports = {
  getAttributes,
};
