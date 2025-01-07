const express = require('express');
const {
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachQuarterOfInterval,
  format,
} = require('date-fns');
const { responseJson } = require('../utils/response');
const Mock = require('mockjs');
const router = express.Router();

// 按照粒度计算日期范围
const getDateRanges = (start_date, end_date, granularity) => {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const dateRanges = [];

  // 检查日期是否有效
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error('Invalid start or end date.');
  }

  // 按小时
  if (granularity === 'hour') {
    for (let i = 0; i < 24; i++) {
      dateRanges.push(
        `${format(startDate, 'yyyy-MM-dd')} ${i < 10 ? '0' + i : i}:00`
      );
    }
  }

  // 按天
  else if (granularity === 'day') {
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    days.forEach((day) => {
      dateRanges.push(format(day, 'yyyy-MM-dd'));
    });
  }

  // 按周
  else if (granularity === 'week') {
    let currentStart = startOfWeek(startDate, { weekStartsOn: 1 }); // 周一为一周的开始
    let currentEnd = endOfWeek(currentStart, { weekStartsOn: 1 }); // 结束是当前周日
    while (currentStart <= endDate) {
      // 确保最后一组日期不超过结束日期
      if (currentEnd > endDate) {
        currentEnd = endDate;
      }

      // 处理日期范围
      dateRanges.push(
        `${format(currentStart, 'yyyy-MM-dd')}～${format(
          currentEnd,
          'yyyy-MM-dd'
        )}`
      );

      // 移动到下一周
      currentStart = addDays(currentEnd, 1); // 下一周的开始
      currentEnd = endOfWeek(currentStart, { weekStartsOn: 1 }); // 下一周的结束
    }
  }

  // 按月
  else if (granularity === 'month') {
    const months = eachMonthOfInterval({ start: startDate, end: endDate });
    months.forEach((month) => {
      dateRanges.push(format(month, 'yyyy-MM'));
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
        `${format(startOfQuarter, 'yyyy-MM-dd')}～${format(
          endOfQuarter,
          'yyyy-MM-dd'
        )}`
      );
    });
  }

  return dateRanges;
};

// 生成数据
const generateData = (dateRanges, isHistory = false, granularity = 'day') => {
  return dateRanges.map((date) => {
    // 偏移量为30天前的数据，决定历史数据的日期
    let historyDate = date;
    if (isHistory) {
      const currentDate = new Date(date);
      historyDate = calculateHistoryDate(currentDate, granularity); // 计算30天前的日期
    }

    return {
      value: Mock.mock('@integer(100, 1000)'), // 随机生成一个数字
      date: historyDate, // 环比的日期（30天前）
    };
  });
};

// 计算30天前的日期
const calculateHistoryDate = (currentDate, granularity) => {
  if (granularity === 'hour') {
    return format(subDays(currentDate, 30), 'yyyy-MM-dd HH:00'); // 返回30天前的日期，包含小时并加上“:00”
  } else {
    return format(subDays(currentDate, 30), 'yyyy-MM-dd'); // 其他粒度仍然只返回日期
  }
};

router.get('/data', (req, res) => {
  const { start_date, end_date, granularity } = req.query;
  try {
    const dateRanges = getDateRanges(start_date, end_date, granularity);

    // 生成list数据
    const listData = generateData(dateRanges, false, granularity);
    // 生成history数据，isHistory 为 true时生成30天前的数据
    const historyData = generateData(dateRanges, true, granularity);

    return res.json(
      responseJson(
        {
          list: listData,
          history: historyData,
          date_range: dateRanges,
        },
        'success',
        200
      )
    );
  } catch (error) {
    return res.json(responseJson(null, error.message, 400));
  }
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
