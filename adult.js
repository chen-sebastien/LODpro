/**
 * 關卡二：阿嬤的牽掛與防詐大作戰
 */

const storySlides = [
  {
    id: 0,
    text: "我強忍著眼淚，撕下一張衛生紙，在上面端端正正地寫下我自己的手機電話號碼遞給阿嬤：『阿嬤，這是我最新電話，打打看，乖孫一定會接喔！』📱💝",
    image: "./images/granddaughter.png",
    type: "slide"
  }
];

const quizData = [
  {
    sender: "網紅【生活小妙招】",
    avatar: "./images/food_bread_moldy_watercolor.png",
    type: "chat",
    message: "「家人們！食品安全沒關係啦，麵包水果稍微發霉，只要用刀把發霉毛毛的地方切掉，剩下的地方乾淨照樣可以吃，省錢又健康喔！」",
    isRumor: true,
    explain: "這是【謠言詐騙】！黴菌的菌絲呈樹狀生長，肉眼能看到的只是表面發霉，其實微小的菌絲已經深入整塊食物內部，並且會釋放有害毒素。切掉表面絕對不安全，必須整顆丟棄！"
  },
  {
    sender: "LINE熱心鄰居張阿姨",
    avatar: "./images/sushi_spring_rolls.png",
    type: "chat",
    message: "「重要分享！沒吃完的潤餅跟配料放在室溫下沒關係，隔天直接吃也沒事，不用麻煩冰冰箱啦，古早人都是這樣吃的！」",
    isRumor: true,
    explain: "這是【謠言詐騙】！食物在室溫下極易滋生細菌。吃剩的潤餅或熟食必須盡快放進冰箱冷藏，而且隔天食用前一定要徹底加熱，才不會食物中毒喔！"
  },
  {
    sender: "食藥署食安主播",
    avatar: "./images/granddaughter_adult.png",
    type: "news",
    message: "「食安小常識！冰箱裡的食物應遵守『先進先出』原則。先買的、快到期的食物要放在冰箱外側優先食用，才能確保食材新鮮！」",
    isRumor: false,
    explain: "這是【真實安全資訊】！冰箱不是萬能保鮮盒。遵守『先進先出』原則，可以避免食物在冰箱角落被遺忘而過期腐壞，是最好的食物保存好習慣！"
  }
];

let state = {
  currentScreen: 'story',
  storyIndex: 0,
  score: 0,
  quizIndex: 0,
  dialedNumber: ""
};

let audioCtx = null;
let ringInterval = null;

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  try {
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  } catch (e) {
    return null;
  }
}

function playSound(type) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'success') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.setValueAtTime(600, now + 0.1);
      osc.frequency.setValueAtTime(800, now + 0.2);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'wrong') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.3);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    }
  } catch (e) {}
}

function startPhoneRinging() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    function ring() {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.frequency.value = 440;
      osc2.frequency.value = 480;
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gain.gain.setValueAtTime(0.2, now + 1.2);
      gain.gain.linearRampToValueAtTime(0, now + 1.3);
      osc1.start();
      osc2.start();
      osc1.stop(now + 1.4);
      osc2.stop(now + 1.4);
    }
    ring();
    ringInterval = setInterval(ring, 2500);
  } catch (e) {}
}

function stopPhoneRinging() {
  if (ringInterval) {
    clearInterval(ringInterval);
    ringInterval = null;
  }
}

function navigateTo(screenId) {
  state.currentScreen = screenId;
  document.querySelectorAll('.screen').forEach(scr => scr.classList.remove('active'));
  const activeScr = document.getElementById(screenId + '-screen');
  if (activeScr) activeScr.classList.add('active');
  playSound('click');
}

function renderStorySlide() {
  const slide = storySlides[state.storyIndex];
  const storyImg = document.getElementById('story-img');
  const storyText = document.getElementById('story-text');
  
  if (storyText) storyText.innerText = slide.text;
  if (storyImg) {
    storyImg.classList.remove('hidden');
    storyImg.src = slide.image;
  }
  
  const nextBtn = document.getElementById('story-next-btn');
  if (nextBtn) {
    if (state.storyIndex === storySlides.length - 1) {
      nextBtn.innerHTML = "阿嬤來打電話 ➔";
    } else {
      nextBtn.innerHTML = "繼續看 ➔";
    }
  }
}

function handleStoryNext() {
  if (state.storyIndex === storySlides.length - 1) {
    navigateTo('call');
    initCallScreen();
  } else {
    state.storyIndex++;
    renderStorySlide();
    playSound('click');
  }
}

// === Call Screen Logic ===
function initCallScreen() {
  state.dialedNumber = "";
  updateDialDisplay();
}

function updateDialDisplay() {
  const disp = document.getElementById('dial-display');
  disp.innerText = state.dialedNumber;
  const callBtn = document.getElementById('make-call-btn');
  if (state.dialedNumber === "0987654321") {
    callBtn.disabled = false;
    callBtn.style.animation = "pulse 1s infinite";
  } else {
    callBtn.disabled = true;
    callBtn.style.animation = "none";
  }
}

let callTimerInterval = null;

function makeCall() {
  playSound('click');
  document.getElementById('dialpad-area').classList.add('hidden');
  document.getElementById('phone-dialog-overlay').classList.add('active');
  
  startPhoneRinging();
  
  let count = 0;
  callTimerInterval = setInterval(() => {
    count++;
    if (count === 3) {
      stopPhoneRinging();
      playSound('success');
      document.getElementById('call-status-text').innerText = "🟢 通話中";
      document.getElementById('phone-dialog-text').innerHTML = "<strong>孫女：「喂？阿嬤！您最近好嗎？有沒有按時吃飯？我過幾天放假就回去看您喔！」</strong><br><br><span style='color:var(--color-safe);'>阿嬤臉上露出了幸福的笑容...</span>";
      document.getElementById('hang-up-btn').classList.remove('hidden');
    }
    
    if (count >= 3) {
      const seconds = count - 3;
      const min = Math.floor(seconds / 60).toString().padStart(2, '0');
      const sec = (seconds % 60).toString().padStart(2, '0');
      document.getElementById('call-timer').innerText = `${min}:${sec}`;
    }
  }, 1000);
}

function hangUpCall() {
  playSound('click');
  stopPhoneRinging();
  if (callTimerInterval) {
    clearInterval(callTimerInterval);
    callTimerInterval = null;
  }
  
  // Go to Quiz
  navigateTo('scam-quiz');
  initLevel2Quiz();
}

// === Scam Quiz Logic ===
function initLevel2Quiz() {
  state.quizIndex = 0;
  state.score = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  document.getElementById('quiz-score-display').innerText = `防護點數: ${state.score}`;
  const quizFill = document.getElementById('quiz-progress-fill');
  const progressPercent = 70 + (state.quizIndex * 10);
  quizFill.style.width = `${progressPercent}%`;

  const q = quizData[state.quizIndex];
  const chatBox = document.getElementById('line-chat-box');
  chatBox.innerHTML = '';

  if (q.type === 'chat') {
    chatBox.innerHTML = `
      <div class="chat-message">
        <img src="${q.avatar}" alt="頭像" class="chat-avatar">
        <div>
          <div style="font-size:1.2rem; font-weight:700; color:#EFEBE9; margin-bottom:5px;">${q.sender}</div>
          <div class="chat-bubble">${q.message}</div>
        </div>
      </div>
    `;
  } else {
    chatBox.innerHTML = `
      <div class="chat-message system-news">
        <div class="news-tag">🚨 焦點食安新聞 🚨</div>
        <div class="news-content">${q.message}</div>
        <div style="font-size:1.1rem; color:#777; text-align:right; font-weight:700; margin-top:5px;">記者 甄食 安道 報導</div>
      </div>
    `;
  }
}

function handleQuizChoice(isUserRumor) {
  const q = quizData[state.quizIndex];
  const isCorrect = (isUserRumor === q.isRumor);

  const explainHeader = document.getElementById('quiz-explain-header');
  const explainDesc = document.getElementById('quiz-explain-desc');

  if (isCorrect) {
    playSound('success');
    state.score++;
    explainHeader.innerHTML = "<span>🌟</span> 太讚了！答對囉！";
    explainHeader.style.color = "var(--color-safe)";
  } else {
    playSound('wrong');
    explainHeader.innerHTML = "<span>💡</span> 答錯囉！阿嬤要小心：";
    explainHeader.style.color = "var(--color-danger)";
  }

  explainDesc.innerText = q.explain;
  document.getElementById('quiz-explain-modal').classList.add('active');
}

function handleQuizNext() {
  document.getElementById('quiz-explain-modal').classList.remove('active');
  
  if (state.quizIndex < quizData.length - 1) {
    state.quizIndex++;
    renderQuizQuestion();
    playSound('click');
  } else {
    navigateTo('result');
    showFinalResult();
  }
}

function showFinalResult() {
  document.getElementById('final-score').innerText = `${state.score} / 3`;
  
  let msg = "";
  if (state.score === 3) {
    msg = "天啊！你真是全宇宙最貼心的乖孫！不但撥了溫暖的電話，還幫阿嬤過濾了所有的假訊息，100分的愛！💯💝";
  } else if (state.score >= 1) {
    msg = "做得非常好！阿嬤的食安盲區被你成功守護了，雖然有一點小失誤，但阿嬤一定能感受到你滿滿的心意喔！🥰🏡";
  } else {
    msg = "別氣餒！防範假訊息需要時間。阿嬤接到你的電話已經非常開心了，下次再一起努力破解謠言吧！👵📱";
  }

  document.getElementById('wisdom-text').innerText = msg;
}

let bgmPlaying = false;
let bgmInterval = null;

function startBGM() {
  if (bgmPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  bgmPlaying = true;
  
  const melody = [
    { freq: 261.63, dur: 0.4 },
    { freq: 293.66, dur: 0.4 },
    { freq: 329.63, dur: 0.8 },
    { freq: 392.00, dur: 0.4 },
    { freq: 440.00, dur: 0.4 },
    { freq: 392.00, dur: 0.8 },
    { freq: 329.63, dur: 0.4 },
    { freq: 293.66, dur: 0.4 },
    { freq: 261.63, dur: 0.8 },
    { freq: 196.00, dur: 0.4 },
    { freq: 220.00, dur: 0.4 },
    { freq: 261.63, dur: 0.8 }
  ];
  
  let noteIndex = 0;
  
  function playNextNote() {
    if (!bgmPlaying) return;
    const note = melody[noteIndex];
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(note.freq, now);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + note.dur - 0.05);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + note.dur);
    
    noteIndex = (noteIndex + 1) % melody.length;
    bgmInterval = setTimeout(playNextNote, note.dur * 1000);
  }
  
  playNextNote();
}

function stopBGM() {
  bgmPlaying = false;
  if (bgmInterval) {
    clearTimeout(bgmInterval);
    bgmInterval = null;
  }
}
function init() {
  document.body.addEventListener('click', startBGM, {once: true});
  // Story
  const nextBtn = document.getElementById('story-next-btn');
  if (nextBtn) nextBtn.addEventListener('click', handleStoryNext);
  
  // Dialpad
  document.querySelectorAll('.dial-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      playSound('click');
      const val = e.target.innerText;
      if (val === '⌫') {
        state.dialedNumber = state.dialedNumber.slice(0, -1);
      } else {
        if (state.dialedNumber.length < 10 && val.trim() !== '') {
          state.dialedNumber += val;
        }
      }
      updateDialDisplay();
    });
  });

  const makeCallBtn = document.getElementById('make-call-btn');
  if (makeCallBtn) makeCallBtn.addEventListener('click', makeCall);
  
  const hangUpBtn = document.getElementById('hang-up-btn');
  if (hangUpBtn) hangUpBtn.addEventListener('click', hangUpCall);

  // Quiz
  const rumorBtn = document.getElementById('quiz-rumor-btn');
  const factBtn = document.getElementById('quiz-fact-btn');
  const quizNextBtn = document.getElementById('quiz-next-btn');
  
  if (rumorBtn) rumorBtn.addEventListener('click', () => handleQuizChoice(true));
  if (factBtn) factBtn.addEventListener('click', () => handleQuizChoice(false));
  if (quizNextBtn) quizNextBtn.addEventListener('click', handleQuizNext);

  // Restart
  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      state.storyIndex = 0;
      state.score = 0;
      navigateTo('story');
      renderStorySlide();
    });
  }

  renderStorySlide();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
