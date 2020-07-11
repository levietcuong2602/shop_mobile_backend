/* eslint-disable no-return-await */
/* eslint-disable radix */
const Sequelize = require('sequelize');
const { Carts, Products } = require('../models');
const { logger } = require('../utils/logger');
const statusCode = require('../errors/statusCode');
const CustomError = require('../errors/CustomError');

async function create({ customerId, productId, amount }) {
  await Carts.create({
    customer_id: customerId,
    product_id: productId,
    amount,
  });
  return 1;
}

async function getByUser({ userId, limit = 10, pageNum = 0 }) {
  try {
    limit = parseInt(limit);
    pageNum = parseInt(pageNum) > 0 ? +pageNum : 1;

    const query = {};
    query.where = {
      customer_id: userId,
    };

    query.raw = true;
    const model = await Carts.findAndCountAll(query);
    const totalCount = model.count;
    if (totalCount <= 0)
      return {
        pager: {
          offset: 0,
          limit: 0,
          currentPageNum: 0,
          totalCount: 0,
          hasPrev: false,
          hasNext: false,
          prevPageNum: undefined,
          nextPageNum: undefined,
          lastPageNum: 0,
        },
        data: [],
      };

    const totalPage = Math.ceil(totalCount / limit);
    const currentPageNum = totalPage >= pageNum ? pageNum : 1; // <= totalPage ? pageNum : totalPage;
    const hasPrev = currentPageNum > 1;
    const hasNext = currentPageNum < totalPage;
    const offset = currentPageNum > 0 ? (currentPageNum - 1) * limit : 0;
    Carts.belongsTo(Products, {
      foreignKey: 'product_id',
      targetKey: 'id',
    });
    const data = await Carts.findAll({
      ...query,
      include: [
        {
          model: Products,
          where: {
            id: Sequelize.col('carts.product_id'),
          },
        },
      ],
      limit,
      offset,
      raw: true,
    });

    return {
      pager: {
        offset,
        limit,
        currentPageNum,
        totalCount,
        hasPrev,
        hasNext,
        prevPageNum: hasPrev ? currentPageNum - 1 : undefined,
        nextPageNum: hasNext ? currentPageNum + 1 : undefined,
        lastPageNum: totalPage,
      },
      data,
    };
  } catch (error) {
    logger.error(error.message);
    throw new CustomError(
      statusCode.INTERNAL_SERVER_ERROR,
      'Get products error',
    );
  }
}

module.exports = {
  create,
  getByUser,
};
