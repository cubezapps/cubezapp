class DataUri {
    static MainFrame_ShowWindow = 'DataUri_MainFrame_ShowWindow';
    static App_CloseAllWindow = 'DataUri_App_CloseAllWindow';
    static SettingFrame_SetTaskbarIcon = 'DataUri_SettingFrame_SetTaskbarIcon';
    static APP_PopupMenuClick = 'DataUri_APP_PopupMenuClick';
    static APP_PopupMenu = 'DataUri_APP_PopupMenu';
    static APP_LanguageChange = 'DataUri_APP_LanguageChange';
    static SettingFrame_ShowWindow = 'DataUri_SettingFrame_ShowWindow';
    static MainFrame_ResetWindow = 'DataUri_MainFrame_ResetWindow';
    static CalendarFrame_ShowWindow = 'DataUri_CalendarFrame_ShowWindow';
    static ChatFrame_ShowWindow = 'DataUri_ChatFrame_ShowWindow';
    static ChatFrame_SetData = 'DataUri_ChatFrame_SetData';
    static ChatFrame_ItemClose = 'DataUri_ChatFrame_ItemClose';
}

export const DataUriPlugin = {
  install (Vue) {
    Vue.prototype.$DataUri = DataUri
  }
}

export {
  DataUri as default
}
