const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/\.pile-item img \{[\s\S]*?object-fit: contain;\s*\}/m, 
`.pile-item img {
  width: 60%;
  height: 60%;
  object-fit: contain;
}`);

// Also ensure .pile-item flex layout doesn't cause overflow on tiny screens
css = css.replace(/\.food-pile-container \{[\s\S]*?z-index: 100;\s*\}/m,
`.food-pile-container {
  display: flex;
  gap: clamp(10px, 3vw, 30px);
  position: absolute;
  bottom: clamp(60px, 15vh, 120px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: 90%;
  justify-content: center;
}`);

fs.writeFileSync('style.css', css);
console.log('Fixed CSS');
