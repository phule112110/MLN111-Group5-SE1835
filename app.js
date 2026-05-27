const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBSfHz4UmCwEdw3ema6rEZKGjeaSkzol00",
    authDomain: "classtruggle-arena.firebaseapp.com",
    databaseURL: "https://classtruggle-arena-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "classtruggle-arena",
    storageBucket: "classtruggle-arena.firebasestorage.app",
    messagingSenderId: "450580113626",
    appId: "1:450580113626:web:17941c5c8443257b681de3",
    measurementId: "G-WTMCQGW8RQ"
};

try {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(FIREBASE_CONFIG);
    }
} catch (err) {
    console.error("Firebase failed to initialize:", err);
}

/* ==========================================================================
   DIALECTICAL RETRO SOUND SYNTHESIZER (WEB AUDIO API)
   ========================================================================== */
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.mutedMusic = false;
        this.mutedSfx = false;
        this.bgOsc = null;
        this.bgGain = null;
        this.musicInterval = null;
        this.tempo = 400; // ms
        
        // Pentatonic minor scales in Hz (cosmic philosophical feel)
        this.scale = [146.83, 164.81, 196.00, 220.00, 261.63, 293.66, 329.63, 392.00]; // D minor pentatonic notes
    }

    init() {
        if (this.ctx) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.startMusic();
        } catch (e) {
            console.error("Web Audio API not supported on this browser:", e);
        }
    }

    playClick() {
        if (this.mutedSfx || !this.ctx) return;
        this.ctx.resume();
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
    }

    playTick() {
        if (this.mutedSfx || !this.ctx) return;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    playCorrect() {
        if (this.mutedSfx || !this.ctx) return;
        this.ctx.resume();
        
        const now = this.ctx.currentTime;
        // Harmonic major sweep
        const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        
        frequencies.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.07);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.15, now + i * 0.07 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.3);

            osc.start(now + i * 0.07);
            osc.stop(now + i * 0.07 + 0.3);
        });
    }

    playWrong() {
        if (this.mutedSfx || !this.ctx) return;
        this.ctx.resume();
        
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const noise = this.ctx.createOscillator(); // Simple detune sweep instead of noise buffer
        const gain = this.ctx.createGain();
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.5);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.5);

        osc.start();
        osc.stop(now + 0.5);
    }

    playAttack() {
        if (this.mutedSfx || !this.ctx) return;
        this.ctx.resume();
        
        const now = this.ctx.currentTime;
        
        // Laser charge
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.05, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);

        // Explosion blast
        const oscBlast = this.ctx.createOscillator();
        const gainBlast = this.ctx.createGain();
        oscBlast.connect(gainBlast);
        gainBlast.connect(this.ctx.destination);

        oscBlast.type = 'triangle';
        oscBlast.frequency.setValueAtTime(100, now + 0.3);
        oscBlast.frequency.exponentialRampToValueAtTime(30, now + 0.8);

        gainBlast.gain.setValueAtTime(0, now);
        gainBlast.gain.setValueAtTime(0.25, now + 0.3);
        gainBlast.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        oscBlast.start(now + 0.3);
        oscBlast.stop(now + 0.8);
    }

    playLevelUp() {
        if (this.mutedSfx || !this.ctx) return;
        this.ctx.resume();
        
        const now = this.ctx.currentTime;
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // Beautiful C Major Arpeggio
        
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.4);
        });
    }

    playVictory() {
        if (this.mutedSfx || !this.ctx) return;
        this.ctx.resume();
        
        const now = this.ctx.currentTime;
        // Standard retro victory tune
        const melody = [523.25, 523.25, 523.25, 523.25, 659.25, 587.33, 659.25, 783.99, 1046.50];
        const durations = [0.15, 0.15, 0.15, 0.4, 0.4, 0.15, 0.15, 0.15, 0.8];
        let cumulativeTime = 0;

        melody.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + cumulativeTime);
            
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.12, now + cumulativeTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + cumulativeTime + durations[idx]);

            osc.start(now + cumulativeTime);
            osc.stop(now + cumulativeTime + durations[idx]);
            cumulativeTime += durations[idx] + 0.03;
        });
    }

    startMusic() {
        if (this.mutedMusic || !this.ctx || this.musicInterval) return;
        
        this.bgGain = this.ctx.createGain();
        this.bgGain.connect(this.ctx.destination);
        this.bgGain.gain.setValueAtTime(0.012, this.ctx.currentTime); // Super soft volume

        let noteIdx = 0;
        this.musicInterval = setInterval(() => {
            if (this.mutedMusic || !this.ctx) return;
            
            // Random slowly evolving notes
            const roll = Math.random();
            if (roll > 0.4) {
                const note = this.scale[Math.floor(Math.random() * this.scale.length)];
                const osc = this.ctx.createOscillator();
                
                osc.connect(this.bgGain);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(note / 2, this.ctx.currentTime); // Low octaves
                
                osc.start();
                
                // Extremely long slow fade out
                osc.frequency.exponentialRampToValueAtTime(note / 2 + (Math.random() * 4 - 2), this.ctx.currentTime + 3.0);
                
                const noteGain = this.ctx.createGain();
                osc.disconnect(this.bgGain);
                osc.connect(noteGain);
                noteGain.connect(this.bgGain);
                
                noteGain.gain.setValueAtTime(0, this.ctx.currentTime);
                noteGain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 1.0);
                noteGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.0);
                
                osc.stop(this.ctx.currentTime + 3.0);
            }
        }, this.tempo * 3);
    }

    stopMusic() {
        if (this.musicInterval) {
            clearInterval(this.musicInterval);
            this.musicInterval = null;
        }
        if (this.bgGain) {
            this.bgGain.disconnect();
            this.bgGain = null;
        }
    }
}

const AudioPlayer = new SoundEngine();


/* ==========================================================================
   DIALECTICAL PARTICLE BACKGROUND ENGINE
   ========================================================================== */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 60;
const NEON_COLORS = [
    'rgba(239, 68, 68, 0.4)',  // red
    'rgba(6, 182, 212, 0.4)',  // cyan
    'rgba(245, 158, 11, 0.4)', // gold
    'rgba(139, 92, 246, 0.4)'  // purple
];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
        this.connectionRadius = 140;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections (Dialectical linking)
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < particles[i].connectionRadius) {
                const alpha = (1 - dist / particles[i].connectionRadius) * 0.08;
                ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();


/* ==========================================================================
   CLASS HIERARCHY DEFINITION & DYNAMIC SVGS
   ========================================================================== */
const CLASS_RANKS = [
    {
        title: "Vô Sản",
        subtitle: "Proletariat",
        minPoints: 0,
        baseDmg: 15,
        color: "var(--neon-red)",
        hexColor: "#ef4444",
        badgeClass: "red-glow",
        avatarSvg: `<svg class="class-avatar-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.57.65L12 6.22l2 2v2H12l-3.57-3.57A10 10 0 0 0 2 12c0 2.2.71 4.22 1.91 5.86L6.5 15.3l1.41 1.41-2.59 2.59c1.64 1.2 3.66 1.91 5.86 1.91a10 10 0 0 0 9.35-6.43l-3.57-3.57-2 2h-2v-2l3.57-3.57A10 10 0 0 0 12 2zM9 13v2H7v-2h2zm4 0v2h-2v-2h2zm4 0v2h-2v-2h2z"/></svg>`,
        description: "Lực lượng lao động cơ bản. Sát thương tiêu chuẩn: 15 HP."
    },
    {
        title: "Tiểu Tư Sản",
        subtitle: "Petty Bourgeoisie",
        minPoints: 20,
        baseDmg: 18,
        color: "var(--neon-cyan)",
        hexColor: "#06b6d4",
        badgeClass: "cyan-glow",
        avatarSvg: `<svg class="class-avatar-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.7 13.35L20.7 14.35L18.65 12.3L19.65 11.3C19.86 11.09 20.21 11.09 20.42 11.3L21.7 12.58C21.91 12.79 21.91 13.14 21.7 13.35M12 18.94L18.06 12.88L20.11 14.93L14.06 21H12V18.94M12 14C10.9 14 10 13.1 10 12S10.9 10 12 10 14 10.9 14 12 13.1 14 12 14M12 8C10.9 8 10 7.1 10 6S10.9 4 12 4 14 4.9 14 6 13.1 8 12 8M6 14C4.9 14 4 13.1 4 12S4.9 10 6 10 8 10.9 8 12 7.1 14 6 14M6 8C4.9 8 4 7.1 4 6S4.9 4 6 4 8 4.9 8 6 7.1 8 6 8Z"/></svg>`,
        description: "Nhóm tiểu tư hữu tự kinh doanh, tri thức sắc bén. Sát thương ngòi bút tăng: 18 HP."
    },
    {
        title: "Tư Sản",
        subtitle: "Bourgeoisie",
        minPoints: 40,
        baseDmg: 15,
        color: "var(--neon-purple)",
        hexColor: "#a855f7",
        badgeClass: "purple-glow",
        avatarSvg: `<svg class="class-avatar-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.58 20 4 16.42 4 12S7.58 4 12 4 20 7.58 20 12 16.42 20 12 20M12 6C9.79 6 8 7.79 8 10S9.79 14 12 14 16 12.21 16 10 14.21 6 12 6M12 12C10.9 12 10 11.1 10 10S10.9 8 12 8 14 8.9 14 10 13.1 12 12 12M7 15C7 15 9.5 17 12 17S17 15 17 15C17 15 14.5 18 12 18S7 15 7 15Z"/></svg>`,
        description: "Tích lũy tư bản hùng mạnh. Nhận passive **Lá chắn tư bản** (giảm 25% sát thương nhận vào)."
    },
    {
        title: "Trí Thức Cách Mạng",
        subtitle: "Revolutionary Intellectual",
        minPoints: 60,
        baseDmg: 15,
        color: "var(--neon-green)",
        hexColor: "#10b981",
        badgeClass: "green-glow",
        avatarSvg: `<svg class="class-avatar-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17 12C17 11.45 16.55 11 16 11H8C7.45 11 7 11.45 7 12S7.45 13 8 13H16C16.55 13 17 12.55 17 12M16 15H8C7.45 15 7 15.45 7 16S7.45 17 8 17H16C16.55 17 17 16.55 17 16M19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3M19 19H5V5H19V19M16 7H8C7.45 7 7 7.45 7 8S7.45 9 8 9H16C16.55 9 17 8.55 17 8S16.55 7 16 7Z"/></svg>`,
        description: "Nhận thức sâu sắc quy luật xã hội. Có **25% cơ hội tung Đòn chí mạng** (Gây x1.8 sát thương)."
    },
    {
        title: "Triết Gia",
        subtitle: "Philosopher",
        minPoints: 80,
        baseDmg: 25,
        color: "var(--neon-gold)",
        hexColor: "#f59e0b",
        badgeClass: "gold-glow",
        avatarSvg: `<svg class="class-avatar-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L1 21H23L12 2M12 6L18.8 18H5.2L12 6M12 9C10.3 9 9 10.3 9 12S10.3 15 12 15 15 13.7 15 12 13.7 9 12 9M12 13C11.4 13 11 12.6 11 12S11.4 11 12 11 13 11.4 13 12 12.6 13 12 13Z"/></svg>`,
        description: "Đạt đến đỉnh cao Triết học. Sát thương cơ bản: 25 HP. Nhận **Tổng hợp Biện chứng**: Hồi 5 HP mỗi khi đánh trúng."
    }
];

function getClassRank(points) {
    for (let i = CLASS_RANKS.length - 1; i >= 0; i--) {
        if (points >= CLASS_RANKS[i].minPoints) {
            return { rankIndex: i, rank: CLASS_RANKS[i] };
        }
    }
    return { rankIndex: 0, rank: CLASS_RANKS[0] };
}


/* ==========================================================================
   DEFAULT PHILOSOPHICAL QUESTIONS BANK (VIETNAMESE)
   ========================================================================== */
const DEFAULT_QUESTIONS = [
    {
        text: "Định nghĩa giai cấp của V.I. Lênin được trình bày lần đầu tiên trong tác phẩm nào sau đây?",
        options: [
            "Tuyên ngôn của Đảng Cộng sản",
            "Sáng kiến vĩ đại",
            "Nhà nước và cách mạng",
            "Hệ tư tưởng Đức"
        ],
        correct: 1,
        explanation: "Kế thừa và phát triển tư tưởng của C. Mác và Ph. Ăngghen, V.I. Lênin đã đưa ra định nghĩa khoa học về giai cấp trong tác phẩm Sáng kiến vĩ đại."
    },
    {
        text: "Theo triết học Mác - Lênin, dấu hiệu chủ yếu và quyết định nhất đến địa vị kinh tế - xã hội của các giai cấp là gì?",
        options: [
            "Nghề nghiệp và mức thu nhập",
            "Quan hệ tổ chức, quản lý sản xuất",
            "Quan hệ sở hữu đối với tư liệu sản xuất",
            "Trình độ học vấn và địa vị chính trị"
        ],
        correct: 2,
        explanation: "Quan hệ đối với tư liệu sản xuất là quan hệ cơ bản và chủ yếu nhất quyết định trực tiếp đến địa vị kinh tế - xã hội của các giai cấp, qua đó quyết định giai cấp nào là thống trị, bóc lột."
    },
    {
        text: "Nguồn gốc trực tiếp dẫn đến sự xuất hiện của giai cấp trong lịch sử nhân loại là gì?",
        options: [
            "Sự phân công lao động xã hội ngày càng đa dạng",
            "Sự xuất hiện của \"của dư\" trong xã hội",
            "Các cuộc chiến tranh cướp bóc giữa các bộ lạc",
            "Sự xuất hiện chế độ tư hữu về tư liệu sản xuất"
        ],
        correct: 3,
        explanation: "Sự xuất hiện chế độ tư hữu về tư liệu sản xuất thay thế cho chế độ công hữu nguyên thủy là cơ sở, nguồn gốc trực tiếp đưa tới sự ra đời của giai cấp."
    },
    {
        text: "Kết cấu xã hội - giai cấp ở bất kỳ thời kỳ lịch sử nào cũng bao gồm những thành phần nào?",
        options: [
            "Giai cấp thống trị, giai cấp bị trị và nhà nước",
            "Giai cấp cơ bản, giai cấp không cơ bản và tầng lớp xã hội trung gian",
            "Giai cấp tư sản, giai cấp vô sản và tầng lớp trí thức",
            "Giai cấp chủ nô, giai cấp địa chủ và giai cấp tư sản"
        ],
        correct: 1,
        explanation: "Trong một kết cấu xã hội - giai cấp bao giờ cũng bao gồm hai giai cấp cơ bản, những giai cấp không cơ bản, hoặc các tầng lớp xã hội trung gian."
    },
    {
        text: "Giai cấp cơ bản trong kết cấu xã hội - giai cấp được hiểu là:",
        options: [
            "Giai cấp gắn liền với phương thức sản xuất mầm mống",
            "Giai cấp gắn liền với phương thức sản xuất tàn dư",
            "Giai cấp không có địa vị kinh tế độc lập",
            "Giai cấp đại diện cho phương thức sản xuất thống trị"
        ],
        correct: 3,
        explanation: "Giai cấp cơ bản là giai cấp gắn với phương thức sản xuất thống trị, là sản phẩm của chính những phương thức sản xuất thống trị nhất định sinh ra."
    },
    {
        text: "Thực chất của đấu tranh giai cấp trong xã hội có giai cấp đối kháng là gì?",
        options: [
            "Cuộc đấu tranh của quần chúng lao động bị áp bức, bóc lột chống lại giai cấp áp bức, bóc lột",
            "Sự cạnh tranh quyền lực chính trị giữa các đảng phái",
            "Cuộc đấu tranh vì sự công bằng trong giáo dục và y tế",
            "Cuộc đấu tranh giữa các quốc gia, dân tộc trên thế giới"
        ],
        correct: 0,
        explanation: "Thực chất của đấu tranh giai cấp là cuộc đấu tranh của quần chúng lao động bị áp bức, bóc lột chống lại giai cấp áp bức, bóc lột do sự đối lập về lợi ích không thể dung hòa."
    },
    {
        text: "Đấu tranh giai cấp đóng vai trò gì đối với sự phát triển của xã hội có giai cấp đối kháng?",
        options: [
            "Là hiện tượng tiêu cực làm cản trở văn minh phát triển",
            "Là nguyên nhân làm sụp đổ các giá trị đạo đức con người",
            "Là động lực trực tiếp thúc đẩy sự phát triển của lịch sử",
            "Là một hiện tượng xã hội ngẫu nhiên không có tính quy luật"
        ],
        correct: 2,
        explanation: "Trong xã hội có giai cấp, đấu tranh giai cấp là động lực trực tiếp, quan trọng của lịch sử và là đòn bẩy vĩ đại của cuộc cách mạng xã hội."
    },
    {
        text: "Trước khi giành được chính quyền, giai cấp vô sản tiến hành đấu tranh giai cấp dưới ba hình thức cơ bản nào?",
        options: [
            "Đấu tranh kinh tế, đấu tranh văn hóa, đấu tranh vũ trang",
            "Đấu tranh kinh tế, đấu tranh chính trị, đấu tranh tư tưởng",
            "Đấu tranh ngoại giao, đấu tranh nghị trường, đấu tranh vũ trang",
            "Đấu tranh tư tưởng, đấu tranh pháp lý, đấu tranh báo chí"
        ],
        correct: 1,
        explanation: "Khi tổng kết thực tiễn phong trào đấu tranh của giai cấp vô sản khi chưa giành chính quyền, C. Mác và Ph. Ăngghen đã chỉ ra ba hình thức đấu tranh cơ bản là đấu tranh kinh tế, đấu tranh chính trị và đấu tranh tư tưởng."
    },
    {
        text: "Trong các hình thức đấu tranh của giai cấp vô sản trước khi giành chính quyền, hình thức nào được coi là cao nhất và có ý nghĩa quyết định?",
        options: [
            "Đấu tranh kinh tế",
            "Đấu tranh tư tưởng",
            "Đấu tranh nghị trường",
            "Đấu tranh chính trị"
        ],
        correct: 3,
        explanation: "Đấu tranh chính trị là hình thức đấu tranh cao nhất của giai cấp vô sản nhằm giành chính quyền, đồng thời nó có ý nghĩa quyết định đến thắng lợi của giai cấp vô sản."
    },
    {
        text: "Mục đích cao nhất mà một cuộc đấu tranh giai cấp cần đạt được là gì?",
        options: [
            "Đánh đổ một giai cấp thống trị cụ thể",
            "Cải thiện điều kiện sống hằng ngày cho người lao động",
            "Giải phóng lực lượng sản xuất khỏi sự kìm hãm của quan hệ sản xuất lỗi thời",
            "Phá bỏ mọi thứ vũ khí bạo lực trong xã hội"
        ],
        correct: 2,
        explanation: "Mục đích cao nhất mà một cuộc đấu tranh giai cấp cần đạt được là giải phóng lực lượng sản xuất khỏi sự kìm hãm của những quan hệ sản xuất đã lỗi thời, tạo điều kiện đẩy nhanh sự phát triển xã hội."
    },
    {
        text: "Trong lịch sử xã hội loài người, các hình thức cộng đồng người đã phát triển theo trình tự từ thấp đến cao nào sau đây?",
        options: [
            "Bộ lạc -> Thị tộc -> Bộ tộc -> Dân tộc",
            "Thị tộc -> Bộ tộc -> Bộ lạc -> Dân tộc",
            "Thị tộc -> Bộ lạc -> Bộ tộc -> Dân tộc",
            "Bộ tộc -> Thị tộc -> Bộ lạc -> Dân tộc"
        ],
        correct: 2,
        explanation: "Lịch sử phát triển của xã hội loài người là lịch sử phát triển của các hình thức cộng đồng người từ thấp đến cao gồm: thị tộc, bộ lạc, bộ tộc và dân tộc."
    },
    {
        text: "Hình thức cộng đồng người nào dưới đây được hình thành không theo huyết thống mà bước đầu dựa trên những mối liên hệ về kinh tế, lãnh thổ và văn hóa?",
        options: [
            "Thị tộc",
            "Bộ lạc",
            "Bộ tộc",
            "Dòng họ"
        ],
        correct: 2,
        explanation: "Với sự ra đời của bộ tộc, lần đầu tiên trong lịch sử nhân loại xuất hiện một cộng đồng người không theo huyết thống mà dựa trên những mối liên hệ về kinh tế, lãnh thổ và văn hóa."
    },
    {
        text: "Triết học Mác - Lênin xác định dân tộc có bao nhiêu đặc trưng cơ bản gắn kết hữu cơ với nhau?",
        options: [
            "3",
            "4",
            "5",
            "6"
        ],
        correct: 2,
        explanation: "Dân tộc có 5 đặc trưng cơ bản là: lãnh thổ thống nhất; ngôn ngữ thống nhất; nền kinh tế thống nhất; văn hóa và tâm lý bền vững; nhà nước và pháp luật thống nhất."
    },
    {
        text: "Trong các đặc trưng của dân tộc, đặc trưng nào đóng vai trò là cơ sở vật chất, làm tăng tính ổn định và bền vững của cộng đồng dân tộc?",
        options: [
            "Lãnh thổ thống nhất",
            "Ngôn ngữ thống nhất",
            "Vấn đề văn hóa và tâm lý bền vững", // wait, let's keep user's option: "Văn hóa và tâm lý bền vững"
            "Nền kinh tế thống nhất"
        ],
        correct: 3,
        explanation: "Nền kinh tế thống nhất đóng vai trò là cơ sở vật chất và là sức mạnh của dân tộc, đảm bảo cho dân tộc tồn tại, phát triển ổn định."
    },
    {
        text: "Đặc trưng cơ bản nào dùng để phân biệt quốc gia - dân tộc với cộng đồng tộc người (dân tộc thiểu số)?",
        options: [
            "Có chung một vùng lãnh thổ",
            "Có chung ngôn ngữ giao tiếp",
            "Có một nhà nước và pháp luật thống nhất",
            "Có nét văn hóa độc đáo"
        ],
        correct: 2,
        explanation: "Có một nhà nước và pháp luật thống nhất là đặc trưng cơ bản để phân biệt quốc gia - dân tộc với các cộng đồng tộc người đa số hay thiểu số trong quốc gia đó."
    },
    {
        text: "Ở các nước châu Âu, quá trình hình thành dân tộc thường diễn ra gắn liền với sự hình thành và phát triển của:",
        options: [
            "Chủ nghĩa cộng sản",
            "Chế độ phong kiến",
            "Chủ nghĩa tư bản",
            "Chế độ chiếm hữu nô lệ"
        ],
        correct: 2,
        explanation: "Ở châu Âu, sự ra đời của các dân tộc gắn liền với cuộc cách mạng tư sản và phương thức sản xuất tư bản chủ nghĩa."
    },
    {
        text: "Yếu tố nào tạo nên tính đặc thù trong sự hình thành dân tộc Việt Nam từ hàng nghìn năm trước?",
        options: [
            "Sự hình thành dân tộc gắn liền với sự ra đời của chủ nghĩa tư bản",
            "Sự đồng hóa các bộ tộc của giai cấp tư sản do yêu cầu thị trường",
            "Gắn liền với nhu cầu dựng nước, giữ nước, chống ngoại xâm và cải tạo thiên nhiên",
            "Do sự hợp nhất tự nguyện của các vương quốc phong kiến lân cận"
        ],
        correct: 2,
        explanation: "Sự hình thành dân tộc Việt Nam có tính đặc thù cao vì gắn liền với nhu cầu dựng nước, giữ nước, đấu tranh chống ngoại xâm và cải tạo thiên nhiên (trị thủy)."
    },
    {
        text: "Trong mối quan hệ giữa giai cấp và dân tộc, yếu tố nào quyết định tính chất và khuynh hướng phát triển của dân tộc?",
        options: [
            "Tầng lớp trí thức",
            "Quan hệ giai cấp",
            "Sự đa dạng văn hóa",
            "Các tổ chức quốc tế"
        ],
        correct: 1,
        explanation: "Quan hệ giai cấp quyết định khuynh hướng phát triển và tính chất của dân tộc; giai cấp thống trị trong xã hội cũng quy định tính chất của dân tộc đó."
    },
    {
        text: "Vận dụng sáng tạo quan điểm của chủ nghĩa Mác - Lênin vào các nước thuộc địa, Chủ tịch Hồ Chí Minh đã khẳng định chân lý gì về mối quan hệ giữa dân tộc và giai cấp?",
        options: [
            "Đấu tranh giải phóng giai cấp là tiền đề để giải phóng dân tộc",
            "Đấu tranh giải phóng dân tộc là điều kiện, tiền đề cho đấu tranh giải phóng giai cấp",
            "Giai cấp và dân tộc là hai phạm trù không có tác động qua lại lẫn nhau",
            "Phải chờ cách mạng vô sản ở chính quốc thành công thì thuộc địa mới được giải phóng"
        ],
        correct: 1,
        explanation: "Ở các nước thuộc địa và phụ thuộc, con đường giải phóng giai cấp tất yếu phải đi từ giải phóng dân tộc. Giải phóng dân tộc là tiền đề để đi đến giải phóng giai cấp."
    },
    {
        text: "Nội dung chủ yếu của cuộc đấu tranh giai cấp ở Việt Nam trong thời kỳ quá độ hiện nay là gì?",
        options: [
            "Lật đổ ách thống trị của giai cấp tư sản",
            "Đấu tranh vũ trang chống lại các thế lực phong kiến",
            "Thực hiện thắng lợi sự nghiệp công nghiệp hóa, hiện đại hóa theo định hướng xã hội chủ nghĩa",
            "Triệt tiêu hoàn toàn các thành phần kinh tế tư nhân"
        ],
        correct: 2,
        explanation: "Nội dung chủ yếu của cuộc đấu tranh giai cấp ở Việt Nam hiện nay là thực hiện thắng lợi sự nghiệp công nghiệp hóa, hiện đại hóa theo định hướng xã hội chủ nghĩa, khắc phục tình trạng nước kém phát triển và thực hiện công bằng xã hội."
    }
];


/* ==========================================================================
   GAME ENGINE STATE & CONFIGURATION
   ========================================================================== */
class GameEngine {
    constructor() {
        this.teams = [];
        this.questions = [];
        this.currentRound = 1;
        this.activeTeamIdx = 0;
        this.activeQuestionIdx = 0;
        
        // Settings
        this.initialHp = 100;
        this.questionTime = 30; // seconds
        this.attackDamage = 15;
        this.timeoutHpPenalty = 15;
        this.pointsMultiplier = 1.0;
        this.autoShowAnswer = false;
        this.autoNextQuestion = false;
        this.customRulesText = "";
        
        // Timer references
        this.timerInterval = null;
        this.autoNextTimer = null;
        this.timeLeft = 0;
        this.selectedOptionIdx = null;
        this.answerConfirmed = false;
        this.currentResponses = {};
        
        // Preset team colors (swatches)
        this.colorPresets = [
            '#ef4444', // Red (Vô sản/Đấu tranh)
            '#06b6d4', // Cyan (Duy vật biện chứng)
            '#a855f7', // Purple (Quý tộc/Lý luận)
            '#10b981', // Green (Tiến bộ cách mạng)
            '#f59e0b', // Gold (Triết học tinh hoa)
            '#ec4899', // Pink (Tương lai cách tân)
            '#3b82f6', // Blue (Duy tâm khách quan)
            '#f43f5e', // Rose (Cách mạng đỏ tươi)
            '#14b8a6', // Teal (Biện chứng sinh thái)
            '#84cc16'  // Lime (Nhân văn tiến bộ)
        ];
    }

    init() {
        this.loadQuestions();
        this.loadSettings();
        
        // Check if page is opened in Client Mode
        const urlParams = new URLSearchParams(window.location.search);
        const clientRoom = urlParams.get('room');
        if (clientRoom) {
            this.initClientMode(clientRoom);
            return;
        }

        this.setupEventListeners();
        this.renderSetupTeams();
        this.applyCustomRulesText();
        this.updateAutoNextQuestionUI();
        this.updateQuestionManagerList();
        
        // Set initial sound states
        document.getElementById('toggle-music').classList.add('active');
        document.getElementById('toggle-sfx').classList.add('active');
    }

    loadSettings() {
        const storedHp = localStorage.getItem('classtruggle_initialHp');
        if (storedHp) this.initialHp = parseInt(storedHp);
        const storedTime = localStorage.getItem('classtruggle_questionTime');
        if (storedTime) this.questionTime = parseInt(storedTime);
        const storedDamage = localStorage.getItem('classtruggle_attackDamage');
        if (storedDamage) this.attackDamage = parseInt(storedDamage);
        const storedPenalty = localStorage.getItem('classtruggle_timeoutHpPenalty');
        if (storedPenalty) this.timeoutHpPenalty = parseInt(storedPenalty);
        const storedMultiplier = localStorage.getItem('classtruggle_pointsMultiplier');
        if (storedMultiplier) this.pointsMultiplier = parseFloat(storedMultiplier);
        else this.pointsMultiplier = 1.0;
        const storedAutoShow = localStorage.getItem('classtruggle_autoShowAnswer');
        if (storedAutoShow) this.autoShowAnswer = storedAutoShow === 'true';
        else this.autoShowAnswer = false;
        const storedAutoNext = localStorage.getItem('classtruggle_autoNextQuestion');
        if (storedAutoNext) this.autoNextQuestion = storedAutoNext === 'true';
        else this.autoNextQuestion = false;
        const storedRules = localStorage.getItem('classtruggle_customRulesText');
        if (storedRules !== null) this.customRulesText = storedRules;
        else this.customRulesText = "";
    }

    saveSettings() {
        localStorage.setItem('classtruggle_initialHp', this.initialHp);
        localStorage.setItem('classtruggle_questionTime', this.questionTime);
        localStorage.setItem('classtruggle_attackDamage', this.attackDamage);
        localStorage.setItem('classtruggle_timeoutHpPenalty', this.timeoutHpPenalty);
        localStorage.setItem('classtruggle_pointsMultiplier', this.pointsMultiplier);
        localStorage.setItem('classtruggle_autoShowAnswer', this.autoShowAnswer);
        localStorage.setItem('classtruggle_autoNextQuestion', this.autoNextQuestion);
        localStorage.setItem('classtruggle_customRulesText', this.customRulesText);
    }

    applyCustomRulesText() {
        const container = document.querySelector('.rules-container');
        if (!container) return;
        if (this.customRulesText && this.customRulesText.trim() !== "") {
            container.innerHTML = `
                <div style="font-size: 13px; line-height: 1.6; color: var(--text-primary); white-space: pre-wrap; padding: 10px 15px; width: 100%;">
                    ${this.customRulesText}
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="rule-item">
                    <div class="rule-icon info-icon">i</div>
                    <div class="rule-text">
                        <strong>Trả Lời Đúng (+10 Điểm):</strong> Trở thành chủ thể lịch sử, nhận quyền <strong>Tấn Công (-15 HP)</strong> một đối thủ bất kỳ.
                    </div>
                </div>
                <div class="rule-item">
                    <div class="rule-icon warning-icon">!</div>
                    <div class="rule-text">
                        <strong>Trả Lời Sai (-10 HP):</strong> Bị "Lệch lạc tư tưởng", suy giảm lực lượng và mất trực tiếp sinh mệnh.
                    </div>
                </div>
                <div class="rule-item">
                    <div class="rule-icon star-icon">★</div>
                    <div class="rule-text">
                        <strong>Thăng Cấp Giai Cấp:</strong> Tích lũy Điểm Đấu Tranh để tự động thăng cấp giai cấp: Vô Sản ➔ Tiểu Tư Sản ➔ Tư Sản ➔ Trí Thức ➔ Triết Gia để mở khóa các Buff bá đạo.
                    </div>
                </div>
            `;
        }
    }

    updateAutoNextQuestionUI() {
        const dot = document.getElementById('auto-next-indicator-dot');
        const txt = document.getElementById('auto-next-indicator-text');
        const btn = document.getElementById('host-toggle-auto-next');
        if (!dot || !txt) return;
        
        if (this.autoNextQuestion) {
            dot.style.background = '#10b981'; // Green
            txt.innerText = "TỰ ĐỘNG QUA: BẬT";
            btn.style.borderColor = '#10b981';
        } else {
            dot.style.background = '#ef4444'; // Red
            txt.innerText = "TỰ ĐỘNG QUA: TẮT";
            btn.style.borderColor = 'rgba(255,255,255,0.1)';
        }
        
        // Also sync the settings modal checkbox
        const settingsCheckbox = document.getElementById('settings-auto-next-question');
        if (settingsCheckbox) {
            settingsCheckbox.checked = this.autoNextQuestion;
        }
    }

    returnToSetup() {
        AudioPlayer.playClick();
        if (this.timerInterval) clearInterval(this.timerInterval);
        if (this.autoNextTimer) clearInterval(this.autoNextTimer);
        
        // Clean up Firebase listeners and state
        if (this.firebaseRef) {
            this.firebaseRef.child('players').off();
            this.firebaseRef.child('responses').off();
            this.firebaseRef.child('battleLogs').off();
            // Reset state to lobby so anyone remaining knows
            this.firebaseRef.update({
                state: 'lobby',
                questionActive: false
            });
        }
        
        // Hide all screens, show Setup
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('setup-screen').classList.add('active');
        
        // Reset local engine state
        this.state = 'setup';
        this.currentRound = 1;
        this.activeQuestionIdx = 0;
        this.answerConfirmed = false;
        
        // Hide Back to Home button on Setup
        document.getElementById('btn-back-to-home').classList.add('hide');
        
        // Re-render setup
        if (this.isMultiDevice) {
            // Keep remote checked
            document.getElementById('enable-multi-device').checked = true;
            // Set Left Setup Card title
            document.getElementById('setup-left-title').innerText = "CÁC NGƯỜI CHƠI ĐÃ THAM GIA";
            document.getElementById('setup-left-desc').innerText = "Người chơi quét mã QR hoặc nhập link ở bên phải để tham gia cuộc chiến lịch sử.";
            document.getElementById('teams-input-list').classList.add('hide');
            document.getElementById('add-team-btn').classList.add('hide');
            document.getElementById('setup-players-lobby').classList.remove('hide');
            
            // Re-listen for connections
            const roomCode = this.roomCode;
            this.firebaseRef = firebase.database().ref('rooms/' + roomCode);
            this.firebaseRef.child('players').on('value', (snapshot) => {
                const playersData = snapshot.val() || {};
                this.teams = Object.keys(playersData).map((name, idx) => {
                    const p = playersData[name];
                    return {
                        id: p.id !== undefined ? p.id : idx,
                        name: p.name,
                        hp: p.hp,
                        maxHp: p.maxHp,
                        points: p.points,
                        rankIndex: p.rankIndex,
                        isEliminated: p.isEliminated,
                        color: p.color
                    };
                });
                this.renderSetupLobbyPlayers();
            });
        } else {
            document.getElementById('enable-multi-device').checked = false;
            this.renderSetupTeams();
        }
        
        this.logBattle("[HỆ THỐNG] Đã quay trở về phòng thiết lập.");
    }

    checkAllPlayersAnswered() {
        if (this.state !== 'quiz' || this.answerConfirmed) return;
        
        const activePlayers = this.teams.filter(t => !t.isEliminated);
        if (activePlayers.length === 0) return;
        
        const responses = this.currentResponses || {};
        const answeredCount = activePlayers.filter(p => responses[p.name] !== undefined).length;
        
        if (this.isMultiDevice) {
            document.getElementById('active-team-name').innerText = `ĐẤU SĨ (ĐÃ TRẢ LỜI: ${answeredCount}/${activePlayers.length})`;
        }
        
        // Update reveal-answer-btn state/visibility
        const revealBtn = document.getElementById('reveal-answer-btn');
        if (answeredCount === activePlayers.length) {
            // Write correctAnswerIdx and explanationText to Firebase, and set questionActive to false
            // so that client pages immediately show the correct answer after everyone has answered!
            const q = this.shuffledQuestions[this.activeQuestionIdx];
            if (q) {
                this.firebaseRef.update({
                    questionActive: false,
                    correctAnswerIdx: q.correct,
                    explanationText: q.explanation || "Luận điểm Mác - Lênin chuẩn xác."
                });
            }

            if (this.autoShowAnswer) {
                // Automatically reveal answer
                this.revealBattleRoyaleExplanation();
            } else {
                // Show manual reveal button
                revealBtn.classList.remove('hide');
                // Stop the countdown timer because everyone has already answered
                clearInterval(this.timerInterval);
            }
        } else {
            revealBtn.classList.add('hide');
        }
    }

    /* ----------------------------------------------------------------------
       QUESTION DATABASE MANAGEMENTS (Local Storage)
       ---------------------------------------------------------------------- */
    loadQuestions() {
        const stored = localStorage.getItem('classtruggle_questions');
        if (stored) {
            try {
                this.questions = JSON.parse(stored);
            } catch (e) {
                console.error("Error parsing stored questions, loading default bank", e);
                this.questions = [...DEFAULT_QUESTIONS];
            }
        } else {
            this.questions = [...DEFAULT_QUESTIONS];
            this.saveQuestionsToStorage();
        }
        document.getElementById('total-questions-count').innerText = this.questions.length;
    }

    saveQuestionsToStorage() {
        localStorage.setItem('classtruggle_questions', JSON.stringify(this.questions));
        document.getElementById('total-questions-count').innerText = this.questions.length;
    }

    resetToDefaultQuestions() {
        if (confirm("Bạn có chắc chắn muốn khôi phục danh sách câu hỏi mặc định không? Các câu hỏi tự soạn sẽ bị xóa!")) {
            this.questions = [...DEFAULT_QUESTIONS];
            this.saveQuestionsToStorage();
            this.updateQuestionManagerList();
            this.logBattle("[HỆ THỐNG] Ngân hàng câu hỏi đã được khôi phục về trạng thái lý luận mặc định.");
            AudioPlayer.playClick();
        }
    }

    addCustomQuestion(text, a, b, c, d, correct, explanation) {
        const newQ = {
            text: text,
            options: [a, b, c, d],
            correct: parseInt(correct),
            explanation: explanation || ""
        };
        this.questions.push(newQ);
        this.saveQuestionsToStorage();
        this.updateQuestionManagerList();
        this.logBattle(`[HỆ THỐNG] Đã bổ sung câu hỏi lý luận mới thành công.`);
        AudioPlayer.playLevelUp();
    }

    deleteQuestion(idx) {
        if (this.questions.length <= 5) {
            alert("Không thể xóa. Cần duy trì tối thiểu 5 câu hỏi trong ngân hàng để vận hành game.");
            return;
        }
        this.questions.splice(idx, 1);
        this.saveQuestionsToStorage();
        this.updateQuestionManagerList();
        AudioPlayer.playClick();
    }

    parseWordQuestions(rawText) {
        if (!rawText || rawText.trim() === "") {
            alert("Tệp Word không chứa văn bản nào hoặc không thể đọc được nội dung!");
            return;
        }

        // Standardize unicode spaces (non-breaking spaces, thin spaces, etc.) to standard spaces
        rawText = rawText.replace(/[\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]/g, ' ');

        const lines = rawText.split(/\r?\n/);
        const parsedQuestions = [];
        let currentQuestion = null;
        let lastOptionIndex = null;
        let parsingField = null; // 'text', 'option', 'explanation'

        for (let line of lines) {
            line = line.trim();
            if (!line) continue;

            // 1. Check if it's a new question
            // Support optional prefix (Câu/Question/Q) followed by digits and punctuation (:, ., /, -) or space
            const qMatch = line.match(/^\s*(?:Câu|Question|Q)?\s*(\d+)[:.\/\-\s]+(.*)/i);
            if (qMatch) {
                if (currentQuestion) {
                    parsedQuestions.push(currentQuestion);
                }
                currentQuestion = {
                    text: qMatch[2].trim(),
                    options: [],
                    correct: null,
                    explanation: ''
                };
                lastOptionIndex = null;
                parsingField = 'text';
                continue;
            }

            // 2. Check if it's the correct answer
            const ansMatch = line.match(/^\s*(?:Đáp án đúng|Đáp án|ĐA|Key|Chọn|Chọn đáp án đúng)\s*(?:là)?\s*[:\-\s]*([A-D])(?:\.|\s|$)/i);
            if (ansMatch && currentQuestion) {
                const correctLetter = ansMatch[1].toUpperCase();
                currentQuestion.correct = correctLetter.charCodeAt(0) - 65;
                parsingField = 'correct';
                continue;
            }

            // 3. Check if it's an explanation
            const expMatch = line.match(/^\s*(?:Giải thích|Lời giải|Lý giải)\s*[:\-\s]*(.*)/i);
            if (expMatch && currentQuestion) {
                currentQuestion.explanation = expMatch[1].trim();
                parsingField = 'explanation';
                continue;
            }

            // 4. Check if the line contains options (handles both same-line and multiline options)
            // Regex to find option patterns: e.g. A. Option value or B: Option value or C) Option value
            const optionRegex = /(?:^|\s+)([A-D])\s*[:.\/)\-]+\s*(.*?)(?=\s+[A-D]\s*[:.\/)\-]+\s*|$)/gi;
            const optMatches = [...line.matchAll(optionRegex)];

            if (optMatches.length > 0 && currentQuestion) {
                optMatches.forEach(match => {
                    const optLetter = match[1].toUpperCase();
                    const optIndex = optLetter.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
                    currentQuestion.options[optIndex] = match[2].trim();
                    lastOptionIndex = optIndex;
                });
                parsingField = 'option';
                continue;
            }

            // 5. It's a continuation line (append to the active field)
            if (currentQuestion) {
                if (parsingField === 'text') {
                    currentQuestion.text += " " + line;
                } else if (parsingField === 'option' && lastOptionIndex !== null) {
                    currentQuestion.options[lastOptionIndex] += " " + line;
                } else if (parsingField === 'explanation') {
                    currentQuestion.explanation += " " + line;
                }
            }
        }

        // Push the last question
        if (currentQuestion) {
            parsedQuestions.push(currentQuestion);
        }

        // Validate and clean up parsed questions
        const validQuestions = [];
        let skippedCount = 0;

        parsedQuestions.forEach((q, idx) => {
            const hasText = q.text && q.text.trim() !== '';
            const has4Options = q.options && q.options.length === 4 && q.options.every(opt => opt && opt.trim() !== '');
            const hasCorrect = q.correct !== null && q.correct >= 0 && q.correct <= 3;

            if (hasText && has4Options && hasCorrect) {
                validQuestions.push({
                    text: q.text.trim(),
                    options: q.options.map(opt => opt.trim()),
                    correct: q.correct,
                    explanation: q.explanation ? q.explanation.trim() : ""
                });
            } else {
                skippedCount++;
                console.warn(`Bỏ qua câu hỏi không hợp lệ ở vị trí thứ ${idx + 1}:`, q);
            }
        });

        const totalFound = parsedQuestions.length;
        const totalValid = validQuestions.length;

        if (totalValid === 0) {
            alert(
                `Không thể tìm thấy câu hỏi hợp lệ nào trong tệp Word!\n\n` +
                `Tìm thấy tổng cộng: ${totalFound} khối văn bản dạng câu hỏi.\n` +
                `Số lượng câu hỏi hợp lệ: 0.\n\n` +
                `Vui lòng kiểm tra lại cấu trúc file Word theo đúng định dạng mẫu:\n` +
                `- Câu 1: [Nội dung]\n` +
                `- A. [Lựa chọn A]\n` +
                `- B. [Lựa chọn B]\n` +
                `- C. [Lựa chọn C]\n` +
                `- D. [Lựa chọn D]\n` +
                `- Đáp án đúng: [A/B/C/D]`
            );
            return;
        }

        // Prompt the user for Append vs. Overwrite
        const mode = confirm(
            `Đọc thành công tệp Word!\n` +
            `- Tìm thấy: ${totalFound} câu hỏi.\n` +
            `- Hợp lệ (Nạp thành công): ${totalValid} câu hỏi.\n` +
            `- Bị bỏ qua (Thiếu thông tin/lỗi định dạng): ${skippedCount} câu.\n\n` +
            `Bấm [OK] để GỘP THÊM ${totalValid} câu này vào ngân hàng câu hỏi hiện tại.\n` +
            `Bấm [CANCEL] để GHI ĐÈ (Xóa toàn bộ câu cũ và thay bằng ${totalValid} câu này).`
        );

        if (mode) {
            this.questions = [...this.questions, ...validQuestions];
            this.logBattle(`[HỆ THỐNG] Đã nhập gộp thêm ${totalValid} câu hỏi từ tệp tin Word.`);
        } else {
            this.questions = validQuestions;
            this.logBattle(`[HỆ THỐNG] Đã ghi đè toàn bộ ngân hàng bằng ${totalValid} câu hỏi mới từ tệp tin Word.`);
        }

        this.saveQuestionsToStorage();
        this.updateQuestionManagerList();
        AudioPlayer.playLevelUp();
        alert(`Đã nạp thành công ${totalValid} câu hỏi từ Word vào trò chơi!`);
    }


    /* ----------------------------------------------------------------------
       TEAMS SETUP AND MANAGE
       ---------------------------------------------------------------------- */
    renderSetupTeams() {
        // Preset with 4 default classroom groups
        const defaultNames = ["Nhóm Vô Sản", "Nhóm Duy Vật", "Nhóm Biện Chứng", "Nhóm Triết Học"];
        const container = document.getElementById('teams-input-list');
        container.innerHTML = '';

        for (let i = 0; i < 4; i++) {
            this.addTeamInputRow(defaultNames[i], this.colorPresets[i % this.colorPresets.length]);
        }
    }

    addTeamInputRow(name = "", selectedColor = "#ef4444") {
        const container = document.getElementById('teams-input-list');
        const rowCount = container.children.length;
        if (rowCount >= 10) {
            alert("Số đội tham chiến tối đa là 10 đội.");
            return;
        }

        const row = document.createElement('div');
        row.className = 'team-input-row';
        row.dataset.index = rowCount;

        // Number Label
        const numLabel = document.createElement('span');
        numLabel.className = 'team-number';
        numLabel.innerText = `${String(rowCount + 1).padStart(2, '0')}.`;
        row.appendChild(numLabel);

        // Text Input
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.placeholder = `Tên Đội ${rowCount + 1}`;
        textInput.value = name || `Đội ${rowCount + 1}`;
        textInput.maxLength = 20;
        row.appendChild(textInput);

        // Color Picker Swatches
        const swatchContainer = document.createElement('div');
        swatchContainer.className = 'color-picker-box';
        
        this.colorPresets.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = `color-swatch ${color === selectedColor ? 'selected' : ''}`;
            swatch.style.backgroundColor = color;
            swatch.style.color = color;
            
            swatch.addEventListener('click', () => {
                swatchContainer.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
                swatch.classList.add('selected');
                AudioPlayer.playClick();
            });
            swatchContainer.appendChild(swatch);
        });
        row.appendChild(swatchContainer);

        // Delete row button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-team-btn';
        removeBtn.innerHTML = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12z"/></svg>`;
        removeBtn.addEventListener('click', () => {
            if (container.children.length <= 2) {
                alert("Đấu trường biện chứng cần tối thiểu 2 đội để tiến hành đấu tranh!");
                return;
            }
            row.remove();
            this.recalculateTeamNumbers();
            AudioPlayer.playClick();
        });
        row.appendChild(removeBtn);

        container.appendChild(row);
    }

    recalculateTeamNumbers() {
        const container = document.getElementById('teams-input-list');
        Array.from(container.children).forEach((row, idx) => {
            row.dataset.index = idx;
            row.querySelector('.team-number').innerText = `${String(idx + 1).padStart(2, '0')}.`;
        });
    }

    /* ----------------------------------------------------------------------
       GAME STATE TRANSITIONS
       ---------------------------------------------------------------------- */
    startGame() {
        AudioPlayer.init(); // Initialize audio context on first main interaction

        const isMulti = document.getElementById('enable-multi-device').checked;
        if (isMulti) {
            if (typeof firebase === 'undefined') {
                alert("Không thể tải thư viện Firebase hoặc thiết bị không có internet! Vui lòng chơi ở chế độ Offline (Bỏ chọn điều khiển từ xa).");
                return;
            }
            if (this.teams.length < 2) {
                alert("Đấu trường sinh tồn cần tối thiểu 2 đấu sĩ để bắt đầu!");
                return;
            }

            // Unbind lobby players listener on setup page
            this.firebaseRef.child('players').off();

            // Apply compact layout to the arena grid to comfortably support up to 40 players!
            document.getElementById('teams-grid').classList.add('compact');

            // Hide setup-screen and show game-screen
            document.getElementById('setup-screen').classList.remove('active');
            document.getElementById('game-screen').classList.add('active');

            // Listen for continuous updates of players during gameplay
            this.firebaseRef.child('players').on('value', (snapshot) => {
                const playersData = snapshot.val() || {};
                // Sync local teams
                this.teams = this.teams.map(t => {
                    const pd = playersData[t.name];
                    if (pd) {
                        t.hp = pd.hp;
                        t.points = pd.points;
                        t.rankIndex = pd.rankIndex;
                        t.isEliminated = pd.isEliminated;
                    }
                    return t;
                });
                
                this.renderArenaTeams();
                
                if (this.checkGameEnded()) {
                    this.endGame();
                }
            });

            // Listen for battle logs during gameplay
            this.firebaseRef.child('battleLogs').on('value', (snapshot) => {
                const logs = snapshot.val() || [];
                const container = document.getElementById('battle-logs');
                container.innerHTML = '';
                logs.forEach(log => {
                    const div = document.createElement('div');
                    div.className = 'log-entry';
                    div.innerText = log;
                    if (log.includes('SAI') || log.includes('mất') || log.includes('đào thải')) div.className += ' incorrect';
                    if (log.includes('ĐÚNG') || log.includes('thắng') || log.includes('TẤN CÔNG')) div.className += ' correct';
                    container.appendChild(div);
                });
                container.scrollTop = container.scrollHeight;
            });

            if (this.questions.length === 0) {
                alert("Ngân hàng câu hỏi trống! Hãy khôi phục mặc định trong mục quản lý câu hỏi.");
                return;
            }

            // Shuffle questions
            this.shuffledQuestions = [...this.questions];
            this.shuffleArray(this.shuffledQuestions);

            this.currentRound = 1;
            this.state = 'quiz';
            this.activeQuestionIdx = 0;

            this.logBattleRoyale(`[HỆ THỐNG] ĐẤU TRƯỜNG SINH TỒN KHỞI CHẠY VỚI ${this.teams.length} ĐẤU SĨ!`);
            
            // Push room state as started
            this.firebaseRef.update({
                state: 'quiz',
                currentQuestionIdx: 0,
                questionActive: true,
                timeoutHpPenalty: this.timeoutHpPenalty || 15
            });

            AudioPlayer.playLevelUp();
            this.nextBattleRoyaleQuestion();
            return;
        }

        // Offline path: extract values from team-input-row inputs
        const inputs = document.querySelectorAll('.team-input-row');
        this.teams = [];

        inputs.forEach((row, idx) => {
            const name = row.querySelector('input[type="text"]').value.trim() || `Đội ${idx + 1}`;
            const selectedSwatch = row.querySelector('.color-swatch.selected');
            const color = selectedSwatch ? selectedSwatch.style.backgroundColor : this.colorPresets[idx % this.colorPresets.length];
            
            this.teams.push({
                id: idx,
                name: name,
                color: color,
                hp: this.initialHp,
                maxHp: this.initialHp,
                points: 0,
                rankIndex: 0,
                isEliminated: false
            });
        });

        if (this.questions.length === 0) {
            alert("Ngân hàng câu hỏi trống! Hãy khôi phục mặc định trong mục quản lý câu hỏi.");
            return;
        }

        // Shuffle questions to ensure unpredictability
        this.shuffledQuestions = [...this.questions];
        this.shuffleArray(this.shuffledQuestions);

        this.currentRound = 1;
        this.activeTeamIdx = 0;
        this.activeQuestionIdx = 0;

        this.state = 'quiz';

        // Interface adjustments
        document.getElementById('setup-screen').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');

        this.logBattle(`[HỆ THỐNG] ĐẤU TRƯỜNG BIỆN CHỨNG BẮT ĐẦU!`);
        this.teams.forEach(t => {
            this.logBattle(`- [Gia nhập] Đội '${t.name}' khởi điểm dưới tư cách: Giai Cấp Vô Sản (HP: ${t.hp})`);
        });

        AudioPlayer.playLevelUp();
        this.nextQuestion();
    }

    nextQuestion() {
        this.answerConfirmed = false;
        this.selectedOptionIdx = null;

        // Find next non-eliminated team
        let attempts = 0;
        while (this.teams[this.activeTeamIdx].isEliminated && attempts < this.teams.length) {
            this.activeTeamIdx = (this.activeTeamIdx + 1) % this.teams.length;
            attempts++;
            if (this.activeTeamIdx === 0 && attempts < this.teams.length) {
                this.currentRound++;
            }
        }

        // If all teams eliminated or only one left, end game
        if (this.checkGameEnded()) {
            this.endGame();
            return;
        }

        // Update Round Badge
        document.getElementById('current-round').innerText = this.currentRound;

        const currentTeam = this.teams[this.activeTeamIdx];
        const teamNameSpan = document.getElementById('active-team-name');
        teamNameSpan.innerText = currentTeam.name;
        teamNameSpan.style.backgroundColor = currentTeam.color;
        teamNameSpan.style.boxShadow = `0 0 10px ${currentTeam.color}`;

        // Get Question
        const q = this.shuffledQuestions[this.activeQuestionIdx];
        document.getElementById('question-text').innerText = q.text;

        // Render Options
        const optContainer = document.getElementById('options-container');
        optContainer.innerHTML = '';

        q.options.forEach((opt, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            const btn = document.createElement('button');
            btn.className = 'option-btn glass-panel';
            btn.dataset.index = idx;
            btn.innerHTML = `
                <span class="option-letter">${letter}</span>
                <span class="option-value">${opt}</span>
            `;
            btn.addEventListener('click', () => this.selectOption(idx));
            optContainer.appendChild(btn);
        });

        // Hide combat alerts
        document.getElementById('combat-instruction').classList.add('hidden');
        document.getElementById('show-explanation-btn').classList.add('hide');
        document.getElementById('next-turn-btn').classList.add('hide');
        document.getElementById('confirm-answer-btn').classList.remove('hide');
        document.getElementById('confirm-answer-btn').disabled = true;

        this.renderArenaTeams();

        // Start Timer
        this.startTimer();

        if (this.isMultiDevice) {
            this.firebaseRef.update({
                state: 'quiz',
                activeTeam: this.teams[this.activeTeamIdx].name,
                teams: this.teams.map(t => ({
                    id: t.id,
                    name: t.name,
                    hp: t.hp,
                    maxHp: t.maxHp,
                    points: t.points,
                    rankIndex: t.rankIndex,
                    isEliminated: t.isEliminated,
                    color: t.color
                })),
                selectedAnswers: {},
                attackTarget: null
            });

            // Listen for active client answer submission
            this.firebaseRef.child('selectedAnswers').on('value', (snapshot) => {
                const answers = snapshot.val() || {};
                const activeTeamName = this.teams[this.activeTeamIdx].name;
                if (answers[activeTeamName] !== undefined && !this.answerConfirmed && this.state === 'quiz') {
                    const selectedIdx = parseInt(answers[activeTeamName]);
                    
                    // Unbind listener
                    this.firebaseRef.child('selectedAnswers').off();
                    
                    this.selectOption(selectedIdx);
                    
                    // Add a tiny delay to make the select action visible on host before confirming
                    setTimeout(() => {
                        this.confirmAnswer();
                    }, 800);
                }
            });
        }
    }

    selectOption(idx) {
        if (this.answerConfirmed || this.state !== 'quiz') return;

        this.selectedOptionIdx = idx;
        AudioPlayer.playClick();

        const btns = document.querySelectorAll('.option-btn');
        btns.forEach(btn => {
            btn.classList.remove('selected');
            if (parseInt(btn.dataset.index) === idx) {
                btn.classList.add('selected');
            }
        });

        document.getElementById('confirm-answer-btn').disabled = false;
    }

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);

        this.timeLeft = this.questionTime;
        const timerBar = document.getElementById('timer-bar');
        const timerText = document.getElementById('timer-text');

        timerBar.style.width = '100%';
        timerText.innerText = `${this.timeLeft}s`;

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            timerText.innerText = `${this.timeLeft}s`;
            timerBar.style.width = `${(this.timeLeft / this.questionTime) * 100}%`;

            if (this.timeLeft <= 5 && this.timeLeft > 0) {
                AudioPlayer.playTick();
            }

            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.timeOutAnswer();
            }
        }, 1000);
    }

    confirmAnswer() {
        if (this.selectedOptionIdx === null || this.answerConfirmed) return;
        
        if (this.isMultiDevice) {
            this.firebaseRef.child('selectedAnswers').off();
        }
        
        clearInterval(this.timerInterval);
        this.answerConfirmed = true;
        this.state = 'evaluating';

        const currentTeam = this.teams[this.activeTeamIdx];
        const q = this.shuffledQuestions[this.activeQuestionIdx];
        const isCorrect = this.selectedOptionIdx === q.correct;

        const btns = document.querySelectorAll('.option-btn');
        btns.forEach(btn => {
            const btnIdx = parseInt(btn.dataset.index);
            btn.disabled = true;
            if (btnIdx === q.correct) {
                btn.classList.add('correct');
            } else if (btnIdx === this.selectedOptionIdx) {
                btn.classList.add('incorrect');
            }
        });

        document.getElementById('confirm-answer-btn').classList.add('hide');

        if (isCorrect) {
            this.handleCorrectAnswer(currentTeam, q);
        } else {
            this.handleWrongAnswer(currentTeam, q);
        }

        // Show Explanation Button if there is one
        if (q.explanation) {
            const expBtn = document.getElementById('show-explanation-btn');
            expBtn.classList.remove('hide');
            expBtn.disabled = false;
            expBtn.onclick = () => {
                document.getElementById('explanation-content').innerText = q.explanation;
                document.getElementById('explanation-modal').classList.add('active');
                AudioPlayer.playClick();
            };
        }
    }

    timeOutAnswer() {
        this.answerConfirmed = true;
        this.state = 'evaluating';
        
        const currentTeam = this.teams[this.activeTeamIdx];
        const q = this.shuffledQuestions[this.activeQuestionIdx];

        const btns = document.querySelectorAll('.option-btn');
        btns.forEach(btn => {
            btn.disabled = true;
            if (parseInt(btn.dataset.index) === q.correct) {
                btn.classList.add('correct');
            }
        });

        document.getElementById('confirm-answer-btn').classList.add('hide');

        // Penalty for timeout
        const penalty = this.timeoutHpPenalty || 15;
        currentTeam.hp -= penalty;
        if (currentTeam.hp < 0) currentTeam.hp = 0;

        this.logBattle(`[CÂU HỎI] Hết giờ! Đội '${currentTeam.name}' không có phản hồi và bị mất ${penalty} HP do 'chậm trễ nhận thức lịch sử'.`, 'incorrect');
        AudioPlayer.playWrong();

        this.checkElimination(currentTeam);
        this.renderArenaTeams();

        // Show Next Turn Button
        document.getElementById('next-turn-btn').classList.remove('hide');
    }

    handleCorrectAnswer(team, question) {
        AudioPlayer.playCorrect();
        
        const ptsEarned = 10;
        team.points += ptsEarned;
        
        this.logBattle(`[LUẬN ĐIỂM] Đội '${team.name}' trả lời ĐÚNG! Nhận +${ptsEarned} Điểm Đấu Tranh.`, 'correct');

        // Check upgrade
        const oldRankIdx = team.rankIndex;
        const upgradeCheck = getClassRank(team.points);
        if (upgradeCheck.rankIndex > oldRankIdx) {
            team.rankIndex = upgradeCheck.rankIndex;
            this.logBattle(`🌟 THĂNG CẤP LỊCH SỬ! Đội '${team.name}' đã vươn lên thành giai cấp: ${upgradeCheck.rank.title}!`, 'upgrade');
            AudioPlayer.playLevelUp();
        }

        // Check if there are enemies to attack
        const activeEnemies = this.teams.filter(t => t.id !== team.id && !t.isEliminated);
        if (activeEnemies.length > 0) {
            // Initiate Combat targeting state
            this.state = 'combat_choice';
            
            document.getElementById('attacker-name').innerText = team.name;
            document.getElementById('combat-instruction').classList.remove('hidden');

            // Set targeting visual filters on teams list
            this.renderArenaTeams();

            if (this.isMultiDevice) {
                this.firebaseRef.update({
                    state: 'combat',
                    attacker: team.name,
                    teams: this.teams.map(t => ({
                        id: t.id,
                        name: t.name,
                        hp: t.hp,
                        maxHp: t.maxHp,
                        points: t.points,
                        rankIndex: t.rankIndex,
                        isEliminated: t.isEliminated,
                        color: t.color
                    }))
                });

                // Listen for attack targets from client
                this.firebaseRef.child('attackTarget').on('value', (snapshot) => {
                    const attack = snapshot.val();
                    if (attack && attack.attacker === team.name && attack.target !== undefined) {
                        const targetId = parseInt(attack.target);
                        
                        // Unbind listener
                        this.firebaseRef.child('attackTarget').off();
                        
                        this.executeAttack(targetId);
                    }
                });
            }
        } else {
            // No enemies to attack (highly unusual but handled)
            document.getElementById('next-turn-btn').classList.remove('hide');
        }
    }

    handleWrongAnswer(team, question) {
        AudioPlayer.playWrong();
        const penalty = 10;
        team.hp -= penalty;
        if (team.hp < 0) team.hp = 0;

        const letter = String.fromCharCode(65 + this.selectedOptionIdx);
        this.logBattle(`[LỆCH LẠC] Đội '${team.name}' trả lời SAI (Đáp án chọn: ${letter}). Bị trừ ${penalty} HP do lệch lạc tư tưởng.`, 'incorrect');

        this.checkElimination(team);
        this.renderArenaTeams();

        // Move to next turn directly
        document.getElementById('next-turn-btn').classList.remove('hide');
    }

    /* ----------------------------------------------------------------------
       COMBAT MECHANICS
       ---------------------------------------------------------------------- */
    executeAttack(targetId) {
        if (this.state !== 'combat_choice') return;

        if (this.isMultiDevice) {
            this.firebaseRef.child('attackTarget').off();
            this.firebaseRef.child('attackTarget').set(null);
        }

        const attacker = this.teams[this.activeTeamIdx];
        const target = this.teams.find(t => t.id === targetId);

        if (!target || target.isEliminated) return;

        AudioPlayer.playAttack();

        // Calculate Damage based on Attacker Class Spec and custom settings base damage
        let baseDmgSetting = this.attackDamage || 15;
        let dmg = baseDmgSetting;
        if (attacker.rankIndex === 1) {
            dmg = Math.round(baseDmgSetting * 1.2);
        } else if (attacker.rankIndex === 4) {
            dmg = Math.round(baseDmgSetting * 1.67);
        }
        let isCrit = false;

        // Specs:
        // Rank 3 (Intellectual) -> 25% Critical chance (1.8x damage)
        if (attacker.rankIndex === 3 && Math.random() < 0.25) {
            dmg = Math.round(dmg * 1.8);
            isCrit = true;
        }

        // Rank 4 (Philosopher) -> Base 25 damage, heals 5 HP
        if (attacker.rankIndex === 4) {
            attacker.hp += 5;
            if (attacker.hp > attacker.maxHp) attacker.hp = attacker.maxHp;
            this.logBattle(`🧬 [TỔNG HỢP BIỆN CHỨNG] Triết gia '${attacker.name}' tự hồi phục 5 HP khi tấn công.`, 'success');
        }

        // Apply target shielding
        // Rank 2 (Bourgeoisie) -> reduces incoming damage by 25%
        let damageReduced = 0;
        if (target.rankIndex >= 2) {
            const originalDmg = dmg;
            dmg = Math.round(dmg * 0.75);
            damageReduced = originalDmg - dmg;
        }

        // Apply damage to target
        target.hp -= dmg;
        if (target.hp < 0) target.hp = 0;

        // Logging events
        let combatLog = `💥 ĐẤU TRANH: '${attacker.name}' (${CLASS_RANKS[attacker.rankIndex].title}) tấn công '${target.name}' (${CLASS_RANKS[target.rankIndex].title}) gây ${dmg} sát thương!`;
        if (isCrit) combatLog += ` (ĐÒN CHÍ MẠNG LÝ LUẬN!)`;
        if (damageReduced > 0) combatLog += ` (Lá chắn tư bản của đối thủ hấp thụ ${damageReduced} sát thương)`;
        
        this.logBattle(combatLog, 'damage');

        // Check if target is eliminated
        this.checkElimination(target);

        // Update view
        this.state = 'evaluating';
        document.getElementById('combat-instruction').classList.add('hidden');
        
        this.renderArenaTeams();

        // Show Next Turn Button
        document.getElementById('next-turn-btn').classList.remove('hide');

        // Check if game has ended
        if (this.checkGameEnded()) {
            document.getElementById('next-turn-btn').classList.add('hide');
            setTimeout(() => this.endGame(), 2000);
        }
    }

    checkElimination(team) {
        if (team.hp <= 0 && !team.isEliminated) {
            team.isEliminated = true;
            this.logBattle(`💀 [XÓA BỎ LỊCH SỬ] Đội '${team.name}' đã cạn kiệt sinh lực đấu tranh và bị loại khỏi dòng chảy phát triển xã hội!`, 'eliminated');
        }
    }

    nextTurn() {
        if (this.checkGameEnded()) {
            this.endGame();
            return;
        }

        // Progress question index
        this.activeQuestionIdx = (this.activeQuestionIdx + 1) % this.shuffledQuestions.length;
        
        // Progress team index
        this.activeTeamIdx = (this.activeTeamIdx + 1) % this.teams.length;

        this.state = 'quiz';
        this.nextQuestion();
    }

    checkGameEnded() {
        const aliveTeams = this.teams.filter(t => !t.isEliminated);
        return aliveTeams.length <= 1;
    }

    endGame() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.state = 'ended';

        if (this.isMultiDevice) {
            this.firebaseRef.update({
                state: 'ended',
                teams: this.teams.map(t => ({
                    id: t.id,
                    name: t.name,
                    hp: t.hp,
                    maxHp: t.maxHp,
                    points: t.points,
                    rankIndex: t.rankIndex,
                    isEliminated: t.isEliminated,
                    color: t.color
                }))
            });
        }

        AudioPlayer.playVictory();

        document.getElementById('game-screen').classList.remove('active');
        document.getElementById('winner-screen').classList.add('active');

        // Find winner (the survivor with highest points/HP)
        const alive = this.teams.filter(t => !t.isEliminated);
        let winner = null;

        if (alive.length === 1) {
            winner = alive[0];
        } else {
            // Sort by HP, then points if all eliminated
            const sortedAll = [...this.teams].sort((a,b) => b.hp - a.hp || b.points - a.points);
            winner = sortedAll[0];
        }

        // Render Winner Hero Card
        const winnerCard = document.getElementById('winner-card');
        const winnerClass = CLASS_RANKS[winner.rankIndex];
        winnerCard.innerHTML = `
            <div class="winner-team-name gold-glow" style="color: ${winner.color}">${winner.name}</div>
            <div class="winner-team-class">${winnerClass.title.toUpperCase()}</div>
            <div class="class-avatar-box" style="color: ${winner.color}; border-color: ${winner.color}; width: 60px; height: 60px; margin-top: 15px;">
                ${winnerClass.avatarSvg}
            </div>
            <p style="font-size: 13px; color: var(--text-muted); margin-top: 10px; text-align: center; max-width: 300px;">
                Đã đạt đỉnh cao nhận thức xã hội với <b>${winner.points}</b> Điểm Đấu Tranh & <b>${winner.hp}</b> HP còn lại.
            </p>
        `;

        // Render Leaderboard
        const sortedLeaderboard = [...this.teams].sort((a,b) => {
            if (a.isEliminated && !b.isEliminated) return 1;
            if (!a.isEliminated && b.isEliminated) return -1;
            return b.points - a.points || b.hp - a.hp;
        });

        const tbody = document.querySelector('#final-leaderboard tbody');
        tbody.innerHTML = '';
        sortedLeaderboard.forEach((t, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><b>${i + 1}</b></td>
                <td style="color: ${t.color}"><b>${t.name}</b></td>
                <td><span class="class-badge ${CLASS_RANKS[t.rankIndex].badgeClass}">${CLASS_RANKS[t.rankIndex].title}</span></td>
                <td>${t.points} pts</td>
                <td>${t.isEliminated ? '<span style="color: #64748b">Bị Loại</span>' : t.hp + ' HP'}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    restart() {
        document.getElementById('winner-screen').classList.remove('active');
        document.getElementById('setup-screen').classList.add('active');
        
        // Re-inject defaults
        this.renderSetupTeams();
        this.state = 'setup';
        this.logBattle(`[HỆ THỐNG] Đấu trường được thiết lập lại. Lịch sử mới sẵn sàng khởi tạo.`);
        AudioPlayer.playClick();
    }

    /* ----------------------------------------------------------------------
       VIEW RENDERING HELPERS
       ---------------------------------------------------------------------- */
    renderArenaTeams() {
        const grid = document.getElementById('teams-grid');
        grid.innerHTML = '';

        this.teams.forEach(t => {
            const card = document.createElement('div');
            card.className = `team-card glass-panel ${t.isEliminated ? 'eliminated' : ''} ${t.id === this.activeTeamIdx && this.state === 'quiz' ? 'active-turn' : ''}`;
            card.style.borderColor = t.isEliminated ? 'rgba(255,255,255,0.05)' : t.color;
            card.style.color = t.color;

            // Targetable indicator if in combat targeting choice
            const canTarget = this.state === 'combat_choice' && t.id !== this.activeTeamIdx && !t.isEliminated;
            if (canTarget) {
                card.classList.add('can-target');
            }

            const currentRank = CLASS_RANKS[t.rankIndex];

            // Render specs
            let specsHTML = `<div class="status-indicators">`;
            if (t.rankIndex >= 2) specsHTML += `<span class="status-tag status-shield">Lá chắn</span>`;
            if (t.rankIndex >= 3) specsHTML += `<span class="status-tag status-crit">Crit</span>`;
            if (t.rankIndex >= 4) specsHTML += `<span class="status-tag status-heal">Biện Chứng</span>`;
            specsHTML += `</div>`;

            card.innerHTML = `
                <div class="team-card-header">
                    <span class="team-card-name" style="color: #fff">${t.name}</span>
                    <span class="class-badge ${currentRank.badgeClass}">${currentRank.title}</span>
                </div>
                
                <div class="hp-wrapper">
                    <div class="hp-label">
                        <span>Lực lượng (HP):</span>
                        <span>${t.hp}/${t.maxHp}</span>
                    </div>
                    <div class="hp-container">
                        <div class="hp-bar" style="width: ${(t.hp / t.maxHp) * 100}%; background: linear-gradient(90deg, ${t.color}, #ffffff);"></div>
                    </div>
                </div>

                <div class="team-specs">
                    <div class="specs-pts">Đấu Tranh: <strong>${t.points}</strong></div>
                    <div class="class-avatar-box" style="color: ${t.color}">
                        ${currentRank.avatarSvg}
                    </div>
                </div>

                ${specsHTML}

                <!-- Targeting reticle when selectable in combat -->
                <div class="target-overlay" onclick="Game.executeAttack(${t.id})">
                    <div class="target-crosshair">
                        <div class="target-dot"></div>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    logBattle(text, type = 'system') {
        const logBox = document.getElementById('battle-logs');
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        
        const time = new Date().toLocaleTimeString('vi-VN', { hour12: false });
        entry.innerHTML = `<span style="color: #64748b">[${time}]</span> ${text}`;
        
        logBox.appendChild(entry);
        
        // Auto scroll to bottom
        logBox.scrollTop = logBox.scrollHeight;
    }

    updateQuestionManagerList() {
        const qContainer = document.getElementById('questions-manager-list');
        qContainer.innerHTML = '';

        this.questions.forEach((q, idx) => {
            const item = document.createElement('div');
            item.className = 'q-manage-item';
            item.innerHTML = `
                <div class="q-manage-text">
                    <strong>Câu ${idx + 1}:</strong> ${q.text} <br>
                    <small style="color: var(--text-muted)">Đáp án đúng: ${String.fromCharCode(65 + q.correct)}</small>
                </div>
                <button class="delete-q-btn" onclick="Game.deleteQuestion(${idx})" title="Xóa câu hỏi">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </button>
            `;
            qContainer.appendChild(item);
        });
    }

    /* ----------------------------------------------------------------------
       EVENT BINDINGS & LISTENERS
       ---------------------------------------------------------------------- */
    setupEventListeners() {
        // Setup options buttons
        document.getElementById('add-team-btn').addEventListener('click', () => {
            this.addTeamInputRow();
            AudioPlayer.playClick();
        });

        // Remote control toggle immediately on Setup page
        document.getElementById('enable-multi-device').addEventListener('change', (e) => {
            const checked = e.target.checked;
            if (checked) {
                if (typeof firebase === 'undefined') {
                    alert("Không thể tải thư viện Firebase hoặc thiết bị không có internet! Vui lòng chơi ở chế độ Offline (Bỏ chọn điều khiển từ xa).");
                    e.target.checked = false;
                    return;
                }
                
                // Play click sound
                AudioPlayer.playClick();
                
                // Generate random 4-digit code
                const roomCode = Math.floor(1000 + Math.random() * 9000).toString();
                this.roomCode = roomCode;
                this.isMultiDevice = true;
                this.firebaseRef = firebase.database().ref('rooms/' + roomCode);

                // Initial Room state in Firebase
                this.firebaseRef.set({
                    state: 'lobby',
                    currentQuestionIdx: 0,
                    questionActive: false,
                    players: {},
                    timeoutHpPenalty: this.timeoutHpPenalty || 15,
                    battleLogs: [`[HỆ THỐNG] Đấu trường sinh tồn 40 người chơi đã sẵn sàng!`]
                });

                // Update Setup Screen remote details
                document.getElementById('setup-room-code').innerText = roomCode;
                const hostUrl = window.location.origin + window.location.pathname + '?room=' + roomCode;
                document.getElementById('setup-url-display').innerText = hostUrl;

                // Render Setup QR Code immediately
                document.getElementById('setup-qrcode').innerHTML = '';
                try {
                    new QRCode(document.getElementById('setup-qrcode'), {
                        text: hostUrl,
                        width: 130,
                        height: 130
                    });
                } catch (err) {
                    console.error("QRCode library failed:", err);
                    document.getElementById('setup-qrcode').innerText = "QR Code Error";
                }

                // Show setup remote panel
                document.getElementById('setup-remote-lobby').classList.remove('hide');
                document.getElementById('setup-copy-link-btn').classList.remove('hide');

                // Swap Left Setup Card title and show players lobby list
                document.getElementById('setup-left-title').innerText = "CÁC NGƯỜI CHƠI ĐÃ THAM GIA";
                document.getElementById('setup-left-desc').innerText = "Người chơi quét mã QR hoặc nhập link ở bên phải để tham gia cuộc chiến lịch sử.";
                
                document.getElementById('teams-input-list').classList.add('hide');
                document.getElementById('add-team-btn').classList.add('hide');
                document.getElementById('setup-players-lobby').classList.remove('hide');

                // Empty local teams array
                this.teams = [];
                this.renderSetupLobbyPlayers();

                // Listen for player connections in real-time
                this.firebaseRef.child('players').on('value', (snapshot) => {
                    const playersData = snapshot.val() || {};
                    this.teams = Object.keys(playersData).map((name, idx) => {
                        const p = playersData[name];
                        return {
                            id: p.id !== undefined ? p.id : idx,
                            name: p.name,
                            hp: p.hp,
                            maxHp: p.maxHp,
                            points: p.points,
                            rankIndex: p.rankIndex,
                            isEliminated: p.isEliminated,
                            color: p.color
                        };
                    });

                    this.renderSetupLobbyPlayers();
                    AudioPlayer.playClick(); // play chime on join
                });

            } else {
                // If unchecked, turn off Firebase listener
                if (this.firebaseRef) {
                    this.firebaseRef.child('players').off();
                    this.firebaseRef = null;
                }
                this.isMultiDevice = false;

                // Restore Left Setup Card UI
                document.getElementById('setup-left-title').innerText = "THÀNH LẬP CÁC ĐỘI ĐẤU TRANH";
                document.getElementById('setup-left-desc').innerText = "Tạo tối thiểu 2 đội và tối đa 10 đội để cùng tham gia cuộc chiến lịch sử.";
                
                document.getElementById('teams-input-list').classList.remove('hide');
                document.getElementById('add-team-btn').classList.remove('hide');
                document.getElementById('setup-players-lobby').classList.add('hide');

                // Hide setup remote panel & copy link button
                document.getElementById('setup-remote-lobby').classList.add('hide');
                document.getElementById('setup-copy-link-btn').classList.add('hide');

                // Restore standard offline team configurations
                this.renderSetupTeams();
            }
        });

        document.getElementById('start-game-btn').addEventListener('click', () => {
            this.startGame();
        });

        // Copy Room Link Button click handler
        document.getElementById('setup-copy-link-btn').addEventListener('click', () => {
            const roomUrl = document.getElementById('setup-url-display').innerText;
            if (roomUrl && roomUrl !== '-') {
                navigator.clipboard.writeText(roomUrl).then(() => {
                    const btn = document.getElementById('setup-copy-link-btn');
                    const originalText = btn.querySelector('.btn-text').innerText;
                    btn.querySelector('.btn-text').innerText = "ĐÃ SAO CHÉP LIÊN KẾT!";
                    AudioPlayer.playClick();
                    setTimeout(() => {
                        btn.querySelector('.btn-text').innerText = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error("Failed to copy link:", err);
                    alert("Không thể tự động sao chép! Bạn hãy copy thủ công link ở ô phía trên.");
                });
            }
        });

        // Open Settings Modal
        document.getElementById('open-settings').addEventListener('click', () => {
            document.getElementById('settings-initial-hp').value = this.initialHp;
            document.getElementById('settings-question-time').value = this.questionTime;
            document.getElementById('settings-attack-damage').value = this.attackDamage;
            document.getElementById('settings-timeout-penalty').value = this.timeoutHpPenalty;
            document.getElementById('settings-points-multiplier').value = this.pointsMultiplier;
            document.getElementById('settings-auto-show-answer').checked = this.autoShowAnswer;
            document.getElementById('settings-auto-next-question').checked = this.autoNextQuestion;
            document.getElementById('settings-history-rules-text').value = this.customRulesText;
            
            document.getElementById('settings-modal').classList.add('active');
            AudioPlayer.playClick();
        });

        // Close Settings Modal
        document.getElementById('close-settings').addEventListener('click', () => {
            document.getElementById('settings-modal').classList.remove('active');
            AudioPlayer.playClick();
        });

        // Save Settings configuration
        document.getElementById('save-settings-btn').addEventListener('click', () => {
            this.initialHp = parseInt(document.getElementById('settings-initial-hp').value) || 100;
            this.questionTime = parseInt(document.getElementById('settings-question-time').value) || 30;
            this.attackDamage = parseInt(document.getElementById('settings-attack-damage').value) || 15;
            this.timeoutHpPenalty = parseInt(document.getElementById('settings-timeout-penalty').value) || 15;
            this.pointsMultiplier = parseFloat(document.getElementById('settings-points-multiplier').value) || 1.0;
            this.autoShowAnswer = document.getElementById('settings-auto-show-answer').checked;
            this.autoNextQuestion = document.getElementById('settings-auto-next-question').checked;
            this.customRulesText = document.getElementById('settings-history-rules-text').value || "";

            this.saveSettings();
            this.applyCustomRulesText();
            this.updateAutoNextQuestionUI();

            document.getElementById('settings-modal').classList.remove('active');
            AudioPlayer.playLevelUp();
        });

        // Back to Home Button Click Handler
        document.getElementById('btn-back-to-home').addEventListener('click', () => {
            if (confirm("Bạn có chắc chắn muốn hủy trận đấu hiện tại và trở về trang chủ thiết lập không?")) {
                this.returnToSetup();
            }
        });

        // Host header auto-next status toggle
        document.getElementById('host-toggle-auto-next').addEventListener('click', () => {
            this.autoNextQuestion = !this.autoNextQuestion;
            this.saveSettings();
            this.updateAutoNextQuestionUI();
            AudioPlayer.playClick();
        });

        // Host manual reveal answer button click
        document.getElementById('reveal-answer-btn').addEventListener('click', () => {
            this.revealBattleRoyaleExplanation();
            AudioPlayer.playClick();
        });

        document.getElementById('confirm-answer-btn').addEventListener('click', () => {
            if (this.isMultiDevice) return;
            this.confirmAnswer();
        });

        document.getElementById('next-turn-btn').addEventListener('click', () => {
            if (this.isMultiDevice) {
                this.handleBattleRoyaleNextStep();
                return;
            }
            this.nextTurn();
            AudioPlayer.playClick();
        });

        document.getElementById('restart-game-btn').addEventListener('click', () => {
            this.restart();
        });

        // Question Manager Modal opening
        document.getElementById('open-editor').addEventListener('click', () => {
            document.getElementById('editor-modal').classList.add('active');
            AudioPlayer.playClick();
        });

        document.getElementById('close-editor').addEventListener('click', () => {
            document.getElementById('editor-modal').classList.remove('active');
            AudioPlayer.playClick();
        });

        document.getElementById('save-close-editor').addEventListener('click', () => {
            document.getElementById('editor-modal').classList.remove('active');
            AudioPlayer.playClick();
        });

        document.getElementById('reset-questions-btn').addEventListener('click', () => {
            this.resetToDefaultQuestions();
        });

        // Tab switching in Question Editor
        document.getElementById('tab-btn-single').addEventListener('click', () => {
            document.getElementById('tab-content-single').style.display = 'block';
            document.getElementById('tab-content-bulk').style.display = 'none';
            document.getElementById('tab-btn-single').classList.add('active');
            document.getElementById('tab-btn-bulk').classList.remove('active');
            AudioPlayer.playClick();
        });

        document.getElementById('tab-btn-bulk').addEventListener('click', () => {
            document.getElementById('tab-content-single').style.display = 'none';
            document.getElementById('tab-content-bulk').style.display = 'block';
            document.getElementById('tab-btn-bulk').classList.add('active');
            document.getElementById('tab-btn-single').classList.remove('active');
            AudioPlayer.playClick();
        });

        // Bulk JSON Question Import
        document.getElementById('bulk-import-btn').addEventListener('click', () => {
            AudioPlayer.playClick();
            const jsonText = document.getElementById('bulk-json-input').value.trim();
            if (!jsonText) {
                alert("Vui lòng dán đoạn mã JSON chứa câu hỏi trước khi xác nhận!");
                return;
            }

            try {
                const imported = JSON.parse(jsonText);
                
                // Validate data
                if (!Array.isArray(imported)) {
                    throw new Error("Dữ liệu câu hỏi phải là một danh sách (mảng JSON) chứa các đối tượng câu hỏi.");
                }
                
                // Basic validation for each question
                imported.forEach((q, index) => {
                    if (typeof q.text !== 'string' || q.text.trim() === '') {
                        throw new Error(`Câu hỏi thứ ${index + 1} thiếu nội dung chữ ('text').`);
                    }
                    if (!Array.isArray(q.options) || q.options.length !== 4) {
                        throw new Error(`Câu hỏi thứ ${index + 1} phải có đúng 4 đáp án trong mảng 'options'.`);
                    }
                    const correctVal = parseInt(q.correct);
                    if (isNaN(correctVal) || correctVal < 0 || correctVal > 3) {
                        throw new Error(`Câu hỏi thứ ${index + 1} phải có chỉ số đáp án đúng ('correct') là số từ 0 đến 3 (tương ứng A, B, C, D).`);
                    }
                });

                // Prompt choice
                const count = imported.length;
                const mode = confirm(
                    `Đã đọc thành công ${count} câu hỏi từ chuỗi JSON dán trực tiếp!\n\n` +
                    `- Bấm [OK] để GỘP THÊM vào danh sách hiện tại.\n` +
                    `- Bấm [CANCEL] để GHI ĐÈ (Xóa hết câu cũ và chỉ giữ lại câu mới).`
                );

                if (mode) {
                    this.questions = [...this.questions, ...imported];
                    this.logBattle(`[HỆ THỐNG] Đã gộp thêm ${count} câu hỏi mới từ bảng soạn thảo hàng loạt.`);
                } else {
                    this.questions = imported;
                    this.logBattle(`[HỆ THỐNG] Đã ghi đè toàn bộ ngân hàng câu hỏi bằng ${count} câu hỏi mới từ bảng soạn thảo hàng loạt.`);
                }

                this.saveQuestionsToStorage();
                this.updateQuestionManagerList();
                AudioPlayer.playLevelUp();
                
                // Reset textarea
                document.getElementById('bulk-json-input').value = '';
                alert(`Đã nạp thành công ${count} câu hỏi vào trò chơi!`);

            } catch (err) {
                alert("Lỗi cú pháp hoặc định dạng JSON: " + err.message);
                console.error(err);
            }
        });

        // Custom Question Addition Form Submit
        document.getElementById('add-question-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const text = document.getElementById('new-q-text').value;
            const a = document.getElementById('new-opt-a').value;
            const b = document.getElementById('new-opt-b').value;
            const c = document.getElementById('new-opt-c').value;
            const d = document.getElementById('new-opt-d').value;
            const correct = document.getElementById('new-q-correct').value;
            const explanation = document.getElementById('new-q-exp').value;

            this.addCustomQuestion(text, a, b, c, d, correct, explanation);

            // Reset form
            document.getElementById('add-question-form').reset();
        });

        // Export Questions Button Listener
        document.getElementById('export-questions-btn').addEventListener('click', () => {
            AudioPlayer.playClick();
            try {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.questions, null, 2));
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute("href", dataStr);
                downloadAnchor.setAttribute("download", "dautruong_cauhoi.json");
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
                this.logBattle("[HỆ THỐNG] Đã xuất thành công ngân hàng câu hỏi dưới dạng tệp dautruong_cauhoi.json.");
            } catch (e) {
                alert("Lỗi khi xuất câu hỏi: " + e.message);
            }
        });

        // Import Questions File Listener
        document.getElementById('import-file-input').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (evt) => {
                try {
                    const imported = JSON.parse(evt.target.result);
                    
                    // Validate data
                    if (!Array.isArray(imported)) {
                        throw new Error("Dữ liệu câu hỏi phải là một danh sách (mảng JSON) chứa các đối tượng câu hỏi.");
                    }
                    
                    // Basic validation for each question
                    imported.forEach((q, index) => {
                        if (typeof q.text !== 'string' || q.text.trim() === '') {
                            throw new Error(`Câu hỏi thứ ${index + 1} thiếu nội dung chữ ('text').`);
                        }
                        if (!Array.isArray(q.options) || q.options.length !== 4) {
                            throw new Error(`Câu hỏi thứ ${index + 1} phải có đúng 4 đáp án trong mảng 'options'.`);
                        }
                        const correctVal = parseInt(q.correct);
                        if (isNaN(correctVal) || correctVal < 0 || correctVal > 3) {
                            throw new Error(`Câu hỏi thứ ${index + 1} phải có chỉ số đáp án đúng ('correct') là số từ 0 đến 3 (tương ứng A, B, C, D).`);
                        }
                    });

                    // Prompt choice
                    const count = imported.length;
                    const mode = confirm(
                        `Đã đọc thành công ${count} câu hỏi từ tệp tin JSON!\n\n` +
                        `- Bấm [OK] để GỘP THÊM vào danh sách hiện tại.\n` +
                        `- Bấm [CANCEL] để GHI ĐÈ (Xóa hết câu cũ và chỉ dùng câu mới).`
                    );

                    if (mode) {
                        this.questions = [...this.questions, ...imported];
                        this.logBattle(`[HỆ THỐNG] Đã gộp thêm ${count} câu hỏi mới vào ngân hàng.`);
                    } else {
                        this.questions = imported;
                        this.logBattle(`[HỆ THỐNG] Đã ghi đè toàn bộ ngân hàng câu hỏi bằng ${count} câu hỏi mới.`);
                    }

                    this.saveQuestionsToStorage();
                    this.updateQuestionManagerList();
                    AudioPlayer.playLevelUp();
                    alert(`Đã nạp thành công ${count} câu hỏi vào trò chơi!`);

                } catch (err) {
                    alert("Lỗi định dạng tệp JSON: " + err.message);
                    console.error(err);
                }
                
                // Reset file input value
                e.target.value = '';
            };
            reader.readAsText(file);
        });

        // Import Questions Word Listener
        document.getElementById('import-word-input').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            AudioPlayer.playClick();
            const reader = new FileReader();
            reader.onload = (evt) => {
                const arrayBuffer = evt.target.result;
                mammoth.extractRawText({ arrayBuffer: arrayBuffer })
                    .then((result) => {
                        const rawText = result.value;
                        this.parseWordQuestions(rawText);
                    })
                    .catch((err) => {
                        alert("Lỗi khi giải nén tệp Word: " + err.message);
                        console.error(err);
                    })
                    .finally(() => {
                        // Reset input
                        e.target.value = '';
                    });
            };
            reader.readAsArrayBuffer(file);
        });

        // Sound Toggles
        document.getElementById('toggle-music').addEventListener('click', (e) => {
            const btn = e.currentTarget;
            btn.classList.toggle('active');
            AudioPlayer.mutedMusic = !btn.classList.contains('active');
            if (AudioPlayer.mutedMusic) {
                AudioPlayer.stopMusic();
            } else {
                AudioPlayer.init(); // In case ctx is not yet initialized
                AudioPlayer.startMusic();
            }
            AudioPlayer.playClick();
        });

        document.getElementById('toggle-sfx').addEventListener('click', (e) => {
            const btn = e.currentTarget;
            btn.classList.toggle('active');
            AudioPlayer.mutedSfx = !btn.classList.contains('active');
            AudioPlayer.playClick();
        });

        // Explanation close
        document.getElementById('close-explanation').addEventListener('click', () => {
            document.getElementById('explanation-modal').classList.remove('active');
            AudioPlayer.playClick();
        });
        document.getElementById('dismiss-explanation').addEventListener('click', () => {
            document.getElementById('explanation-modal').classList.remove('active');
            AudioPlayer.playClick();
        });

        // Fullscreen Toggle
        document.getElementById('toggle-fullscreen').addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
            AudioPlayer.playClick();
        });
    }

    shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    /* ----------------------------------------------------------------------
       MULTI-DEVICE FIREBASE LOBBY & SYNC
       ---------------------------------------------------------------------- */
    startMultiDeviceLobby() {
        AudioPlayer.playClick();
        
        // Show Back to Home button
        document.getElementById('btn-back-to-home').classList.remove('hide');
        
        // Generate random 4-digit code
        const roomCode = Math.floor(1000 + Math.random() * 9000).toString();
        this.roomCode = roomCode;
        this.isMultiDevice = true;
        this.firebaseRef = firebase.database().ref('rooms/' + roomCode);

        // Initial Room state
        this.firebaseRef.set({
            state: 'lobby',
            currentQuestionIdx: 0,
            questionActive: false,
            players: {},
            timeoutHpPenalty: this.timeoutHpPenalty || 15,
            battleLogs: [`[HỆ THỐNG] Đấu trường sinh tồn 40 người chơi đã sẵn sàng!`]
        });

        // Set Lobby Screen active
        document.getElementById('setup-screen').classList.remove('active');
        document.getElementById('lobby-screen').classList.add('active');

        // Update Lobby Screen details
        document.getElementById('lobby-room-code').innerText = roomCode;
        const hostUrl = window.location.origin + window.location.pathname + '?room=' + roomCode;
        document.getElementById('lobby-url-display').innerText = hostUrl;

        // Render QR Code
        document.getElementById('lobby-qrcode').innerHTML = '';
        try {
            new QRCode(document.getElementById('lobby-qrcode'), {
                text: hostUrl,
                width: 150,
                height: 150
            });
        } catch (e) {
            console.error("QRCode library failed:", e);
            document.getElementById('lobby-qrcode').innerText = "QR Code Error";
        }

        // Render Connected list placeholder
        this.renderLobbyPlayers();

        // Listen for player connections
        this.firebaseRef.child('players').on('value', (snapshot) => {
            const playersData = snapshot.val() || {};
            // Convert playersData dictionary to this.teams array
            this.teams = Object.keys(playersData).map((name, idx) => {
                const p = playersData[name];
                return {
                    id: p.id !== undefined ? p.id : idx,
                    name: p.name,
                    hp: p.hp,
                    maxHp: p.maxHp,
                    points: p.points,
                    rankIndex: p.rankIndex,
                    isEliminated: p.isEliminated,
                    color: p.color
                };
            });

            this.renderLobbyPlayers();
            AudioPlayer.playClick(); // Play a chime on join
        });

        // Bind lobby start button
        document.getElementById('lobby-start-btn').onclick = () => {
            if (this.teams.length < 2) {
                alert("Đấu trường sinh tồn cần tối thiểu 2 đấu sĩ để bắt đầu!");
                return;
            }
            
            // Unbind lobby players listener
            this.firebaseRef.child('players').off();
            
            // Show Home button on gameplay screen
            document.getElementById('btn-back-to-home').classList.remove('hide');
            
            // Apply compact layout to the arena grid to comfortably support up to 40 players!
            document.getElementById('teams-grid').classList.add('compact');
            
            // Set game screen active
            document.getElementById('lobby-screen').classList.remove('active');
            document.getElementById('game-screen').classList.add('active');
            
            // Listen for continuous updates of players during gameplay
            this.firebaseRef.child('players').on('value', (snapshot) => {
                const playersData = snapshot.val() || {};
                // Sync local teams
                this.teams = this.teams.map(t => {
                    const pd = playersData[t.name];
                    if (pd) {
                        t.hp = pd.hp;
                        t.points = pd.points;
                        t.rankIndex = pd.rankIndex;
                        t.isEliminated = pd.isEliminated;
                    }
                    return t;
                });
                
                this.renderArenaTeams();
                
                if (this.checkGameEnded()) {
                    this.endGame();
                }
            });

            // Listen for player responses in real-time
            this.firebaseRef.child('responses').on('value', (snapshot) => {
                const responses = snapshot.val() || {};
                this.currentResponses = responses;
                this.checkAllPlayersAnswered();
            });

            // Listen for battle logs
            this.firebaseRef.child('battleLogs').on('value', (snapshot) => {
                const logs = snapshot.val() || [];
                const container = document.getElementById('battle-logs');
                container.innerHTML = '';
                logs.forEach(log => {
                    const div = document.createElement('div');
                    div.className = 'log-entry';
                    div.innerText = log;
                    if (log.includes('SAI') || log.includes('mất') || log.includes('đào thải')) div.className += ' incorrect';
                    if (log.includes('ĐÚNG') || log.includes('thắng') || log.includes('TẤN CÔNG')) div.className += ' correct';
                    container.appendChild(div);
                });
                container.scrollTop = container.scrollHeight;
            });

            this.state = 'quiz';
            this.logBattleRoyale(`[HỆ THỐNG] ĐẤU TRƯỜNG SINH TỒN KHỞI CHẠY VỚI ${this.teams.length} ĐẤU SĨ!`);
            
            // Push room state as started
            this.firebaseRef.update({
                state: 'quiz',
                currentQuestionIdx: 0,
                questionActive: true,
                timeoutHpPenalty: this.timeoutHpPenalty || 15
            });

            AudioPlayer.playLevelUp();
            this.nextBattleRoyaleQuestion();
        };
    }

    renderLobbyPlayers() {
        const grid = document.getElementById('lobby-teams-grid');
        grid.innerHTML = '';
        
        this.teams.forEach(t => {
            const card = document.createElement('div');
            card.className = 'team-card glass-panel';
            card.style.borderColor = t.color;
            card.style.color = t.color;
            card.style.background = 'rgba(255,255,255,0.02)';
            
            const currentRank = CLASS_RANKS[t.rankIndex];

            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                    <strong style="font-size:14px; color:#fff">${t.name}</strong>
                    <span style="font-size:10px; font-weight:bold; color:hsl(var(--neon-green))">● Đã kết nối</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                    <span style="font-size:11px; font-family:'Orbitron',sans-serif;">${currentRank.title}</span>
                    <div class="class-avatar-box" style="width:28px; height:28px; color:inherit; background:rgba(255,255,255,0.01); border-color:rgba(255,255,255,0.05);">
                        ${currentRank.avatarSvg}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        document.getElementById('connected-count').innerText = this.teams.length;
        document.getElementById('lobby-total-teams').innerText = "40";
    }

    renderSetupLobbyPlayers() {
        const grid = document.getElementById('setup-lobby-teams-grid');
        if (!grid) return;
        grid.innerHTML = '';
        
        this.teams.forEach(t => {
            const card = document.createElement('div');
            card.className = 'team-card glass-panel';
            card.style.borderColor = t.color;
            card.style.color = t.color;
            card.style.background = 'rgba(255,255,255,0.02)';
            card.style.padding = '8px 12px';
            card.style.margin = '0';
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.gap = '5px';
            
            const currentRank = CLASS_RANKS[t.rankIndex];

            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                    <strong style="font-size:12px; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:80px;" title="${t.name}">${t.name}</strong>
                    <span style="font-size:8px; font-weight:bold; color:hsl(var(--neon-green))">● OK</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:2px;">
                    <span style="font-size:10px; font-family:'Orbitron',sans-serif;">${currentRank.title}</span>
                    <div class="class-avatar-box" style="width:20px; height:20px; color:inherit; background:rgba(255,255,255,0.01); border-color:rgba(255,255,255,0.05); margin:0;">
                        ${currentRank.avatarSvg}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        const countEl = document.getElementById('setup-connected-count');
        if (countEl) {
            countEl.innerText = this.teams.length;
        }
    }

    nextBattleRoyaleQuestion() {
        this.answerConfirmed = false;
        this.selectedOptionIdx = null;

        if (this.activeQuestionIdx >= this.shuffledQuestions.length) {
            this.endGame();
            return;
        }

        const q = this.shuffledQuestions[this.activeQuestionIdx];

        // Update Host UI question card
        document.getElementById('current-round').innerText = this.activeQuestionIdx + 1;
        document.getElementById('active-team-name').innerText = "T T C ĐẤU SĨ";
        document.getElementById('active-team-name').style.backgroundColor = "var(--neon-cyan)";
        document.getElementById('question-text').innerText = q.text;

        const optContainer = document.getElementById('options-container');
        optContainer.innerHTML = '';

        q.options.forEach((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const btn = document.createElement('button');
            btn.className = 'option-btn glass-panel';
            btn.dataset.index = idx;
            btn.innerHTML = `
                <span class="option-letter">${letter}</span>
                <span class="option-value">${opt}</span>
            `;
            btn.disabled = true;
            optContainer.appendChild(btn);
        });

        document.getElementById('combat-instruction').classList.add('hidden');
        document.getElementById('show-explanation-btn').classList.add('hide');
        
        const confirmBtn = document.getElementById('confirm-answer-btn');
        confirmBtn.classList.add('hide');
        
        const nextBtn = document.getElementById('next-turn-btn');
        nextBtn.classList.remove('hide');
        nextBtn.innerHTML = "Xem Giải Thích / Tiếp Tục";

        this.renderArenaTeams();

        // Push current question data to Firebase
        this.firebaseRef.update({
            state: 'quiz',
            currentQuestionIdx: this.activeQuestionIdx,
            questionActive: true,
            currentQuestion: {
                text: q.text,
                options: q.options
            },
            responses: {},
            correctAnswerIdx: null,
            explanationText: null
        });

        this.startBattleRoyaleTimer();
    }

    startBattleRoyaleTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);

        this.timeLeft = this.questionTime;
        const timerBar = document.getElementById('timer-bar');
        const timerText = document.getElementById('timer-text');

        timerBar.style.width = '100%';
        timerText.innerText = `${this.timeLeft}s`;

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            timerText.innerText = `${this.timeLeft}s`;
            timerBar.style.width = `${(this.timeLeft / this.questionTime) * 100}%`;

            if (this.timeLeft <= 5 && this.timeLeft > 0) {
                AudioPlayer.playTick();
            }

            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.revealBattleRoyaleExplanation();
            }
        }, 1000);
    }

    revealBattleRoyaleExplanation() {
        if (this.answerConfirmed) return;
        clearInterval(this.timerInterval);
        this.answerConfirmed = true;

        const q = this.shuffledQuestions[this.activeQuestionIdx];
        
        const btns = document.querySelectorAll('#options-container .option-btn');
        btns.forEach(btn => {
            const btnIdx = parseInt(btn.dataset.index);
            if (btnIdx === q.correct) {
                btn.classList.add('correct');
            }
        });

        this.firebaseRef.update({
            questionActive: false,
            correctAnswerIdx: q.correct,
            explanationText: q.explanation || "Luận điểm Mác - Lênin chuẩn xác."
        });

        // Hide reveal button on Host
        document.getElementById('reveal-answer-btn').classList.add('hide');

        // Deduct HP from players who did not submit an answer in time
        this.firebaseRef.child('responses').once('value', (snap) => {
            const responses = snap.val() || {};
            this.firebaseRef.child('players').once('value', (psnap) => {
                const players = psnap.val() || {};
                const updates = {};
                const penalty = this.timeoutHpPenalty || 15;
                
                Object.keys(players).forEach(name => {
                    const p = players[name];
                    if (!p.isEliminated && !responses[name]) {
                        let newHp = p.hp - penalty;
                        let eliminated = p.isEliminated;
                        if (newHp <= 0) {
                            newHp = 0;
                            eliminated = true;
                        }
                        
                        updates[`players/${name}/hp`] = newHp;
                        updates[`players/${name}/isEliminated`] = eliminated;
                        
                        this.logBattleRoyale(`[HẾT GIỜ] Đấu sĩ '${name}' bị trừ -${penalty} HP do không trả lời kịp thời!`);
                        if (eliminated) {
                            this.logBattleRoyale(`☠️ [XÓA BỎ] Đấu sĩ '${name}' đã bị đào thải khỏi lịch sử!`);
                        }
                    }
                });
                
                if (Object.keys(updates).length > 0) {
                    this.firebaseRef.update(updates);
                }
            });
        });

        document.getElementById('explanation-content').innerText = q.explanation || "Luận điểm Mác - Lênin chuẩn xác.";
        document.getElementById('explanation-modal').classList.add('active');
        
        const nextBtn = document.getElementById('next-turn-btn');
        nextBtn.innerHTML = "Câu Hỏi Tiếp Theo";

        // Auto next question countdown if enabled
        if (this.autoNextQuestion) {
            let delay = 5; // 5 seconds
            nextBtn.innerHTML = `Câu Hỏi Tiếp Theo (${delay}s)`;
            if (this.autoNextTimer) clearInterval(this.autoNextTimer);
            this.autoNextTimer = setInterval(() => {
                delay--;
                nextBtn.innerHTML = `Câu Hỏi Tiếp Theo (${delay}s)`;
                if (delay <= 0) {
                    clearInterval(this.autoNextTimer);
                    this.autoNextTimer = null;
                    this.handleBattleRoyaleNextStep();
                }
            }, 1000);
        }
    }

    handleBattleRoyaleNextStep() {
        if (this.autoNextTimer) {
            clearInterval(this.autoNextTimer);
            this.autoNextTimer = null;
        }
        AudioPlayer.playClick();
        if (!this.answerConfirmed) {
            this.revealBattleRoyaleExplanation();
        } else {
            document.getElementById('explanation-modal').classList.remove('active');
            this.activeQuestionIdx++;
            
            if (this.activeQuestionIdx >= this.shuffledQuestions.length) {
                this.endGame();
            } else {
                this.nextBattleRoyaleQuestion();
            }
        }
    }

    logBattleRoyale(msg) {
        this.firebaseRef.child('battleLogs').once('value', (snapshot) => {
            const logs = snapshot.val() || [];
            logs.push(`[${new Date().toLocaleTimeString('vi-VN')}] ${msg}`);
            if (logs.length > 50) logs.shift();
            this.firebaseRef.child('battleLogs').set(logs);
        });
    }

    initClientMode(roomCode) {
        this.roomCode = roomCode;
        this.isClient = true;
        
        document.getElementById('app-container').style.display = 'none';
        document.getElementById('client-container').classList.remove('hidden');
        document.getElementById('client-room-display').innerText = roomCode;

        if (typeof firebase === 'undefined') {
            alert("Không thể kết nối đến Firebase! Vui lòng kiểm tra kết nối mạng.");
            return;
        }

        this.firebaseRef = firebase.database().ref('rooms/' + roomCode);

        // Bind Static Targeting Choice Event Listeners
        const searchInput = document.getElementById('client-target-search');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                this.filterClientTargets();
            });
        }
        
        const btnManual = document.getElementById('client-btn-choose-manual');
        if (btnManual) {
            btnManual.onclick = () => {
                document.getElementById('client-attack-options-choice').classList.add('hidden');
                document.getElementById('client-manual-target-area').classList.remove('hidden');
                this.filterClientTargets();
            };
        }
        
        const btnRandom = document.getElementById('client-btn-choose-random');
        if (btnRandom) {
            btnRandom.onclick = () => {
                this.executeRandomClientAttack();
            };
        }
        
        const btnBack = document.getElementById('client-btn-back-to-choice');
        if (btnBack) {
            btnBack.onclick = () => {
                document.getElementById('client-manual-target-area').classList.add('hidden');
                document.getElementById('client-attack-options-choice').classList.remove('hidden');
            };
        }

        // Bind Join Button
        document.getElementById('client-join-btn').onclick = () => {
            const rawName = document.getElementById('client-player-name').value.trim();
            if (!rawName) {
                alert("Vui lòng nhập tên của bạn!");
                return;
            }
            if (rawName.length > 12) {
                alert("Tên quá dài (tối đa 12 ký tự)!");
                return;
            }

            const teamName = rawName;
            this.clientTeamName = teamName;
            
            // Check room state first to block late joins!
            this.firebaseRef.child('state').once('value', (stateSnap) => {
                const roomState = stateSnap.val();
                if (roomState && roomState !== 'lobby') {
                    alert("Đấu trường đã bắt đầu cuộc chiến sinh tồn! Quá hạn tham gia vào phòng đấu.");
                    return;
                }
                
                this.firebaseRef.child('players').once('value', (snapshot) => {
                    const players = snapshot.val() || {};
                    
                    if (players[teamName]) {
                        alert("Tên này đã được sử dụng! Vui lòng chọn tên khác.");
                        return;
                    }
                    
                    if (Object.keys(players).length >= 40) {
                        alert("Phòng đấu đã đầy (tối đa 40 người)!");
                        return;
                    }
                    
                    const color = this.colorPresets[Object.keys(players).length % this.colorPresets.length];
                    
                    const newPlayer = {
                        id: Object.keys(players).length,
                        name: teamName,
                        hp: 100,
                        maxHp: 100,
                        points: 0,
                        rankIndex: 0,
                        isEliminated: false,
                        color: color
                    };
                    
                    this.firebaseRef.child('players').child(teamName).set(newPlayer);
                    this.firebaseRef.child('connectedClients').child(teamName).set(true);

                    // Transition to client lobby view
                    document.getElementById('client-setup-view').classList.add('hidden');
                    document.getElementById('client-lobby-view').classList.remove('hidden');
                    document.getElementById('client-my-team-name').innerText = teamName;
                    
                    const avatarBox = document.getElementById('client-lobby-avatar');
                    avatarBox.style.color = color;
                    avatarBox.style.borderColor = color;
                    avatarBox.style.boxShadow = `0 0 15px ${color}`;
                    avatarBox.innerHTML = CLASS_RANKS[0].avatarSvg;

                    this.setupClientSync();
                });
            });
        };
    }

    setupClientSync() {
        this.firebaseRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (!data) return;

            const myTeamName = this.clientTeamName;
            const players = data.players || {};
            const myTeam = players[myTeamName];
            
            this.roomQuestionIdx = data.currentQuestionIdx !== undefined ? data.currentQuestionIdx : 0;
            
            if (!myTeam) return;

            const waitView = document.getElementById('client-wait-view');
            const quizView = document.getElementById('client-quiz-view');
            const combatView = document.getElementById('client-combat-view');
            const lobbyView = document.getElementById('client-lobby-view');

            lobbyView.classList.add('hidden');
            quizView.classList.add('hidden');
            combatView.classList.add('hidden');
            waitView.classList.add('hidden');

            if (data.state === 'lobby') {
                lobbyView.classList.remove('hidden');
            } else if (data.state === 'ended') {
                waitView.classList.remove('hidden');
                document.getElementById('client-wait-msg').innerText = "Trận đấu đã kết thúc! Xem bảng xếp hạng dưới đây:";
                this.renderClientLeaderboard(players);
            } else if (data.state === 'quiz') {
                const currentQuestion = data.currentQuestion;
                const isQuestionActive = data.questionActive !== false;
                const correctAnswerIdx = data.correctAnswerIdx;
                const explanationText = data.explanationText;
                
                if (currentQuestion && !myTeam.isEliminated) {
                    const optContainer = document.getElementById('client-options-container');
                    const myResponse = (data.responses || {})[myTeamName];
                    const expBox = document.getElementById('client-explanation-box');
                    const expText = document.getElementById('client-explanation-text');
                    
                    // If the answer has been revealed (questionActive === false)
                    if (!isQuestionActive) {
                        // Hide combat view just in case they were targeting
                        combatView.classList.add('hidden');
                        quizView.classList.remove('hidden');
                        
                        document.getElementById('client-question-text').innerText = currentQuestion.text;
                        optContainer.innerHTML = '';
                        
                        currentQuestion.options.forEach((opt, idx) => {
                            const letter = String.fromCharCode(65 + idx);
                            const btn = document.createElement('button');
                            btn.className = 'option-btn glass-panel';
                            btn.disabled = true;
                            
                            // Highlight styles
                            if (correctAnswerIdx !== undefined && idx === correctAnswerIdx) {
                                btn.classList.add('correct');
                                btn.style.borderColor = 'hsl(var(--neon-green))';
                                btn.style.background = 'rgba(16,185,129,0.15)';
                            } else if (myResponse && myResponse.selectedIdx === idx) {
                                btn.classList.add('incorrect');
                                btn.style.borderColor = 'hsl(var(--neon-red))';
                                btn.style.background = 'rgba(239,68,68,0.15)';
                            }
                            
                            btn.innerHTML = `
                                <span class="option-letter" style="background:${idx===0?'#ef4444':idx===1?'#06b6d4':idx===2?'#a855f7':'#f59e0b'}; color:#fff; border:none; width: 36px; height: 36px; font-size: 18px;">${letter}</span>
                                <span class="option-value" style="margin-left: 15px; font-size: 14px; text-align: left; line-height: 1.4; color: #fff;">${opt}</span>
                            `;
                            optContainer.appendChild(btn);
                        });
                        
                        // Set status message
                        if (myResponse) {
                            if (myResponse.selectedIdx === correctAnswerIdx) {
                                document.getElementById('client-answer-status').innerHTML = `<span style="color: hsl(var(--neon-green)); font-weight: bold;">Chúc mừng! Bạn đã trả lời ĐÚNG.</span>`;
                            } else {
                                document.getElementById('client-answer-status').innerHTML = `<span style="color: hsl(var(--neon-red)); font-weight: bold;">Tiếc quá! Bạn đã trả lời SAI. Đáp án đúng là ${String.fromCharCode(65 + correctAnswerIdx)}.</span>`;
                            }
                        } else {
                            document.getElementById('client-answer-status').innerHTML = `<span style="color: hsl(var(--neon-red)); font-weight: bold;">Hết giờ! Bạn đã bị trừ -${data.timeoutHpPenalty || 15} HP do không trả lời kịp thời.</span>`;
                        }
                        
                        // Show explanation box if available
                        if (explanationText && expBox && expText) {
                            expText.innerText = explanationText;
                            expBox.classList.remove('hidden');
                        } else if (expBox) {
                            expBox.classList.add('hidden');
                        }
                        
                    } else {
                        // The question is ACTIVE (questionActive === true)
                        // Hide explanation box
                        if (expBox) expBox.classList.add('hidden');
                        
                        // Check if they need to target first
                        if (myResponse && myResponse.isCorrect && !myResponse.hasAttacked) {
                            quizView.classList.add('hidden');
                            this.showBattleRoyaleTargetingScreen(players);
                        } else {
                            quizView.classList.remove('hidden');
                            document.getElementById('client-question-text').innerText = currentQuestion.text;
                            optContainer.innerHTML = '';
                            
                            currentQuestion.options.forEach((opt, idx) => {
                                const letter = String.fromCharCode(65 + idx);
                                const btn = document.createElement('button');
                                btn.className = 'option-btn glass-panel';
                                
                                if (myResponse && myResponse.selectedIdx === idx) {
                                    btn.classList.add('selected');
                                    btn.style.borderColor = 'var(--neon-cyan)';
                                    btn.style.boxShadow = '0 0 10px var(--neon-cyan)';
                                }
                                
                                btn.innerHTML = `
                                    <span class="option-letter" style="background:${idx===0?'#ef4444':idx===1?'#06b6d4':idx===2?'#a855f7':'#f59e0b'}; color:#fff; border:none; width: 36px; height: 36px; font-size: 18px;">${letter}</span>
                                    <span class="option-value" style="margin-left: 15px; font-size: 14px; text-align: left; line-height: 1.4; color: #fff;">${opt}</span>
                                `;
                                
                                if (myResponse) {
                                    btn.disabled = true;
                                } else {
                                    btn.onclick = () => {
                                        this.submitBattleRoyaleAnswer(idx);
                                    };
                                }
                                optContainer.appendChild(btn);
                            });
                            
                            // Set status message
                            if (myResponse) {
                                if (myResponse.isCorrect) {
                                    document.getElementById('client-answer-status').innerHTML = `<span style="color: var(--neon-cyan); font-weight: bold; animation: pulse 1.5s infinite;">Đã ghi nhận câu trả lời ĐÚNG. Chờ các đối thủ khác...</span>`;
                                } else {
                                    document.getElementById('client-answer-status').innerHTML = `<span style="color: var(--neon-cyan); font-weight: bold; animation: pulse 1.5s infinite;">Đã ghi nhận câu trả lời SAI. Chờ các đấu sĩ khác...</span>`;
                                }
                            } else {
                                document.getElementById('client-answer-status').innerText = "Hãy đọc câu hỏi và chọn đáp án đúng nhất!";
                            }
                        }
                    }
                } else if (myTeam.isEliminated) {
                    waitView.classList.remove('hidden');
                    document.getElementById('client-wait-msg').innerText = "Bạn đã bị đào thải khỏi lịch sử (0 HP)! Đang xem ở chế độ Quan Sát Viên.";
                }
            }

            // Sync My HP/Points Status
            if (myTeam) {
                const statusBox = document.getElementById('client-my-status');
                const myRank = getClassRank(myTeam.points).rank;
                statusBox.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-weight:bold; color:#fff;">Trạng Thái Đấu Sĩ</span>
                        <span class="class-badge ${myRank.badgeClass}">${myRank.title}</span>
                    </div>
                    <div style="margin-top: 10px;">
                        <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom: 4px;">
                            <span>Lực lượng (HP):</span>
                            <span>${myTeam.hp}/${myTeam.maxHp}</span>
                        </div>
                        <div class="hp-container">
                            <div class="hp-bar" style="width: ${(myTeam.hp / myTeam.maxHp) * 100}%; background: linear-gradient(90deg, ${myTeam.color}, #fff);"></div>
                        </div>
                    </div>
                    <div style="margin-top: 8px; font-size: 12px; display:flex; justify-content:space-between;">
                        <span>Điểm Đấu Tranh:</span>
                        <strong>${myTeam.points} pts</strong>
                    </div>
                `;
            }
        });
    }

    submitBattleRoyaleAnswer(idx) {
        const myTeamName = this.clientTeamName;
        
        this.firebaseRef.child('currentQuestionIdx').once('value', (snap) => {
            const currentQIdx = snap.val();
            const q = this.questions[currentQIdx];
            const isCorrect = idx === q.correct;
            
            this.firebaseRef.child('responses').child(myTeamName).set({
                selectedIdx: idx,
                isCorrect: isCorrect,
                hasAttacked: false
            });
            
            this.firebaseRef.child('players').child(myTeamName).once('value', (psnap) => {
                const player = psnap.val();
                if (player) {
                    let hp = player.hp;
                    let points = player.points;
                    let rankIndex = player.rankIndex;
                    let isEliminated = player.isEliminated;
                    
                    if (isCorrect) {
                        points += 10;
                        const upgradeCheck = getClassRank(points);
                        rankIndex = upgradeCheck.rankIndex;
                        
                        this.firebaseRef.child('players').child(myTeamName).update({
                            points: points,
                            rankIndex: rankIndex
                        });
                        
                        this.logBattleRoyale(`[LUẬN ĐIỂM] Đấu sĩ '${myTeamName}' trả lời ĐÚNG và giành quyền công kích!`);
                    } else {
                        hp -= 10;
                        if (hp <= 0) {
                            hp = 0;
                            isEliminated = true;
                        }
                        
                        this.firebaseRef.child('players').child(myTeamName).update({
                            hp: hp,
                            isEliminated: isEliminated
                        });
                        
                        this.logBattleRoyale(`[LỆCH LẠC] Đấu sĩ '${myTeamName}' trả lời SAI. Bị trừ -10 HP do lệch lạc lý luận!`);
                    }
                }
            });
        });
    }

    showBattleRoyaleTargetingScreen(players) {
        this.latestPlayersData = players;
        
        const combatView = document.getElementById('client-combat-view');
        combatView.classList.remove('hidden');
        
        // Show choice buttons, hide manual search area
        document.getElementById('client-attack-options-choice').classList.remove('hidden');
        document.getElementById('client-manual-target-area').classList.add('hidden');
        
        // Clear search box
        const searchInput = document.getElementById('client-target-search');
        if (searchInput) searchInput.value = '';
    }

    filterClientTargets() {
        const players = this.latestPlayersData || {};
        const myTeamName = this.clientTeamName;
        const searchVal = (document.getElementById('client-target-search').value || '').trim().toLowerCase();
        
        const targetContainer = document.getElementById('client-combat-targets');
        targetContainer.innerHTML = '';
        
        Object.keys(players).forEach(name => {
            const t = players[name];
            if (name !== myTeamName && !t.isEliminated) {
                if (searchVal === '' || name.toLowerCase().includes(searchVal)) {
                    const btn = document.createElement('button');
                    btn.className = 'action-btn secondary-btn';
                    btn.style.width = '100%';
                    btn.style.borderColor = t.color;
                    btn.style.color = t.color;
                    btn.innerHTML = `TẤN CÔNG: <b>${t.name}</b> (${t.hp} HP)`;
                    btn.onclick = () => {
                        this.executeBattleRoyaleAttack(name, t);
                    };
                    targetContainer.appendChild(btn);
                }
            }
        });
        
        if (targetContainer.children.length === 0) {
            targetContainer.innerHTML = `<p style="color: var(--neon-cyan); font-size:12px; margin-top:10px;">Không tìm thấy đối thủ phù hợp!</p>`;
        }
    }

    executeRandomClientAttack() {
        const players = this.latestPlayersData || {};
        const myTeamName = this.clientTeamName;
        
        // Find all active targets
        const activeTargets = Object.keys(players)
            .filter(name => name !== myTeamName && !players[name].isEliminated)
            .map(name => ({ name: name, data: players[name] }));
            
        if (activeTargets.length > 0) {
            const randomIndex = Math.floor(Math.random() * activeTargets.length);
            const target = activeTargets[randomIndex];
            
            this.executeBattleRoyaleAttack(target.name, target.data);
            
            document.getElementById('client-attack-options-choice').classList.add('hidden');
            document.getElementById('client-manual-target-area').classList.add('hidden');
            
            const targetContainer = document.getElementById('client-combat-targets');
            targetContainer.innerHTML = `<p style="color: var(--neon-red); font-weight:bold;">Đã kích hoạt pháo kích ngẫu nhiên đối thủ!</p>`;
        } else {
            alert("Không có đối thủ nào khả dụng để tấn công!");
        }
    }

    executeBattleRoyaleAttack(targetName, target) {
        const myTeamName = this.clientTeamName;
        
        this.firebaseRef.child('players').child(myTeamName).once('value', (asnap) => {
            const attacker = asnap.val();
            if (attacker) {
                // Calculate Damage based on Attacker Class Spec and custom settings base damage
                let baseDmgSetting = this.attackDamage || 15;
                let dmg = baseDmgSetting;
                if (attacker.rankIndex === 1) {
                    dmg = Math.round(baseDmgSetting * 1.2);
                } else if (attacker.rankIndex === 4) {
                    dmg = Math.round(baseDmgSetting * 1.67);
                }
                let isCrit = false;
                
                if (attacker.rankIndex === 3 && Math.random() < 0.25) {
                    dmg = Math.round(dmg * 1.8);
                    isCrit = true;
                }
                
                let myHpUpdate = {};
                if (attacker.rankIndex === 4) {
                    let hp = attacker.hp + 5;
                    if (hp > attacker.maxHp) hp = attacker.maxHp;
                    myHpUpdate = { hp: hp };
                }
                
                let targetHp = target.hp - dmg;
                let targetEliminated = target.isEliminated;
                if (targetHp <= 0) {
                    targetHp = 0;
                    targetEliminated = true;
                }
                
                // Calculate points based on damage and point multiplier
                const mult = this.pointsMultiplier !== undefined ? this.pointsMultiplier : 1.0;
                const pointsEarned = Math.round(dmg * mult);
                let attackerPoints = attacker.points + pointsEarned;
                const upgradeCheck = getClassRank(attackerPoints);
                let attackerRankIndex = upgradeCheck.rankIndex;
                
                // Update target
                this.firebaseRef.child('players').child(targetName).update({
                    hp: targetHp,
                    isEliminated: targetEliminated
                });
                
                // Update attacker points
                const attackerUpdate = {
                    points: attackerPoints,
                    rankIndex: attackerRankIndex,
                    ...myHpUpdate
                };
                this.firebaseRef.child('players').child(myTeamName).update(attackerUpdate);
                
                const critText = isCrit ? " [CHÍ MẠNG!]" : "";
                this.logBattleRoyale(`[TẤN CÔNG] '${myTeamName}' phóng tia la-ze công kích '${targetName}' gây -${dmg} HP${critText} và nhận +${pointsEarned} Điểm Đấu Tranh!`);
                
                if (targetEliminated) {
                    this.logBattleRoyale(`☠️ [XÓA BỎ] Đấu sĩ '${targetName}' đã bị đào thải khỏi lịch sử!`);
                }
                
                this.firebaseRef.child('responses').child(myTeamName).update({
                    hasAttacked: true
                });
                
                // Transition to wait view
                document.getElementById('client-combat-view').classList.add('hidden');
                document.getElementById('client-manual-target-area').classList.add('hidden');
                document.getElementById('client-attack-options-choice').classList.add('hidden');
                
                const waitView = document.getElementById('client-wait-view');
                waitView.classList.remove('hidden');
                document.getElementById('client-wait-msg').innerText = "Đã nộp câu trả lời & công kích thành công! Đang chờ câu hỏi tiếp theo...";
            }
        });
    }

    renderClientLeaderboard(players) {
        const container = document.getElementById('client-final-leaderboard-box');
        const list = document.getElementById('client-leaderboard-list');
        if (!container || !list) return;
        
        list.innerHTML = '';
        container.classList.remove('hidden');
        
        // Convert players dictionary to sorted array
        const sortedPlayers = Object.keys(players).map(name => players[name]).sort((a, b) => {
            if (a.isEliminated !== b.isEliminated) {
                return a.isEliminated ? 1 : -1; // Alive players first
            }
            if (b.points !== a.points) {
                return b.points - a.points; // Higher points first
            }
            return b.hp - a.hp; // Higher HP first
        });
        
        sortedPlayers.forEach((p, idx) => {
            const item = document.createElement('div');
            item.className = 'glass-panel';
            item.style.display = 'flex';
            item.style.justifyContent = 'space-between';
            item.style.alignItems = 'center';
            item.style.padding = '8px 12px';
            item.style.borderColor = p.color;
            item.style.background = 'rgba(255,255,255,0.02)';
            item.style.borderRadius = '8px';
            item.style.fontSize = '12px';
            item.style.margin = '0';
            
            const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}.`;
            const currentRank = getClassRank(p.points).rank;
            const statusText = p.isEliminated ? "<span style='color: #ef4444;'>LOẠI</span>" : `<span style='color: hsl(var(--neon-green));'>${p.hp} HP</span>`;
            
            item.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px;">
                    <strong style="color: var(--neon-gold); font-family:'Orbitron',sans-serif; font-size:13px; width:20px;">${medal}</strong>
                    <div style="display:flex; flex-direction:column;">
                        <span style="font-weight:bold; color:#fff;">${p.name}</span>
                        <span style="font-size:10px; color:${p.color}; font-family:'Orbitron',sans-serif;">${currentRank.title}</span>
                    </div>
                </div>
                <div style="text-align:right;">
                    <strong style="color:#fff;">${p.points} pts</strong> <br>
                    <small style="font-size:10px;">${statusText}</small>
                </div>
            `;
            list.appendChild(item);
        });
    }
}

// Instantiate global Game variable so inline HTML clicks can query it
const Game = new GameEngine();
window.Game = Game;
window.addEventListener('DOMContentLoaded', () => {
    Game.init();
});
