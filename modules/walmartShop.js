const express = require('express');
const Mock = require('mockjs');
const { responseJson } = require('../utils/response');
const router = express.Router();

const getShopList = (pageSize = 20) => {
  return Mock.mock({
    [`list|${pageSize || 20}`]: [
      {
        id: '@increment(1)',
        shopPartnerId: '10001@integer(100000, 999999)',
        shopId: '1011@integer(10000, 99999)',
        shopName: '星乘-沃尔玛-@cword(1, 4)',
        client: '@uuid',
        createTime: '@datetime("yyyy/MM/dd HH:mm:ss")',
        clientSecret: '@word(200)',
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

router.delete('/', (req, res) => {
  if ('id' in req.body && 'shopId' in req.body && 'shopName' in req.body) {
    return res.json(responseJson(null, '删除成功', 200));
  } else {
    return res.json(responseJson(null, '删除失败', 400));
  }
});

router.post('/', (req, res) => {
  if (
    'shopId' in req.body &&
    'shopPartnerId' in req.body &&
    'shopName' in req.body &&
    'client' in req.body &&
    'clientSecret' in req.body
  ) {
    return res.json(responseJson(null, '新增成功', 200));
  } else {
    return res.json(responseJson(null, '新增失败', 400));
  }
});

router.put('/:id', (req, res) => {
  if (
    'id' in req.params &&
    'shopId' in req.body &&
    'shopPartnerId' in req.body &&
    'shopName' in req.body &&
    'client' in req.body &&
    'clientSecret' in req.body
  ) {
    return res.json(responseJson(null, '修改成功', 200));
  } else {
    return res.json(responseJson(null, '修改失败', 400));
  }
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
