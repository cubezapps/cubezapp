class DataUri {
    static CloseWindow = 'DataUri_CloseWindow_SettingFrame';
    static ShowMainWindow = 'DataUri_ShowWindow_MainFrame';
}

export const DataUriPlugin = {
  install (Vue) {
    Vue.prototype.$DataUri = DataUri
  }
}

export {
  DataUri as default
}
