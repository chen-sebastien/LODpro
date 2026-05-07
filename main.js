/**
 * 阿嬤的廚房智慧 — 食安小偵探
 * 繪本風邏輯核心
 */

const scenarios = [
  {
    id: 1,
    title: "觀察這片吐司",
    desc: "這片吐司放在桌上一段時間了，仔細看看它的表面...",
    image: "file:///C:/Users/Admin/.gemini/antigravity/brain/235b7f83-be3b-45ff-9164-45c113cbbed0/food_bread_moldy_watercolor_1778153287018.png",
    isSafe: false,
    wisdom: "看到黑點點或綠綠的毛，就代表菌絲已經長進去了，不能只把發霉的地方切掉喔！",
    feedback: {
      correct: "沒錯！阿嬤說：『發霉的東西千萬不能吃，就算切掉也看不見深處的黴菌。』",
      wrong: "哎呀！雖然看起來只有一點點，但黴菌的根部已經長進去裡面了，很不安全喔。"
    }
  },
  {
    id: 2,
    title: "膨脹的罐頭",
    desc: "架子上這罐魚罐頭，蓋子似乎有點微微鼓起來了...",
    image: "file:///C:/Users/Admin/.gemini/antigravity/brain/235b7f83-be3b-45ff-9164-45c113cbbed0/food_can_bloated_watercolor_1778153483716.png",
    isSafe: false,
    wisdom: "罐頭膨脹可能是裡面有肉毒桿菌正在作怪，這可是會致命的，千萬不能打開！",
    feedback: {
      correct: "真細心！阿嬤說：『罐頭鼓鼓的就代表裡面變質了，絕對不能要。』",
      wrong: "小心！罐頭膨脹代表內部細菌產生氣體，是非常危險的信號。"
    }
  },
  {
    id: 3,
    title: "發芽的馬鈴薯",
    desc: "今天想煮咖哩，但發現這顆馬鈴薯長出了小芽眼...",
    image: "file:///C:/Users/Admin/.gemini/antigravity/brain/235b7f83-be3b-45ff-9164-45c113cbbed0/food_potato_sprout_watercolor_1778153498126.png",
    isSafe: false,
    wisdom: "馬鈴薯發芽會產生『茄鹼』，就算挖掉芽眼毒素還是存在，加熱也去不掉喔！",
    feedback: {
      correct: "對！阿嬤說：『馬鈴薯發芽就有毒，整顆都不能吃了，別心疼那幾塊錢。』",
      wrong: "不對喔！馬鈴薯跟地瓜不一樣，馬鈴薯發芽後毒性很強，絕對不能吃。"
    }
  },
  {
    id: 4,
    title: "變色的生雞肉",
    desc: "這盤雞肉在室溫下放了一下午，顏色看起來有點灰暗，摸起來黏黏的...",
    image: "file:///C:/Users/Admin/.gemini/antigravity/brain/235b7f83-be3b-45ff-9164-45c113cbbed0/food_chicken_gray_watercolor_1778153510995.png",
    isSafe: false,
    wisdom: "雞肉變灰色且有黏液，就是細菌大量繁殖的證明，聞起來可能還有酸味。",
    feedback: {
      correct: "觀察入微！阿嬤說：『肉類只要顏色不對、摸起來黏手，就是壞了。』",
      wrong: "不行喔！雖然煮熟可以殺菌，但細菌產生的毒素是煮不掉的。"
    }
  },
  {
    id: 5,
    title: "昨晚的剩菜",
    desc: "昨晚沒吃完的炒青菜，一直放在電鍋裡保溫到現在...",
    image: "file:///C:/Users/Admin/.gemini/antigravity/brain/235b7f83-be3b-45ff-9164-45c113cbbed0/food_leftovers_watercolor_1778153525761.png",
    isSafe: false,
    wisdom: "電鍋保溫通常只有40-50度，正好是細菌最愛的溫度。剩菜應該要冷藏，吃之前再徹底加熱。",
    feedback: {
      correct: "聰明！阿嬤說：『電鍋不是冰箱，東西沒吃完要放冰箱，要吃再熱。』",
      wrong: "哎呀！電鍋保溫不夠熱，反而會讓細菌長得更快，這樣吃會拉肚子喔。"
    }
  }
];

// 遊戲狀態
let currentState = {
  currentScenarioIndex: 0,
  score: 0,
  gameStarted: false
};

// DOM 元素
const screens = {
  title: document.getElementById('title-screen'),
  game: document.getElementById('game-screen'),
  result: document.getElementById('result-screen')
};

const elements = {
  startBtn: document.getElementById('start-btn'),
  restartBtn: document.getElementById('restart-btn'),
  nextBtn: document.getElementById('next-btn'),
  scenarioTitle: document.getElementById('scenario-title'),
  scenarioDesc: document.getElementById('scenario-desc'),
  scenarioImage: document.getElementById('scenario-image'),
  scoreDisplay: document.getElementById('score-display'),
  progressFill: document.getElementById('progress-fill'),
  feedbackOverlay: document.getElementById('feedback-overlay'),
  feedbackIcon: document.getElementById('feedback-icon'),
  feedbackMessage: document.getElementById('feedback-message'),
  finalScore: document.getElementById('final-score'),
  wisdomText: document.getElementById('wisdom-text')
};

// 初始化
function init() {
  elements.startBtn.addEventListener('click', startGame);
  elements.restartBtn.addEventListener('click', startGame);
  elements.nextBtn.addEventListener('click', nextScenario);
  
  document.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const choice = e.currentTarget.dataset.choice === 'safe';
      handleChoice(choice);
    });
  });
}

// 開始遊戲
function startGame() {
  currentState = {
    currentScenarioIndex: 0,
    score: 0,
    gameStarted: true
  };
  
  showScreen('game');
  loadScenario();
  updateHUD();
}

// 切換畫面
function showScreen(screenId) {
  Object.keys(screens).forEach(key => {
    screens[key].classList.remove('active');
  });
  screens[screenId].classList.add('active');
}

// 載入場景
function loadScenario() {
  const scenario = scenarios[currentState.currentScenarioIndex];
  elements.scenarioTitle.innerText = scenario.title;
  elements.scenarioDesc.innerText = scenario.desc;
  
  // 直接使用 scenario.image 中的完整路徑
  elements.scenarioImage.innerHTML = `<img src="${scenario.image}" alt="${scenario.title}">`;
  
  updateHUD();
}

// 更新 HUD
function updateHUD() {
  elements.scoreDisplay.innerText = `偵察點數: ${currentState.score}`;
  const progress = (currentState.currentScenarioIndex / scenarios.length) * 100;
  elements.progressFill.style.width = `${progress}%`;
}

// 處理選擇
function handleChoice(userChoice) {
  const scenario = scenarios[currentState.currentScenarioIndex];
  const isCorrect = userChoice === scenario.isSafe;
  
  if (isCorrect) {
    currentState.score += 1;
    showFeedback(true, scenario.feedback.correct);
  } else {
    showFeedback(false, scenario.feedback.wrong);
  }
}

// 顯示反饋
function showFeedback(isCorrect, message) {
  elements.feedbackIcon.innerText = isCorrect ? '🌟' : '💡';
  elements.feedbackMessage.innerText = message;
  elements.feedbackOverlay.classList.add('active');
}

// 下一個場景
function nextScenario() {
  elements.feedbackOverlay.classList.remove('active');
  
  currentState.currentScenarioIndex++;
  
  if (currentState.currentScenarioIndex < scenarios.length) {
    loadScenario();
  } else {
    endGame();
  }
}

// 結束遊戲
function endGame() {
  showScreen('result');
  elements.finalScore.innerText = `${currentState.score} / ${scenarios.length}`;
  
  // 顯示綜合建議
  if (currentState.score === scenarios.length) {
    elements.wisdomText.innerText = "太棒了！你已經完全掌握了阿嬤的廚房智慧，是個合格的食安小偵探！";
  } else {
    elements.wisdomText.innerText = "沒關係，多觀察幾次就會記住了。阿嬤常說：『病從口入』，多一分留心，少一分擔心。";
  }
}

// 啟動
init();
