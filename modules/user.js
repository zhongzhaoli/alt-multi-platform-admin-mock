const express = require('express');
const { responseJson } = require('../utils/response');
const { mock } = require('mockjs');
const { USER_TOKEN, USER_NAME, PASSWORD } = require('../constant/user');
const router = express.Router();

// 登录接口
router.post('/login', (req, res) => {
  const { user_name, user_passwd } = req.body;

  // 验证用户名和密码
  if (user_name !== USER_NAME || user_passwd !== PASSWORD) {
    return res.json(responseJson(null, '用户名或密码错误', 400));
  }

  // 返回成功响应
  return res.json(responseJson({ token: USER_TOKEN }, '登录成功', 200));
});

// 退出登录接口
router.post('/logout', (req, res) => {
  return res.json(responseJson(null, '退出成功', 200));
});

// 用户信息
router.get('/me', (req, res) => {
  return res.json(
    responseJson(
      {
        user_id: mock('@uuid'),
        role_id: mock('@uuid'),
        user_name: mock('@cname'),
        role_name: mock('@pick(["管理员", "前端工程师", "后端工程师"])'),
        authorization: USER_TOKEN,
      },
      '获取用户信息成功',
      200
    )
  );
});

module.exports = router;
