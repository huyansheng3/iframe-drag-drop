document.addEventListener('DOMContentLoaded', () => {
    // 获取所有可拖拽元素
    const draggableItems = document.querySelectorAll('.draggable-item');
    const iframe = document.getElementById('target-frame');
    
    // 等待iframe加载完成
    iframe.addEventListener('load', () => {
        setupDragEvents();
    });

    function setupDragEvents() {
        // 为每个可拖拽项添加事件监听器
        draggableItems.forEach(item => {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd);
        });
    }

    function handleDragStart(e) {
        // 设置拖拽的数据
        const itemId = this.getAttribute('data-id');
        const itemText = this.textContent;
        
        // 使用dataTransfer API存储数据
        e.dataTransfer.setData('text/plain', JSON.stringify({
            id: itemId,
            text: itemText
        }));
        
        // 设置拖拽时的视觉效果
        this.classList.add('dragging');
        
        // 通知iframe有拖拽开始
        notifyIframeDragStart();
    }

    function handleDragEnd() {
        // 移除拖拽时的视觉效果
        this.classList.remove('dragging');
        
        // 通知iframe拖拽结束
        notifyIframeDragEnd();
    }

    // 与iframe通信
    function notifyIframeDragStart() {
        iframe.contentWindow.postMessage({ type: 'dragstart' }, '*');
    }

    function notifyIframeDragEnd() {
        iframe.contentWindow.postMessage({ type: 'dragend' }, '*');
    }

    // 接收来自iframe的消息
    window.addEventListener('message', (event) => {
        const message = event.data;
        
        // 处理来自iframe的消息
        if (message.type === 'itemDropped') {
            console.log(`Item ${message.id} was dropped in the iframe`);
            // 可以在这里实现其他功能，如：从主页面列表中移除已拖入的项
        }
    });
});
