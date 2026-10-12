# 汉筵观象 · GitHub 前端展示版

这是根据提供的 1312×1199 参考图制作的前端展示项目。

## 设计策略

- **桌面端（>760px）**：使用参考图作为精确视觉画布，因此在 1312px 设计宽度上可以保持像素级一致；导航、主按钮、服务卡片等区域覆盖真实可点击热点。
- **手机端（≤760px）**：重新使用同一套东方视觉语言构建真实响应式 DOM，并使用生成素材作为 Hero、卷轴、服务卡片与场景背景。
- “进入体验 / 立即体验 / 服务卡片”会打开前端体验弹窗；图片可本地预览。真实 AI 分析、支付和订单接口留待后端接入。

## 本地运行

项目不需要 npm，也不依赖外部 CDN。

最简单：直接双击 `index.html`。

若浏览器限制本地文件，可以运行：

```bash
python3 -m http.server 8080
```

然后打开 `http://localhost:8080`。

## GitHub Pages

1. 新建 GitHub 仓库。
2. 把本目录所有文件上传到仓库根目录。
3. GitHub → Settings → Pages。
4. `Build and deployment` 选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/ (root)`，保存。
6. 等待部署完成即可。

## 文件结构

```text
hanyan-observe-final/
├── index.html
├── styles.css
├── app.js
├── assets/
│   ├── reference-page.png
│   ├── hero-generated.png
│   ├── scroll-generated.png
│   ├── card-look.png
│   ├── card-simple.png
│   ├── card-detail.png
│   ├── card-judge.png
│   └── scene-generated.png
├── docs/
└── README.md
```

## 后续接后端的位置

在 `app.js` 中 `mockAnalyze` 的 click 事件里替换为你的真实 API 请求即可。
