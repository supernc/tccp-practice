# ☁️ TCCP Practice - 腾讯云从业者认证刷题平台

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/GitHub%20Pages-deployed-222?logo=github&logoColor=white" alt="Deploy">
</p>

<p align="center">
  一站式 TCCP（Tencent Cloud Certified Practitioner）认证备考刷题平台，基于 TCCPWiki 知识库的 <b>268 道</b>高质量题目，覆盖考试全部 5 大章节。
</p>

<p align="center">
  <b>🔗 在线体验：</b> <a href="https://supernc.github.io/tccp-practice/">https://supernc.github.io/tccp-practice/</a>
  <br/>
  <b>📖 知识库：</b> <a href="https://angelsnow1129.github.io/TCCPWiki/">TCCPWiki</a>
</p>

---

## 📌 项目背景

本项目是 [TCCPWiki](https://github.com/angelsnow1129/TCCPWiki) 知识库的**配套刷题平台**。

[TCCPWiki](https://angelsnow1129.github.io/TCCPWiki/) 是一个系统整理腾讯云从业者认证（TCCP）考试知识点的开源 Wiki 项目，涵盖云架构基础、核心产品、架构实践、安全合规、迁移与成本管理等全部考试章节。本刷题平台的所有题目均基于 TCCPWiki 中的知识点编写，每道题都关联了对应的 Wiki 页面链接，实现了**「学 + 练」一体化**的备考体验。

**两个项目的关系：**

| 项目 | 定位 | 链接 |
|------|------|------|
| **TCCPWiki** | 📖 知识库（学习） | [angelsnow1129.github.io/TCCPWiki](https://angelsnow1129.github.io/TCCPWiki/) |
| **TCCP Practice** | ✍️ 刷题平台（练习） | [supernc.github.io/tccp-practice](https://supernc.github.io/tccp-practice/) |

> 💡 建议配合使用：先通过 TCCPWiki 学习知识点，再通过本平台刷题巩固。做题过程中遇到不会的，可以点击题目解析中的「查看 Wiki」链接直接跳转学习。

---

## ✨ 功能特性

### 🎯 核心刷题功能

| 功能 | 描述 |
|------|------|
| **📝 模拟考试** | 模拟真实考试环境，60 道题 / 90 分钟倒计时，自动评分（70 分及格） |
| **📚 章节练习** | 按 5 大章节、28 个子章节分类刷题，逐个击破 |
| **🔀 随机练习** | 从题库中随机抽题，巩固复习 |
| **❌ 错题本** | 自动收集做错的题目，支持重新练习 |
| **⭐ 收藏夹** | 一键收藏重点/疑难题目，随时回顾 |

### 📊 数据统计

| 功能 | 描述 |
|------|------|
| **📈 学习趋势** | 折线图展示每日答题量变化趋势 |
| **🗓️ 学习热力图** | GitHub 风格热力图，直观展示学习频率 |
| **🎯 能力雷达图** | 五大章节能力维度雷达图，定位薄弱环节 |
| **🔥 连续打卡** | 记录连续学习天数，激励坚持 |

### 🛠️ 实用工具

| 功能 | 描述 |
|------|------|
| **🔒 密码门禁** | 前端密码验证，保护题目内容（请联系管理员获取访问密码） |
| **💾 数据导出/导入** | 支持 JSON 文件导出/导入，跨设备迁移学习数据 |
| **🔄 智能去重合并** | 导入时自动去重，不会覆盖已有数据 |
| **🔗 Wiki 关联** | 每道题关联 TCCPWiki 知识点链接，做题 + 学习一体化 |

---

## 📋 题库概览

共 **268 道题**，覆盖 TCCP 认证考试全部考点：

| 章节 | 名称 | 考试占比 | 题目数 | 主要内容 |
|:----:|------|:-------:|:------:|---------|
| Ch1 | 云架构设计基础 | 4% | 20 | 云计算定义、服务模型（IaaS/PaaS/SaaS）、部署模型、架构设计原则 |
| Ch2 | 腾讯云核心产品与服务 | 55% | 150 | CVM、VPC、CLB、TKE、COS、CDN、CDB、TDSQL、Redis、消息队列等 17 个子章节 |
| Ch3 | 云架构设计实践 | 13.5% | 40 | 容灾架构、性能优化、应用容器化改造、AI 和大模型 |
| Ch4 | 云安全体系 | 14.5% | 32 | 等保 2.0、云安全标准、网络安全、计算安全 |
| Ch5 | 云迁移与成本管理 | 12.5% | 26 | 迁移方法论、迁移工具、FinOps 成本优化 |

> 💡 **题目质量**：所有题目基于 [TCCPWiki](https://angelsnow1129.github.io/TCCPWiki/) 知识库生成，覆盖 DPDK/GSLB、中间源/URL 鉴权、纠删码/智能分层、Log is Database、Slot/CKV 等核心知识点，单选/多选比例约 6:4，难度分布 easy:medium:hard ≈ 2:5:3。

---

## 🏗️ 系统架构设计

### 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                    用户浏览器（客户端）                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐  ┌───────────┐  ┌──────────┐             │
│  │ Password │  │  HashRouter│  │  Layout  │             │
│  │  Gate    │─▶│  (路由层)   │─▶│ (布局层)  │             │
│  └──────────┘  └───────────┘  └──────────┘             │
│        │              │              │                   │
│        ▼              ▼              ▼                   │
│  ┌─────────────────────────────────────────┐           │
│  │              Pages (页面层)               │           │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌───────┐  │           │
│  │  │ Home │ │ Exam │ │Pract.│ │Random │  │           │
│  │  └──────┘ └──────┘ └──────┘ └───────┘  │           │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌───────┐  │           │
│  │  │Wrong │ │ Fav. │ │Stats │ │ Data  │  │           │
│  │  └──────┘ └──────┘ └──────┘ └───────┘  │           │
│  └─────────────────────────────────────────┘           │
│        │              │              │                   │
│        ▼              ▼              ▼                   │
│  ┌─────────────────────────────────────────┐           │
│  │           Components (组件层)             │           │
│  │  QuestionCard │ OptionItem │ ExamTimer   │           │
│  │  AnalysisPanel│ HeatMap    │ RadarChart  │           │
│  └─────────────────────────────────────────┘           │
│        │              │              │                   │
│        ▼              ▼              ▼                   │
│  ┌────────────┐ ┌────────────┐ ┌───────────┐          │
│  │  Hooks     │ │  Services  │ │   Data    │          │
│  │ useExam    │ │ storage    │ │ questions │          │
│  │ usePractice│ │ examService│ │ chapters  │          │
│  │ useStats   │ │ statsServ. │ │ (JSON)    │          │
│  └────────────┘ └────────────┘ └───────────┘          │
│                       │                                 │
│                       ▼                                 │
│              ┌─────────────────┐                       │
│              │  localStorage   │                       │
│              │ (浏览器本地存储)  │                       │
│              └─────────────────┘                       │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    GitHub (服务端)                        │
│                                                         │
│  ┌──────────┐     ┌──────────────┐    ┌─────────────┐  │
│  │   main   │────▶│GitHub Actions │───▶│GitHub Pages │  │
│  │  branch  │push │  (CI/CD)     │build│  (静态托管) │  │
│  └──────────┘     └──────────────┘    └─────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 分层架构说明

本项目采用经典的 **分层架构**，职责清晰，便于维护：

| 层级 | 目录 | 职责 |
|------|------|------|
| **路由层** | `App.tsx` | HashRouter 路由配置，密码门控包裹 |
| **页面层** | `pages/` | 8 个页面组件，组合 Hooks 和 Components 实现业务逻辑 |
| **组件层** | `components/` | 可复用 UI 组件（布局、题目、考试、统计、通用） |
| **Hook 层** | `hooks/` | 自定义 React Hooks，封装状态管理逻辑（考试、练习、统计） |
| **服务层** | `services/` | 业务逻辑服务（存储读写、考试组卷、题目查询、统计计算） |
| **数据层** | `data/` | 静态题库 JSON + 章节元数据定义 |

### 数据流设计

```
用户操作 → Page → Hook (状态管理) → Service (业务逻辑) → Storage (localStorage)
                                          ↑
                                    Data (题库JSON)
```

- **单向数据流**：用户交互 → 状态更新 → UI 重渲染
- **持久化策略**：所有用户数据存储在 `localStorage`，key 为 `tccp-practice-data`
- **数据版本管理**：支持 `StorageData.version` 字段，便于后续数据结构升级迁移

### 关键设计决策

| 决策 | 选择 | 原因 |
|------|------|------|
| **路由方案** | `HashRouter` | 兼容 GitHub Pages 静态部署，无需服务端重定向配置 |
| **存储方案** | `localStorage` | 纯前端应用，无需后端服务，零运维成本 |
| **题库格式** | 静态 JSON | 打包进 JS Bundle，加载快、离线可用、版本可控 |
| **样式方案** | TailwindCSS | 原子化 CSS，开发效率高，Bundle 体积小 |
| **UI 主题** | 暗色科技风 | 深色背景 `#0D1117` + 蓝青渐变主色调，减少长时间刷题的视觉疲劳 |
| **部署方式** | GitHub Pages + Actions | 推送即部署，零成本，全自动 |

---

## 🛠️ 技术栈

### 前端框架

| 技术 | 版本 | 用途 |
|------|------|------|
| [React](https://react.dev/) | 18.3 | UI 框架 |
| [TypeScript](https://www.typescriptlang.org/) | 5.6 | 类型安全 |
| [Vite](https://vitejs.dev/) | 5.4 | 构建工具 + 开发服务器 |
| [React Router](https://reactrouter.com/) | 6.28 | 客户端路由（HashRouter） |

### UI & 样式

| 技术 | 版本 | 用途 |
|------|------|------|
| [TailwindCSS](https://tailwindcss.com/) | 3.4 | 原子化 CSS 框架 |
| [Lucide React](https://lucide.dev/) | 0.460 | SVG 图标库 |
| [React Icons](https://react-icons.github.io/) | 5.4 | 补充图标库 |
| [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) | - | 动画插件 |

### 数据可视化

| 技术 | 版本 | 用途 |
|------|------|------|
| [Recharts](https://recharts.org/) | 2.13 | 折线图、雷达图、热力图等图表 |

### 部署 & CI/CD

| 技术 | 用途 |
|------|------|
| [GitHub Actions](https://github.com/features/actions) | 自动化构建部署流水线 |
| [GitHub Pages](https://pages.github.com/) | 静态网站托管 |

---

## 📁 项目目录结构

```
tccp-practice/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions 自动部署配置
├── public/                          # 静态资源
├── src/
│   ├── main.tsx                     # 应用入口
│   ├── App.tsx                      # 根组件（路由 + 密码门控）
│   ├── index.css                    # 全局样式（滚动条/毛玻璃/渐变等）
│   ├── vite-env.d.ts                # Vite 类型声明
│   │
│   ├── types/
│   │   └── index.ts                 # 全局 TypeScript 类型定义
│   │
│   ├── data/                        # 📦 题库数据层
│   │   ├── index.ts                 # 题库统一导出 & 查询接口
│   │   ├── chapters.ts              # 章节元数据（名称/描述/Wiki链接）
│   │   └── questions/
│   │       ├── chapter1.json        # Ch1 云架构基础（20题）
│   │       ├── chapter2.json        # Ch2 核心产品与服务（150题）
│   │       ├── chapter3.json        # Ch3 架构设计实践（40题）
│   │       ├── chapter4.json        # Ch4 云安全体系（32题）
│   │       └── chapter5.json        # Ch5 迁移与成本管理（26题）
│   │
│   ├── services/                    # 🔧 业务服务层
│   │   ├── storage.ts               # localStorage 存储服务（含导入/导出/去重）
│   │   ├── examService.ts           # 考试服务（组卷/评分/判定）
│   │   ├── questionService.ts       # 题目查询服务（筛选/随机抽取）
│   │   └── statsService.ts          # 统计计算服务（正确率/趋势/分析）
│   │
│   ├── hooks/                       # 🪝 自定义 React Hooks
│   │   ├── useExam.ts               # 考试状态管理（倒计时/答题/提交）
│   │   ├── usePractice.ts           # 练习状态管理（章节/翻页/判题）
│   │   └── useStats.ts              # 统计数据 Hook
│   │
│   ├── pages/                       # 📄 页面组件
│   │   ├── HomePage.tsx             # 首页（仪表盘 + 快速入口）
│   │   ├── ExamPage.tsx             # 模拟考试页
│   │   ├── PracticePage.tsx         # 章节练习页
│   │   ├── RandomPage.tsx           # 随机刷题页
│   │   ├── WrongBookPage.tsx        # 错题本页
│   │   ├── FavoritesPage.tsx        # 收藏夹页
│   │   ├── StatsPage.tsx            # 学习统计页
│   │   └── DataManagePage.tsx       # 数据管理页（导出/导入）
│   │
│   └── components/                  # 🧩 可复用组件
│       ├── auth/
│       │   └── PasswordGate.tsx     # 密码门控组件
│       ├── layout/
│       │   ├── Layout.tsx           # 页面布局容器
│       │   ├── Header.tsx           # 顶部导航栏
│       │   └── Sidebar.tsx          # 侧边栏导航
│       ├── common/
│       │   ├── Button.tsx           # 通用按钮
│       │   ├── Badge.tsx            # 徽章/标签
│       │   ├── Modal.tsx            # 模态框
│       │   └── ProgressBar.tsx      # 进度条
│       ├── question/
│       │   ├── QuestionCard.tsx     # 题目卡片
│       │   ├── OptionItem.tsx       # 选项组件
│       │   ├── AnalysisPanel.tsx    # 解析面板（含 Wiki 链接）
│       │   └── QuestionNav.tsx      # 题目导航器
│       ├── exam/
│       │   ├── ExamResult.tsx       # 考试结果展示
│       │   ├── ExamTimer.tsx        # 考试倒计时器
│       │   └── ExamToolbar.tsx      # 考试工具栏
│       └── stats/
│           ├── HeatMap.tsx          # 学习热力图
│           ├── RadarChart.tsx       # 能力雷达图
│           ├── StatsCard.tsx        # 统计卡片
│           └── TrendChart.tsx       # 趋势折线图
│
├── package.json                     # 依赖管理
├── vite.config.ts                   # Vite 构建配置
├── tsconfig.json                    # TypeScript 配置
├── tailwind.config.js               # TailwindCSS 主题配置
├── postcss.config.js                # PostCSS 配置
└── index.html                       # HTML 入口
```

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18
- **npm** >= 9

### 本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/supernc/tccp-practice.git
cd tccp-practice

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 浏览器访问
# http://localhost:5173/tccp-practice/
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 自动部署

项目已配置 **GitHub Actions**，推送到 `main` 分支后会自动：

1. ✅ 安装依赖（`npm ci`）
2. ✅ 构建项目（`npm run build`）
3. ✅ 部署到 GitHub Pages

无需手动操作，push 即上线。

---

## 📖 使用指南

### 🔐 登录

访问网站后需要输入访问密码（默认 `tccp2025`），验证通过后进入系统。关闭浏览器标签页后需重新输入。

### 📝 模拟考试

1. 点击侧边栏「模拟考试」
2. 选择考试参数（题目数量、时间限制）
3. 开始答题，支持跳题和标记
4. 提交后查看成绩单（含各章节得分分析）

### 📚 章节练习

1. 点击侧边栏「章节练习」
2. 选择目标章节 / 子章节
3. 逐题练习，即时反馈对错 + 解析
4. 点击解析中的 Wiki 链接深入学习

### 💾 跨设备数据同步

1. **电脑 A**：侧边栏「数据管理」→ 点击「导出为 JSON 文件」
2. 通过微信 / 邮件 / U 盘传送文件
3. **电脑 B**：侧边栏「数据管理」→ 拖拽或点击导入文件
4. 系统自动合并去重，不会覆盖已有数据 ✅

---

## 🎨 UI 设计

### 主题色系

项目采用 **暗色科技风** 设计风格，适合长时间刷题使用：

| 用途 | 色值 | 预览 |
|------|------|------|
| 主色（蓝） | `#006EFF` | 🔵 |
| 辅色（青） | `#00C4B3` | 🟢 |
| 背景 L1 | `#0D1117` | ⬛ |
| 背景 L2 | `#161B22` | ⬛ |
| 背景 L3 | `#1C2333` | ⬛ |
| 成功 | `#2EA043` | 🟩 |
| 错误 | `#F85149` | 🟥 |
| 警告 | `#D29922` | 🟨 |

### 特效

- 🌟 卡片发光效果（hover 时蓝色光晕）
- 🪟 毛玻璃效果（半透明背景模糊）
- ✨ 渐变文字（蓝→青渐变标题）
- 🎬 入场动画（fade-in + slide-up）
- 💫 浮动动画（首页装饰元素）

---

## 🤝 参考资源

| 资源 | 链接 |
|------|------|
| TCCPWiki 知识库（本项目题目来源） | [angelsnow1129.github.io/TCCPWiki](https://angelsnow1129.github.io/TCCPWiki/) |
| TCCPWiki GitHub 仓库 | [github.com/angelsnow1129/TCCPWiki](https://github.com/angelsnow1129/TCCPWiki) |
| TCCP 认证官网 | [腾讯云认证](https://cloud.tencent.com/edu/certification) |
| 腾讯云文档 | [cloud.tencent.com/document](https://cloud.tencent.com/document/product) |

---

## 🙏 致谢

- 感谢 [TCCPWiki](https://github.com/angelsnow1129/TCCPWiki) 项目提供的系统化知识整理，本刷题平台的所有题目均基于其知识点编写
- 感谢腾讯云官方文档提供的产品技术资料

---

## 📄 License

本项目仅供学习交流使用，题目内容基于 [TCCPWiki](https://angelsnow1129.github.io/TCCPWiki/) 和公开的腾讯云产品文档整理。

---

<p align="center">
  <b>⭐ 如果这个项目对你的 TCCP 备考有帮助，欢迎 Star！</b>
</p>
