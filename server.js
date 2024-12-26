const express = require('express');
const cors = require('cors');
const userRouter = require('./modules/user');
const routerRouter = require('./modules/router');
const v1Router = require('./modules/v1Router');

const port = 3332;
const app = express();

// 跨域
app.use(cors());

// 解析请求体
app.use(express.json());

app.use('/v1', v1Router);

// app.use('/v1/users', userRouter);

// app.use('/v1/router', routerRouter);

// app.get('/v1/users/me', async (req, res) => {
//   return res.json({
//     code: 200,
//     datas: {
//       user_id: '5336035ec79649dfa34c98e7982294d8',
//       role_id: '92195e699723430bbf026fdfec32a02a',
//       user_name: 'ALT-064-钟兆立',
//       department_id: 'c2a7a7dc1e96432995e06449036e1b5d',
//       department_name: 'IT部',
//       role_name: '前端工程师',
//       access_code: 10,
//       exp: 1735615792,
//       authorization: token,
//       last_login: '2024-12-24T11:22:37',
//       update_time: '2024-12-24T11:22:37',
//       subordinate_user_id:
//         "('5336035ec79649dfa34c98e7982294d8', '0923e40faf344d1db48399002add84d7', '0c58224ce1eb4d7a83588193fce08781', '1', '12382cf7288c4a33a94a88fcdbab7d07', '1385f2e75a1645ffb985cb0144fb969e', '13ed1376436f4584b263c0132319d352', '1445fc6b0a764df8968da09f99aa4b3f', '15120e2820c54497b09abff434f92c15', '1a45ef84fffa4dfc99da775186dd8f4f', '23059021c21a4d6aa4a28959ba47f8ea', '2f89580ce9724705b1eab5bf4b88e434', '2fe04e5b1ce740d5b18bb8d80346ae77', '3340d558a0cd4815bc86b70ace6d0c84', '33bad489b2694ab7979e89b9940ec20f', '43cb877b060c4c8c99db10295e1d613e', '4e175abc25544ed8bf204c2ddceb29ea', '4fd3c4d71adf42bfbc33ed0c3378f503', '5336035ec79649dfa34c98e7982294d8', '58c57832880744e9ba6a0fff6e5e514e', '5b7eba1704c74d0c8a0d35cb76104987', '727a4ed6c753432db8802435733dba49', '756e891c037e4a908da8338004d679d3', '7e20aa87aadf4de48a52d7b517365e27', '7f461c58a487455e8bdd8fc11cbb8d79', '887cce0d87ea4399972318c5268dce2b', '8f11aab48b9a4130afddb40aff44f4e6', '8f3e2961ac054e9984c4fa5865b4b063', 'a1b322ca035e474e8a7ff24a9087b452', 'b1ed3e795fbf428180cbde8bb8dba6b5', 'b2b595d628324f889cade4974c5d971f', 'b76de84da47b4dc9916431c70154c6e3', 'bdbe72b7a90d4bc2bd5eb09d8ff1e6d1', 'ca19472599b145b0ae64948b37eb9ec8', 'cc63a24a232f4670a9ef6ba7ea0b653c', 'd4978c1ad40e412db909a33d034b5371', 'd7195092a0874d4f8e8dd44c2020da41', 'e3aa3ca1aa5e4aabbec3b6ced3382345', 'ecaff7ad12fb47dbbbe0a18993f43e36', 'f27f71447f64445dbed3861d337cc3fd', 'f33518c2c6b746519f292cef277b0e4f', 'f62464f22ea84036b1dc4f88d8b955e2')",
//       permissions: [
//         'keywordMonitor:keyword:download',
//         'keywordMonitor:product:delete',
//         'walmart:product:editLog',
//         'keywordMonitor:keyword:delete',
//         'dataMonitor:followSalesMonitor:delete',
//         'dataMonitor:itemMonitor:delete',
//         'walmart:product:edit',
//       ],
//     },
//   });
// });

// app.get('/v1/router/list/user/access/tree', async (req, res) => {
//   return res.json({
//     code: 200,
//     datas: { data: routes },
//   });
// });

// app.get('/v1/users/list', async (req, res) => {
//   return res.json({
//     code: 200,
//     datas: {
//       total: 3,
//       data: [
//         {
//           id: 1,
//           user_id: '1',
//           user_name: 'ALT-025-郑书源',
//           department_id: 'c2a7a7dc1e96432995e06449036e1b5d',
//           workwx_user_id: 'e4d0b6a950d359f86c363bbe8123750a',
//           is_delete: 0,
//           last_login: '2024-12-02 18:26:03',
//           update_time: '2024-12-02 18:26:03',
//           role_id: '61a197a16eb6488f9b3f8c180cbb6d2d',
//           role_name: '管理员',
//         },
//         {
//           id: 2,
//           user_id: '5336035ec79649dfa34c98e7982294d8',
//           user_name: 'ALT-064-钟兆立',
//           department_id: 'c2a7a7dc1e96432995e06449036e1b5d',
//           workwx_user_id: 'ZhongZhaoLi',
//           is_delete: 0,
//           last_login: '2024-12-24 11:45:34',
//           update_time: '2024-12-24 11:45:34',
//           role_id: '92195e699723430bbf026fdfec32a02a',
//           role_name: '前端工程师',
//         },
//         {
//           id: 3,
//           user_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           user_name: 'ALT-002-徐泽群',
//           department_id: 'b162768db884407783d79b4c0059d5e4',
//           workwx_user_id: 'zenuq',
//           is_delete: 0,
//           last_login: '2024-12-04 14:46:53',
//           update_time: '2024-12-04 14:46:53',
//           role_id: '61a197a16eb6488f9b3f8c180cbb6d2d',
//           role_name: '管理员',
//         },
//       ],
//     },
//   });
// });

// app.get('/v1/role/list', async (req, res) => {
//   return res.json({
//     code: 200,
//     datas: {
//       total: 15,
//       data: [
//         {
//           id: 1,
//           role_id: 'a341c9ba47044ee09f981f1f068fd21f',
//           role_name: 'IT',
//           is_delete: 0,
//           creator_id: 'e3aa3ca1aa5e4aabbec3b6ced3382345',
//           create_time: '2024-10-11 17:54:21',
//           updator_id: '5336035ec79649dfa34c98e7982294d8',
//           update_time: '2024-10-12 09:48:28',
//         },
//         {
//           id: 2,
//           role_id: 'd2189d6b07ac40b981ca0f3d89219116',
//           role_name: '开发',
//           is_delete: 0,
//           creator_id: 'e3aa3ca1aa5e4aabbec3b6ced3382345',
//           create_time: '2024-10-11 17:55:01',
//           updator_id: 'e3aa3ca1aa5e4aabbec3b6ced3382345',
//           update_time: '2024-10-11 17:55:01',
//         },
//         {
//           id: 3,
//           role_id: '824db01c812d42d2b305eac5504df9b2',
//           role_name: '采购',
//           is_delete: 0,
//           creator_id: 'e3aa3ca1aa5e4aabbec3b6ced3382345',
//           create_time: '2024-10-11 17:58:21',
//           updator_id: 'e3aa3ca1aa5e4aabbec3b6ced3382345',
//           update_time: '2024-10-11 17:58:21',
//         },
//         {
//           id: 4,
//           role_id: '352cd3f4ef9443159a3fdde93299afb9',
//           role_name: '设计',
//           is_delete: 0,
//           creator_id: 'e3aa3ca1aa5e4aabbec3b6ced3382345',
//           create_time: '2024-10-11 18:25:14',
//           updator_id: 'e3aa3ca1aa5e4aabbec3b6ced3382345',
//           update_time: '2024-10-11 18:31:35',
//         },
//         {
//           id: 9,
//           role_id: 'd86984e84af2440583736bf6bb0bb128',
//           role_name: 'HR',
//           is_delete: 0,
//           creator_id: 'e3aa3ca1aa5e4aabbec3b6ced3382345',
//           create_time: '2024-10-12 09:38:58',
//           updator_id: 'e3aa3ca1aa5e4aabbec3b6ced3382345',
//           update_time: '2024-10-12 09:38:58',
//         },
//         {
//           id: 10,
//           role_id: '261c3f85ec3a462cb6826db07d77202a',
//           role_name: '财务',
//           is_delete: 0,
//           creator_id: 'e3aa3ca1aa5e4aabbec3b6ced3382345',
//           create_time: '2024-10-12 09:39:17',
//           updator_id: 'e3aa3ca1aa5e4aabbec3b6ced3382345',
//           update_time: '2024-10-12 09:42:54',
//         },
//         {
//           id: 11,
//           role_id: '61a197a16eb6488f9b3f8c180cbb6d2d',
//           role_name: '管理员',
//           is_delete: 0,
//           creator_id: 'e3aa3ca1aa5e4aabbec3b6ced3382345',
//           create_time: '2024-10-12 09:42:41',
//           updator_id: 'e3aa3ca1aa5e4aabbec3b6ced3382345',
//           update_time: '2024-10-12 09:42:41',
//         },
//         {
//           id: 12,
//           role_id: '4cffe1a3051f472c9d6e3a3e4d446787',
//           role_name: '沃尔玛运营',
//           is_delete: 0,
//           creator_id: '5336035ec79649dfa34c98e7982294d8',
//           create_time: '2024-10-12 09:49:52',
//           updator_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           update_time: '2024-10-15 17:31:01',
//         },
//         {
//           id: 14,
//           role_id: 'b819829a21184cc096dfdbb50ba6d508',
//           role_name: '部门经理',
//           is_delete: 0,
//           creator_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           create_time: '2024-10-15 17:31:29',
//           updator_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           update_time: '2024-10-15 17:31:29',
//         },
//         {
//           id: 15,
//           role_id: 'dd80b619433244e6b28f8c2230090f5e',
//           role_name: 'Tiktok运营',
//           is_delete: 0,
//           creator_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           create_time: '2024-10-22 02:16:18',
//           updator_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           update_time: '2024-10-22 02:16:18',
//         },
//         {
//           id: 16,
//           role_id: '6e9d30b7c21c4e5f877999a32a26f7ac',
//           role_name: '亚马逊运营',
//           is_delete: 0,
//           creator_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           create_time: '2024-10-27 23:55:00',
//           updator_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           update_time: '2024-10-27 23:55:00',
//         },
//         {
//           id: 17,
//           role_id: 'de1f293c77eb436c858b4153dad5d68a',
//           role_name: '多平台运营',
//           is_delete: 0,
//           creator_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           create_time: '2024-10-27 23:58:18',
//           updator_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           update_time: '2024-10-27 23:58:18',
//         },
//         {
//           id: 18,
//           role_id: '4d08c293f6eb42c6878f4eb963c342ba',
//           role_name: '爬虫工程师',
//           is_delete: 0,
//           creator_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           create_time: '2024-10-31 11:25:33',
//           updator_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           update_time: '2024-10-31 11:25:33',
//         },
//         {
//           id: 19,
//           role_id: '049f6164f75b47f7beddd92f2857f3c4',
//           role_name: '后端工程师',
//           is_delete: 0,
//           creator_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           create_time: '2024-11-04 16:12:21',
//           updator_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           update_time: '2024-11-04 16:12:21',
//         },
//         {
//           id: 20,
//           role_id: '92195e699723430bbf026fdfec32a02a',
//           role_name: '前端工程师',
//           is_delete: 0,
//           creator_id: '5336035ec79649dfa34c98e7982294d8',
//           create_time: '2024-11-18 11:26:03',
//           updator_id: '5336035ec79649dfa34c98e7982294d8',
//           update_time: '2024-11-18 11:26:08',
//         },
//       ],
//     },
//   });
// });

// app.get('/v1/router/list/tree', async (req, res) => {
//   return res.json({
//     code: 200,
//     datas: routes,
//   });
// });

// app.get('/v1/walmart/shop/list', async (req, res) => {
//   return res.json({
//     code: 200,
//     datas: {
//       total: 3,
//       data: [
//         {
//           id: 1,
//           user_id: '1',
//           shop_name: '星与-沃尔玛-花仙兽',
//           shop_id: '101133243',
//           partner_id: '10001152604',
//           client: 'f4d590d9-6e39-4e6f-83c1-8500001b9f79',
//           client_secret:
//             'ANoqsFJVBJ4S19hQcgVvZ4zfRFthA6DkMPzXn96JPfbsho28-W2gpqXQ7WuoPzn3-jeHh-YqzHHAl_LESapvb_k',
//           create_time: '2024-06-11 14:33:23',
//           update_time: '2024-06-11 14:33:23',
//           balance: '3935.69',
//           balance_update_time: '2024-12-23 18:54:15',
//         },
//         {
//           id: 4,
//           user_id: '1',
//           shop_name: '星与-沃尔玛-M BUDER',
//           shop_id: '101229985',
//           partner_id: '10001249345',
//           client: '5555b8b8-d493-4e38-b561-8bd66d535f0a',
//           client_secret:
//             'AOPjtl9sB2aWTZ6pOdObZz7vrGBI8_i1cPutTxfa4cz59V_98RKqQ_qiB6mETBVDZHHChA5VmlWavdN4hdiylL8',
//           create_time: '2024-06-11 14:33:23',
//           update_time: '2024-06-11 14:33:23',
//           balance: '26495.90',
//           balance_update_time: '2024-12-23 21:46:22',
//         },
//         {
//           id: 5,
//           user_id: '1',
//           shop_name: '星乘-沃尔玛-NFTIGB',
//           shop_id: '101190566',
//           partner_id: '10001209927',
//           client: '55814f3a-2c02-4fde-ba81-bd8cd2eb9016',
//           client_secret:
//             'APJG0tA7XlhfHgN9ANQxnCjMmPqO0x1FnLLXs197xwXhJ-HPytR55fXNitlvD8WbilgB3nKs6cILPU8EZJ4Ce9U',
//           create_time: '2024-06-11 14:33:23',
//           update_time: '2024-06-11 14:33:23',
//           balance: '47178.09',
//           balance_update_time: '2024-12-23 21:51:31',
//         },
//       ],
//     },
//   });
// });

// app.get('/tk/shops/list', async (req, res) => {
//   return res.json({
//     code: 200,
//     datas: {
//       total: 3,
//       data: [
//         {
//           id: 18,
//           shop_id: '7495574349119982318',
//           seller_name: 'Madala-US',
//           create_time: '2024-07-31 11:13:08',
//           local_name: 'Shoes',
//         },
//         {
//           id: 19,
//           shop_id: '7495856113814506122',
//           seller_name: 'Youyun-us1',
//           create_time: '2024-08-01 11:31:50',
//           local_name: 'Beauty \u0026 Personal Care',
//         },
//         {
//           id: 20,
//           shop_id: '7495862752828426608',
//           seller_name: 'Zudunnn',
//           create_time: '2024-08-01 11:35:11',
//           local_name: 'Furniture',
//         },
//       ],
//     },
//   });
// });

// app.get('/v1/logs/list', async (req, res) => {
//   return res.json({
//     code: 200,
//     datas: {
//       total: 10,
//       data: [
//         {
//           id: 125579,
//           user_id: '1',
//           user_name: 'ALT-025-郑书源',
//           user_ip: '127.0.0.1',
//           position: '未知',
//           req_path: '/v1/walmart_api/all_sucscription',
//           req_method: 'GET',
//           req_content: '查询日志列表',
//           router_tags: 'walmart api',
//           resp_time: 1242,
//           resp_code: 200,
//           is_delete: 0,
//           create_time: '2024-12-24 14:34:20',
//         },
//         {
//           id: 125576,
//           user_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           user_name: 'ALT-002-徐泽群',
//           user_ip: '183.11.71.147',
//           position: '未知',
//           req_path: '/v1/walmart/user/shop/list',
//           req_method: 'GET',
//           req_content: '查询已授权的用户店铺',
//           router_tags: 'walmart',
//           resp_time: 10,
//           resp_code: 200,
//           is_delete: 0,
//           create_time: '2024-12-24 14:34:15',
//         },
//         {
//           id: 125577,
//           user_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           user_name: 'ALT-002-徐泽群',
//           user_ip: '183.11.71.147',
//           position: '未知',
//           req_path: '/v1/walmart/items/list',
//           req_method: 'GET',
//           req_content: '查询 walmart items',
//           router_tags: 'walmart, walmart, items',
//           resp_time: 86,
//           resp_code: 200,
//           is_delete: 0,
//           create_time: '2024-12-24 14:34:15',
//         },
//         {
//           id: 125578,
//           user_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           user_name: 'ALT-002-徐泽群',
//           user_ip: '183.11.71.147',
//           position: '未知',
//           req_path: '/v1/walmart/items/line/list',
//           req_method: 'GET',
//           req_content: '查询 walmart item 品线列表',
//           router_tags: 'walmart, walmart, items',
//           resp_time: 93,
//           resp_code: 200,
//           is_delete: 0,
//           create_time: '2024-12-24 14:34:15',
//         },
//         {
//           id: 125575,
//           user_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           user_name: 'ALT-002-徐泽群',
//           user_ip: '183.11.71.147',
//           position: '未知',
//           req_path: '/v1/walmart/order/recon/date/list',
//           req_method: 'GET',
//           req_content: '查询沃尔玛周期订单侦察所有日期（根据店铺）',
//           router_tags: 'walmart, walmart, wfs',
//           resp_time: 10,
//           resp_code: 200,
//           is_delete: 0,
//           create_time: '2024-12-24 14:33:43',
//         },
//         {
//           id: 125574,
//           user_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           user_name: 'ALT-002-徐泽群',
//           user_ip: '183.11.71.147',
//           position: '未知',
//           req_path: '/v1/walmart/user/shop/list',
//           req_method: 'GET',
//           req_content: '查询已授权的用户店铺',
//           router_tags: 'walmart',
//           resp_time: 11,
//           resp_code: 200,
//           is_delete: 0,
//           create_time: '2024-12-24 14:33:43',
//         },
//         {
//           id: 125573,
//           user_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           user_name: 'ALT-002-徐泽群',
//           user_ip: '183.11.71.147',
//           position: '未知',
//           req_path: '/v1/walmart/order/recon/sku/list',
//           req_method: 'GET',
//           req_content: '查询沃尔玛周期订单侦察列表(SKU维度)',
//           router_tags: 'walmart, walmart, wfs',
//           resp_time: 1568,
//           resp_code: 200,
//           is_delete: 0,
//           create_time: '2024-12-24 14:33:43',
//         },
//         {
//           id: 125572,
//           user_id: '1',
//           user_name: 'ALT-025-郑书源',
//           user_ip: '127.0.0.1',
//           position: '未知',
//           req_path: '/v1/walmart_api/all_sucscription',
//           req_method: 'GET',
//           req_content: '查询日志列表',
//           router_tags: 'walmart api',
//           resp_time: 1456,
//           resp_code: 200,
//           is_delete: 0,
//           create_time: '2024-12-24 14:31:50',
//         },
//         {
//           id: 125571,
//           user_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           user_name: 'ALT-002-徐泽群',
//           user_ip: '183.11.71.147',
//           position: '未知',
//           req_path: '/v1/users/list',
//           req_method: 'GET',
//           req_content: '查询用户列表',
//           router_tags: 'users',
//           resp_time: 9,
//           resp_code: 200,
//           is_delete: 0,
//           create_time: '2024-12-24 14:29:53',
//         },
//         {
//           id: 125570,
//           user_id: '2fe04e5b1ce740d5b18bb8d80346ae77',
//           user_name: 'ALT-002-徐泽群',
//           user_ip: '183.11.71.147',
//           position: '未知',
//           req_path: '/v1/role/list',
//           req_method: 'GET',
//           req_content: '查询角色列表',
//           router_tags: 'role',
//           resp_time: 6,
//           resp_code: 200,
//           is_delete: 0,
//           create_time: '2024-12-24 14:29:46',
//         },
//       ],
//     },
//   });
// });

// app.get('/v1/qiniu/temp/token', async (req, res) => {
//   return res.json({
//     code: 200,
//     msg: 'success',
//     datas:
//       'B3z8OhYWgUIDQ9r2uMB8Y_BVAWkbVuUfIT91m3E3:_V0ZAGegeE8CRF9EuSw_gQP5ggM=:eyJzY29wZSI6ImFsdC1hbWF6b24taW1nIiwiZGVhZGxpbmUiOjE3MzUwODkyODB9',
//   });
// });

// 启动服务器
app.listen(port, () => {
  console.log(`API Server listening at port ${port}`);
});
