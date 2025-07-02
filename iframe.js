document.addEventListener('DOMContentLoaded', () => {
    // 获取放置区域
    const dropZone = document.getElementById('drop-zone');
    const droppedItems = document.getElementById('dropped-items');
    const dropText = document.querySelector('.drop-text');
    
    // 允许跨窗口拖放
    // 这里使用window.parent是因为我们需要接收来自父页面的消息
    window.addEventListener('message', (event) => {
        const message = event.data;
        
        if (message.type === 'dragstart') {
            // 父页面开始拖拽元素，设置我们的处理器
            enableDropZone();
        } else if (message.type === 'dragend') {
            // 父页面结束拖拽
            disableDropZone();
        }
    });
    
    function enableDropZone() {
        // 设置放置区域的事件监听器
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('dragenter', handleDragEnter);
        dropZone.addEventListener('dragleave', handleDragLeave);
        dropZone.addEventListener('drop', handleDrop);
    }
    
    function disableDropZone() {
        // 移除放置区域的事件监听器
        dropZone.removeEventListener('dragover', handleDragOver);
        dropZone.removeEventListener('dragenter', handleDragEnter);
        dropZone.removeEventListener('dragleave', handleDragLeave);
        dropZone.removeEventListener('drop', handleDrop);
        
        // 移除视觉提示
        dropZone.classList.remove('drag-over');
    }
    
    function handleDragOver(e) {
        // 阻止默认行为以允许放置
        e.preventDefault();
    }
    
    function handleDragEnter(e) {
        // 阻止默认行为并添加视觉提示
        e.preventDefault();
        dropZone.classList.add('drag-over');
    }
    
    function handleDragLeave() {
        // 移除视觉提示
        dropZone.classList.remove('drag-over');
    }
    
    function handleDrop(e) {
        // 阻止默认行为
        e.preventDefault();
        
        // 移除视觉提示
        dropZone.classList.remove('drag-over');
        
        try {
            // 获取拖拽的数据
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            
            // 创建新的元素并添加到列表中
            const item = document.createElement('li');
            item.classList.add('dropped-item');
            item.setAttribute('data-id', data.id);
            item.textContent = data.text;
            droppedItems.appendChild(item);
            
            // 如果这是第一个添加的项目，隐藏提示文字
            if (droppedItems.children.length === 1) {
                dropText.style.display = 'none';
            }
            
            // 通知父窗口元素已被放置
            notifyParent(data.id);
        } catch (error) {
            console.error('Error processing dropped data:', error);
        }
    }
    
    // 与父窗口通信
    function notifyParent(itemId) {
        window.parent.postMessage({
            type: 'itemDropped',
            id: itemId
        }, '*');
    }
});
