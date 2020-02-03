import axios from 'axios'
let formType = {
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

function Ajax (opt) {
  console.log('opt',opt)
  if (opt.isFormData) {
    opt = {
      ...opt,
      ...formType
    }
  }
  return axios({
    ...opt,
    validateStatus: function (status) {
      return status === 200
    },
    timeout: 30000
  }).then((response) => {
    return Promise.resolve(response.data)
  }).catch((error) => {
    console.log(`请求失败!${error}`)
    this.$Notice.open({
      title: '错误信息',
      desc: error
    })
    return Promise.reject(error)
  })
}
export default Ajax
