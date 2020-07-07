/* eslint-disable no-return-await */
/* eslint-disable radix */
const { Op } = require('sequelize');
const { Products } = require('../models');
const { logger } = require('../utils/logger');
const statusCode = require('../errors/statusCode');
const CustomError = require('../errors/CustomError');

async function create(data) {}

async function update(data) {}

async function findById(productId) {
  return await Products.findOne({ where: { id: productId }, raw: true });
}

async function gets({
  limit,
  pageNum,
  startTime,
  endTime,
  inputSearch,
  productType,
}) {
  try {
    limit = parseInt(limit);
    pageNum = parseInt(pageNum) > 0 ? +pageNum : 1;

    const query = {};
    query.where = {};
    if (inputSearch) {
      query.where.product_name = {
        [Op.like]: inputSearch,
      };
    }
    if (productType) {
      query.where.product_type_id = productType;
    }
    if (startTime && endTime) {
      query.where.created_at = {
        [Op.between]: [new Date(startTime), new Date(endTime)],
      };
    }
    query.raw = true;
    const model = await Products.findAndCountAll(query);
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
    const data = await Products.findAll({ ...query, limit, offset, raw: true });

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
  findById,
  update,
  gets,
};
