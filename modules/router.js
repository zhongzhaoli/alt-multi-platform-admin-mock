const express = require('express');
const { responseJson } = require('../utils/response');
const routes = require('../routes.json');
const router = express.Router();

router.get('/list/user/access/tree', (req, res) => {
  return res.json(responseJson({ data: routes }, '获取用户权限树成功', 200));
});

router.get('/list/tree', (req, res) => {
  return res.json(responseJson(routes, '获取权限树成功', 200));
});

router.get('/id/list/role/access', (req, res) => {
  if ('role_id' in req.query) {
    return res.json(
      responseJson([2, 55, 56, 7, 8, 9]),
      '获取角色权限成功',
      200
    );
  }
});

router.put('/update/role/access', (req, res) => {
  if ('role_id' in req.body && 'router_ids' in req.body) {
    return res.json(responseJson(null, '更新角色权限成功', 200));
  }
});

module.exports = router;
