const fs = require('fs');

// Fix main.js
let mainContent = fs.readFileSync('main.js', 'utf8');
mainContent = mainContent.replace(
  'src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"',
  'src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" \n              ios-src="https://modelviewer.dev/shared-assets/models/Astronaut.usdz"'
);
mainContent = mainContent.replace(
  'width: 250px; height: 250px; top: 20%; left: 35%;',
  'width: 100%; height: 100%; top: 0; left: 0;'
);
fs.writeFileSync('main.js', mainContent);

// Fix style.css for mobile
let styleContent = fs.readFileSync('style.css', 'utf8');
const mobileCSS = `
/* --- Mobile Fixes --- */
@media (max-width: 600px) {
  .story-card {
    padding: 70px 10px 10px 10px;
    height: 100%;
    gap: 15px;
  }
  .story-frame {
    height: 320px;
    border-width: 3px;
    overflow: visible; /* Prevent clipping AR button */
  }
  .story-dialog-box {
    padding: 15px 20px;
    border-width: 3px;
  }
  .story-dialog-box p {
    font-size: 1.3rem;
  }
  .btn-handdrawn {
    font-size: 1.3rem;
    padding: 12px 25px;
    border-width: 2px;
  }
  .hud {
    padding: 10px 15px;
  }
  .progress-text {
    font-size: 1.2rem;
  }
  #score-display {
    font-size: 1.2rem;
  }
  .ar-button {
    font-size: 1.1rem;
    padding: 10px 15px;
    bottom: 10px; /* Bring it up so it's visible */
  }
  .level-title-container {
    top: 55px;
  }
  .level-title {
    font-size: 1.6rem;
  }
  .level-desc {
    font-size: 1.1rem;
  }
}
`;
styleContent += mobileCSS;
fs.writeFileSync('style.css', styleContent);

console.log("Fixes applied successfully.");
