const express = require('express');
const { responseJson } = require('../utils/response');
const { mock } = require('mockjs');
const { USER_TOKEN, USER_NAME, PASSWORD } = require('../constant/user');
const router = express.Router();

// 登录接口
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 验证用户名和密码
  if (username !== USER_NAME || password !== PASSWORD) {
    return res.json(responseJson(null, '用户名或密码错误', 400));
  }

  // 返回成功响应
  return res.json(responseJson(USER_TOKEN, '登录成功', 200));
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
        username: 'ALT-' + mock('@integer(100, 999)') + '-' + mock('@cname'),
        role_name: mock('@pick(["管理员", "前端工程师", "后端工程师"])'),
        authorization: USER_TOKEN,
      },
      '获取用户信息成功',
      200
    )
  );
});

// 用户列表
router.get('/list', (req, res) => {
  const { pageSize } = req.query;
  return res.json(
    responseJson(
      {
        total: 100,
        list: mock({
          [`list|${pageSize || 20}`]: [
            {
              id: '@increment(1)',
              role_id: '@uuid',
              role_name: '@pick(["管理员", "前端工程师", "后端工程师"])',
              user_id: '@uuid',
              user_name: () =>
                'ALT-' + mock('@integer(100, 999)') + '-' + mock('@cname'),
              workwx_user_id: '@uuid',
              last_login: '@datetime("yyyy-MM-dd HH:mm:ss")',
              update_time: '@datetime("yyyy-MM-dd HH:mm:ss")',
              is_delete: 0,
            },
          ],
        }).list,
      },
      '获取列表成功',
      200
    )
  );
});

// 修改密码 (管理员)
router.put('/password/reset', (req, res) => {
  if ('id' in req.body && 'new_password' in req.body) {
    return res.json(responseJson(null, '修改成功', 200));
  } else {
    return res.json(responseJson(null, '修改失败', 400));
  }
});

// 修改密码
router.put('/password/update', (req, res) => {
  if ('old_password' in req.body && 'new_password' in req.body) {
    return res.json(responseJson(null, '修改成功', 200));
  } else {
    return res.json(responseJson(null, '修改失败', 400));
  }
});

// 删除用户
router.delete('/delete', (req, res) => {
  if ('id' in req.query) {
    return res.json(responseJson(null, '删除成功', 200));
  } else {
    return res.json(responseJson(null, '删除失败', 400));
  }
});

// 编辑用户
router.put('/update', (req, res) => {
  if (
    'id' in req.body &&
    'role_id' in req.body &&
    'workwx_user_id' in req.body
  ) {
    return res.json(responseJson(null, '编辑成功', 200));
  } else {
    return res.json(responseJson(null, '编辑失败', 400));
  }
});

module.exports = router;
