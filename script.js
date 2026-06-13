
function createStaticLeaves() {
    
    const leafColors = [
        'radial-gradient(circle, #FFB6C1, #FFC0CB)',
        'radial-gradient(circle, #FFC0CB, #FFD1DC)',
        'radial-gradient(circle, #FFE4E6, #FFF0F5)',
        'radial-gradient(circle, #F8BBD9, #E879F9)',
        'radial-gradient(circle, #FFCDD2, #EF9A9A)', 
        'radial-gradient(circle, #F48FB1, #EC407A)', 
        'radial-gradient(circle, #FFDDE1, #FFCAD4)' 
    ];
    
    
    const leafShapes = [
        '50% 0',      
        '50% 50% 0 50%', 
        '30% 70% 70% 30%',
        '50% 20% 50% 80%' 
    ];
    
    const staticLeafCount = 50;
    
    for (let i = 0; i < staticLeafCount; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'static-leaf';
        
       
        const sectionWidth = 100 / staticLeafCount;
        const basePositionX = sectionWidth * i;
      
        const positionX = basePositionX + (Math.random() * sectionWidth * 0.8);
        
       
        const size = Math.random() * 12 + 8; // 8-20px
        const positionY = Math.random() * 8; // 0-8% from the top (increased range)
        const rotation = Math.random() * 360; // Random rotation
        const scale = Math.random() * 0.5 + 0.8; // 0.8-1.3 scale
        const opacity = (Math.random() * 0.3 + 0.5).toFixed(2); // 0.5-0.8
        
        // Set CSS variables
        leaf.style.setProperty('--size', size + 'px');
        leaf.style.setProperty('--rotation', rotation + 'deg');
        leaf.style.setProperty('--gradient', leafColors[Math.floor(Math.random() * leafColors.length)]);
        leaf.style.setProperty('--shape', leafShapes[Math.floor(Math.random() * leafShapes.length)]);
        leaf.style.setProperty('--opacity', opacity);
        leaf.style.setProperty('--scale', scale);
        
        // Animation variables for the sway effect
        const swayDuration = (Math.random() * 4 + 3).toFixed(1) + 's'; // 3-7s
        const swayAngle = (Math.random() * 8 + 2).toFixed(1) + 'deg'; // 2-10deg
        const swayX = (Math.random() * 8 - 4).toFixed(1) + 'px'; // -4px to 4px
        
        leaf.style.setProperty('--sway-duration', swayDuration);
        leaf.style.setProperty('--sway-angle', swayAngle);
        leaf.style.setProperty('--sway-x', swayX);
        
        // Position - ensure leaves are visible at the top of the landing section
        leaf.style.left = positionX + '%';
        leaf.style.top = positionY + '%';
        leaf.style.zIndex = '999'; // Force a very high z-index to ensure visibility
        
        // Append directly to body instead of petals container to ensure they're at the top
        document.body.appendChild(leaf);
    }
}

createStaticLeaves();

document.addEventListener('DOMContentLoaded', function() {
    initializePetals();
    initializeMusicToggle();
    initializeScrollAnimations();
    initializeLetterAnimation();
    initializeSparkles();
    initializeKeyboardShortcuts();
    initializeTouchInteractions();
    initializeScrollToTop();
    initializeSongPlayer();
    
    document.documentElement.style.scrollBehavior = 'smooth';
});

function initializeTouchInteractions() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        
        const envelope = document.getElementById('envelope');
        if (envelope) {
            envelope.addEventListener('touchstart', function(e) {
                this.classList.toggle('opened');
                const letter = document.getElementById('letter');
                if (letter) {
                    setTimeout(() => {
                        letter.classList.toggle('visible');
                        if (letter.classList.contains('visible')) {
                            const letterLines = document.querySelectorAll('.letter-line');
                            letterLines.forEach(line => {
                                const delay = parseInt(line.getAttribute('data-delay')) || 0;
                                setTimeout(() => {
                                    line.classList.add('visible');
                                }, delay);
                            });
                        }
                    }, 500);
                }
                e.preventDefault();
            });
        }
        
        const interactiveElements = document.querySelectorAll('.story-card, .memory-photo, .music-toggle');
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        const memoriesSlider = document.querySelector('.memories-slider');
        if (memoriesSlider) {
            memoriesSlider.addEventListener('touchstart', function() {
                this.style.animationPlayState = 'paused';
            });
            
            memoriesSlider.addEventListener('touchend', function() {
                this.style.animationPlayState = 'running';
            });
        }
    }
}

function initializePetals() {
    const petalsContainer = document.getElementById('petals');
    const petalCount = 50;
    
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        const size = Math.random() * 8 + 6; // 6-14px
        const startPosition = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 3 + 4; // 4-7 seconds
        const delay = Math.random() * 2; // 0-2 seconds delay
        
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.left = startPosition + 'px';
        petal.style.animationDuration = animationDuration + 's';
        petal.style.animationDelay = delay + 's';
        
        const colors = [
            'radial-gradient(circle, #FFB6C1, #FFC0CB)',
            'radial-gradient(circle, #FFC0CB, #FFD1DC)',
            'radial-gradient(circle, #FFE4E6, #FFF0F5)',
            'radial-gradient(circle, #F8BBD9, #E879F9)'
        ];
        petal.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        petalsContainer.appendChild(petal);
        
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, (animationDuration + delay) * 1000);
    }
    
    for (let i = 0; i < petalCount; i++) {
        setTimeout(createPetal, i * 100);
    }
    
    setInterval(createPetal, 300);
}

function initializeMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const audioVisualizer = document.getElementById('audioVisualizer');
    let isPlaying = false;
    backgroundMusic.volume = 0.5;
    
    backgroundMusic.load();
    updateMusicUI(false);
    musicToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (!isPlaying) {
            
            backgroundMusic.play().then(() => {
                isPlaying = true;
                updateMusicUI(true);
            }).catch(error => {
                updateMusicUI(false);
            });
        } else {
            backgroundMusic.pause();
            isPlaying = false;
            updateMusicUI(false);
        }
    });
    
    backgroundMusic.addEventListener('ended', function() {
        if (!backgroundMusic.loop) {
            isPlaying = false;
            updateMusicUI(false);
        }
    });
    
    function updateMusicUI(playing) {
        const musicIcon = musicToggle.querySelector('.music-icon');
        const musicOnIcon = '🎵';
        const musicOffIcon = '🔇';
        
        if (playing) {
            musicToggle.style.background = 'rgba(255, 105, 180, 0.9)';
            musicIcon.textContent = musicOnIcon;
            musicToggle.style.animation = 'pulse 1s infinite';
        } else {
            musicToggle.style.background = 'rgba(255, 182, 193, 0.9)';
            musicIcon.textContent = musicOffIcon;
            musicToggle.style.animation = 'pulse 2s infinite';
        }
    }
    

}

function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-title, .story-card, .final-message, .cake, .birthday-wish');
    const sections = document.querySelectorAll('.memory-lane, .letter-section, .story-cards, .final-wish');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const elementObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('story-card')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.2}s`;
                }
            }
        });
    }, observerOptions);
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('memory-lane')) {
                    entry.target.style.animation = 'sectionFadeIn 1.2s ease-out forwards';
                } else if (entry.target.classList.contains('letter-section')) {
                    entry.target.style.animation = 'sectionSlideUp 1.4s ease-out forwards';
                } else if (entry.target.classList.contains('story-cards')) {
                    entry.target.style.animation = 'sectionSlideIn 1.3s ease-out forwards';
                } else if (entry.target.classList.contains('final-wish')) {
                    entry.target.style.animation = 'sectionFadeIn 1.5s ease-out forwards';
                }
            }
        });
    }, {
        root: null,
        rootMargin: '-10% 0px',
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        elementObserver.observe(element);
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

function initializeLetterAnimation() {
    const letter = document.getElementById('letter');
    const letterFullscreen = document.getElementById('letterFullscreen');
    const closeLetter = document.getElementById('closeLetter');
    const scribbleLines = document.querySelectorAll('.scribble-line');
    const fullscreenLetterLines = document.querySelectorAll('#letterFullscreen .letter-line');
    let letterVisible = false;
    
    const letterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !letterVisible) {
                setTimeout(() => {
                    showLetter();
                }, 1000);
            }
        });
    }, { threshold: 0.5 });
    
    letterObserver.observe(document.getElementById('letterSection'));
    
    letter.addEventListener('click', function() {
        letterFullscreen.classList.add('active');
        document.body.style.overflow = 'hidden';
        animateFullscreenLetterContent();
    });
    
    if (closeLetter) {
        closeLetter.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            letterFullscreen.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    letterFullscreen.addEventListener('click', function(e) {
        if (e.target === letterFullscreen || e.target.classList.contains('close-letter')) {
            letterFullscreen.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    function showLetter() {
        letterVisible = true;
        
        
        letter.classList.add('visible');
        animateScribbleContent();
    }
    
    function animateScribbleContent() {
        scribbleLines.forEach((line) => {
            const delay = parseInt(line.dataset.delay) || 0;
            setTimeout(() => {
                line.classList.add('visible');
            }, delay);
        });
    }
    
    function animateFullscreenLetterContent() {
        fullscreenLetterLines.forEach((line, index) => {
            setTimeout(() => {
                typeWriterEffect(line);
            }, index * 100);
        });
    }
    
    function typeWriterEffect(element) {
        if (element.classList.contains('title') || element.innerHTML.includes('<br')) {
            element.style.opacity = '1';
            return;
        }
        
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 20); // Faster typing for better effect
    }
}

function initializeSparkles() {
    const sparklesContainer = document.querySelector('.sparkles');
    
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * 150 + 50;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        sparkle.style.left = `calc(50% + ${x}px)`;
        sparkle.style.top = `calc(50% + ${y}px)`;
        
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        
        sparklesContainer.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
    }
    
    const cakeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sparkleInterval = setInterval(createSparkle, 300);
                const cakeImage = document.querySelector('.cake-image');
                if (cakeImage) {
                    cakeImage.style.animation = 'float 3s ease-in-out infinite, flicker 1s ease-in-out infinite alternate';
                }
                
                setTimeout(() => {
                    clearInterval(sparkleInterval);
                }, 10000);
            }
        });
    }, { threshold: 0.5 });
    
    cakeObserver.observe(document.querySelector('.cake'));
}

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.memory-photo').forEach(photo => {
        photo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        photo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    document.querySelectorAll('.story-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.photo-placeholder, .cake');
    
    floatingElements.forEach((element, index) => {
        if (!element.classList.contains('cake')) {
            element.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
        }
    });
}

const floatingCSS = `
@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}
`;

const style = document.createElement('style');
style.textContent = floatingCSS;
document.head.appendChild(style);

// Initialize floating animation
document.addEventListener('DOMContentLoaded', function() {
    addFloatingAnimation();
    initializeCakeInteraction();
});

// Make cake image interactive
function initializeCakeInteraction() {
    const cakeImage = document.querySelector('.cake-image');
    const dialogueBox = document.querySelector('.dialogue-box');
    const magnifyOverlay = document.querySelector('.magnify-overlay');
    const magnifiedCake = document.querySelector('.magnified-cake');
    
    if (cakeImage) {
        cakeImage.addEventListener('click', function(e) {
            // Prevent default behavior
            e.preventDefault();
            e.stopPropagation();
            
            // Create celebration effect
            celebrateCakeClick();
            
            // Add a small rotation animation
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'cakeClick 0.5s ease-out, float 3s ease-in-out infinite';
            }, 10);
            
            // Hide dialogue box with a cute fade out effect
            if (dialogueBox) {
                dialogueBox.style.animation = 'fadeOut 0.5s forwards';
                setTimeout(() => {
                    dialogueBox.style.display = 'none';
                }, 500);
            }
            
            // Show magnify overlay after a short delay
            setTimeout(() => {
                magnifyOverlay.classList.add('active');
                setTimeout(() => {
                    magnifiedCake.classList.add('active');
                    // Create neon text elements when cake is magnified
                    createNeonTexts();
                }, 100);
            }, 600);
        });
    }
    
    // Close magnify overlay when clicked
    if (magnifyOverlay) {
        magnifyOverlay.addEventListener('click', function() {
            magnifiedCake.classList.remove('active');
            // Remove all neon text elements
            document.querySelectorAll('.neon-text').forEach(el => el.remove());
            setTimeout(() => {
                magnifyOverlay.classList.remove('active');
            }, 300);
        });
    }
    
    // Function to create neon text elements
    function createNeonTexts() {
        const text = "Wish you a Happy Birthday, Vidya janudi! 🎂🎉";
        const overlay = document.querySelector('.magnify-overlay');
        
        // Neon color options for variety
        const neonColors = [
            '#ff00de', // Pink
            '#00ffff', // Cyan
            '#ffff00', // Yellow
            '#ff6600', // Orange
            '#00ff00', // Green
            '#ff0099', // Hot pink
            '#9900ff'  // Purple
        ];
        
        // Create multiple neon text elements scattered around the screen
        for (let i = 0; i < 8; i++) {
            const neonText = document.createElement('div');
            neonText.className = 'neon-text';
            neonText.textContent = text;
            
            // Random position
            const randomX = Math.random() * 80 + 10; // 10% to 90% of screen width
            const randomY = Math.random() * 80 + 10; // 10% to 90% of screen height
            
            // Random rotation
            const randomRotation = (Math.random() * 40 - 20); // -20 to +20 degrees
            
            // Random delay
            const randomDelay = Math.random() * 1.5;
            
            // Random size variation
            const randomSize = 1.5 + Math.random() * 1.5; // 1.5rem to 3rem
            
            // Random color
            const randomColor = neonColors[Math.floor(Math.random() * neonColors.length)];
            
            // Random pulse speed and minimum opacity
            const randomPulseSpeed = 1 + Math.random() * 2; // 1s to 3s
            const randomMinOpacity = 0.5 + Math.random() * 0.3; // 0.5 to 0.8
            
            neonText.style.setProperty('--rotation', `${randomRotation}deg`);
            neonText.style.setProperty('--delay', `${randomDelay}s`);
            neonText.style.setProperty('--pulse-speed', `${randomPulseSpeed}s`);
            neonText.style.setProperty('--min-opacity', randomMinOpacity);
            neonText.style.left = `${randomX}%`;
            neonText.style.top = `${randomY}%`;
            neonText.style.fontSize = `${randomSize}rem`;
            
            // Custom text shadow with the random color
            neonText.style.textShadow = `
                0 0 5px #fff,
                0 0 10px #fff,
                0 0 15px ${randomColor},
                0 0 20px ${randomColor},
                0 0 25px ${randomColor},
                0 0 30px ${randomColor},
                0 0 35px ${randomColor}
            `;
            
            overlay.appendChild(neonText);
        }
    }
}

// Create celebration effect when cake is clicked
function celebrateCakeClick() {
    // Create multiple hearts and sparkles
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const cakeRect = document.querySelector('.cake-image').getBoundingClientRect();
            const x = cakeRect.left + cakeRect.width/2 + (Math.random() - 0.5) * cakeRect.width;
            const y = cakeRect.top + cakeRect.height/2 + (Math.random() - 0.5) * cakeRect.height;
            createHeartParticle(x, y);
        }, i * 100);
    }
    
    // Note: Music play functionality has been removed as requested
}

// Add heart particles on click
document.addEventListener('click', function(e) {
    createHeartParticle(e.clientX, e.clientY);
});

function createHeartParticle(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'heartFloat 2s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 2000);
}

// Add CSS for heart float animation
const heartCSS = `
@keyframes heartFloat {
    0% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateY(-100px) scale(0.5);
    }
}
`;

const heartStyle = document.createElement('style');
heartStyle.textContent = heartCSS;
document.head.appendChild(heartStyle);



// Keyboard shortcuts for audio control
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // 'M' key to toggle music
        if (event.key === 'm' || event.key === 'M') {
            document.getElementById('musicToggle').click();
        }
        
        // Escape key to close letter if open or close magnify overlay
        if (event.key === 'Escape') {
            // Close letter if open
            const letter = document.getElementById('letter');
            const envelope = document.getElementById('envelope');
            if (letter && letter.classList.contains('visible')) {
                letter.classList.remove('visible');
                if (envelope) envelope.classList.remove('opened');
            }
            
            // Close magnify overlay if open
            const magnifyOverlay = document.querySelector('.magnify-overlay');
            const magnifiedCake = document.querySelector('.magnified-cake');
            if (magnifyOverlay && magnifyOverlay.classList.contains('active')) {
                magnifiedCake.classList.remove('active');
                // Remove all neon text elements when closing with Escape key
                document.querySelectorAll('.neon-text').forEach(el => el.remove());
                setTimeout(() => {
                    magnifyOverlay.classList.remove('active');
                }, 300);
            }
        }
        
        // Home key to scroll to top
        if (event.key === 'Home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// Scroll to Top Button
function initializeScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (!scrollTopBtn) {
        console.error('Scroll to top button not found in the DOM');
        return;
    }
    
    // Function to check scroll position and update button visibility
    function checkScrollPosition() {
        // Use either pageYOffset (older browsers) or scrollY (modern browsers)
        const scrollPosition = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
        
        if (scrollPosition > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', checkScrollPosition);
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Force check on page load and after a short delay
    checkScrollPosition();
    
    // Additional check after a delay to ensure it works in all environments
    setTimeout(checkScrollPosition, 500);
}

// Initialize Song Player
function initializeSongPlayer() {
    const playSongBtn = document.getElementById('playSongBtn');
    const songAudio = document.getElementById('songAudio');
    const nowPlaying = document.querySelector('.now-playing');
    
    if (!playSongBtn || !songAudio) {
        return;
    }
    
    let isPlaying = false;
    
    playSongBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (!isPlaying) {
            songAudio.play().then(() => {
                isPlaying = true;
                playSongBtn.classList.add('playing');
                playSongBtn.innerHTML = '<span class="play-icon">⏸</span>';
                if (nowPlaying) {
                    nowPlaying.classList.add('active');
                }
            }).catch(error => {
                console.log('Song playback failed:', error);
            });
        } else {
            songAudio.pause();
            isPlaying = false;
            playSongBtn.classList.remove('playing');
            playSongBtn.innerHTML = '<span class="play-icon">▶</span>';
            if (nowPlaying) {
                nowPlaying.classList.remove('active');
            }
        }
    });
    
    songAudio.addEventListener('ended', function() {
        isPlaying = false;
        playSongBtn.classList.remove('playing');
        playSongBtn.innerHTML = '<span class="play-icon">▶</span>';
        if (nowPlaying) {
            nowPlaying.classList.remove('active');
        }
    });
    
    // Observe song section for scroll animations
    const songSection = document.getElementById('songSection');
    if (songSection) {
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'sectionFadeIn 1.2s ease-out forwards';
                }
            });
        }, {
            root: null,
            rootMargin: '-10% 0px',
            threshold: 0.1
        });
        
        sectionObserver.observe(songSection);
    }
}