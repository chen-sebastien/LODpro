const fs = require('fs');
let c = fs.readFileSync('main.js', 'utf8');

const startIdx = c.indexOf('function checkTableCompletion() {');
const searchStr = "document.getElementById('table-score-display').innerText =";
let endIdx = c.indexOf(searchStr, startIdx);
endIdx = c.indexOf('}', endIdx) + 1;

if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
  const newFunc = `function checkTableCompletion() {
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
  
  // Update display to show how many processed
  const processed = Object.values(state.foodStates).filter(s => s !== 'unselected').length;
  const scoreEl = document.getElementById('table-score-display');
  if (scoreEl) {
    scoreEl.innerText = \`已判斷: \${processed} / 5\`;
  }
}`;
  c = c.substring(0, startIdx) + newFunc + c.substring(endIdx);
  fs.writeFileSync('main.js', c);
  console.log("Fixed checkTableCompletion");
} else {
  console.log("Failed", startIdx, endIdx);
}
