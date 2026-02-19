// 网站交互功能

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 设置部署时间
    const now = new Date();
    const deployTime = document.getElementById('deployTime');
    deployTime.textContent = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // 初始化主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // 初始化计数器
    updateCounterDisplay();
    
    // 平滑滚动
    initSmoothScroll();
});

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 显示消息
function showMessage(message) {
    alert(message);
}

// 计数器功能
let count = 0;

function increment() {
    count++;
    updateCounterDisplay();
    playClickSound();
}

function decrement() {
    count--;
    updateCounterDisplay();
    playClickSound();
}

function resetCounter() {
    count = 0;
    updateCounterDisplay();
    showMessage('计数器已重置！');
}

function updateCounterDisplay() {
    const countElement = document.getElementById('count');
    countElement.textContent = count;
    
    // 根据数值改变颜色
    if (count > 0) {
        countElement.style.color = '#4ade80'; // 绿色
    } else if (count < 0) {
        countElement.style.color = '#ef4444'; // 红色
    } else {
        countElement.style.color = 'var(--dark-color)';
    }
}

// 消息发送功能
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    const display = document.getElementById('messageDisplay');
    
    if (message) {
        display.innerHTML = `
            <div class="message-bubble">
                <strong>你:</strong> ${message}
                <br>
                <small>${new Date().toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'})}</small>
            </div>
        `;
        input.value = '';
        
        // 模拟AI回复
        setTimeout(() => {
            const replies = [
                "收到你的消息了！",
                "这是一个很棒的演示！",
                "OpenCode 让网站开发变得简单",
                "试试点击其他按钮看看效果",
                "感谢你的测试！"
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            
            display.innerHTML += `
                <div class="message-bubble ai">
                    <strong>AI:</strong> ${randomReply}
                    <br>
                    <small>${new Date().toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'})}</small>
                </div>
            `;
        }, 1000);
    } else {
        showMessage('请输入消息内容！');
    }
}

// 主题切换功能
function setTheme(theme) {
    const html = document.documentElement;
    const themeStatus = document.getElementById('themeStatus');
    
    // 移除所有主题
    html.removeAttribute('data-theme');
    
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        themeStatus.textContent = '暗黑';
    } else if (theme === 'auto') {
        // 根据系统偏好设置
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            html.setAttribute('data-theme', 'dark');
            themeStatus.textContent = '自动 (暗黑)';
        } else {
            themeStatus.textContent = '自动 (明亮)';
        }
    } else {
        themeStatus.textContent = '明亮';
    }
    
    // 保存到本地存储
    localStorage.setItem('theme', theme);
    
    // 更新按钮状态
    updateThemeButtons(theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    showMessage(`已切换到${newTheme === 'light' ? '明亮' : '暗黑'}主题`);
}

function updateThemeButtons(activeTheme) {
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`.theme-btn.${activeTheme}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// 音效
function playClickSound() {
    // 创建点击音效
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    .message-bubble {
        background-color: var(--primary-color);
        color: white;
        padding: 0.8rem 1rem;
        border-radius: var(--border-radius);
        margin-bottom: 0.5rem;
        animation: fadeIn 0.3s ease;
    }
    
    .message-bubble.ai {
        background-color: var(--gray-color);
    }
    
    .message-bubble small {
        opacity: 0.8;
        font-size: 0.8rem;
    }
    
    .theme-btn.active {
        transform: scale(1.1);
        box-shadow: 0 0 0 2px var(--primary-color);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .btn:active {
        animation: pulse 0.2s ease;
    }
`;
document.head.appendChild(style);

// 添加滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// 观察所有卡片
document.querySelectorAll('.feature-card, .demo-card').forEach(card => {
    observer.observe(card);
    
    // 添加动画类
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .demo-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});