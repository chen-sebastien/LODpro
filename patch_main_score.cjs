const fs = require('fs');

let mainContent = fs.readFileSync('main.js', 'utf8');

const startIdx = mainContent.indexOf('function showFinalResult() {');
const searchString = "document.getElementById('wisdom-text').innerText = msg;";
let endIdx = mainContent.indexOf(searchString, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  // Find the closing brace of the function
  endIdx = mainContent.indexOf('}', endIdx) + 1;

  const newFunc = `function showFinalResult() {
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
}`;

  mainContent = mainContent.substring(0, startIdx) + newFunc + mainContent.substring(endIdx);
  fs.writeFileSync('main.js', mainContent);
  console.log("Successfully patched main.js");
} else {
  console.log("Error finding block indices.", startIdx, endIdx);
}
