const express = require('express');
const {
  parseISO,
  format,
  subDays,
  differenceInDays,
  startOfWeek,
  endOfWeek,
  subWeeks,
  isBefore,
  addDays,
  addMonths,
} = require('date-fns');
const { responseJson } = require('../utils/response');
const Mock = require('mockjs');
const router = express.Router();

function generateTimeSlots(startDate, endDate, granularity) {
  let slots = [];
  let history = [];
  let currentDate = parseISO(startDate);
  const endMoment = parseISO(endDate);
  const isRange = currentDate.getTime() !== endMoment.getTime();
  // 环比
  const diffDays = differenceInDays(endMoment, currentDate);
  let qoqCurrentDate = subDays(currentDate, diffDays + 1);
  const qoqEndMoment = subDays(endMoment, diffDays + 1);
  // 根据颗粒度计算数据
  switch (granularity) {
    case 'hour':
      for (let i = 0; i < 24; i++) {
        slots.push({
          xText: `${i} 点`,
          desc: `${format(currentDate, 'yyyy-MM-dd')} ${
            isRange ? '~ ' + `${format(endMoment, 'yyyy-MM-dd')}` : ''
          } ${i}点`,
          value: Mock.Random.float(1, 99999, 2, 2),
        });
        history.push({
          xText: `${i} 点`,
          desc: `${format(qoqCurrentDate, 'yyyy-MM-dd')} ${
            isRange ? '~ ' + `${format(qoqEndMoment, 'yyyy-MM-dd')}` : ''
          } ${i}点`,
          value: Mock.Random.float(1, 99999, 2, 2),
        });
      }
      break;
    case 'day':
      while (currentDate <= endMoment) {
        slots.push({
          xText: format(currentDate, 'yyyy-MM-dd'),
          desc: format(currentDate, 'yyyy-MM-dd'),
          value: Mock.Random.float(1, 99999, 2, 2),
        });
        history.push({
          xText: format(qoqCurrentDate, 'yyyy-MM-dd'),
          desc: format(qoqCurrentDate, 'yyyy-MM-dd'),
          value: Mock.Random.float(1, 99999, 2, 2),
        });
        currentDate = addDays(currentDate, 1);
        qoqCurrentDate = addDays(qoqCurrentDate, 1);
      }
      break;
    case 'week':
      // 计算每周的起始日期和结束日期
      const currentStartDay = new Date(currentDate).getDay();
      const qoqStartDay = new Date(qoqCurrentDate).getDay();
      let weekStart = startOfWeek(currentDate, {
        weekStartsOn: currentStartDay,
      });
      let qoqWeekStart = startOfWeek(qoqCurrentDate, {
        weekStartsOn: qoqStartDay,
      });
      let weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
      let qoqWeekEnd = endOfWeek(qoqCurrentDate, { weekStartsOn: 1 });
      // 生成本周的日期范围并循环
      while (isBefore(weekStart, endMoment)) {
        const diff = 7 - new Date(weekStart).getDay();
        const qoqDiff = 7 - new Date(qoqWeekStart).getDay();
        slots.push({
          xText: `${format(weekStart, 'yyyy-MM-dd')} ~ ${format(
            weekEnd,
            'yyyy-MM-dd'
          )}`,
          desc: `${format(weekStart, 'yyyy-MM-dd')} ~ ${format(
            weekEnd,
            'yyyy-MM-dd'
          )}`,
          value: Mock.Random.float(1, 99999, 2, 2),
        });
        // 计算环比数据（上一周的数据）
        history.push({
          xText: `${format(qoqWeekStart, 'yyyy-MM-dd')} ~ ${format(
            qoqWeekEnd,
            'yyyy-MM-dd'
          )}`,
          desc: `${format(qoqWeekStart, 'yyyy-MM-dd')} ~ ${format(
            qoqWeekEnd,
            'yyyy-MM-dd'
          )}`,
          value: Mock.Random.float(1, 99999, 2, 2),
        });

        // 将当前日期向后推移一周
        weekStart = addDays(weekStart, diff + 1);
        weekEnd = addDays(
          weekEnd,
          Math.min(7, differenceInDays(endMoment, weekEnd) + 1)
        );
        qoqWeekStart = addDays(qoqWeekStart, qoqDiff + 1);
        qoqWeekEnd = addDays(
          qoqWeekEnd,
          Math.min(7, differenceInDays(qoqEndMoment, qoqWeekEnd) + 1)
        );
      }
      break;
    case 'month':
      while (currentDate <= endMoment) {
        slots.push({
          xText: format(currentDate, 'yyyy-MM'),
          desc: format(currentDate, 'yyyy-MM'),
          value: Mock.Random.float(1, 99999, 2, 2),
        });
        history.push({
          xText: format(qoqCurrentDate, 'yyyy-MM'),
          desc: format(qoqCurrentDate, 'yyyy-MM'),
          value: Mock.Random.float(1, 99999, 2, 2),
        });
        currentDate = addMonths(currentDate, 1);
        qoqCurrentDate = addMonths(qoqCurrentDate, 1);
      }
      break;
    case 'quarter':
      qoqCurrentDate = subDays(currentDate, 365);
      while (currentDate <= endMoment) {
        slots.push({
          xText: `${currentDate.getFullYear()} Q${Math.ceil(
            (currentDate.getMonth() + 1) / 3
          )}`,
          desc: `${currentDate.getFullYear()} Q${Math.ceil(
            (currentDate.getMonth() + 1) / 3
          )}`,
          value: Mock.Random.float(1, 99999, 2, 2),
        });
        history.push({
          xText: `${qoqCurrentDate.getFullYear()} Q${Math.ceil(
            (qoqCurrentDate.getMonth() + 1) / 3
          )}`,
          desc: `${qoqCurrentDate.getFullYear()} Q${Math.ceil(
            (qoqCurrentDate.getMonth() + 1) / 3
          )}`,
          value: Mock.Random.float(1, 99999, 2, 2),
        });
        currentDate = addMonths(currentDate, 3);
        qoqCurrentDate = addMonths(qoqCurrentDate, 3);
      }
      break;
    default:
      break;
  }

  return { list: slots, history: history };
}

// 定义接口
router.get('/data', (req, res) => {
  const { start_date, end_date, granularity } = req.query;
  if (!start_date || !end_date || !granularity) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }
  try {
    // 生成时间段列表
    const list = generateTimeSlots(start_date, end_date, granularity);
    // 生成历史环比数据
    return res.json(
      responseJson(
        {
          ...list,
        },
        '获取数据成功',
        200
      )
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
