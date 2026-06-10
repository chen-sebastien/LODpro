const fs = require('fs');

let c = fs.readFileSync('main.js', 'utf8');

// 1. Fix handleFoodChoice
c = c.replace(/function handleFoodChoice\(isUserSafe\) \{[\s\S]*?function showStatusBadge/m,
`function handleFoodChoice(isUserSafe) {
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
    if (!state.placedFoods.includes(foodId)) {
      state.score++;
      state.placedFoods.push(foodId);
    }
    showStatusBadge(foodId, 'unsafe', '❌ 已丟棄');
    const itemEl = document.getElementById(\`food-\${foodId}\`);
    if (itemEl) {
      itemEl.style.opacity = '0.2';
      itemEl.style.pointerEvents = 'none';
    }
  }
  
  playSound('click');
  checkTableCompletion();
}

function showStatusBadge`);

// 2. Fix checkTableCompletion
c = c.replace(/function checkTableCompletion\(\) \{[\s\S]*?\/\/ ====/m,
`function checkTableCompletion() {
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

// ====`);

// 3. Fix initLevel1Wrapping (it originally hardcoded the foods)
// Wait, I didn't check the original initLevel1Wrapping code fully, but I know how to fix it.
c = c.replace(/function initLevel1Wrapping\(\) \{[\s\S]*?function placeFoodOnTissue/m,
`function initLevel1Wrapping() {
  navigateTo('tissue-wrap');
  document.getElementById('wrap-score-display').innerText = \`叮嚀點數: \${state.score}\`;
  document.getElementById('wrap-instruction').innerText = "第一步：點擊下方你可以吃的食物放到衛生紙上！";
  
  state.placedFoods = [];
  state.foldedCorners = [];
  
  const canvas = document.getElementById('tissue-canvas');
  canvas.className = 'tissue-canvas';
  document.getElementById('tissue-food-holder').innerHTML = '';
  
  document.querySelectorAll('.tissue-flap').forEach(flap => {
    flap.className = \`tissue-flap \${flap.id}\`;
  });

  document.querySelectorAll('.corner-hotspot').forEach(hotspot => {
    hotspot.className = \`corner-hotspot \${hotspot.id} hidden\`;
  });

  document.getElementById('wrap-finish-btn').classList.add('hidden');

  const pileContainer = document.getElementById('food-pile-container');
  pileContainer.innerHTML = '';
  
  // Only show foods that the user marked as "safe"
  const safeFoods = Object.keys(state.foodStates).filter(id => state.foodStates[id] === 'safe');
  
  if (safeFoods.length === 0) {
    // If they threw everything away, just go straight to folding mode
    startFoldingMode();
  } else {
    safeFoods.forEach(foodId => {
      const food = foodData[foodId];
      const item = document.createElement('div');
      item.className = 'food-pile-item';
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

function placeFoodOnTissue`);

// 4. Inject strategy modal logic to initLevel1Table
c = c.replace(/function initLevel1Table\(\) \{[\s\S]*?startBGM\(\);/m,
`function initLevel1Table() {
  document.getElementById('table-score-display').innerText = \`叮嚀點數: \${state.score}\`;
  
  // 啟動 BGM
  startBGM();

  // 顯示前導教學彈窗
  const strategyModal = document.getElementById('strategy-modal');
  if (strategyModal) {
    strategyModal.classList.add('active');
  }`);

// 5. Inject strategy-start-btn binding
c = c.replace(/bindEvent\('choice-discard-btn', 'click', \(\) => handleFoodChoice\(false\)\);/m,
`bindEvent('choice-discard-btn', 'click', () => handleFoodChoice(false));
    
    bindEvent('strategy-start-btn', 'click', () => {
      document.getElementById('strategy-modal').classList.remove('active');
      playSound('click');
    });`);

// 6. Fix showFinalResult
c = c.replace(/function showFinalResult\(\) \{[\s\S]*?\/\/ ====+/m,
`function showFinalResult() {
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

  // --- 動態更新結算畫面的主標題與副標題 ---
  const mainTitleEl = document.querySelector('#result-screen .main-title');
  const subtitleEl = document.querySelector('#result-screen .subtitle');

  if (perfect) {
    if (mainTitleEl) {
      mainTitleEl.innerText = "✨ 完美守護阿嬤的食安 ✨";
      mainTitleEl.style.color = "inherit"; 
    }
    if (subtitleEl) subtitleEl.innerText = "太棒了！我們成功避開了所有危險食物，守護了阿嬤的健康與回憶！";
    msg += "🌟 太棒了！你完美避開了發芽馬鈴薯、發霉麵包和膨脹罐頭的食安陷阱，完全繼承了阿嬤的智慧，阿嬤這包衛生紙送得好安心！";
  } else {
    if (mainTitleEl) {
      mainTitleEl.innerText = "🚨 驚險的食安危機！ 🚨";
      mainTitleEl.style.color = "#d9534f"; 
    }
    if (subtitleEl) subtitleEl.innerText = "哎呀！不小心讓一些危險食物混進去了。趕快看看下方阿嬤的總結，把它學起來保護家人喔！";
    msg += "下次買菜或整理冰箱時，一定要記得這些食安小知識喔！";
  }

  document.getElementById('wisdom-text').innerText = msg;
}

// ==========================================================================
`);

fs.writeFileSync('main.js', c);
console.log("Master patch completed successfully.");
