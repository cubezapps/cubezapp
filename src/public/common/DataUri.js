class DataUri {
    static SettingFrame_CloseWindow = 'DataUri_SettingFrame_CloseWindow';
    static MainFrame_ShowWindow = 'DataUri_MainFrame_ShowWindow';
    static App_CloseAllWindow = 'DataUri_App_CloseAllWindow';
}

export const DataUriPlugin = {
  install (Vue) {
    Vue.prototype.$DataUri = DataUri
  }
}

export {
  DataUri as default
}
