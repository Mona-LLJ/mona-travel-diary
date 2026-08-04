# Mona 旅行日记 PWA

一个精心打造的旅行管理应用，支持 iPhone 主屏幕安装、GitHub 加密云同步。

## 📁 项目结构

```
mona-pwa/
├── index.html          # 主应用（单文件 HTML）
├── manifest.json       # PWA 清单
├── sw.js               # Service Worker（离线支持）
├── README.md           # 本文件
└── icons/
    ├── icon-180.png    # Apple Touch Icon (180×180)
    ├── icon-192.png    # PWA Icon (192×192)
    ├── icon-512.png    # PWA Icon (512×512)
    └── favicon-32.png  # 浏览器标签图标
```

## 🚀 部署到 GitHub Pages（让 iPhone 可访问）

### 第一步：创建 GitHub 账号（如已有请跳过）

1. 访问 https://github.com/signup
2. 注册免费账号

### 第二步：创建应用仓库（Public，用于托管应用）

1. 访问 https://github.com/new
2. Repository name: `mona-travel-diary`
3. 选择 **Public**（必须公开才能使用免费 GitHub Pages）
4. 勾选 "Add a README file"
5. 点击 "Create repository"

### 第三步：上传应用文件

将 `mona-pwa` 目录下的所有文件上传到仓库：

```bash
# 方法一：使用 Git 命令行
cd mona-pwa
git init
git remote add origin https://github.com/你的用户名/mona-travel-diary.git
git add .
git commit -m "🎉 Mona 旅行日记 PWA"
git branch -M main
git push -u origin main
```

或通过 GitHub 网页直接上传文件（Add file → Upload files）。

### 第四步：启用 GitHub Pages

1. 进入仓库的 **Settings** → **Pages**
2. Source 选择 **Deploy from a branch**
3. Branch 选择 **main** → **/(root)**
4. 点击 Save
5. 等待 1-2 分钟，访问 `https://你的用户名.github.io/mona-travel-diary/`

## 📱 iPhone 安装方法（PWA）

1. 用 **Safari** 打开应用网址（必须用 Safari，Chrome 不行）
2. 点击底部 **分享按钮** (⬆️ 图标)
3. 选择 **"添加到主屏幕"**
4. 点击 **"添加"**
5. 主屏幕出现 Mona 旅行日记图标，点击即可全屏使用

## ☁️ GitHub 数据云同步配置

### 第一步：创建数据仓库（Private，用于存储加密数据）

1. 访问 https://github.com/new
2. Repository name: `mona-travel-data`
3. 选择 **Private**（私有仓库，确保数据安全）
4. 点击 "Create repository"

### 第二步：生成 Personal Access Token

1. 访问 https://github.com/settings/tokens
2. 点击 **"Generate new token"** → **"Generate new token (classic)"**
3. Note: `Mona Travel Diary`
4. Expiration: 选择你需要的有效期
5. 勾选 **repo**（完整仓库访问）
6. 点击 "Generate token"
7. **立即复制 Token**（之后无法再看到）

### 第三步：在应用中配置

1. 打开应用 → **我的** → **GitHub 云同步**
2. 填写：
   - GitHub 用户名
   - Personal Access Token
   - 仓库名称：`mona-travel-data`
   - 加密密码（自定义，请牢记！）
   - 分支：`main`
3. 点击 **"保存配置"**
4. 点击 **"上传到 GitHub"** 开始首次同步

### 🔒 隐私保护机制

- **AES-256-GCM 加密**：所有数据在上传前使用你设置的密码加密
- **PBKDF2 密钥派生**：150,000 次迭代，防止暴力破解
- **Token 本地存储**：Token 仅保存在浏览器 localStorage，不上传到第三方
- **私有仓库**：建议数据仓库设为 Private
- **HTTPS 传输**：GitHub API 全程加密传输
- **无第三方服务**：不依赖任何第三方服务器，数据直接从你的浏览器到 GitHub

## 🔄 数据同步说明

- **手动同步**：在 GitHub 设置中点击"上传到 GitHub"或"从 GitHub 恢复"
- **自动同步**：开启自动同步后，每次保存数据后 5 秒自动上传
- **多设备同步**：在新设备上配置相同的 GitHub 信息和密码，点击"从 GitHub 恢复"
- **离线使用**：Service Worker 缓存应用，无网络也能使用，数据保存在本地

## ⚠️ 注意事项

1. **加密密码丢失**：如果忘记加密密码，云端数据将无法解密
2. **Token 过期**：Token 有有效期，过期后需重新生成
3. **GitHub Pages 缓存**：部署后可能需要 1-2 分钟生效
4. **iOS Safari**：必须使用 Safari 添加到主屏幕，其他浏览器不支持 PWA 安装
5. **存储限制**：localStorage 约 5-10MB，大量图片可能导致存储不足

## 🛠 技术栈

- 纯 HTML/CSS/JavaScript（无框架依赖）
- Leaflet.js（地图）
- Web Crypto API（加密）
- GitHub REST API v3（数据同步）
- Service Worker（离线支持）
- PWA Manifest（可安装）
- Open-Meteo API（天气）
