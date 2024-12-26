const express = require('express');
const Mock = require('mockjs');
const { responseJson } = require('../utils/response');
const router = express.Router();

router.get('/list', (req, res) => {
  const { pageSize } = req.query;
  return res.json(
    responseJson(
      {
        total: 100,
        data: Mock.mock({
          [`list|${pageSize || 20}`]: [
            {
              id: '@increment(1)',
              platform: '@pick(["沃尔玛", "Tiktok"])',
              shopName:
                '@pick(["星乘", "星与"])-@pick(["沃尔玛", "Tiktok"])-@cword(1, 4)',
              shopId: '10001@integer(100000, 999999)',
              totalLinkCount: '@integer(1000, 99999)',
              onSaleLinkCount: '@integer(1000, 99999)',
              todayOnSaleLinkCount: '@integer(1000, 99999)',
              todayOffSaleLinkCount: '@integer(1000, 99999)',
            },
          ],
        }).list,
      },
      '获取列表成功',
      200
    )
  );
});

module.exports = router;
