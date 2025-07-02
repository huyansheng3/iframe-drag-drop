# iframe拖拽演示

这是一个演示如何实现从主页面向iframe内部拖拽元素的示例项目。该演示展示了HTML5拖放API与跨窗口通信的结合使用。

## 演示地址

[在线演示](https://huyansheng3.github.io/iframe-drag-drop/)

## 功能特点

- 从主页面拖拽列表项到iframe内部
- 实时视觉反馈
- 跨窗口通信
- 响应式设计

## 项目结构

- `index.html` - 主页面，包含可拖拽的列表项和嵌套的iframe
- `iframe.html` - iframe内部页面，包含放置区域
- `styles.css` - 主页面和iframe的样式
- `main.js` - 主页面的JavaScript，处理拖拽相关逻辑
- `iframe.js` - iframe内部页面的JavaScript，处理接收拖拽项的逻辑

## 实现原理

本演示利用以下技术实现拖拽效果：

1. **HTML5拖放API**：使用`draggable`属性和拖放相关事件
2. **窗口间通信**：通过`postMessage` API实现主页面和iframe之间的消息传递
3. **事件管理**：动态添加和移除事件监听器，确保拖放体验流畅
4. **数据传输**：使用`dataTransfer`对象在拖拽过程中传递数据

## 跨域注意事项

当主页面和iframe属于不同域时，需要特别注意：

- 使用`postMessage`时明确指定目标域
- 验证接收到的消息来源
- 考虑CORS配置
- 可能需要替代`dataTransfer`的数据传输机制

## 使用方法

1. 克隆此仓库
2. 在浏览器中打开`index.html`
3. 尝试拖拽左侧列表项到右侧iframe中

## 浏览器兼容性

本演示在现代浏览器（Chrome、Firefox、Safari、Edge）中测试通过。
