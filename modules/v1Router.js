const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const routerRouter = require('./router');
const listingRouter = require('./listing');
const orderRouter = require('./order');
const refundRouter = require('./refund');
const productRouter = require('./product');
const systemRouter = require('./system');
const walmartShopRouter = require('./walmartShop');
const tiktokShopRouter = require('./tiktokShop');
const roleRouter = require('./role');
const dashboardRouter = require('./dashboard');
const { WHITE_LIST, USER_TOKEN } = require('../constant/user');

// 鉴权中间件
router.use('/', (req, res, next) => {
  if (WHITE_LIST.includes(req.path)) {
    next();
  } else {
    if ('authorization' in req.headers) {
      setTimeout(() => {
        next();
      }, 100); // 延迟 100 毫秒 (0.1秒)
    } else {
      return res.json(null, '用户未登录', 401);
    }
  }
});

router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/router', routerRouter);
router.use('/listing', listingRouter);
router.use('/order', orderRouter);
router.use('/refund', refundRouter);
router.use('/product', productRouter);
router.use('/dashboard', dashboardRouter);

// 店铺列表
router.use('/walmart/shop', walmartShopRouter);
router.use('/tiktok/shop', tiktokShopRouter);

// 其他接口
router.use('/system', systemRouter);

module.exports = router;
