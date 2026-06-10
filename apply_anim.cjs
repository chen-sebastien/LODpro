const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');
if (!css.includes('.gift-anim-container')) {
  css += `
/* ==========================================================================
   Gift Animation (End Slide)
   ========================================================================== */
.gift-anim-container {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  overflow: hidden;
}

.anim-gift {
  width: clamp(120px, 20vw, 200px);
  height: clamp(120px, 20vw, 200px);
  object-fit: contain;
  opacity: 0;
  transform: translateY(-200px);
  animation: bounceDown 0.8s cubic-bezier(0.28, 0.84, 0.42, 1) forwards;
  z-index: 52;
}

.anim-granddaughter {
  position: absolute;
  bottom: -5vh;
  right: 5vw;
  height: clamp(40vh, 60vh, 70vh);
  object-fit: contain;
  opacity: 0;
  transform: translateY(100px) scale(0.8);
  animation: popUpRight 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s forwards;
  z-index: 51;
}

@keyframes bounceDown {
  0% { opacity: 0; transform: translateY(-300px); }
  60% { opacity: 1; transform: translateY(20px); }
  80% { transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes popUpRight {
  0% { opacity: 0; transform: translateY(100px) scale(0.8); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.heart-particle {
  position: absolute;
  font-size: 2.5rem;
  opacity: 0;
  z-index: 50;
  animation: explodeHeart 1s ease-out forwards;
}

@keyframes explodeHeart {
  0% { 
    opacity: 1; 
    transform: translate(-50%, -50%) scale(0.5); 
  }
  100% { 
    opacity: 0; 
    transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.5); 
  }
}
`;
  fs.writeFileSync('style.css', css);
}

let mainjs = fs.readFileSync('main.js', 'utf8');

const oldCase1 = `      case 1: // 結局相片大拼貼 📸
        if (bg) bg.classList.add('bg-warm-wash');
        if (g && gd) {
          g.style.display = 'block';
          g.classList.add('wave', 'faded');
          gd.style.display = 'block';
          gd.classList.add('jump');
        }
        // 浮現衛生紙包裝
        if (dec) {
          dec.innerHTML = \`<img src="./images/tissue_wrapped.png" alt="衛生紙包" class="floating-food" style="width: 130px; height: 130px; top: 25%; left: 40%;">\`;
        }
        break;`;

// If we can't find it exactly, fallback to regex
if (mainjs.includes("case 1:")) {
  mainjs = mainjs.replace(/case 1:[\s\S]*?break;/m, 
`      case 1:
        if (bg) bg.classList.add('bg-warm-wash');
        // 隱藏原本的劇場巨型人物
        if (g) g.style.display = 'none';
        if (gd) gd.style.display = 'none';
        
        if (dec) {
          dec.innerHTML = \`
            <div class="gift-anim-container">
              <img src="./images/granddaughter.png" class="anim-granddaughter" alt="孫女">
              <img src="./images/tissue_wrapped.png" class="anim-gift" alt="衛生紙禮物">
            </div>
          \`;
          
          // 在禮物掉落後觸發特效
          setTimeout(() => {
            const container = document.querySelector('.gift-anim-container');
            if (!container) return;
            for(let i=0; i<15; i++) {
              const p = document.createElement('div');
              p.className = 'heart-particle';
              p.innerText = ['💖', '✨', '🎉'][Math.floor(Math.random()*3)];
              
              const angle = (i / 15) * Math.PI * 2;
              const distance = 150 + Math.random() * 80;
              const tx = Math.cos(angle) * distance;
              const ty = Math.sin(angle) * distance;
              
              p.style.setProperty('--tx', \`\${tx}px\`);
              p.style.setProperty('--ty', \`\${ty}px\`);
              p.style.left = '50%';
              p.style.top = '40%';
              p.style.animationDelay = \`\${Math.random() * 0.2}s\`;
              container.appendChild(p);
            }
            playSound('success'); // 播放驚喜音效
          }, 700);
        }
        break;`);
}

fs.writeFileSync('main.js', mainjs);
console.log('Applied animation patch');
