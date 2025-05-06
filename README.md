# My Chrome Extension

这是一个基本的 Chrome 扩展程序模板。

## 安装说明

1. 打开 Chrome 浏览器
2. 在地址栏输入 `chrome://extensions/`
3. 打开右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择包含这些文件的文件夹

## 文件结构

- `manifest.json`: 扩展程序的配置文件
- `popup.html`: 扩展程序的弹出界面
- `popup.js`: 弹出界面的逻辑代码
- `styles.css`: 样式文件
- `icons/`: 扩展程序图标目录

## 开发说明

要开始开发，你可以：

1. 修改 `popup.html` 来更改界面
2. 在 `popup.js` 中添加你的功能逻辑
3. 在 `styles.css` 中自定义样式
4. 在 `manifest.json` 中添加所需的权限

## 注意事项

- 每次修改文件后，需要在扩展程序页面点击刷新按钮来更新扩展
- 确保所有图标文件都放在 `icons` 目录下
- 如果需要使用 Chrome API，需要在 `manifest.json` 的 `permissions` 字段中添加相应权限 