

// ANSI 转义码颜色定义（只包含常用颜色）
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bold: "\x1b[1m"
};

function colorize(colorCode, text) {
  return colorCode + text + colors.reset;
}

const chalk = {
  red: (text) => colorize(colors.red, text),
  green: (text) => colorize(colors.green, text),
  yellow: (text) => colorize(colors.yellow, text),
  blue: (text) => colorize(colors.blue, text),
  magenta: (text) => colorize(colors.magenta, text),
  cyan: (text) => colorize(colors.cyan, text),
  white: (text) => colorize(colors.white, text),
  bold: (text) => colorize(colors.bold, text),

  // 支持链式调用的简易实现（只支持一个颜色+bold组合）
  // 例如 chalk.red.bold("text")
};

export default chalk;
