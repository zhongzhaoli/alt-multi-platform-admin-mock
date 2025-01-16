const express = require('express');
const cors = require('cors');
const v1Router = require('./modules/v1Router');
const tiktokRouter = require('./tiktokModules/router');

const port = 3332;
const app = express();

// 跨域
app.use(cors());
app.use('/api/tiktok', tiktokRouter);

// 解析请求体
app.use(express.json());

app.use('/api/v1', v1Router);

// 启动服务器
app.listen(port, () => {
  console.log(`API Server listening at port ${port}`);
});
