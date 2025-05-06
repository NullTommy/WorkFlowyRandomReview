document.addEventListener('DOMContentLoaded', function() {
  // 获取按钮元素
  const helloButton = document.getElementById('helloButton');
  const getHrefButton = document.getElementById('getHrefButton');
  
  // 添加点击事件监听器
  helloButton.addEventListener('click', function() {
    alert('Hello!');
  });

  // 将获取href的功能抽取成单独的函数
  async function getRandomHref() {
    try {
      // 获取当前标签页
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // 先执行滚动
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          // 页面滚动函数
          function scrollPage() {
            // 获取当前滚动位置
            const currentScroll = window.scrollY;
            // 使用固定的视口高度（800像素）
            const viewportHeight = 1200;
            
            // 计算新的滚动位置（滚动4页）
            const newScroll = currentScroll + (viewportHeight * 4);
            
            // 平滑滚动到新位置
            window.scrollTo({
              top: newScroll,
              behavior: 'smooth'
            });
          }
          
          // 执行滚动
          scrollPage();
        }
      });

      // 等待滚动完成后再获取链接
      setTimeout(async () => {
        // 在标签页中执行脚本获取链接
        const results = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: () => {
            // 获取特定类型的a标签
            const links = document.querySelectorAll('a[class*="catalogTreeItem-module_content"], a[data-handbook="bullet.handle"]');
            const hrefs = Array.from(links).map(link => link.getAttribute('href'));
            return hrefs;
          }
        });

        // 处理结果
        if (results && results[0] && results[0].result) {
          const hrefs = results[0].result;
          if (hrefs.length > 0) {
            alert(hrefs.length);
            // 随机选择一个href
            const randomIndex = Math.floor(Math.random() * hrefs.length);
            const selectedHref = hrefs[randomIndex];
            
            // 获取当前页面的完整URL
            const currentUrl = new URL(tab.url);
            const baseUrl = currentUrl.origin;
            
            // 构建完整的URL
            const fullUrl = selectedHref.startsWith('/') ? baseUrl + selectedHref : selectedHref;
            
            // 跳转到选中的链接
            chrome.tabs.update(tab.id, { url: fullUrl });
          } else {
            alert('No matching links found on this page.');
          }
        }
      }, 1000); // 等待1秒让滚动完成
    } catch (error) {
      console.error('Error:', error);
      alert('Error getting href attributes: ' + error.message);
    }
  }

  // 添加按钮点击事件监听器
  getHrefButton.addEventListener('click', getRandomHref);

  // 添加快捷键监听
  chrome.commands.onCommand.addListener((command) => {
    if (command === 'random-href') {
      getRandomHref();
    }
  });
}); 