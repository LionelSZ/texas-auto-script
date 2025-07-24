# Texas Poker CLI 工具

## 简介

Texas Poker 是一个命令行界面(CLI)工具，用于自动化管理 Texas Poker 游戏账号相关操作。本工具提供了账号注册、登录验证、每日签到、领取福袋和低保等自动化功能，帮助用户便捷管理多个游戏账号。

## 功能特性

- 🔐 账号管理

  - 单个账号注册
  - 批量账号注册
  - 账号登录验证

- 📅 每日任务

  - 自动签到领取奖励
  - 自动领取福袋
  - 自动领取低保
  - 一键完成所有每日任务

- 🛠️ 实用工具
  - 彩色命令行界面
  - 账号数据本地存储
  - 批量任务执行与统计

## 安装

### 方法一：使用预编译可执行文件

直接下载项目中的`my-cli.exe`文件，双击运行即可使用。

### 方法二：从源码安装

1. 确保已安装 Node.js 环境(v16.0.0+)

2. 克隆仓库

```bash
git clone https://github.com/your-username/texas-auto-script.git
cd texas-auto-script
```

3. 安装依赖

```bash
npm install
```

4. 运行程序

```bash
npm start
```

## 使用方法

1. 启动程序后，将显示功能菜单
2. 根据菜单提示，输入对应的数字选择功能
3. 按照程序提示完成操作
4. 操作完成后可选择继续使用或退出程序

## 数据存储

所有注册的账号数据将以 JSON 格式保存在`outJson`目录下，文件名以日期命名。

## 技术栈

- Node.js
- 第三方库:
  - axios: 网络请求
  - chalk: 命令行着色
  - figlet: ASCII 艺术字
  - gradient-string: 渐变色文本
  - ora: 加载动画
  - cli-table3: 表格显示

## 许可证

ISC

MIT License

Copyright (c) 2025-present, VoidZero Inc. and texas-auto-script contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 免责声明

本工具仅供学习和研究使用，请勿用于任何违反相关服务条款的活动。使用本工具产生的任何后果由用户自行承担。

## 目录结构

```
texas-poker-cli/
├── src/                          # 源代码目录
│   ├── app/                      # 业务逻辑模块
│   │   ├── handlers/             # 业务处理器
│   │   │   ├── auth.js          # 认证相关（登录、注册）
│   │   │   ├── dailyTasks.js    # 日常任务（签到、福袋、低保）
│   │   │   └── index.js
│   │   └── index.js
│   ├── config/                   # 配置文件
│   │   ├── apiConfig.js
│   │   ├── appConfig.js
│   │   └── languageConfig.js
│   ├── core/                     # 核心功能
│   │   ├── cli.js               # CLI 主程序
│   │   └── batchProcessor.js    # 批处理核心
│   ├── utils/                    # 工具函数
│   │   ├── dataGenerator.js
│   │   ├── fileManager.js
│   │   ├── logger.js
│   │   ├── request.js
│   │   ├── uiDisplay.js
│   │   └── index.js
│   ├── types/                    # 类型定义（如果使用 TypeScript）
│   └── index.js                  # 程序入口
├── tests/                        # 测试文件
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── docs/                         # 文档
│   ├── api.md
│   ├── configuration.md
│   └── development.md
├── dist/                         # 构建输出
├── logs/                         # 日志文件
├── data/                         # 数据文件（原 outJson）
│   ├── accounts/
│   └── exports/
├── scripts/                      # 构建和部署脚本
├── .env.example                  # 环境变量示例
├── .gitignore
├── package.json
└── README.md
```
