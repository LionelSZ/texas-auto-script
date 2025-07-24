import fs from 'fs';
import path from 'path';

/**
 * 环境变量加载器
 */
export class EnvLoader {
  /**
   * 加载 .env 文件
   * @param {string} envPath - .env 文件路径
   */
  static load(envPath = '.env') {
    try {
      if (!fs.existsSync(envPath)) {
        console.log(`环境变量文件 ${envPath} 不存在，使用默认配置`);
        return;
      }

      const envContent = fs.readFileSync(envPath, 'utf8');
      const lines = envContent.split('\n');

      for (const line of lines) {
        const trimmedLine = line.trim();
        
        // 跳过注释和空行
        if (!trimmedLine || trimmedLine.startsWith('#')) {
          continue;
        }

        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim();
          
          // 移除引号
          const cleanValue = value.replace(/^["']|["']$/g, '');
          
          // 只有当环境变量不存在时才设置
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = cleanValue;
          }
        }
      }

      console.log(`✅ 环境变量文件 ${envPath} 加载成功`);
      // clear console
      console.clear();
    } catch (error) {
      console.error(`❌ 加载环境变量文件失败: ${error.message}`);
    }
  }

  /**
   * 验证必需的环境变量
   * @param {string[]} requiredVars - 必需的环境变量列表
   */
  static validateRequired(requiredVars = []) {
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
      console.error(`❌ 缺少必需的环境变量: ${missing.join(', ')}`);
      console.error('请检查 .env 文件或设置相应的环境变量');
      process.exit(1);
    }
  }

  /**
   * 获取环境变量值，支持类型转换
   * @param {string} key - 环境变量名
   * @param {any} defaultValue - 默认值
   * @param {string} type - 类型 (string, number, boolean)
   */
  static get(key, defaultValue = null, type = 'string') {
    const value = process.env[key] || defaultValue;
    
    if (value === null || value === undefined) {
      return value;
    }

    switch (type) {
      case 'number':
        return parseInt(value) || defaultValue;
      case 'boolean':
        return value === 'true';
      case 'array':
        return value.split(',').map(item => item.trim());
      default:
        return value;
    }
  }
}