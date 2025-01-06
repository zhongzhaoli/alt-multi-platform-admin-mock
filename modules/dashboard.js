const express = require('express');
const {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachQuarterOfInterval,
} = require('date-fns');
const { responseJson } = require('../utils/response');
const Mock = require('mockjs');
const router = express.Router();

const getDateRanges = (start_date, end_date, granularity) => {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const dateRanges = [];

  // 按小时
  if (granularity === 'hour') {
    for (let i = 0; i < 24; i++) {
      dateRanges.push(`${i} 点`);
    }
  }

  // 按天
  else if (granularity === 'day') {
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    days.forEach((day) => {
      dateRanges.push(format(day, 'MM-dd'));
    });
  }

  // 按周
  else if (granularity === 'week') {
    let currentStart = startOfWeek(startDate, { weekStartsOn: 1 }); // 周一为一周的开始
    while (currentStart <= endDate) {
      const currentEnd = endOfWeek(currentStart, { weekStartsOn: 1 });
      if (currentEnd > endDate) {
        break;
      }
      dateRanges.push(
        `${format(currentStart, 'MM-dd')}～${format(currentEnd, 'MM-dd')}`
      );
      currentStart = addDays(currentEnd, 1); // 下一周的开始
    }
  }

  // 按月
  else if (granularity === 'month') {
    const months = eachMonthOfInterval({ start: startDate, end: endDate });
    months.forEach((month) => {
      dateRanges.push(format(month, 'MM'));
    });
  }

  // 按季度
  else if (granularity === 'quarter') {
    const quarters = eachQuarterOfInterval({ start: startDate, end: endDate });
    quarters.forEach((quarter) => {
      const startOfQuarter = startOfWeek(quarter, { weekStartsOn: 1 });
      const endOfQuarter = endOfWeek(addDays(startOfQuarter, 89), {
        weekStartsOn: 1,
      }); // 每个季度大约90天
      dateRanges.push(
        `${format(startOfQuarter, 'MM-dd')}～${format(endOfQuarter, 'MM-dd')}`
      );
    });
  }

  return dateRanges;
};
// 动态生成数据的函数
const generateData = (length) => {
  // 使用 Mock.js 动态生成数据，确保每个数字都在合理范围内
  const data = Mock.mock({
    [`data|${length}`]: ['@integer(100, 1000)'], // 生成合理范围内的随机整数
  });

  // 确保返回的是一个数组，不管长度是多少
  return Array.isArray(data.data) ? data.data : [data.data]; // 确保返回的是一个数组
};

router.get('/data', (req, res) => {
  const { start_date, end_date, granularity } = req.query;
  const dateRanges = getDateRanges(start_date, end_date, granularity);
  return res.json(
    responseJson(
      {
        list: generateData(dateRanges.length),
        date_range: dateRanges,
      },
      'success',
      200
    )
  );
});

const walmartList = (pageSize = 20) => {
  return Mock.mock({
    [`list|${pageSize || 20}`]: [
      {
        id: '@increment(1)',
        shop_name: '星乘-沃尔玛-@cword(1, 4)',
        shop_id: '10001@integer(100000, 999999)',
        product_image_url: () => Mock.Random.image(50),
        product_name: '@name(20, 100)',
        sku: '@name(5, 10)-@name(5,10)',
        sales_amount: '@float(1, 999, 2, 2)',
        paid_amount: '@float(1, 999, 2, 2)',
        sold_out: '@integer(1,50)',
        paid_order_num: '@integer(1,50)',
        paid_unit_price: '@float(1, 999, 2, 2)',
        paid_buyer_num: '@integer(1,50)',
        return_num: '@integer(1,50)',
      },
    ],
  }).list;
};

router.get('/sku', (req, res) => {
  const { pageSize } = req.query;
  return res.json(
    responseJson(
      {
        total: 100,
        list: walmartList(pageSize),
      },
      '获取SKU列表成功',
      200
    )
  );
});

module.exports = router;
