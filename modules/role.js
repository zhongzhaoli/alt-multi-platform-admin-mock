const express = require('express');
const { responseJson } = require('../utils/response');
const { mock } = require('mockjs');
const routes = require('../routes.json');
const router = express.Router();

router.get('/list', (req, res) => {
  const { pageSize } = req.query;
  return res.json(
    responseJson(
      {
        total: 100,
        data: mock({
          [`list|${pageSize || 20}`]: [
            {
              creator_id: '@uuid',
              id: '@increment(1)',
              is_delete: 0,
              role_id: '@uuid',
              role_name: '@pick(["管理员", "前端工程师", "后端工程师"])',
              update_time: '@datetime("yyyy-MM-dd HH:mm:ss")',
              create_time: '@datetime("yyyy-MM-dd HH:mm:ss")',
              updator_id: '@uuid',
            },
          ],
        }).list,
      },
      '获取列表成功',
      200
    )
  );
});

router.get('/router/tree', (req, res) => {
  return res.json(responseJson(routes, '获取权限树成功', 200));
});

module.exports = router;
