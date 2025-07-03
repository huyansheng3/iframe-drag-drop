# iframe 拖拽演示

> 在主页面与 `iframe` 间实现元素拖放交互的最小可复现示例

## 在线体验

- **Demo**：<https://huyansheng3.github.io/iframe-drag-drop/>

若无法访问 GitHub Pages，可本地启动静态服务器（见下文"快速开始"）。

---

## 功能亮点

1. **双窗口拖放**：支持从父页面拖拽列表项到 `iframe` 内部的拖放区域。
2. **实时视觉反馈**：拖拽过程中，高亮提示目标区域，增强用户体验。
3. **简洁通信机制**：基于 `postMessage` 完成跨窗口数据同步，逻辑清晰。
4. **零依赖**：纯原生 HTML / CSS / JS 实现，方便学习与集成。

---

## 快速开始

以下命令基于 Node.js 环境，如无请先[安装 Node.js](https://nodejs.org/)。

```bash
# 克隆仓库
$ git clone https://github.com/huyansheng3/iframe-drag-drop.git
$ cd iframe-drag-drop

# 安装一个极简静态服务器（任选其一）
$ npm i -g serve   # 或者 npm i -g http-server

# 启动本地预览（端口可自定）
$ serve . -l 5173  # 默认会自动打开浏览器
```

> 直接在浏览器打开 `index.html` 亦可运行，但某些浏览器对本地文件的跨域限制较严格，建议使用静态服务器。

---

## 项目结构

```text
iframe-drag-drop/
├─ index.html   # 父页面：可拖拽列表 + iframe 容器
├─ iframe.html  # 子页面：拖放目标区域
├─ main.js      # 父页面拖拽 & postMessage 逻辑
├─ iframe.js    # 子页面接收 & 渲染逻辑
├─ styles.css   # 两页面共用样式
└─ README.md
```

---

## 关键实现

| 技术点 | 说明 |
| :----: | :---- |
| **HTML5 Drag & Drop API** | 通过 `draggable="true"`、`dragstart` / `drop` 等事件实现拖放行为 |
| **Window.postMessage** | 解决父页面与 `iframe` 间跨域通信，传递拖拽数据 |
| **事件委托** | 使用事件冒泡降低监听器数量，提高性能 |
| **CSS 交互效果** | 利用伪类与过渡动画提供拖拽提示 |

> 详细源码请参阅各自的 `.js` / `.css` 文件，函数均已添加注释。

---

## 跨域注意事项

1. `postMessage(message, targetOrigin)` 中应显式传入 **目标源**，避免泄露数据。
2. 接收方需通过 `event.origin` 校验来源，拒绝未知域消息。
3. 若父子页面域名不同，`dataTransfer` 中自定义 MIME 类型可能被浏览器忽略，可改为使用 `postMessage` 传递。
4. 如需进一步隔离，可结合 `sandbox`、`Content-Security-Policy` 等手段。

---

## 浏览器兼容性

已在以下浏览器最新版中验证：Chrome、Firefox、Safari、Edge。

> IE 系列浏览器已停止维护，且不完整支持 HTML5 拖放标准，不在本示例兼容范围内。

---

## 许可证

[MIT](LICENSE) © 2024 huyansheng3

---

## 参考资料

- [MDN - Using drag and drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [MDN - Window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- [HTML Living Standard - Drag and Drop](https://html.spec.whatwg.org/multipage/dnd.html)
