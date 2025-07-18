# MCP Manager 官方网站

这是 MCP Manager 项目的静态门户网站，用于介绍和推广这个浏览器扩展工具。

## 🌟 特性

- **响应式设计** - 适配桌面和移动设备
- **现代化界面** - 基于项目的设计语言
- **交互动画** - 流畅的用户体验
- **主题切换** - 支持明暗模式
- **性能优化** - 快速加载和渲染

## 📁 文件结构

```
website/
├── index.html          # 主页面
├── styles/
│   └── main.css        # 主样式文件
├── scripts/
│   └── main.js         # 主脚本文件
├── assets/
│   └── README.md       # 资源文件说明
└── README.md           # 本文件
```

## 🚀 部署

### 静态托管平台

这个网站可以部署到任何静态托管平台：

#### Vercel
1. 将 `website` 文件夹推送到 GitHub 仓库
2. 在 Vercel 中连接仓库
3. 设置构建目录为 `website`
4. 部署完成

#### Netlify
1. 将 `website` 文件夹拖拽到 Netlify 部署页面
2. 或通过 Git 连接自动部署

#### GitHub Pages
1. 将 `website` 文件夹内容推送到 `gh-pages` 分支
2. 在仓库设置中启用 GitHub Pages

#### 其他平台
- Cloudflare Pages
- Firebase Hosting
- AWS S3 + CloudFront

### 本地预览

使用任何静态文件服务器：

```bash
# 使用 Python
cd website
python -m http.server 8000

# 使用 Node.js (http-server)
npx http-server website

# 使用 Live Server (VS Code 扩展)
# 右键 index.html -> Open with Live Server
```

## 🎨 自定义

### 颜色主题
在 `styles/main.css` 的 `:root` 选择器中修改 CSS 变量：

```css
:root {
    --primary: #3b82f6;        /* 主色调 */
    --primary-hover: #2563eb;  /* 主色调悬停 */
    /* ... 其他颜色变量 */
}
```

### 内容更新
- 修改 `index.html` 中的文本内容
- 更新链接地址（GitHub、下载链接等）
- 替换 `assets/` 文件夹中的图片

### 功能扩展
- 在 `scripts/main.js` 中添加新的交互功能
- 在 `styles/main.css` 中添加新的样式

## 📋 待办事项

- [ ] 添加实际的下载链接
- [ ] 集成 Google Analytics
- [ ] 添加多语言支持
- [ ] 优化 SEO 元数据
- [ ] 添加更多交互动画
- [ ] 集成用户反馈系统

## 🔧 技术栈

- **HTML5** - 语义化标记
- **CSS3** - 现代样式和动画
- **Vanilla JavaScript** - 原生 JS，无依赖
- **CSS Grid & Flexbox** - 响应式布局
- **CSS Custom Properties** - 主题系统

## 📱 浏览器支持

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进网站：

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 📄 许可证

与主项目相同，使用 MIT 许可证。

---

Made with ❤️ by 林仔
