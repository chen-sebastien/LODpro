const fs = require('fs');

let content = fs.readFileSync('main.js', 'utf8');

// The exact substring to replace
const target = '<img src="./images/tissue_wrapped.png" alt="衛生紙包" class="floating-food" style="width: 120px; height: 120px; top: 38%; left: 42%;">';

const replacement = `<model-viewer 
  src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" 
  ios-src="https://modelviewer.dev/shared-assets/models/Astronaut.usdz" 
  ar 
  ar-modes="webxr scene-viewer quick-look" 
  camera-controls 
  auto-rotate
  shadow-intensity="1"
  style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 50;"
  alt="阿嬤的3D太空驚喜">
  
  <button slot="ar-button" class="btn-handdrawn ar-button">
    ✨ 點我用 AR 打開阿嬤的禮物 ✨
  </button>
</model-viewer>`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('main.js', content);
  console.log('Successfully updated main.js');
} else {
  console.log('Target block not found in main.js!');
}
