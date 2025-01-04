const express = require('express');
const Mock = require('mockjs');
const { responseJson } = require('../utils/response');
const { platform } = require('os');
const router = express.Router();

const countryCodes = [
  'US',
  'CN',
  'JP',
  'IN',
  'GB',
  'FR',
  'DE',
  'IT',
  'CA',
  'AU',
  'BR',
  'RU',
  'KR',
  'ES',
  'MX',
  'ID',
  'TR',
  'SA',
  'ZA',
  'AR',
];

Mock.Random.extend({
  countryCode() {
    return this.pick(countryCodes);
  },
});

const getLocalProductList = (pageSize = 20) => {
  return Mock.mock({
    [`list|${pageSize || 20}`]: [
      {
        id: '@increment(1)',
        platform: '亚马逊',
        status: '@pick(["ON_SALE", "OFF_SALE", "OUT_OF_STOCK"])',
        productImageUrl: () => Mock.Random.image(100),
        productName: () => Mock.Random.name(10, 30),
        productSku: '@name(5, 10)-@name(5,10)',
        productAsin: '@name(4, 9)-@name(4,9)',
        price: '@float(10, 1000, 2, 2)',
        brand: () => Mock.Random.name(),
        sellerCountry: '@countryCode',
        deliveryMethod: '@boolean',
        deliveryTime: '@boolean',
      },
    ],
  }).list;
};

router.get('/local/list', (req, res) => {
  const { pageSize } = req.query;
  return res.json(
    responseJson(
      {
        total: 100,
        list: getLocalProductList(pageSize),
      },
      '获取列表成功',
      200
    )
  );
});

const getWalmartList = (pageSize = 20) => {
  return Mock.mock({
    [`list|${pageSize || 20}`]: [
      {
        id: '@increment(1)',
        shopName: '星乘-沃尔玛-@cword(1, 4)',
        shopId: '10001@integer(100000, 999999)',
        platform: '亚马逊',
        asin: '@name(4, 9)-@name(4,9)',
        status: '@pick(["UNPUBLISHED","PUBLISHED","ERROR"])',
        productImageUrl: () => Mock.Random.image(100),
        productName: () => Mock.Random.name(10, 30),
        productSku: '@name(5, 10)-@name(5,10)',
        productId: '@integer(1000000000, 9999999999)',
        price: '@float(10, 1000, 2, 2)',
        stock: '@integer(0, 100000)',
        stockWarning: '@boolean',
      },
    ],
  }).list;
};

router.get('/walmart/list', (req, res) => {
  const { pageSize } = req.query;
  return res.json(
    responseJson(
      {
        total: 100,
        list: getWalmartList(pageSize),
      },
      '获取列表成功',
      200
    )
  );
});

const getTiktokList = (pageSize = 20) => {
  return Mock.mock({
    [`list|${pageSize || 20}`]: [
      {
        id: '@increment(1)',
        shopName: '星乘-沃尔玛-@cword(1, 4)',
        shopId: '10001@integer(100000, 999999)',
        platform: '亚马逊',
        asin: '@name(4, 9)-@name(4,9)',
        status: '@pick(["UNPUBLISHED","PUBLISHED","ERROR"])',
        productImageUrl: () => Mock.Random.image(100),
        productName: () => Mock.Random.name(10, 30),
        productSku: '@name(5, 10)-@name(5,10)',
        productId: '@integer(1000000000, 9999999999)',
        price: '@float(10, 1000, 2, 2)',
        stock: '@integer(0, 100000)',
        stockWarning: '@boolean',
      },
    ],
  }).list;
};

router.get('/tiktok/list', (req, res) => {
  const { pageSize } = req.query;
  return res.json(
    responseJson(
      {
        total: 100,
        list: getTiktokList(pageSize),
      },
      '获取列表成功',
      200
    )
  );
});

module.exports = router;
