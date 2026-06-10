const fs = require('fs');

let c = fs.readFileSync('main.js', 'utf8');

const startIdx = c.indexOf('function handleFoodChoice(isUserSafe) {');
const endIdx = c.indexOf('function showStatusBadge', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const newFunc = `function handleFoodChoice(isUserSafe) {
  const foodId = state.currentZoomedId;
  const food = foodData[foodId];
  closeFoodZoomModal();
  
  if (isUserSafe) {
    state.foodStates[foodId] = 'safe';
    if (!state.placedFoods.includes(foodId)) {
      state.placedFoods.push(foodId);
    }
    showStatusBadge(foodId, 'safe', '✔️可以吃');
    playSound('success');
  } else {
    state.foodStates[foodId] = 'unsafe';
    showStatusBadge(foodId, 'unsafe', '❌已丟棄');
    playSound('success');
    const itemEl = document.getElementById(\`food-\${foodId}\`);
    if (itemEl) {
      itemEl.style.opacity = '0.2';
      itemEl.style.pointerEvents = 'none';
    }
  }
  checkTableCompletion();
}

  `;
  c = c.substring(0, startIdx) + newFunc + c.substring(endIdx);
  fs.writeFileSync('main.js', c);
  console.log('Fixed handleFoodChoice');
} else {
  console.log('Indices not found');
}
