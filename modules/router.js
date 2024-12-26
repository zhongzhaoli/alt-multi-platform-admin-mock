const express = require('express');
const { responseJson } = require('../utils/response');
const routes = require('../routes.json');
const router = express.Router();

router.get('/list/user/access/tree', (req, res) => {
  return res.json(responseJson({ data: routes }, '获取用户权限树成功', 200));
});

module.exports = router;
