# 配置文件使用说明

## 环境变量配置

### 1. 创建配置文件
复制 `.env.example` 文件为 `.env`：
```bash
cp .env.example .env
```

### 2. 修改配置项
根据实际需要修改 `.env` 文件中的配置项。

### 3. 重要配置项说明

#### 服务器配置
- `TEXAS_API_BASE_URL`: API 服务器地址，必须配置
- `TEXAS_API_TIMEOUT`: 请求超时时间，建议 30000ms
- `TEXAS_API_RETRY_COUNT`: 失败重试次数，建议 3 次

#### 安全配置
- `TEXAS_DEFAULT_PASSWORD`: 默认密码哈希，生产环境请修改
- `TEXAS_ENCRYPTION_KEY`: 数据加密密钥，生产环境必须设置

#### 性能配置
- `TEXAS_REQUEST_DELAY`: 请求间隔，避免频率限制
- `TEXAS_MAX_CONCURRENT_REQUESTS`: 并发请求数，根据服务器性能调整

### 4. 配置验证
程序启动时会自动验证配置的有效性，如有错误会提示具体问题。

### 5. 配置优先级
环境变量 > .env 文件 > 默认配置