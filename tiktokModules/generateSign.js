const crypto = require('crypto');
const axios = require('axios');

const url = require('url');

function generateSignature(
  requestUrl,
  secret,
  queryParams,
  headers = null,
  body = null
) {
  // Parse URL
  const parsedUrl = url.parse(requestUrl);

  // Extract the path from the URL
  let parameterStr = parsedUrl.pathname;

  // Remove 'sign' and 'access_token' from query parameters
  delete queryParams['sign'];
  delete queryParams['access_token'];
  queryParams['timestamp'] = Math.floor(Date.now() / 1000); // Get timestamp in seconds

  // Reorder parameters alphabetically by key
  const sortedQueryParams = Object.entries(queryParams).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  // Concatenate all parameters in the format {key}{value}
  sortedQueryParams.forEach(([key, values]) => {
    // `values` can be an array, use the first value
    parameterStr += `${key}${values}`;
  });

  // Check content type to determine if body should be appended
  const contentType = headers ? headers['Content-Type'] : null;
  if (
    contentType &&
    contentType.toLowerCase() !== 'multipart/form-data' &&
    body
  ) {
    // Append body if not multipart/form-data
    parameterStr += body;
  }

  // Wrap the generated string with the secret
  parameterStr = `${secret}${parameterStr}${secret}`;

  // Generate HMAC-SHA256 signature
  const sign = generateSha256(parameterStr, secret);

  // Add signature to query params
  queryParams['sign'] = sign;
  return queryParams;
}

function generateSha256(signatureParams, secret) {
  // Ensure the secret is a string before passing it to createHmac
  if (typeof secret !== 'string') {
    secret = String(secret); // Convert to string if it's not already
  }

  // Create HMAC-SHA256 hash
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(signatureParams);

  // Return the hexadecimal signature
  return hmac.digest('hex');
}

const BASE_URL = 'https://open-api.tiktokglobalshop.com';
const requestAxios = axios.create({
  baseURL: BASE_URL,
  retries: 3,
});
requestAxios.interceptors.request.use((config) => {
  return config;
});
requestAxios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    const data = error.response.data;
    return Promise.reject(data);
  }
);

const token =
  'ROW_GzJbKQAAAACjTpIPbP-RirJJImGDk8lAX00BSxwAbPsFl_InN-CINu0BWY-dN1500KhFsneA95eWMLaAoG5fyi4MXmVafKfJ34MXgBWkJ0DlApPweZghor9Jp8Lllaj1iyfCeY-kYkvAn8tzoXs9My0u6aViYsk4hflfyjky4E9KY2cy_3ZmgQ';
const appSecret = 'f6ea6bcb79fc7b3856d56819d924da746ff966c1';
const appKey = '6eaeffb0v95au';
const shopId = '7495861857294977070';
const shopCipher = 'TTP_P8n2AAAAAAAddjuez4-fqg4KkuVdOTv0';
// 获取单个商品
const getProductDetail = async () => {
  const path = `/api/products/details?access_token=${token}`;
  const queries = {
    version: '202306',
    app_key: appKey,
    product_id: '1730355322175590446',
    shop_id: shopId,
    shop_cipher: shopCipher,
    access_token: token,
  };

  const signature = generateSignature(path, appSecret, queries);
  try {
    const { data } = await requestAxios.get(path, {
      params: signature,
    });
    console.log(data.data);
  } catch (error) {
    console.log(error);
  }
};

// 获取店铺授权信息
const getShopAuth = async () => {
  const path = `/api/shop/get_authorized_shop?access_token=${token}`;
  const queries = {
    version: 202212,
    app_key: appKey,
    access_token: token,
  };

  const signature = generateSignature(path, appSecret, queries);
  try {
    const { data } = await requestAxios.get(path, {
      params: signature,
    });
    console.log(data.data);
  } catch (error) {
    console.log(error);
  }
};

// 获取订单信息
const getOrderList = async () => {
  let path = `/api/orders/search?access_token=${token}`;
  const queries = {
    version: 2022121,
    app_key: appKey,
    shop_cipher: shopCipher,
    access_token: token,
  };

  const signature = generateSignature(path, appSecret, queries);
  for (let key of Object.keys(signature)) {
    path += `&${key}=${signature[key]}`;
  }
  try {
    const { data } = await requestAxios.post(path, {
      page_size: 99,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

getOrderList();
