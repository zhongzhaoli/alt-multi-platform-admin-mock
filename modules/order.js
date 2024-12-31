const express = require('express');
const Mock = require('mockjs');
const { responseJson } = require('../utils/response');
const router = express.Router();

const walmartList = (pageSize = 20) => {
  return Mock.mock({
    [`list|${pageSize || 20}`]: [
      {
        id: '@increment(1)',
        shopName: '星乘-沃尔玛-@cword(1, 4)',
        shopId: '10001@integer(100000, 999999)',
        purchaseOrderId: '1089@integer(10000000000, 99999999999)',
        customerOrderId: '2000@integer(10000000000, 99999999999)',
        orderStatus:
          '@pick(["Created","Acknowledged", "Shipped", "Delivered", "Cancelled", "Refund"])',
        productImageUrl: () => Mock.Random.image(50),
        productName: '@name(20, 100)',
        productSku: '@name(5, 10)-@name(5,10)',
        orderLineQuantity: '@integer(1,50)',
        asin: '@string("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 5, 16)',
        orderTime: '@datetime("yyyy/MM/dd HH:mm:ss")',
        updateTime: '@datetime("yyyy/MM/dd HH:mm:ss")',
        phone: /^1[3-9]\d{9}$/,
        address1: '@name(1, 10)',
        address2: null,
        city: '@city',
        state: '@county',
        carrierName: '@name(3,10)',
        trackingNumber: '@string("0123456789", 10, 10)',
        trackingURL: '@url',
        totalAmount: '@float(1000, 10000, 2, 2)',
        productAmount: '@float(1, 999, 2, 2)',
        shippingFee: '@float(1, 99, 2, 2)',
        taxFee: '@float(1, 10, 2, 2)',
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
        list: walmartList(pageSize),
      },
      '获取沃尔玛列表成功',
      200
    )
  );
});

router.post('/walmart/deliver', (req, res) => {
  return res.json(responseJson(null, '发货成功', 200));
});

const tiktokList = (pageSize = 20) => {
  return Mock.mock({
    [`list|${pageSize}`]: [
      {
        id: '@increment(1)',
        shopName: '星乘-沃尔玛-@cword(1, 4)',
        shopId: '10001@integer(100000, 999999)',
        orderSn: '@integer(100000000000000, 999999999999999)',
        orderStatus:
          '@pick(["ON_HOLD", "UNPAID", "AWAITING_SHIPMENT", "PARTIALLY_SHIPPING", "AWAITING_COLLECTION", "IN_TRANSIT", "DELIVERED", "COMPLETED", "CANCELLED"])',
        productImageUrl: () => Mock.Random.image(50),
        productName: () => Mock.Random.name(),
        productSku: () => `${Mock.Random.name()}-${Mock.Random.name()}`,
        orderLineQuantity: '@integer(1,50)',
        asin: '@string("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 5, 16)',
        orderTime: '@datetime("yyyy/MM/dd HH:mm:ss")',
        updateTime: '@datetime("yyyy/MM/dd HH:mm:ss")',
        phone: /^1[3-9]\d{9}$/,
        address1: () => Mock.Random.name(),
        address2: null,
        name: () => Mock.Random.name(),
        city: '@city',
        remark: '@sentence',
        state: '@county',
        carrierName: () => Mock.Random.name(),
        trackingNumber: '@string("0123456789", 10, 10)',
        trackingURL: '@url',
        totalAmount: '@float(1000, 10000, 2, 2)',
        productAmount: '@float(1, 999, 2, 2)',
        shippingFee: '@float(1, 99, 2, 2)',
        taxFee: '@float(1, 10, 2, 2)',
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
        data: tiktokList(pageSize),
      },
      '获取沃尔玛列表成功',
      200
    )
  );
});

router.post('/tiktok/deliver', (req, res) => {
  return res.json(responseJson(null, '发货成功', 200));
});

module.exports = router;
