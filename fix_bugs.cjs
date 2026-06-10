const fs = require('fs');

let c = fs.readFileSync('main.js', 'utf8');

// 1. Fix checkTableCompletion
const oldCheckTable = /function checkTableCompletion\(\) \{[\s\S]*?document\.getElementById\('table-score-display'\)\.innerText = `\?\?點數: \$\{state\.score\}`;\n  \}/;
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
}`;
// Regex matching failed previously, let's do substring search
const startCheckTable = c.indexOf('function checkTableCompletion() {');
const endCheckTable = c.indexOf('}', c.indexOf('doneBtn.classList.add(\'hidden\');')) + 1;
// Wait, the end of checkTableCompletion might be the next function
const endCheckTableReal = c.indexOf('function showStatusBadge', startCheckTable);
if (startCheckTable !== -1 && endCheckTableReal !== -1) {
  c = c.substring(0, startCheckTable) + newCheckTable + "\n\n  " + c.substring(endCheckTableReal);
  console.log("Patched checkTableCompletion");
}


// 2. Fix initLevel1Wrapping
const startWrap = c.indexOf('function initLevel1Wrapping() {');
const endWrap = c.indexOf('function placeFoodOnTissue', startWrap);
if (startWrap !== -1 && endWrap !== -1) {
  const newWrap = `function initLevel1Wrapping() {
    navigateTo('tissue-wrap');
    document.getElementById('wrap-instruction').innerText = "第二步：請將您認為可以吃的食物放到衛生紙上...";
    
    state.placedFoods = []; // 清空重新放置陣列
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
  c = c.substring(0, startWrap) + newWrap + c.substring(endWrap);
  console.log("Patched initLevel1Wrapping");
}


// 3. Fix placeFoodOnTissue
const startPlace = c.indexOf('function placeFoodOnTissue(foodId) {');
const endPlace = c.indexOf('function startFoldingMode', startPlace);
if (startPlace !== -1 && endPlace !== -1) {
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
  c = c.substring(0, startPlace) + newPlace + c.substring(endPlace);
  console.log("Patched placeFoodOnTissue");
}

fs.writeFileSync('main.js', c);
