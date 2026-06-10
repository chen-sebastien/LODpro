const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
if (!html.includes('id="strategy-modal"')) {
  const modalHTML = `
      <!-- ==========================================
           A0. 乖孫的食安守則 (Strategy Modal)
           ========================================== -->
      <div id="strategy-modal" class="overlay">
        <div class="modal-content strategy-content">
          <h2 class="strategy-title">乖孫的食安守則</h2>
          <div class="strategy-body">
            <p>等一下我們要幫阿嬤檢查桌上的食物，請一定要記得以下三個重點：</p>
            <ul class="strategy-list">
              <li><span class="emoji">🔍</span> <strong>看表面</strong>：有沒有長出毛茸茸的「黴菌」？</li>
              <li><span class="emoji">🌱</span> <strong>看特徵</strong>：馬鈴薯有沒有長出綠色的「小芽」？</li>
              <li><span class="emoji">🎈</span> <strong>看包裝</strong>：罐頭的蓋子有沒有像皮球一樣「膨脹」？</li>
            </ul>
            <p class="strategy-warning">⚠️ 如果有以上情況，為了阿嬤的健康，請務必選擇「❌ 丟棄」！</p>
          </div>
          <div class="modal-buttons">
            <button id="strategy-start-btn" class="btn-handdrawn">我知道了，開始挑選！</button>
          </div>
        </div>
      </div>
      
      <!-- ==========================================
           A. 食物詳細`;
  html = html.replace('<!-- ==========================================\n           A. 食物詳細', modalHTML);
  fs.writeFileSync('index.html', html);
  console.log('Updated index.html');
}

// 2. Update main.js
let js = fs.readFileSync('main.js', 'utf8');

const initTableStart = js.indexOf('function initLevel1Table() {');
if (initTableStart !== -1 && !js.includes("document.getElementById('strategy-modal').classList.add('active');")) {
  const insertTarget = 'state.currentZoomedId = null;';
  const insertPos = js.indexOf(insertTarget, initTableStart);
  if (insertPos !== -1) {
    const injection = `state.currentZoomedId = null;
  
  // 顯示前導教學彈窗
  const strategyModal = document.getElementById('strategy-modal');
  if (strategyModal) {
    strategyModal.classList.add('active');
  }`;
    js = js.substring(0, insertPos) + injection + js.substring(insertPos + insertTarget.length);
  }
}

if (!js.includes("bindEvent('strategy-start-btn'")) {
  const bindTarget = "bindEvent('choice-discard-btn', 'click', () => handleFoodChoice(false));";
  const bindPos = js.indexOf(bindTarget);
  if (bindPos !== -1) {
    const bindInjection = bindTarget + `
    bindEvent('strategy-start-btn', 'click', () => {
      document.getElementById('strategy-modal').classList.remove('active');
      playSound('click');
    });`;
    js = js.substring(0, bindPos) + bindInjection + js.substring(bindPos + bindTarget.length);
  }
}

const resultStart = js.indexOf('function showFinalResult() {');
const resultEnd = js.indexOf('function bindEvent', resultStart);
if (resultStart !== -1 && !js.includes("const mainTitleEl = document.querySelector('#result-screen .main-title');")) {
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

  // --- 動態更新結算畫面的主標題與副標題 ---
  const mainTitleEl = document.querySelector('#result-screen .main-title');
  const subtitleEl = document.querySelector('#result-screen .subtitle');

  if (perfect) {
    if (mainTitleEl) {
      mainTitleEl.innerText = "✨ 完美守護阿嬤的食安 ✨";
      mainTitleEl.style.color = "inherit"; // 恢復預設顏色
    }
    if (subtitleEl) subtitleEl.innerText = "太棒了！我們成功避開了所有危險食物，守護了阿嬤的健康與回憶！";
    msg += "🌟 太棒了！你完美避開了發芽馬鈴薯、發霉麵包和膨脹罐頭的食安陷阱，完全繼承了阿嬤的智慧，阿嬤這包衛生紙送得好安心！";
  } else {
    if (mainTitleEl) {
      mainTitleEl.innerText = "🚨 驚險的食安危機！ 🚨";
      mainTitleEl.style.color = "#d9534f"; // 警示紅色
    }
    if (subtitleEl) subtitleEl.innerText = "哎呀！不小心讓一些危險食物混進去了。趕快看看下方阿嬤的總結，把它學起來保護家人喔！";
    msg += "下次買菜或整理冰箱時，一定要記得這些食安小知識喔！";
  }

  document.getElementById('wisdom-text').innerText = msg;
}

`;
  let actualResultEnd = js.lastIndexOf('// =====', resultEnd);
  if (actualResultEnd === -1 || actualResultEnd < resultStart) actualResultEnd = resultEnd;
  
  js = js.substring(0, resultStart) + newResult + js.substring(actualResultEnd);
  console.log('Updated showFinalResult in main.js');
}

fs.writeFileSync('main.js', js);

// 3. Update style.css
let css = fs.readFileSync('style.css', 'utf8');
if (!css.includes('.strategy-content')) {
  const cssInjection = `
/* --- 乖孫的食安守則 (Strategy Modal) --- */
.strategy-content {
  background: #FFFBEA;
  border: 4px dashed #D2A679;
  border-radius: 16px;
  max-width: 500px;
  text-align: left;
  padding: 30px;
}
.strategy-title {
  color: #8b5a2b;
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #E6D0B3;
  padding-bottom: 10px;
}
.strategy-body {
  font-size: 1.6rem;
  line-height: 1.6;
  color: #4a3e3d;
}
.strategy-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}
.strategy-list li {
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.6);
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.strategy-list li .emoji {
  font-size: 2rem;
}
.strategy-warning {
  color: #d9534f;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}
`;
  fs.writeFileSync('style.css', css + cssInjection);
  console.log('Updated style.css');
}
