const express = require('express');
const Mock = require('mockjs');
const { responseJson } = require('../utils/response');
const router = express.Router();

const getShopList = (pageSize = 20) => {
  return Mock.mock({
    [`list|${pageSize || 20}`]: [
      {
        id: '@increment(1)',
        shopName: '@word(5, 15)',
        shopId: '7495@integer(100000000000, 999999999999)',
        createTime: '@datetime("yyyy/MM/dd HH:mm:ss")',
      },
    ],
  }).list;
};

router.get('/list', (req, res) => {
  const { pageSize } = req.query;
  return res.json(
    responseJson(
      {
        total: 100,
        data: getShopList(pageSize),
      },
      '获取列表成功',
      200
    )
  );
});

router.get('/user/list', (req, res) => {
  const { pageSize } = req.query;
  return res.json(
    responseJson(
      {
        total: 100,
        data: getShopList(pageSize),
      },
      '获取列表成功',
      200
    )
  );
});

module.exports = router;
