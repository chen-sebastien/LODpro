const fs = require('fs');

// --- CSS Updates ---
let css = fs.readFileSync('style.css', 'utf8');
if (!css.includes('@keyframes floatBob')) {
  css += `
/* ==========================================================================
   Floating and Glow Polish
   ========================================================================== */
@keyframes floatBob {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}

.food-item {
  animation: floatBob 3s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(255, 223, 128, 0.4));
}

.food-item:hover {
  filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.9)) brightness(1.1);
  transform: scale(1.05);
}

.pile-item {
  animation: floatBob 3s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(255, 223, 128, 0.4));
}

.pile-item:hover {
  filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.9)) brightness(1.1);
  transform: scale(1.05) translateY(-5px);
}

/* Stagger animation delays so they don't bob exactly in sync */
.food-item:nth-child(even), .pile-item:nth-child(even) {
  animation-delay: -1.5s;
}
.food-item:nth-child(3n), .pile-item:nth-child(3n) {
  animation-delay: -0.7s;
}
`;
  fs.writeFileSync('style.css', css);
}

// --- JS Updates ---
let mainjs = fs.readFileSync('main.js', 'utf8');

// Add hover sound to playSound
if (!mainjs.includes("type === 'hover'")) {
  mainjs = mainjs.replace(/if \(type === 'click'\)/, 
`if (type === 'hover') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.1);
    } else if (type === 'click')`);
}

// Bind hover sound to food items on the table
mainjs = mainjs.replace(/item\.addEventListener\('click', \(e\) => \{/g, 
`item.addEventListener('mouseenter', () => playSound('hover'));
      item.addEventListener('click', (e) => {`);

// Bind hover sound to food items in wrapping phase
// Look for placeFoodOnTissue(foodId) binding
if (!mainjs.includes("item.addEventListener('mouseenter', () => playSound('hover'));\n      item.addEventListener('click', () => {\n        placeFoodOnTissue(foodId);")) {
  mainjs = mainjs.replace(/item\.addEventListener\('click', \(\) => \{\s+placeFoodOnTissue\(foodId\);\s+\}\);/,
`item.addEventListener('mouseenter', () => playSound('hover'));
      item.addEventListener('click', () => {
        placeFoodOnTissue(foodId);
      });`);
}

fs.writeFileSync('main.js', mainjs);
console.log('Polish applied!');
