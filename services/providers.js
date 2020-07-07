/* eslint-disable no-return-await */
/* eslint-disable no-unused-vars */
const Sequelize = require('sequelize');
const { Providers, Products } = require('../models');

async function gets(productTypeId) {
  Providers.hasMany(Products, { foreignKey: 'provider_id', sourceKey: 'id' });
  Products.belongsTo(Providers, {
    foreignKey: 'provider_id',
    targetKey: 'id',
  });

  return await Providers.findAll({
    attributes: [
      [Sequelize.fn('DISTINCT', Sequelize.col('providers.id')), 'id'],
      'name',
    ],
    include: [
      {
        model: Products,
        where: {
          provider_id: Sequelize.col('providers.id'),
          product_type_id: productTypeId,
        },
        attributes: ['product_type_id'],
      },
    ],
    raw: true,
  });
}

module.exports = {
  gets,
};
