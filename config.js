/* 汉筵观象 · 前端入口配置
 *
 * 「进入体验 / 立即体验 / 服务卡片」这些按钮会跳到这里的 backend 地址。
 * 换服务器、换隧道、换域名时，**只改这一行**，页面其它地方都不用动。
 *
 * 说明：静态页只做展示与跳转，登录、上传图片、出报告都在后端完成
 * （后端页面用安全 Cookie 与 CSRF 保护，静态页无法代替）。
 */
window.HANYAN_CONFIG = {
  // 后端入口（当前内测通道；换成服务器域名后改成 https://hanyan.zhangzhongwei.top）
  backend: "https://8c9fa9eb3c5971.lhr.life",

  // 新客户先注册；已有账号/兑换码的走登录
  enterPath: "/register",
  loginPath: "/login",

  // 接不上时的提示语（客服会发直连地址）
  fallbackTip: "体验入口正在维护，请找客服要一份最新链接。"
};
