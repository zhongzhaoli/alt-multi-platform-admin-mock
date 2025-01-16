const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// 设置 multer 存储方式
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/test', upload.single('file'), (req, res) => {
  const csvString = req.body.file;

  // 定义 CSV 文件保存路径
  const filePath = path.join(__dirname, 'data.csv');

  // 使用 fs 将 CSV 文本写入本地文件
  fs.writeFile(filePath, csvString, 'utf8', (err) => {
    if (err) {
      return res.status(500).json({
        code: 1,
        message: 'Failed to save CSV file',
      });
    }
  });
  res.json({
    code: 0,
    data: 'test',
    message: 'success',
  });
});

module.exports = router;
