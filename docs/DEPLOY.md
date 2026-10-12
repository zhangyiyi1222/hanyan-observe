# GitHub Pages 部署

## 直接部署

1. 新建 GitHub 仓库。
2. 将 `hanyan-observe-final` 目录中的**所有文件和文件夹**上传到仓库根目录。
3. 打开 `Settings → Pages`。
4. `Build and deployment` 选择 `Deploy from a branch`。
5. 选择 `main` 分支，目录选择 `/ (root)`，保存。
6. 等待 GitHub Pages 完成部署。

本项目使用相对路径，不要求 npm、Node 或构建步骤。

## 本地预览

```bash
python3 -m http.server 8080
```

访问 `http://localhost:8080`。

## 自定义域名

在 GitHub Pages 设置中填写 Custom domain 即可。若使用自己的域名，按 GitHub 给出的 DNS 记录配置。
