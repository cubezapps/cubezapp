class DataUri {
    static SettingFrame_CloseWindow = 'DataUri_SettingFrame_CloseWindow';
    static MainFrame_ShowWindow = 'DataUri_MainFrame_ShowWindow';
    static TrayIcon_UpdateTips = 'DataUri_TrayIcon_UpdateTips';
    static TrayIcon_LeftClick = 'DataUri_TrayIcon_LeftClick';
    static TrayIcon_RightClick = 'DataUri_TrayIcon_RightClick';
    static TrayIcon_HoverEnter = 'DataUri_TrayIcon_HoverEnter';
    static TrayIcon_HoverLeave = 'DataUri_TrayIcon_HoverLeave';
}

export const DataUriPlugin = {
  install (Vue) {
    Vue.prototype.$DataUri = DataUri
  }
}

export {
  DataUri as default
}
