// MCP Manager Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initThemeToggle();
    initCyberpunkEffects();
    initParticleSystem();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .step, .tech-item').forEach(el => {
        observer.observe(el);
    });
}

// Theme toggle functionality
function initThemeToggle() {
    // Check for saved theme preference or default to 'auto'
    const savedTheme = localStorage.getItem('theme') || 'auto';
    applyTheme(savedTheme);
    
    // Create theme toggle button (optional)
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌓';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--primary);
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        transition: var(--transition);
        z-index: 1000;
    `;
    
    themeToggle.addEventListener('click', toggleTheme);
    document.body.appendChild(themeToggle);
}

function applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'dark') {
        root.style.setProperty('--background', '#0f172a');
        root.style.setProperty('--surface', '#1e293b');
        root.style.setProperty('--border', '#334155');
        root.style.setProperty('--text-primary', '#f1f5f9');
        root.style.setProperty('--text-secondary', '#cbd5e1');
        root.style.setProperty('--text-muted', '#64748b');
    } else if (theme === 'light') {
        root.style.setProperty('--background', '#ffffff');
        root.style.setProperty('--surface', '#f8fafc');
        root.style.setProperty('--border', '#e5e7eb');
        root.style.setProperty('--text-primary', '#111827');
        root.style.setProperty('--text-secondary', '#6b7280');
        root.style.setProperty('--text-muted', '#9ca3af');
    } else {
        // Auto theme - use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
        return;
    }
    
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const themes = ['light', 'dark'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    applyTheme(nextTheme);
    showNotification(`主题已切换到 ${getThemeDisplayName(nextTheme)}`, 'success');
}

function getThemeDisplayName(theme) {
    const names = {
        'light': '浅色模式',
        'dark': '深色模式'
    };
    return names[theme] || theme;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: var(--transition);
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    const colors = {
        'success': 'var(--success)',
        'error': 'var(--error)',
        'warning': 'var(--warning)',
        'info': 'var(--primary)'
    };
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'auto' || !currentTheme) {
        applyTheme('auto');
    }
});

// Performance optimization: lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if there are images with data-src
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Cyberpunk Effects
function initCyberpunkEffects() {
    // Mouse trail effect
    let mouseTrail = [];
    document.addEventListener('mousemove', function(e) {
        mouseTrail.push({
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        });

        // Keep only recent trail points
        mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 500);

        // Create trail effect on hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const rect = hero.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                createGlowEffect(e.clientX, e.clientY);
            }
        }
    });

    // Glitch effect on hover for certain elements
    document.querySelectorAll('.feature-card, .step, .download-btn').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out';
        });

        element.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
}

function createGlowEffect(x, y) {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        animation: glow-fade 1s ease-out forwards;
    `;

    document.body.appendChild(glow);

    setTimeout(() => {
        glow.remove();
    }, 1000);
}

// Particle System
function initParticleSystem() {
    const particleContainer = document.querySelector('.particles');
    if (!particleContainer) return;

    // Add more dynamic particles
    setInterval(() => {
        if (Math.random() < 0.3) {
            createDynamicParticle();
        }
    }, 2000);
}

function createDynamicParticle() {
    const particleContainer = document.querySelector('.particles');
    if (!particleContainer) return;

    const particle = document.createElement('div');
    const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)', 'var(--purple)'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 10px ${color};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float-particle ${Math.random() * 10 + 5}s ease-in-out infinite;
        opacity: 0.7;
    `;

    particleContainer.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 15000);
}

// Add glitch animation keyframes
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }

    @keyframes glow-fade {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(0); }
        50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
    }
`;
document.head.appendChild(glitchStyle);

// Enhanced mouse effects
document.addEventListener('mousemove', debounce(function(e) {
    const hero = document.querySelector('.hero');
    if (hero) {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Update CSS custom properties for dynamic effects
        document.documentElement.style.setProperty('--mouse-x', x);
        document.documentElement.style.setProperty('--mouse-y', y);
    }
}, 16));

// Console message for developers
console.log(`
🎉 欢迎来到 MCP Manager 官网！

如果您是开发者，欢迎查看我们的源代码：
https://github.com/Duosl/mcp-manager-website

技术栈：
- Vue 3 + TypeScript + Vite
- Tailwind CSS 4
- Chrome Extension Manifest V3

Made with ❤️ by 林仔
`);
