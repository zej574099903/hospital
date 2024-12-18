# 无纸化病例管理系统

基于 Vue3 + TypeScript + Element Plus + Vite 的无纸化病例管理系统，提供病例的电子化管理、电子签名和文档上传功能。

## 功能特点

- 病例管理：支持病例的新增、查看、编辑、删除和归档
- 文档上传：支持病例相关文档的电子化上传和管理
- 电子签名：支持医生和患者的电子签名功能
- 智能搜索：支持按多个维度搜索病例信息
- 状态追踪：实时显示病例处理状态
- 安全可靠：采用安全的数据存储和传输机制

## 技术栈

- 前端框架：Vue 3
- 开发语言：TypeScript
- UI 组件库：Element Plus
- 构建工具：Vite
- 代码规范：ESLint + Prettier
- 样式处理：TailwindCSS
- 包管理器：pnpm

## 开发环境要求

- Node.js >= 16
- pnpm >= 8

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 项目结构

```
src/
├── views/                # 页面组件
│   └── paperless-case/   # 病例管理模块
├── components/           # 公共组件
├── router/              # 路由配置
├── store/               # 状态管理
├── utils/               # 工具函数
└── assets/              # 静态资源
```

## 环境变量配置

项目支持多环境配置：

- `.env`: 默认环境变量
- `.env.development`: 开发环境变量
- `.env.production`: 生产环境变量
- `.env.staging`: 预发布环境变量

## 贡献指南

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/xxx`
3. 提交更改：`git commit -m 'Add xxx feature'`
4. 推送分支：`git push origin feature/xxx`
5. 提交 Pull Request

## 许可证

[MIT License](./LICENSE)