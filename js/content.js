// 创建按钮元素
function createButton() {
  const button = document.createElement('button');
  button.className = 'random-href-button';
  button.textContent = 'Random Link';
  return button;
}

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

// 获取随机链接并跳转
async function getRandomHref() {
  try {
    // 先滚动页面
    scrollPage();
    
    // 等待滚动完成后再获取链接
    setTimeout(async () => {
      // 获取特定类型的a标签
      const links = document.querySelectorAll('a[class*="catalogTreeItem-module_content"], a[data-handbook="bullet.handle"]');
      const hrefs = Array.from(links).map(link => link.getAttribute('href'));
      
      if (hrefs.length > 0) {
        alert(hrefs.length);
        // 随机选择一个href
        const randomIndex = Math.floor(Math.random() * hrefs.length);
        const selectedHref = hrefs[randomIndex];
        
        // 获取当前页面的完整URL
        const currentUrl = new URL(window.location.href);
        const baseUrl = currentUrl.origin;
        
        // 构建完整的URL
        const fullUrl = selectedHref.startsWith('/') ? baseUrl + selectedHref : selectedHref;
        
        // 跳转到选中的链接
        window.location.href = fullUrl;
      } else {
        alert('No matching links found on this page.');
      }
    }, 1000); // 等待1秒让滚动完成
  } catch (error) {
    console.error('Error:', error);
    alert('Error getting href attributes: ' + error.message);
  }
}

// 初始化
function init() {
  // 创建并添加按钮
  const button = createButton();
  document.body.appendChild(button);
  
  // 添加点击事件
  button.addEventListener('click', getRandomHref);
}

// 当页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
} 