// Cursor glow effect
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX - 10 + 'px';
    cursorGlow.style.top = e.clientY - 10 + 'px';
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(42, 37, 32, 0.98)';
    } else {
        navbar.style.background = 'rgba(42, 37, 32, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
const animateElements = document.querySelectorAll('.card, .service-item, .section-header');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced card interactions with music theme
document.querySelectorAll('.music-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(196, 149, 92, 0.12)';
        // Animate music bars faster on hover
        const bars = this.querySelectorAll('.music-bar');
        bars.forEach(bar => {
            bar.style.animationDuration = '0.5s';
        });
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(228, 221, 210, 0.08)';
        // Reset music bars animation
        const bars = this.querySelectorAll('.music-bar');
        bars.forEach(bar => {
            bar.style.animationDuration = '1s';
        });
    });
});

// Artist card play button interaction
document.querySelectorAll('.artist-avatar').forEach(avatar => {
    avatar.addEventListener('click', function() {
        const artistName = this.parentElement.querySelector('h4').textContent;
        // Simulate playing artist music
        this.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
        
        // Show play feedback
        const playOverlay = this.querySelector('.play-overlay i');
        playOverlay.classList.remove('fa-play');
        playOverlay.classList.add('fa-pause');
        
        setTimeout(() => {
            playOverlay.classList.remove('fa-pause');
            playOverlay.classList.add('fa-play');
        }, 3000);
    });
});

// Genre item hover sound wave effect
document.querySelectorAll('.genre-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const wave = this.querySelector('.genre-wave');
        wave.style.background = 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))';
        wave.style.animation = 'waveFlow 2s linear infinite';
    });
    
    item.addEventListener('mouseleave', function() {
        const wave = this.querySelector('.genre-wave');
        wave.style.animation = '';
    });
});

// Audio visualizer interaction
document.querySelectorAll('.bar').forEach((bar, index) => {
    bar.addEventListener('click', function() {
        // Simulate audio interaction
        this.style.background = 'linear-gradient(to top, var(--primary), var(--secondary))';
        this.style.transform = 'scaleY(3)';
        
        setTimeout(() => {
            this.style.background = 'var(--gradient)';
            this.style.transform = 'scaleY(1)';
        }, 500);
    });
});

// Enhanced song card interactions for different music styles
document.querySelectorAll('.song-card').forEach(card => {
    const playButton = card.querySelector('.play-button');
    const audioPlayer = card.querySelector('.audio-player');
    const playIcon = playButton.querySelector('i');
    const musicStyle = card.querySelector('.music-style').textContent;
    
    card.addEventListener('click', function(e) {
        if (e.target.closest('.audio-player')) {
            return; // Don't interfere with audio controls
        }
        
        const songTitle = this.querySelector('h3').textContent;
        
        // Stop all other audio players
        document.querySelectorAll('.audio-player').forEach(player => {
            if (player !== audioPlayer) {
                player.pause();
                player.currentTime = 0;
            }
        });
        
        // Reset all other play buttons
        document.querySelectorAll('.play-button i').forEach(icon => {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        });
        
        // Toggle current audio
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
            this.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(139, 92, 246, 0.12))';
            console.log(`Tocando: ${songTitle} - Estilo: ${musicStyle}`);
        } else {
            audioPlayer.pause();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            this.style.background = '';
        }
    });
    
    // Handle audio events
    audioPlayer.addEventListener('ended', function() {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        card.style.background = '';
    });
    
    audioPlayer.addEventListener('pause', function() {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        card.style.background = '';
    });
    
    audioPlayer.addEventListener('play', function() {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        card.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(139, 92, 246, 0.12))';
    });
});

// Enhanced photo interaction
document.querySelector('.photo-frame').addEventListener('click', function() {
    this.style.animation = 'pulse 0.6s ease';
    setTimeout(() => {
        this.style.animation = '';
    }, 600);
});

// Enhanced form submission for singer contact
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Redirect to WhatsApp
    const whatsappMessage = `Olá! Meu nome é ${name}. Email: ${email}. Mensagem: ${message}`;
    const whatsappUrl = `https://api.whatsapp.com/message/PMK7VFNMDQYSN1?autoload=1&app_absent=0&text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS keyframes for new animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes waveFlow {
        0% { background-position: 0% 0%; }
        100% { background-position: 200% 0%; }
    }
`;
document.head.appendChild(style);

// Enhanced card interactions for artist theme
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(196, 149, 92, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(228, 221, 210, 0.08)';
    });
});

// Dynamic gradient animation
const gradientElements = document.querySelectorAll('.gradient-text, .section-title, .logo-text');
let gradientOffset = 0;

function animateGradient() {
    gradientOffset += 1;
    gradientElements.forEach(el => {
        el.style.backgroundPosition = `${gradientOffset}px 0`;
    });
    requestAnimationFrame(animateGradient);
}

animateGradient();

// Add style-specific visual effects
document.querySelectorAll('.play-button').forEach(button => {
    const style = button.dataset.style;
    
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Add visual effect based on music style
        switch(style) {
            case 'contemporary':
                this.style.background = 'radial-gradient(circle, #6366f1, #4f46e5)';
                break;
            case 'worship':
                this.style.background = 'radial-gradient(circle, #8b5cf6, #7c3aed)';
                break;
            case 'ballad':
                this.style.background = 'radial-gradient(circle, #06b6d4, #0891b2)';
                break;
            case 'traditional':
                this.style.background = 'radial-gradient(circle, #10b981, #059669)';
                break;
            case 'acoustic':
                this.style.background = 'radial-gradient(circle, #f59e0b, #d97706)';
                break;
            case 'energetic':
                this.style.background = 'radial-gradient(circle, #ef4444, #dc2626)';
                break;
        }
        
        setTimeout(() => {
            this.style.background = '';
        }, 300);
    });
});

// Genre card hover sound wave effect
document.querySelectorAll('.genre-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const wave = this.querySelector('.genre-wave');
        const icon = this.querySelector('.genre-icon');
        
        wave.style.background = 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))';
        wave.style.animation = 'waveFlow 2s linear infinite';
        
        icon.style.animation = 'pulse 0.6s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        const wave = this.querySelector('.genre-wave');
        const icon = this.querySelector('.genre-icon');
        
        wave.style.animation = '';
        icon.style.animation = '';
    });
    
    card.addEventListener('click', function() {
        const genreTitle = this.querySelector('h4').textContent;
        
        // Visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        console.log(`Gênero selecionado: ${genreTitle}`);
    });
});