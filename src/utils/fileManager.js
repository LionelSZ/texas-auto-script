import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = './outJson';

/**
 * 确保输出目录存在
 */
const ensureOutputDir = () => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
};

/**
 * 保存数据到JSON文件
 * @param {any} data - 要保存的数据
 * @param {string} fileName - 文件名
 */
export const saveDataToJson = (data, fileName) => {
  try {
    ensureOutputDir();
    
    const cleanFileName = fileName.endsWith('.json') 
      ? fileName 
      : `${fileName}.json`;
    
    const filePath = path.join(OUTPUT_DIR, cleanFileName);
    
    // 检查文件是否已存在
    let existingData = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        existingData = JSON.parse(fileContent);
        if (!Array.isArray(existingData)) {
          existingData = [];
        }
      } catch (readError) {
        console.error(`读取文件 ${cleanFileName} 失败:`, readError.message);
      }
    }
    
    // 合并现有数据和新数据
    const mergedData = Array.isArray(data) 
      ? [...existingData, ...data]
      : existingData;
    
    fs.writeFileSync(filePath, JSON.stringify(mergedData, null, 2));
    
    return { success: true, filePath };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 从outJson目录读取所有账号数据
 * @returns {Array} 包含所有账号数据的数组
 */
export const getAccountsFromJson = () => {
  try {
    if (!fs.existsSync(OUTPUT_DIR)) {
      console.log(`目录 ${OUTPUT_DIR} 不存在，返回空数组`);
      return [];
    }

    const files = fs.readdirSync(OUTPUT_DIR)
      .filter(file => file.endsWith('.json'));
    
    if (files.length === 0) {
      console.log('未找到任何JSON文件');
      return [];
    }

    const allAccounts = [];
    
    for (const file of files) {
      try {
        const filePath = path.join(OUTPUT_DIR, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        if (Array.isArray(data)) {
          console.log(`读取文件: ${file}, 包含 ${data.length} 个账号`);
          allAccounts.push(...data);
        }
      } catch (fileError) {
        console.error(`读取文件 ${file} 失败:`, fileError.message);
      }
    }

    return allAccounts;
  } catch (error) {
    console.error('读取账号数据失败:', error.message);
    return [];
  }
};