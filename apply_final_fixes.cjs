const fs = require('fs');

let mainContent = fs.readFileSync('main.js', 'utf8');

// --- 1. Replace handleFoodChoice ---
const oldHandleFoodChoiceRegex = /function handleFoodChoice\(isUserSafe\) \{[\s\S]*?checkTableCompletion\(\);\n  \}/;
const newHandleFoodChoice = `function handleFoodChoice(isUserSafe) {
  const foodId = state.currentZoomedId;
  const food = foodData[foodId];
  closeFoodZoomModal();
  
  // Real assessment: Accept exactly what the user chose
  if (isUserSafe) {
    state.foodStates[foodId] = "safe";
    if (!state.placedFoods.includes(foodId)) {
      state.placedFoods.push(foodId);
    }
    showStatusBadge(foodId, 'safe', '✔️可以吃');
    playSound('success'); 
  } else {
    state.foodStates[foodId] = "unsafe";
    showStatusBadge(foodId, 'unsafe', '❌已丟棄');
    playSound('success');
    
    // Dim the discarded food
    const itemEl = document.getElementById(\`food-\${foodId}\`);
    if (itemEl) {
      itemEl.style.opacity = '0.2';
      itemEl.style.pointerEvents = 'none';
    }
  }
  
  checkTableCompletion();
}`;

if (oldHandleFoodChoiceRegex.test(mainContent)) {
  mainContent = mainContent.replace(oldHandleFoodChoiceRegex, newHandleFoodChoice);
  console.log("Replaced handleFoodChoice successfully.");
} else {
  console.log("Failed to replace handleFoodChoice.");
}

// --- 2. Replace AR Button ---
const oldARBlockRegex = /<model-viewer[\s\S]*?alt="阿嬤的3D太空驚喜">[\s\S]*?<button slot="ar-button" class="btn-handdrawn ar-button">[\s\S]*?✨ 點我用 AR 打開阿嬤的禮物 ✨[\s\S]*?<\/button>[\s\S]*?<\/model-viewer>/;
const newARBlock = `<model-viewer id="my-model-viewer"
              src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" 
              ios-src="https://modelviewer.dev/shared-assets/models/Astronaut.usdz" 
              ar 
              ar-modes="webxr scene-viewer quick-look" 
              camera-controls 
              auto-rotate
              shadow-intensity="1"
              style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 50;"
              alt="阿嬤的3D太空驚喜">
            </model-viewer>
            
            <button class="btn-handdrawn ar-button forced-ar-btn" style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); z-index: 100;" onclick="document.getElementById('my-model-viewer').activateAR()">
              ✨ 點我用 AR 打開阿嬤的禮物 ✨
            </button>`;

if (oldARBlockRegex.test(mainContent)) {
  mainContent = mainContent.replace(oldARBlockRegex, newARBlock);
  console.log("Replaced AR Block successfully.");
} else {
  console.log("Failed to replace AR Block.");
}

fs.writeFileSync('main.js', mainContent);


// --- 3. Update style.css ---
let styleContent = fs.readFileSync('style.css', 'utf8');
const newCSS = `
/* --- 終極排版修復 --- */
.food-item {
  width: 22vw !important;
  max-width: 180px !important;
  height: 22vw !important;
  max-height: 180px !important;
  padding: 5px !important;
}
.food-item img {
  width: 80% !important;
  height: 80% !important;
  object-fit: contain !important;
}
@media (max-width: 600px) {
  .food-item {
    width: 30vw !important;
    height: 30vw !important;
    max-width: 140px !important;
    max-height: 140px !important;
  }
}
`;
if (!styleContent.includes('終極排版修復')) {
  fs.writeFileSync('style.css', styleContent + newCSS);
  console.log("Updated style.css successfully.");
}
