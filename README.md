# Medical-service-system-based-on-machine-learning-and-SpringBoot

## 项目简介

本项目是一个集成了Python数据处理与分析、SpringBoot后端服务、Vue前端展示以及微信小程序客户端的全方位智慧医疗服务平台。旨在通过先进的机器学习技术，为用户提供症状预测、心脏病风险评估等健康管理服务，并通过多端应用，实现便捷的就医流程与高效的医疗资源管理。

## 目录结构

- `server/` - SpringBoot后端服务代码
  - 包含科室管理、药品管理、医生管理、用户管理、预约挂号管理等RESTful API接口。
- `pythonProject/` - Python数据处理与机器学习模型
  - 实现京东爬虫，症状到疾病的预测模型，以及基于个人健康信息的心脏病风险评估模型。
- `vue/` - Vue前端项目
  - 前端管理系统，为医院工作人员提供科室、药品、医生等信息的维护界面。
- `miniapp/` - 微信小程序前端项目
  - 面向用户的移动端应用，支持预约挂号、查询药品信息、进行疾病预测等。

## 技术栈

- **后端**：SpringBoot、MyBatis、MySQL
- **前端**：Vue.js、Element UI
- **小程序**：微信开发者工具、uni-app
- **数据处理与机器学习**：Python、Scikit-learn、Pandas

## 快速开始

### 环境准备

确保已安装Java、Node.js、Python环境，并配置好微信开发者工具。

### 后端服务启动

1. 进入`server/`目录，使用IDE或命令行运行SpringBoot应用。
2. 根据`application.yml`配置数据库连接。

### 前端开发与构建

1. 进入`vue/`，运行`npm install`安装依赖。
2. 使用`npm run serve`启动Vue开发服务器。
3. 对于生产环境，执行`npm run build`构建静态资源。

### 微信小程序开发

1. 打开微信开发者工具，导入`miniapp/`目录下的项目。
2. 调整配置以匹配你的微信小程序AppID。
3. 修改app.js文件中的baseurl为后端IP地址。
4. 开发、预览与提交审核。
