const express = require('express');
const Mock = require('mockjs');
const { responseJson } = require('../utils/response');
const router = express.Router();

const getWalmartList = (pageSize = 20) => {
  return Mock.mock({
    [`list|${pageSize || 20}`]: [
      {
        id: '@increment(1)',
        purchaseOrderId: '1089@integer(10000000000, 99999999999)',
        customerOrderId: '2000@integer(10000000000, 99999999999)',
        shopName: '星乘-沃尔玛-@cword(1, 4)',
        orderStatus: '@pick(["INITIATED","CANCELLED", "REFUNDED"])',
        trackingStatus: '@pick(["INITIATED", "SHIPPING", "RETURNED"])',
        productImageUrl: () => Mock.Random.image(50),
        productName: () => Mock.Random.name(10, 30),
        productSku: '@name(5, 10)-@name(5,10)',
        orderLineQuantity: '@integer(1,50)',
        orderAmount: '@float(10, 1000, 2, 2)',
        name: () => Mock.Random.name(),
        requestDate: '@datetime("yyyy/MM/dd HH:mm:ss")',
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
        orderSn: '@integer(100000000000000, 999999999999999)',
        shopName: '星乘-沃尔玛-@cword(1, 4)',
        orderStatus: '@pick(["INITIATED","CANCELLED", "REFUNDED"])',
        productImageUrl: () => Mock.Random.image(50),
        productName: () => Mock.Random.name(10, 30),
        productSku: '@name(5, 10)-@name(5,10)',
        orderLineQuantity: '@integer(1,50)',
        reason: '@sentence',
        orderAmount: '@float(10, 1000, 2, 2)',
        name: () => Mock.Random.name(),
        requestDate: '@datetime("yyyy/MM/dd HH:mm:ss")',
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
        data: getTiktokList(pageSize),
      },
      '获取列表成功',
      200
    )
  );
});

router.post('/tiktok/refundReview', (req, res) => {
  if ('review' in req.body && 'orderSn' in req.body) {
    return res.json(responseJson(null, '操作完成', 200));
  } else {
    return res.json(responseJson(null, '操作失败', 400));
  }
});

router.post('/tiktok/cancelOrder', (req, res) => {
  if ('orderSn' in req.body) {
    return res.json(responseJson(null, '操作完成', 200));
  } else {
    return res.json(responseJson(null, '操作失败', 400));
  }
});

module.exports = router;
