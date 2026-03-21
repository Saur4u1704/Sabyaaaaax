$(document).ready(function() {
    
    // ==================== HELPER FUNCTIONS ====================
    
    // Confetti helper function
    function shootConfetti(particleCount = 150, spread = 100, origin = { y: 0.6 }) {
        if (typeof confetti === 'function') {
            confetti({ 
                particleCount: particleCount, 
                spread: spread, 
                origin: origin, 
                colors: ['#ff66cc', '#ff44aa', '#ff99ff', '#ffc0cb'] 
            });
        } else if (typeof canvasConfetti === 'function') {
            canvasConfetti({ particleCount: particleCount, spread: spread, origin: origin });
        } else {
            for (let i = 0; i < particleCount/10; i++) {
                setTimeout(() => createHeart(), i * 20);
            }
        }
    }
    
    // Floating hearts
    function createHeart() {
        let heart = document.createElement("div");
        heart.classList.add("heart");
        const icons = ["❤️", "💖", "💗", "💓", "🌸", "✨", "💕"];
        heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 22 + 12) + "px";
        heart.style.animationDuration = (Math.random() * 4 + 4) + "s";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }
    
    // Flowers generator
    function createFlower() {
        let flower = document.createElement("div");
        flower.className = "flower";
        const flowers = ["🌸", "🌼", "🌻", "🌺", "🌷", "💮", "🏵️", "🌸"];
        flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = Math.random() * 100 + "vw";
        flower.style.fontSize = (Math.random() * 25 + 20) + "px";
        flower.style.animationDuration = (Math.random() * 5 + 5) + "s";
        document.body.appendChild(flower);
        setTimeout(() => flower.remove(), 7500);
    }
    
    // Custom typing function
    function typeMessage(element, messages, index = 0) {
        if (index >= messages.length) return;
        
        let currentText = "";
        let message = messages[index];
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < message.length) {
                currentText += message[charIndex];
                element.html(currentText + '<span class="typed-cursor">|</span>');
                charIndex++;
                setTimeout(typeChar, 70);
            } else {
                setTimeout(() => {
                    element.html(currentText);
                    typeMessage(element, messages, index + 1);
                }, 800);
            }
        }
        
        typeChar();
    }
    
    // Start floating hearts interval
    setInterval(createHeart, 800);
    
    // ==================== PORTAL SECTION ====================
    $('.portal-circle').click(function() {
        $('#portal').fadeOut(1000, function() {
            $('#chat').fadeIn(1800);
        });
        
        let messages = [
            "✨ Hey... remember our very first conversation? 💬",
            "That random 'Hi' changed the whole universe for me.",
            "I didn't know that day...",
            "...that you'd become my forever person ❤️",
            "6 magical years later... and my heart still chooses YOU, Sabya."
        ];
        
        let idx = 0;
        function showNextMessage() {
            if (idx < messages.length) {
                $('#chatArea').append("<div class='bubble'>✨ " + messages[idx] + " ✨</div>");
                idx++;
                setTimeout(showNextMessage, 2100);
            } else {
                setTimeout(() => {
                    $('#chat').fadeOut(1800, function() {
                        $('#storm').fadeIn(1800);
                    });
                }, 2500);
            }
        }
        showNextMessage();
    });
    
    // ==================== LIFE BUTTON SECTION ====================
    $('#lifeBtn').click(function() {
        $('#storm').addClass("life-bg");
        shootConfetti(180, 120, { y: 0.6 });
        let flowerInterval = setInterval(createFlower, 200);
        
        $('#storm h2').fadeOut(300, function() {
            $(this).text("🌸 You turned my storms into a beautiful garden 🌸").fadeIn(500);
        });
        
        setTimeout(() => {
            clearInterval(flowerInterval);
            shootConfetti(250, 110, { y: 0.5 });
            $('#storm').fadeOut(1200, function() {
                $('#gallery').fadeIn(1500);
                $('.heart-img').each(function(i) {
                    setTimeout(() => {
                        $(this).css('transform', 'scale(1.03)');
                        setTimeout(() => $(this).css('transform', ''), 350);
                    }, i * 80);
                });
            });
        }, 3200);
    });
    
    // ==================== GALLERY NEXT BUTTON ====================
    $('.nextBtn').click(function() {
        shootConfetti(200, 80, { y: 0.5 });
        $('#gallery').fadeOut(1000, function() {
            $('#lock').fadeIn(1200);
        });
    });
    
    // ==================== UNLOCK SECTION ====================
    $('#unlockBtn').click(function() {
        let val = $('#secretInput').val().trim().toLowerCase();
        if (val === "sabya" || val === "sabyax" || val === "sabyaa" || val === "sabya❤️" || val === "sabya x") {
            $('#lock').fadeOut(1000, function() {
                $('#final').fadeIn(1300);
            });
            
            $('#nameSky').css('display', 'block').fadeIn(1500);
            
            setTimeout(() => {
                const messages = [
                    "✨ SABYA ❤️ ✨",
                    "You are my today...",
                    "...and all my tomorrows.",
                    "Happiest Birthday Sabyaaaaaax 🎂❤️✨"
                ];
                typeMessage($('#typed-output'), messages, 0);
            }, 500);
            
            shootConfetti(450, 140, { y: 0.7 });
            startLiveCounter("2020-03-01");
            
            setTimeout(() => {
                $('#final').fadeOut(2000, function() {
                    $('#celebration').fadeIn(2800);
                    for(let i = 0; i < 30; i++) setTimeout(() => createHeart(), i * 100);
                    shootConfetti(350, 130, { y: 0.5 });
                });
            }, 9000);
        } else {
            $('#error').text("🌸 Only my special queen holds this key... try your sweet nickname 🌸");
            $('#secretInput').val('').focus();
        }
    });
    
    // ==================== LIVE COUNTER ====================
    function startLiveCounter(startDate) {
        setInterval(() => {
            let start = new Date(startDate);
            let now = new Date();
            let diff = now - start;
            let days = Math.floor(diff / (1000 * 60 * 60 * 24));
            let hours = Math.floor((diff % (86400000)) / (3600000));
            let minutes = Math.floor((diff % 3600000) / 60000);
            let seconds = Math.floor((diff % 60000) / 1000);
            
            $('#counter').html(
                "💞 Together for 💞<br>" +
                "<span style='font-size:2rem; font-weight:bold;'>" + days + "</span> days &nbsp;" +
                hours + "h " + minutes + "m " + seconds + "s"
            );
        }, 1000);
    }
    
    // ==================== CANDLE BLOWING ====================
    let candleBlown = false;
    
    $('#candle').click(function() {
        if (!candleBlown) {
            candleBlown = true;
            
            $('#candleFlame').addClass('candle-extinguished');
            $('#candleFlame').css('animation', 'none');
            $('#wishMessage').html("🎉✨ Your wish has been sent to the stars! ✨🎉");
            $('#romanticHint').html("💖 May all your dreams come true, my love 💖");
            
            shootConfetti(500, 180, { y: 0.5 });
            setTimeout(() => shootConfetti(400, 150, { y: 0.6 }), 200);
            setTimeout(() => shootConfetti(300, 120, { y: 0.4 }), 400);
            
            for(let i = 0; i < 50; i++) {
                setTimeout(() => createHeart(), i * 50);
            }
            for(let i = 0; i < 30; i++) {
                setTimeout(() => createFlower(), i * 80);
            }
            
            $('body').append('<div style="position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); font-size:3rem; z-index:10000; animation:fadeOutUp 2s forwards; pointer-events:none;">💨✨🎂✨💨</div>');
            
            $('#wishMessage').css('animation', 'pulse 0.5s ease');
            setTimeout(() => $('#wishMessage').css('animation', ''), 500);
        }
    });
    
    // ==================== LOVE MESSAGE & MUSIC ====================
    $('#playLoveMsg').click(function() {
        let music = document.getElementById("bgMusic");
        music.play().then(() => {
            music.volume = 0.55;
        }).catch(e => console.log("Playback needs user interaction"));
        
        shootConfetti(500, 150, { y: 0.5 });
        setTimeout(() => shootConfetti(300, 120, { y: 0.3 }), 200);
        
        $('#loveMsg').fadeIn(800).html(
            "💖 My Dearest Sabya, 💖<br><br>" +
            "From the moment you walked into my life, every color became brighter, every song sweeter.<br>" +
            "You are my peace in chaos, my laughter in storms, my forever home. 🌈<br><br>" +
            "These 6 years with you have been the most beautiful chapter of my existence.<br>" +
            "I will always, always choose YOU — in every universe, in every lifetime. 💫<br><br>" +
            "✨ Happiest Birthday, my bestfrannnddd, my love, my everything! ✨<br>" +
            "🎂 May your day be filled with magic, joy, and all the love you deserve. 🎂❤️"
        );
        
        for (let i = 0; i < 60; i++) {
            setTimeout(() => createHeart(), i * 70);
        }
    });
    
    // ==================== HEART IMAGE INTERACTIONS ====================
    $('.heart-img').on('click', function() {
        shootConfetti(40, 45, { x: 0.5, y: 0.5 });
        $(this).css('transform', 'scale(1.05)');
        setTimeout(() => $(this).css('transform', ''), 300);
    });
    
    // ==================== INITIALIZE AUDIO ====================
    let audioElem = document.getElementById("bgMusic");
    audioElem.pause();
    audioElem.currentTime = 0;
    
    // Add fadeOutUp animation style if not already present
    if (!$('#fadeOutUpStyle').length) {
        $('head').append('<style id="fadeOutUpStyle">@keyframes fadeOutUp { 0% { opacity: 1; transform: translate(-50%,-50%) scale(1); } 100% { opacity: 0; transform: translate(-50%,-100%) scale(1.5); } }</style>');
    }
});