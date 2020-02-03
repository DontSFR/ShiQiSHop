import ajax from './ajax.js'

const install = function (Vue, opts = {}) {
  if (install.installed) return
  Vue.prototype.$ajax = ajax
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
};

export default {
  version: '1.0.0',
  install,
  ajax
}
