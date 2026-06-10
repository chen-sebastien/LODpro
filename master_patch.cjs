const fs = require('fs');
let c = fs.readFileSync('main.js', 'utf8');

// 1. AR Button
const arTarget = `<button slot="ar-button" class="btn-handdrawn ar-button">
    ✨ 點我用 AR 打開阿嬤的禮物 ✨
  </button>
</model-viewer>`;
const newAr = `</model-viewer>
  <button class="btn-handdrawn ar-button forced-ar-btn" style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); z-index: 100;" onclick="document.querySelector('model-viewer').activateAR()">
    ✨ 點我用 AR 打開阿嬤的禮物 ✨
  </button>`;
c = c.replace(arTarget, newAr);

// 2. handleFoodChoice
const handleFoodStart = c.indexOf('function handleFoodChoice(isUserSafe) {');
const handleFoodEnd = c.indexOf('function showStatusBadge', handleFoodStart);
if (handleFoodStart !== -1) {
  const newHandleFood = `function handleFoodChoice(isUserSafe) {
  const foodId = state.currentZoomedId;
  const food = foodData[foodId];
  closeFoodZoomModal();
  
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
    
    const itemEl = document.getElementById(\`food-\${foodId}\`);
    if (itemEl) {
      itemEl.style.opacity = '0.2';
      itemEl.style.pointerEvents = 'none';
    }
  }
  
  checkTableCompletion();
}

  `;
  c = c.substring(0, handleFoodStart) + newHandleFood + c.substring(handleFoodEnd);
}

// 3. checkTableCompletion
const checkTableStart = c.indexOf('function checkTableCompletion() {');
const checkTableEnd = c.indexOf('function initLevel1Wrapping', checkTableStart);
// But wait, there is a comment block before initLevel1Wrapping. Let's find the comment block.
let actualCheckTableEnd = c.lastIndexOf('// =====', checkTableEnd);
if (actualCheckTableEnd === -1 || actualCheckTableEnd < checkTableStart) actualCheckTableEnd = checkTableEnd;

if (checkTableStart !== -1) {
  const newCheckTable = `function checkTableCompletion() {
  let completed = true;
  for (let key in foodData) {
    if (state.foodStates[key] === 'unselected') completed = false;
  }
  const doneBtn = document.getElementById('table-done-btn');
  if (completed) {
    doneBtn.classList.remove('hidden');
  } else {
    doneBtn.classList.add('hidden');
  }
}

`;
  c = c.substring(0, checkTableStart) + newCheckTable + c.substring(actualCheckTableEnd);
}

// 4. initLevel1Wrapping
const wrapStart = c.indexOf('function initLevel1Wrapping() {');
const wrapEnd = c.indexOf('function placeFoodOnTissue', wrapStart);
if (wrapStart !== -1) {
  const newWrap = `function initLevel1Wrapping() {
  navigateTo('tissue-wrap');
  document.getElementById('wrap-instruction').innerText = "第二步：請將您認為可以吃的食物放到衛生紙上...";
  
  state.placedFoods = [];
  state.foldedCorners = [];
  
  const canvas = document.getElementById('tissue-canvas');
  canvas.className = 'tissue-canvas';
  document.getElementById('tissue-food-holder').innerHTML = '';
  
  document.querySelectorAll('.tissue-flap').forEach(flap => {
    flap.className = \`tissue-flap \${flap.id}\`;
  });
  
  document.querySelectorAll('.corner-hotspot').forEach(hotspot => {
    hotspot.classList.add('hidden');
    hotspot.classList.remove('folded-done');
  });

  document.getElementById('wrap-finish-btn').classList.add('hidden');

  const pileContainer = document.getElementById('food-pile-container');
  pileContainer.innerHTML = '';
  
  const safeFoods = Object.keys(state.foodStates).filter(id => state.foodStates[id] === 'safe');
  
  if (safeFoods.length === 0) {
    startFoldingMode();
  } else {
    safeFoods.forEach(foodId => {
      const food = foodData[foodId];
      const item = document.createElement('div');
      item.className = 'pile-item';
      item.id = \`pile-\${foodId}\`;
      item.innerHTML = \`
        <img src="\${food.image}" alt="\${food.name}">
        <div class="pile-text">\${food.name}</div>
      \`;
      item.addEventListener('click', () => {
        placeFoodOnTissue(foodId);
      });
      pileContainer.appendChild(item);
    });
  }
}

  `;
  c = c.substring(0, wrapStart) + newWrap + c.substring(wrapEnd);
}

// 5. placeFoodOnTissue
const placeStart = c.indexOf('function placeFoodOnTissue(foodId) {');
const placeEnd = c.indexOf('function startFoldingMode', placeStart);
if (placeStart !== -1) {
  const newPlace = `function placeFoodOnTissue(foodId) {
  if (state.placedFoods.includes(foodId)) return;
  
  playSound('click');
  state.placedFoods.push(foodId);
  
  const pileEl = document.getElementById(\`pile-\${foodId}\`);
  if (pileEl) pileEl.classList.add('placed');
  
  const holder = document.getElementById('tissue-food-holder');
  const img = document.createElement('img');
  img.src = foodData[foodId].image;
  img.alt = foodData[foodId].name;
  holder.appendChild(img);
  
  const totalSafe = Object.keys(state.foodStates).filter(id => state.foodStates[id] === 'safe').length;
  if (state.placedFoods.length >= totalSafe) {
    startFoldingMode();
  }
}

  `;
  c = c.substring(0, placeStart) + newPlace + c.substring(placeEnd);
}

// 6. showFinalResult
const resultStart = c.indexOf('function showFinalResult() {');
const resultEnd = c.indexOf('function bindEvent', resultStart);
let actualResultEnd = c.lastIndexOf('// =====', resultEnd);
if (actualResultEnd === -1 || actualResultEnd < resultStart) actualResultEnd = resultEnd;

if (resultStart !== -1) {
  const newResult = `function showFinalResult() {
  const finalScoreEl = document.getElementById('final-score');
  if (finalScoreEl) finalScoreEl.style.display = 'none';
  
  let msg = "【阿嬤的食安總結】\\n\\n";
  let perfect = true;

  if (state.foodStates["moldy-bread"] === "safe") {
    msg += "⚠️ 你留下了發霉的麵包！發霉的食物即使切掉壞掉的地方，菌絲也已經深入內部了，絕對不能吃！\\n\\n";
    perfect = false;
  }
  if (state.foodStates["sprouted-potato"] === "safe") {
    msg += "⚠️ 哎呀，你把發芽的馬鈴薯留下來了！馬鈴薯發芽會產生高濃度的龍葵鹼，加熱煮熟也無法破壞，吃了會中毒喔！\\n\\n";
    perfect = false;
  }
  if (state.foodStates["bloated-can"] === "safe") {
    msg += "⚠️ 注意！你留下了膨脹的罐頭。這代表裡面已經有細菌（像是肉毒桿菌）產生氣體，吃下去非常危險，一定要丟掉！\\n\\n";
    perfect = false;
  }
  
  if (state.foodStates["safe-bread"] === "unsafe" || state.foodStates["spring-roll"] === "unsafe") {
    msg += "💡 阿嬤發現你把好好的新鮮食物（吐司或春捲）丟掉了，這樣有點浪費食物捏，下次要看仔細喔！\\n\\n";
    perfect = false;
  }

  if (perfect) {
    msg += "🌟 太棒了！你完美避開了發芽馬鈴薯、發霉麵包和膨脹罐頭的食安陷阱，完全繼承了阿嬤的智慧，阿嬤這包衛生紙送得好安心！";
  } else {
    msg += "下次買菜或整理冰箱時，一定要記得這些食安小知識喔！";
  }

  document.getElementById('wisdom-text').innerText = msg;
}

`;
  c = c.substring(0, resultStart) + newResult + c.substring(actualResultEnd);
}

fs.writeFileSync('main.js', c);
console.log('main.js completely fixed.');
