const fs = require('fs');

// 1. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');
styleCss = styleCss.replace(/#app\s*\{[^}]+\}/, `#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  background-color: var(--color-paper);
}`);
styleCss = styleCss.replace(/#game-container\s*\{[^}]+\}/, `#game-container {
  width: 100vw;
  height: 100vh;
  background-color: var(--color-paper);
  border: none;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}`);
// Append button styles
styleCss += `\n
#story-next-btn { font-size: 2rem; padding: 20px 40px; margin-top: 30px; box-shadow: 0 8px 15px rgba(0,0,0,0.2); }
#hang-up-btn { font-size: 1.5rem; padding: 15px 30px; margin-top: 20px; white-space: nowrap; }
.phone-dialog-overlay { display: flex; flex-direction: column; align-items: center; justify-content: center; }
`;
fs.writeFileSync('style.css', styleCss, 'utf8');

// 2. Update adult.html
let adultHtml = fs.readFileSync('adult.html', 'utf8');
adultHtml = adultHtml.replace(/\.\/images\/granddaughter\.png/g, './images/granddaughter_adult.png');
adultHtml = adultHtml.replace(/<a href="index.html" class="btn-handdrawn" style="text-decoration:none; display:inline-block; margin-left:10px;">去玩第一關 ➔<\/a>/g, '');
fs.writeFileSync('adult.html', adultHtml, 'utf8');

// 3. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/<div class="hidden-object-surface" id="hidden-object-surface">/g, `<div class="hidden-object-surface" id="hidden-object-surface">
            <img src="./images/granddaughter.png" id="walking-character" style="position:absolute; width:150px; left:20%; top:70%; transform:translate(-50%, -100%); transition:all 1.5s ease-in-out; z-index:10; pointer-events:none;" alt="孫女">`);
fs.writeFileSync('index.html', indexHtml, 'utf8');

// 4. Update main.js
let mainJs = fs.readFileSync('main.js', 'utf8');
mainJs += `\n
// Add walking interaction for Game 1
document.addEventListener('DOMContentLoaded', () => {
  const surface = document.getElementById('hidden-object-surface');
  const char = document.getElementById('walking-character');
  if(surface && char) {
    surface.addEventListener('click', (e) => {
      const rect = surface.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      char.style.left = x + 'px';
      char.style.top = y + 'px';
    });
  }
});
`;
fs.writeFileSync('main.js', mainJs, 'utf8');

console.log("Files updated successfully with proper UTF-8 encoding.");
