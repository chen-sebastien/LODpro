const fs = require('fs');

let mainJs = fs.readFileSync('main.js', 'utf8');

// 1. Find the garbage section in main.js
const garbageStart = mainJs.indexOf("const emoji = ['🍂', '🍁', '🍃'][Math.floor(Math.random() * 3)];");
if (garbageStart === -1) {
  console.log("Garbage start not found. File might be fixed already?");
  process.exit(1);
}

const garbageEnd = mainJs.indexOf("function handleStoryNext() {");
if (garbageEnd === -1) {
  console.log("Garbage end not found!");
  process.exit(1);
}

// Ensure we slice correctly around the if(food.audio) block inside showFoodZoomModal
const audioBlockStart = mainJs.lastIndexOf('if (food.audio) {', garbageStart);

const replacementSection = `
    currentTTS = new Audio(food.audio);
    currentTTS.play().catch(e => console.warn("Audio play blocked", e));
  }
}

function closeFoodZoomModal() {
  const modal = document.getElementById('food-zoom-modal');
  modal.classList.remove('active');
  state.currentZoomedId = null;
  if (currentTTS) {
    currentTTS.pause();
    currentTTS.currentTime = 0;
  }
}

function handleFoodChoice(isUserSafe) {
  const foodId = state.currentZoomedId;
  const food = foodData[foodId];
  closeFoodZoomModal();
  
  if (isUserSafe) {
    state.foodStates[foodId] = "safe";
    if (!state.placedFoods.includes(foodId)) {
      state.score++;
      state.placedFoods.push(foodId);
    }
    showStatusBadge(foodId, 'safe', '✅ 可以吃');
  } else {
    state.foodStates[foodId] = "unsafe";
    state.score++;
    showStatusBadge(foodId, 'unsafe', '❌ 已丟棄');
    // 將壞食物淡出消失
    const itemEl = document.getElementById(\`food-\${foodId}\`);
    if (itemEl) {
      itemEl.style.opacity = '0.2';
      itemEl.style.pointerEvents = 'none';
    }
  }
  
  playSound('click');
  checkTableCompletion();
}

function showStatusBadge(foodId, type, text) {
  const badge = document.getElementById(\`badge-\${foodId}\`);
  if (badge) {
    badge.className = \`food-status-badge \${type}\`;
    badge.innerHTML = text;
  }
}

function triggerFoodPoisoning(msg) {
  const poisonBox = document.getElementById('poison-box');
  poisonBox.classList.add('shake-effect');
  
  document.getElementById('poison-message').innerText = msg;
  const overlay = document.getElementById('poison-modal');
  overlay.classList.add('active');
  
  setTimeout(() => {
    poisonBox.classList.remove('shake-effect');
  }, 500);
}

function closePoisonModal() {
  document.getElementById('poison-modal').classList.remove('active');
  playSound('click');
}

function checkTableCompletion() {
  const totalItems = Object.keys(state.foodStates).length;
  const decidedItems = Object.values(state.foodStates).filter(s => s !== "unselected").length;
  const isDone = (decidedItems === totalItems);

  const doneBtn = document.getElementById('table-done-btn');
  if (isDone) {
    doneBtn.classList.remove('hidden');
  } else {
    doneBtn.classList.add('hidden');
  }
  
  document.getElementById('table-score-display').innerText = \`叮嚀點數: \${state.score}\`;
}

`;

// Replace from audioBlockStart + 17 to garbageEnd
// Wait, audioBlockStart is `if (food.audio) {`. So + 17 skips the `{`.
const sliceStart = audioBlockStart + 17;
const newMainJs = mainJs.substring(0, sliceStart) + replacementSection + mainJs.substring(garbageEnd);

fs.writeFileSync('main.js', newMainJs);
console.log("Successfully rescued main.js");

