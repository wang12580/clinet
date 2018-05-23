const axios = require('axios');
const qs = require('qs');
export function getEditFiles(obj, data) {
  let url = ''
  if (data[2] === 'user') {
    url = `http://${data[0]}:${data[1]}/edit/cda_user/`
  } else {
    url = `http://${data[0]}:${data[1]}/edit/cda_file?username=${data[3]}`
  }
  // const url = `http://${data[0]}:${data[1]}/edit/cda_file`
  axios({
    method: 'get',
    url: url,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('EDIT_SERVER_FILES', res.data.cda)
      if (data[2] === 'user') {
        obj.$store.commit('EDIT_SET_SERVER_TYPE', 'file');
      } else {
        obj.$store.commit('EDIT_SET_SERVER_TYPE', 'show');
      }
      obj.$store.commit('SET_NOTICE', res.data.info);
    } else {
      obj.$store.commit('EDIT_SERVER_FILES', [])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('EDIT_SERVER_FILES', [])
  })
}

export function getEdit(obj, data) {
  // 去除文件名中的.csv
  const file = data[2].split('-')
  let url = ''
  if (data[5] === 'upload') {
    url = '&type=create'
  }
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/edit/cda?filename=${file[1]}&username=${file[0]}${url}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    //
    if (res.status === 200) {
      obj.$store.commit('EDIT_LOAD_FILE', res.data)
      obj.$store.commit('EDIT_LOAD_FILE', res.data.cda)
      obj.$store.commit('SET_NOTICE', res.data.info);
      obj.$store.commit('EDIT_SET_LEFT_PANEL', 'table')
    } else {
      obj.$store.commit('EDIT_LOAD_FILE', [])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('EDIT_LOAD_FILE', [])
  })
}

export function saveEdit(obj, data) {
  const fileName = data[2]
  const content = data[3]
  const username = data[4]
  const doctype = data[6]
  const mouldtype = '模板'
  // let url = ''
  // if (data[5] === 1) {
  const url = `http://${data[0]}:${data[1]}/edit/cda`
  // } else {
  //   url = `http://${data[0]}:${data[1]}/edit/create_cda`
  // }
  axios({
    method: 'post',
    url: url,
    data: qs.stringify({ file_name: fileName, content: content[0], username: username, doctype: doctype, mouldtype: mouldtype }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      if (res.data.success) {
        obj.$store.commit('SET_NOTICE', res.data.info)
      } else {
        obj.$store.commit('SET_NOTICE', res.data.info)
      }
    } else {
      obj.$store.commit('SET_NOTICE', '保存失败')
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SET_NOTICE', '保存失败')
  })
}

export function getDocTypes(obj, data) {
  // const server = '127.0.0.1'
  // const port = '80'
  // const username = 'test7@hitb.com'
  const server = data[0]
  const port = data[1]
  const username = data[2]
  axios({
    method: 'get',
    url: `http://${server}:${port}/edit/mouldlist?username=${username}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('EDIT_SET_DOC_TYPES', res.data.resule)
      obj.$store.commit('SET_NOTICE', '模板列表查询成功')
    } else {
      obj.$store.commit('SET_NOTICE', '模板列表查询失败')
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SET_NOTICE', '模板列表查询失败')
  })
  obj.$store.commit('SET_NOTICE', '远程docType未查询')
  // obj.$store.commit('EDIT_SET_DOC_TYPES', '')
}
// getDocContent
export function getDocContent(obj, data) {
  // console.log(data);
  // const server = '127.0.0.1'
  // const port = '80'
  // const username = 'test7@hitb.com'
  // const filename = '入院申请.cdh'
  const server = data[0]
  const port = data[1]
  const username = data[2]
  const filename = data[3]
  axios({
    method: 'get',
    url: `http://${server}:${port}/edit/mouldfile?username=${username}&name=${filename}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      console.log(res.data.result);
      // obj.$store.commit('EDIT_SET_DOC_TYPES', res.data.resule)
      obj.$store.commit('SET_NOTICE', '模板内容查询成功')
    } else {
      obj.$store.commit('SET_NOTICE', '模板内容查询失败')
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SET_NOTICE', '模板内容查询失败')
  })
}

export function getHelpTypes(obj) {
  console.log(obj)
  obj.$store.commit('SET_NOTICE', '远程帮助未查询')
  // obj.$store.commit('EDIT_SET_HELP_TYPES', '')
}
