const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = 3333;
const app = express();

// 设置代理中间件
app.use(
  '/proxy/tk',
  createProxyMiddleware({
    target: 'http://192.168.3.7:8001',
    changeOrigin: true,
    followRedirects: true, // 自动跟随重定向
  })
);
app.use(
  '/proxy/walmart',
  createProxyMiddleware({
    target: 'http://192.168.3.7:8012/api/v1.0',
    changeOrigin: true,
    followRedirects: true, // 自动跟随重定向
  })
);
app.use(
  '/proxy/system',
  createProxyMiddleware({
    target: 'http://192.168.3.7:3333/api/v1',
    changeOrigin: true,
    followRedirects: true, // 自动跟随重定向
  })
);
app.use(
  '/proxy/log',
  createProxyMiddleware({
    target: 'http://192.168.3.7:8013',
    changeOrigin: true,
    followRedirects: true, // 自动跟随重定向
  })
);

// 启动服务器
app.listen(port, () => {
  console.log(`Proxy listening at port ${port}`);
});
