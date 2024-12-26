function responseJson(datas = null, msg = '操作成功', code = 200) {
  return {
    code,
    msg,
    datas,
  };
}

module.exports = { responseJson };
