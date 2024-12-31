function responseJson(data = null, msg = '操作成功', code = 200) {
  return {
    code,
    msg,
    data,
  };
}

module.exports = { responseJson };
