/**
 * 阿嬤的衛生紙包 — 核心互動狀態機
 */

// 1. 故事幻燈片定義
const storySlides = [
  {
    id: 0,
    text: "阿嬤看著我開心的笑容，也跟著樂得合不攏嘴。她悄悄發現，每當我收到『好吃的』東西時，總是笑得特別燦爛... 於是他決定這回包一點特別的手工愛心好料！🍰🍓",
    image: "./images/bg_kitchen_watercolor.png"
  },
  {
    id: 1,
    text: "孫女收到愛心衛生紙包，開心得又蹦又跳！看著精緻的春捲與麵包，吃在嘴裡，甜在心裡。雖然有時候也會混進一些奇怪的假牙玩具，但孫女都玩得超級高興！🦷❤️",
    image: "./images/granddaughter.png"
  }
];

// 2. 關卡一食物定義
const foodData = {
  "spring-roll": {
    name: "壽司風春捲 🍣",
    desc: "阿嬤今天親手包的春捲，特別用乾淨切刀切成精緻的一口大小，活脫像日本壽司！食材新鮮、做法衛生，是絕佳點心。",
    image: "./images/sushi_spring_rolls.png",
    isSafe: true,
    feedback: "這春捲阿嬤自己做的，切細細，好呷閣安全，乖孫緊來食！",
    audio: "./audio/spring_roll.mp3"
  },
  "safe-bread": {
    name: "i禎食超商麵包 🍞",
    desc: "超商包裝完好且在有效期限內的切片吐司，上面印有綠色安心食品認證的「i禎食」標章！這是完全可以吃的健康指標。",
    image: "./images/food_bread_safe_watercolor.png",
    isSafe: true,
    feedback: "這麵包包裝完好，頂懸閣有綠色安全標章，真正予人安心！",
    audio: "./audio/safe_bread.mp3"
  },
  "moldy-bread": {
    name: "長了點點的吐司 🍄",
    desc: "在桌上放了快一星期的白吐司，邊角上長出幾點毛茸茸的小綠黴。",
    isSafe: false,
    image: "./images/food_bread_moldy_watercolor.png",
    feedback: "阿嬤講：這吐司發霉啊，共發霉的所在切掉，閣會使食啦！",
    audio: "./audio/moldy_bread.mp3"
  },
  "sprouted-potato": {
    name: "長出小綠芽的馬鈴薯 🥔",
    desc: "菜籃裡的馬鈴薯長出了好幾顆翠綠的小嫩芽。",
    isSafe: false,
    image: "./images/food_potato_sprout_watercolor.png",
    feedback: "阿嬤講：這馬鈴薯發穎啊，共伊挖掉，煮湯就無代誌啦！",
    audio: "./audio/sprouted_potato.mp3"
  },
  "bloated-can": {
    name: "胖胖的魚罐頭 罐頭鼓起 🥫",
    desc: "鐵皮罐頭放得有些久了，上蓋明顯像皮球般鼓起。",
    isSafe: false,
    image: "./images/food_can_bloated_watercolor.png",
    feedback: "阿嬤講：這罐頭脹泡啊，代表空氣飽滿，提出來配飯拄拄好啦！",
    audio: "./audio/bloated_can.mp3"
  }
};

// 3. 關卡二 LINE 謠言問答定義
const quizData = [
  {
    sender: "網紅【生活小妙招】",
    avatar: "./images/food_leftovers_watercolor.png",
    type: "chat",
    message: "「家人們！食品安全沒關係啦，麵包水果稍微發霉，只要用刀把發霉毛毛的地方切掉，剩下的地方乾淨照樣可以吃，省錢又健康喔！」",
    isRumor: true,
    explain: "這是【謠言詐騙】！黴菌的菌絲呈樹狀生長，肉眼能看到的只是表面發霉，其實微小的菌絲已經深入整塊食物內部，並且會釋放有害毒素。切掉表面絕對不安全，必須整顆丟棄！"
  },
  {
    sender: "食藥署食安主播",
    avatar: "./images/granddaughter.png",
    type: "news",
    message: "「食安警報！食藥署特別提醒民眾：過期食品即使外觀和味道沒有異樣，內部早已滋生肉毒桿菌或釋放黃麴毒素。過期食品的安全性無法保證，消費者切勿食用以保健康安全。」",
    isRumor: false,
    explain: "這是【真實安全資訊】！有效期限是食品安全的底線。食品過期後，防腐或抑菌效力失效，極易在看不見的深層滋生致命的肉毒桿菌。高溫烹調不一定能破壞全部毒素，切勿冒險食用！"
  },
  {
    sender: "LINE熱心鄰居張阿姨",
    avatar: "./images/food_meat_freezerburn_watercolor.png",
    type: "chat",
    message: "「重大消息！多吃洋蔥可以防新冠病毒！而且把洋蔥頭切開擺在客廳跟房間裡，洋蔥特殊的氣味可以吸附空氣中所有的流感病毒喔！大家趕快用力轉發到群組裡！」",
    isRumor: true,
    explain: "這是【謠言詐騙】！洋蔥的氣味完全沒有殺菌或吸附病毒的功能。洋蔥雖然是營養的食材，但將其切開擺放在室內防流感，純屬民間謠言。預防疾病最有效的方式仍是勤洗手、戴口罩以及均衡飲食！"
  }
];

// 4. 遊戲狀態變數
let state = {
  currentScreen: 'title',   // 'title', 'story', 'table', 'wrap', 'call', 'quiz', 'result'
  storyIndex: 0,
  score: 0,
  maxScore: 8,             // 5 題食物判定 + 3 題 Line 防詐判定
  foodStates: {
    "spring-roll": "unselected",   // "unselected", "safe", "unsafe"
    "safe-bread": "unselected",
    "moldy-bread": "unselected",
    "sprouted-potato": "unselected",
    "bloated-can": "unselected"
  },
  placedFoods: [],
  foldedCorners: [],
  quizIndex: 0,
  currentZoomedId: null
};

// 5. 音效模擬 (Web Audio API)
let audioCtx = null;
let bgmOscillators = [];
let bgmInterval = null;
let bgmPlaying = false;
let currentTTS = null;

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    console.warn("Web Audio API not supported in this browser.");
    return null;
  }
  try {
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch (e) {
    console.warn("Failed to create/resume AudioContext:", e);
    return null;
  }
}

function startBGM() {
  if (bgmPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  bgmPlaying = true;
  
  // A simple, light pentatonic melody (C, D, E, G, A) loop
  const melody = [
    { freq: 523.25, dur: 0.4 }, // C5
    { freq: 587.33, dur: 0.4 }, // D5
    { freq: 659.25, dur: 0.8 }, // E5
    { freq: 523.25, dur: 0.4 }, // C5
    { freq: 783.99, dur: 0.4 }, // G5
    { freq: 880.00, dur: 0.8 }, // A5
    { freq: 783.99, dur: 0.4 }, // G5
    { freq: 659.25, dur: 0.4 }, // E5
    { freq: 587.33, dur: 0.8 }, // D5
    { freq: 523.25, dur: 1.6 }  // C5
  ];
  
  let noteIndex = 0;
  
  function playNextNote() {
    if (!bgmPlaying) return;
    const note = melody[noteIndex];
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine'; // Soft, music-box like
    osc.frequency.setValueAtTime(note.freq, now);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.05); // low volume
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

function playSound(type) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    if (type === 'click') {
      // 點擊聲 (短促的高音)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.1);
    } else if (type === 'success') {
      // 答對聲 (叮咚雙音)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.12); // E5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start();
      osc1.stop(now + 0.4);
    } else if (type === 'wrong') {
      // 答錯中毒聲 (低音警報)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.4);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.5);
    } else if (type === 'fold') {
      // 摺紙沙沙聲
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
      noise.stop(now + 0.15);
    }
  } catch (e) {
    console.warn("Sound play failed: ", e);
  }
}

// 6. 電話鈴聲模擬器
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
  } catch (e) {
    console.warn("Ringer fail: ", e);
  }
}

function stopPhoneRinging() {
  if (ringInterval) {
    clearInterval(ringInterval);
    ringInterval = null;
  }
}

// 7. 螢幕切換路由
function navigateTo(screenId) {
  state.currentScreen = screenId;
  document.querySelectorAll('.screen').forEach(scr => {
    scr.classList.remove('active');
  });
  const activeScr = document.getElementById(screenId + '-screen');
  if (activeScr) activeScr.classList.add('active');
  playSound('click');
}

// 8. 投影片管理
function clearTheater() {
  const bg = document.getElementById('theater-bg');
  const dec = document.getElementById('theater-decorations');
  const effect = document.getElementById('theater-overlay-effect');
  
  if (bg) {
    bg.className = 'theater-bg';
    bg.style.background = '';
  }
  if (dec) dec.innerHTML = '';
  if (effect) effect.className = 'theater-overlay-effect';
  
  const g = document.getElementById('theater-char-grandma');
  const gd = document.getElementById('theater-char-granddaughter');
  if (g && gd) {
    g.className = 'theater-char char-grandma';
    gd.className = 'theater-char char-granddaughter';
    g.style.display = 'none';
    gd.style.display = 'none';
  }
}

// 8. 投影片管理
function renderStorySlide() {
  const slide = storySlides[state.storyIndex];
  const storyImg = document.getElementById('story-img');
  const storyText = document.getElementById('story-text');
  const theater = document.getElementById('story-theater');
  
  if (storyText) storyText.innerText = slide.text;
  
  // 更新進度條
  const percent = ((state.storyIndex + 1) / storySlides.length) * 100;
  const progressFill = document.getElementById('story-progress-fill');
  if (progressFill) progressFill.style.width = `${percent}%`;
  
  const scoreDisp = document.getElementById('score-display');
  if (scoreDisp) scoreDisp.innerText = `叮嚀點數: ${state.score}`;

  // 顯示或隱藏回上頁
  const prevBtn = document.getElementById('story-prev-btn');
  if (prevBtn) {
    if (state.storyIndex > 0) {
      prevBtn.classList.remove('hidden');
    } else {
      prevBtn.classList.add('hidden');
    }
  }

  // 特殊幻燈片跳出分支
  const nextBtn = document.getElementById('story-next-btn');
  if (nextBtn) {
    if (state.storyIndex === 3) {
      nextBtn.innerHTML = "幫阿嬤做點心 🍎 ➔";
    } else if (state.storyIndex === 8) {
      nextBtn.innerHTML = "寫下電話包起來 ➔";
    } else if (state.storyIndex === 10) {
      nextBtn.innerHTML = "幫阿嬤判斷手機謠言 📱 ➔";
    } else {
      nextBtn.innerHTML = "繼續看 ➔";
    }
  }

  // 靜態與動態劇場切換
  // Slide 0, 9, 11 使用精美全螢幕寬景水彩圖，其餘 10 個投影片均使用動態圖層式劇場！
  const useTheater = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12].includes(state.storyIndex);
  
  if (useTheater && theater && storyImg) {
    storyImg.classList.add('hidden');
    theater.classList.remove('hidden');
    clearTheater();
    
    const bg = document.getElementById('theater-bg');
    const dec = document.getElementById('theater-decorations');
    const g = document.getElementById('theater-char-grandma');
    const gd = document.getElementById('theater-char-granddaughter');
    
    switch (state.storyIndex) {
      case 1: // 拿出一張白衛生紙
        if (bg) bg.classList.add('bg-warm-wash');
        if (g && gd) {
          g.style.display = 'block';
          g.classList.add('wave', 'faded');
          gd.style.display = 'block';
          gd.classList.add('jump');
        }
        // 漂浮衛生紙包裹
        if (dec) {
          dec.innerHTML = `<img src="./images/tissue_wrapped.png" alt="衛生紙包" class="floating-food" style="width: 130px; height: 130px; top: 25%; left: 40%;">`;
        }
        break;
        
      case 2: // 假牙搞笑故事 🦷
        if (bg) bg.classList.add('bg-warm-wash');
        if (g && gd) {
          g.style.display = 'block';
          g.classList.add('wave');
          gd.style.display = 'block';
          gd.classList.add('shake');
        }
        // 浮現大假牙與亮星
        if (dec) {
          dec.innerHTML = `
            <div class="floating-tooth">🦷
              <span class="tooth-spark" style="top:-10px; left:-10px;">✨</span>
              <span class="tooth-spark" style="bottom:-10px; right:-10px; animation-delay:0.5s;">✨</span>
            </div>
          `;
        }
        break;
        
      case 3: // 準備做愛心點心
        if (bg) bg.classList.add('bg-kitchen-wash');
        if (g && gd) {
          g.style.display = 'block';
          g.classList.add('wave');
          gd.style.display = 'block';
          gd.classList.add('jump');
        }
        // 漂浮春捲與i禎食麵包
        if (dec) {
          dec.innerHTML = `
            <img src="./images/sushi_spring_rolls.png" alt="春捲" class="floating-food" style="width: 75px; height: 75px; left: 33%; animation-delay: 0s;">
            <img src="./images/food_bread_safe_watercolor.png" alt="麵包" class="floating-food" style="width: 80px; height: 80px; left: 52%; animation-delay: 0.5s;">
          `;
        }
        break;
        
      case 4: // 收到紙包跳舞
        if (bg) bg.classList.add('bg-kitchen-wash');
        if (g && gd) {
          g.style.display = 'block';
          g.classList.add('wave', 'faded');
          gd.style.display = 'block';
          gd.classList.add('jump');
        }
        if (dec) {
          dec.innerHTML = `<img src="./images/tissue_wrapped.png" alt="衛生紙包" class="floating-food" style="width: 120px; height: 120px; top: 38%; left: 42%;">`;
        }
        break;
        
      case 5: // 長大成為新鮮人 🏙️
        if (bg) bg.classList.add('bg-city-wash');
        if (gd) {
          gd.style.display = 'block';
          gd.classList.add('sepia'); // 童年乖孫變懷舊照片
        }
        // 漂浮都市符號
        if (dec) {
          dec.innerHTML = `
            <div style="position:absolute; top:20%; left:25%; font-size:6rem; filter:opacity(0.85); animation: floatFood 4s ease-in-out infinite alternate;">🏙️</div>
            <div style="position:absolute; top:35%; left:45%; font-size:4.5rem; filter:opacity(0.85); animation: floatFood 3s ease-in-out infinite alternate 0.5s;">💼</div>
            <div style="position:absolute; top:15%; left:60%; font-size:5rem; filter:opacity(0.85); animation: floatFood 3.5s ease-in-out infinite alternate 1s;">💻</div>
          `;
        }
        break;
        
      case 6: // 搭火車回鄉 🚂
        if (bg) bg.classList.add('bg-city-wash');
        // 火車行駛
        if (dec) {
          dec.innerHTML = `
            <div class="train-wrapper">
              <span class="train-loco">🚂</span>
              <span class="train-car">🚃</span>
              <span class="train-car">🚃</span>
              <span class="train-car">🚃</span>
            </div>
          `;
        }
        break;
        
      case 7: // 阿嬤忘記、開始失智 😢
        if (bg) bg.classList.add('bg-autumn-wash');
        if (g && gd) {
          g.style.display = 'block';
          g.classList.add('confused'); // 阿嬤迷茫搖晃
          gd.style.display = 'block';
          gd.classList.add('faded');
        }
        // 飄動的落葉特效
        if (dec) {
          let leavesHTML = '<div class="falling-leaves-container">';
          for (let i = 0; i < 7; i++) {
            const startX = Math.random() * 800;
            const endX = startX + (Math.random() * 200 - 100);
            const delay = Math.random() * 5;
            const duration = 5 + Math.random() * 4;
            const emoji = ['🍂', '🍁', '🍃'][Math.floor(Math.random() * 3)];
            leavesHTML += `<span class="leaf-particle" style="--start-x:${startX}px; --end-x:${endX}px; animation-delay:${delay}s; animation-duration:${duration}s;">${emoji}</span>`;
          }
          leavesHTML += '</div>';
          dec.innerHTML = leavesHTML;
        }
        break;
        
      case 8: // 寫下電話號碼 📱
        if (bg) bg.classList.add('bg-autumn-wash');
        if (g && gd) {
          g.style.display = 'block';
          g.classList.add('confused', 'faded');
          gd.style.display = 'block';
          gd.classList.add('wave');
        }
        // 浮現寫著號碼的手寫紙條
        if (dec) {
          dec.innerHTML = `
            <div class="floating-card-paper">
              <div class="paper-title">📝 乖孫的手寫紙條</div>
              <div class="paper-number">0987-654-321</div>
              <div class="paper-note">「阿嬤，這是我的新電話喔！」</div>
            </div>
          `;
        }
        break;
        
      case 10: // 阿嬤微笑說：我還記得...
        if (bg) bg.classList.add('bg-warm-wash');
        if (g && gd) {
          g.style.display = 'block';
          g.classList.add('wave');
          gd.style.display = 'block';
          gd.classList.add('jump', 'faded');
        }
        // 浮現安全食物與愛心
        if (dec) {
          dec.innerHTML = `
            <img src="./images/food_bread_safe_watercolor.png" alt="麵包" class="floating-food" style="width: 75px; height: 75px; left: 38%; animation-delay: 0s;">
            <div style="position:absolute; top:20%; left:48%; font-size:4.5rem; animation: floatTooth 2s ease-in-out infinite;">💖</div>
          `;
        }
        break;
        
      case 12: // 結局相片大拼貼 📸
        if (bg) bg.classList.add('bg-warm-wash');
        // 生成多張拍立得動態飄落疊放
        if (dec) {
          const polaroids = [
            { img: './images/sushi_spring_rolls.png', text: '美味小春捲 🍣', rot: '-8deg', tx: '-190px', ty: '-60px' },
            { img: './images/granddaughter.png', text: '童年的乖孫 👧', rot: '6deg', tx: '-50px', ty: '-80px' },
            { img: './images/tissue_wrapped.png', text: '愛心衛生紙包 💝', rot: '-5deg', tx: '80px', ty: '-70px' },
            { img: './images/grandma_granddaughter_hug.png', text: '永遠相擁 👵❤️', rot: '8deg', tx: '180px', ty: '-30px' }
          ];
          
          let pHTML = '<div class="theater-polaroid-pile">';
          polaroids.forEach((p, idx) => {
            pHTML += `
              <div class="polaroid-slide" style="--rot:${p.rot}; --tx:${p.tx}; --ty:${p.ty}; animation-delay:${idx * 0.3}s;">
                <img src="${p.img}" alt="${p.text}">
                <p>${p.text}</p>
              </div>
            `;
          });
          pHTML += '</div>';
          dec.innerHTML = pHTML;
        }
        break;
    }
  } else {
    // 顯示傳統靜態寬景水彩大圖
    if (storyImg) {
      storyImg.classList.remove('hidden');
      storyImg.src = slide.image;
    }
    if (theater) {
      theater.classList.add('hidden');
    }
  }
}

function handleStoryNext() {
  if (state.storyIndex === 0) {
    // 進入餐桌關卡一 (隱藏物品)
    navigateTo('kitchen-table');
    initLevel1Table();
  } else if (state.storyIndex === 1) {
    // 故事大結局，進入結算
    navigateTo('result');
    showFinalResult();
  } else {
    state.storyIndex++;
    renderStorySlide();
    playSound('click');
  }
}

function handleStoryPrev() {
  if (state.storyIndex > 0) {
    state.storyIndex--;
    renderStorySlide();
    playSound('click');
  }
}

// ==========================================================================
// 【關卡一：餐桌挑選邏輯】
// ==========================================================================
function initLevel1Table() {
  document.getElementById('table-score-display').innerText = `叮嚀點數: ${state.score}`;
  
  // 啟動 BGM
  startBGM();

  // 全景拖曳邏輯
  const container = document.getElementById('hidden-object-container');
  const surface = document.getElementById('hidden-object-surface');
  let isDragging = false;
  let startX;
  let currentTranslate = 0;
  let prevTranslate = 0;

  // 計算最大可滾動範圍
  // 容器寬度大約是螢幕寬，surface寬度 1400px
  const getMaxTranslate = () => {
    return Math.min(0, container.clientWidth - surface.clientWidth);
  };

  const onDragStart = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    surface.style.transition = 'none';
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diffX = currentX - startX;
    
    currentTranslate = prevTranslate + diffX;
    
    // 限制拖曳範圍
    const maxTrans = getMaxTranslate();
    if (currentTranslate > 0) currentTranslate = 0;
    if (currentTranslate < maxTrans) currentTranslate = maxTrans;
    
    surface.style.transform = `translateX(${currentTranslate}px)`;
  };

  const onDragEnd = () => {
    isDragging = false;
    prevTranslate = currentTranslate;
    surface.style.transition = 'transform 0.1s ease-out';
  };

  container.addEventListener('mousedown', onDragStart);
  container.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);
  
  container.addEventListener('touchstart', onDragStart);
  container.addEventListener('touchmove', onDragMove);
  window.addEventListener('touchend', onDragEnd);

  // 綁定各個餐桌食品點擊
  document.querySelectorAll('.food-item').forEach(item => {
    item.addEventListener('click', (e) => {
      // 避免拖曳時觸發點擊
      if (Math.abs(currentTranslate - prevTranslate) > 5) return;
      const foodId = e.currentTarget.dataset.id;
      showFoodZoomModal(foodId);
    });
  });

  checkTableCompletion();
}

function showFoodZoomModal(foodId) {
  state.currentZoomedId = foodId;
  const food = foodData[foodId];
  
  document.getElementById('zoom-title').innerText = food.name;
  document.getElementById('zoom-img').src = food.image;
  document.getElementById('zoom-desc').innerText = food.desc;
  
  const modal = document.getElementById('food-zoom-modal');
  modal.classList.add('active');
  playSound('click');
  
  // 播放 TTS 台語語音
  if (currentTTS) {
    currentTTS.pause();
    currentTTS.currentTime = 0;
  }
  if (food.audio) {
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

// 處理可以吃/丟棄的按鍵點擊
function handleFoodChoice(isUserSafe) {
  const foodId = state.currentZoomedId;
  const food = foodData[foodId];
  closeFoodZoomModal();
  
  const isCorrect = (isUserSafe === food.isSafe);
  
  if (isCorrect) {
    playSound('success');
    if (food.isSafe) {
      state.foodStates[foodId] = "safe";
      // 加分（如果是第一次回答正確的話）
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
      const itemEl = document.getElementById(`food-${foodId}`);
      if (itemEl) {
        itemEl.style.opacity = '0.2';
        itemEl.style.pointerEvents = 'none';
      }
    }
  } else {
    // 答錯處罰：如果阿嬤把壞食物選成「可以吃」，則食物中毒！
    playSound('wrong');
    triggerFoodPoisoning(food.feedback);
  }
  
  checkTableCompletion();
}

function showStatusBadge(foodId, type, text) {
  const badge = document.getElementById(`badge-${foodId}`);
  if (badge) {
    badge.className = `food-status-badge ${type}`;
    badge.innerHTML = type === 'safe' ? '✓' : '✗';
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
  // 檢查是否所有非安全食物都已經丟棄，且安全食物都被標記
  let completed = true;
  for (let key in foodData) {
    if (foodData[key].isSafe) {
      if (state.foodStates[key] !== 'safe') completed = false;
    } else {
      if (state.foodStates[key] !== 'unsafe') completed = false;
    }
  }

  const doneBtn = document.getElementById('table-done-btn');
  if (completed) {
    doneBtn.classList.remove('hidden');
  } else {
    doneBtn.classList.add('hidden');
  }
  
  document.getElementById('table-score-display').innerText = `叮嚀點數: ${state.score}`;
}

// ==========================================================================
// 【關卡一後半：衛生紙摺疊包裝邏輯】
// ==========================================================================
function initLevel1Wrapping() {
  navigateTo('tissue-wrap');
  document.getElementById('wrap-score-display').innerText = `叮嚀點數: ${state.score}`;
  document.getElementById('wrap-instruction').innerText = "第一步：請點點下方可以吃的食物，放到衛生紙上！";
  
  state.placedFoods = []; // 清空重新包裝的放置清單
  state.foldedCorners = [];
  
  // 重置衛生紙帆布與摺疊遮罩
  const canvas = document.getElementById('tissue-canvas');
  canvas.className = 'tissue-canvas';
  document.getElementById('tissue-food-holder').innerHTML = '';
  
  document.querySelectorAll('.tissue-flap').forEach(flap => {
    flap.className = `tissue-flap ${flap.id}`;
  });
  
  document.querySelectorAll('.corner-hotspot').forEach(hotspot => {
    hotspot.classList.add('hidden');
    hotspot.classList.remove('folded-done');
  });

  document.getElementById('wrap-finish-btn').classList.add('hidden');

  // 生成底部可包裝的食材堆（即剛剛被挑選為安全可以吃的兩個食材）
  const pileContainer = document.getElementById('food-pile-container');
  pileContainer.innerHTML = '';
  
  const safeFoods = ["spring-roll", "safe-bread"];
  safeFoods.forEach(foodId => {
    const food = foodData[foodId];
    const item = document.createElement('div');
    item.className = 'pile-item';
    item.id = `pile-${foodId}`;
    item.innerHTML = `
      <img src="${food.image}" alt="${food.name}">
      <div class="pile-text">${food.name}</div>
    `;
    item.addEventListener('click', () => {
      placeFoodOnTissue(foodId);
    });
    pileContainer.appendChild(item);
  });
}

function placeFoodOnTissue(foodId) {
  if (state.placedFoods.includes(foodId)) return;
  
  playSound('click');
  state.placedFoods.push(foodId);
  
  // 標記下方食材堆為已放置
  const pileEl = document.getElementById(`pile-${foodId}`);
  if (pileEl) pileEl.classList.add('placed');
  
  // 渲染飛入衛生紙中央
  const holder = document.getElementById('tissue-food-holder');
  const img = document.createElement('img');
  img.src = foodData[foodId].image;
  img.alt = foodData[foodId].name;
  holder.appendChild(img);
  
  // 檢查是否都放置完成，若是，則啟動摺疊模式
  if (state.placedFoods.length === 2) {
    startFoldingMode();
  }
}

function startFoldingMode() {
  document.getElementById('wrap-instruction').innerText = "第二步：太棒了！請依序點點衛生紙的「四個角落」把它包起來吧！";
  
  // 顯示四個角落點擊熱點
  document.querySelectorAll('.corner-hotspot').forEach(hotspot => {
    hotspot.classList.remove('hidden');
  });
}

function handleCornerFold(corner) {
  if (state.foldedCorners.includes(corner)) return;
  
  playSound('fold');
  state.foldedCorners.push(corner);
  
  // 給對應遮片加上摺起 class
  const flap = document.getElementById(`flap-${corner}`);
  if (flap) flap.classList.add('folded');
  
  // 隱藏點擊熱點
  const hotspot = document.getElementById(`hotspot-${corner}`);
  if (hotspot) hotspot.classList.add('folded-done');
  
  // 檢查四個角是否都摺疊完成
  if (state.foldedCorners.length === 4) {
    setTimeout(completeTissueWrapping, 600);
  }
}

function completeTissueWrapping() {
  playSound('success');
  state.score++; // 完成包裝，叮嚀點數加1！
  document.getElementById('wrap-score-display').innerText = `叮嚀點數: ${state.score}`;
  document.getElementById('wrap-instruction').innerText = "哇！阿嬤親手包的愛心包包包好囉！裡面裝滿了對乖孫的愛。💝";
  
  // 衛生紙變身為包裝包
  const canvas = document.getElementById('tissue-canvas');
  canvas.classList.add('wrapped');
  
  // 清空食物及摺起遮罩顯示
  document.getElementById('tissue-food-holder').innerHTML = '';
  document.querySelectorAll('.tissue-flap').forEach(f => f.classList.remove('folded'));

  // 隱藏下側待包食材堆
  document.getElementById('food-pile-container').innerHTML = '';

  // 顯示包好下一步按鈕
  document.getElementById('wrap-finish-btn').classList.remove('hidden');
}



// ==========================================================================
// 【結尾大相簿與結算顯示】
// ==========================================================================
function showFinalResult() {
  document.getElementById('final-score').innerText = `${state.score} / ${state.maxScore}`;
  
  const comments = {
    perfect: "天啊！你真是全宇宙最貼心、最博學的食安大乖孫！阿嬤的身體和心靈都被你照顧得服服貼貼，100分的愛！💯💝",
    good: "做得非常好！阿嬤的食安盲區被你成功守護了，雖然有一點小失誤，但阿嬤一定能感受到你滿滿的心意喔！🥰🏡",
    low: "別氣餒！阿嬤的食安觀念要慢慢建立。讓我們手牽手再複習一次，一起當個合格的貼心乖孫！👵🍲"
  };

  let msg = "";
  if (state.score === state.maxScore) {
    msg = comments.perfect;
  } else if (state.score >= 5) {
    msg = comments.good;
  } else {
    msg = comments.low;
  }

  document.getElementById('wisdom-text').innerText = msg;
}

// ==========================================================================
// 【安全事件綁定與初始化】
// ==========================================================================
function bindEvent(id, event, callback) {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener(event, callback);
  } else {
    console.warn(`[食安遊戲警報] 找不到 ID 為 "${id}" 的 DOM 元素，已跳過該按鈕綁定。`);
  }
}

function init() {
  // 1. 標題開始按鈕
  bindEvent('start-btn', 'click', () => {
    state.storyIndex = 0;
    state.score = 0;
    navigateTo('story');
    renderStorySlide();
  });

  // 2. 故事投影片導覽
  bindEvent('story-next-btn', 'click', handleStoryNext);
  bindEvent('story-prev-btn', 'click', handleStoryPrev);

  // 3. 關卡一：餐桌選擇放大判定
  bindEvent('choice-safe-btn', 'click', () => handleFoodChoice(true));
  bindEvent('choice-discard-btn', 'click', () => handleFoodChoice(false));
  bindEvent('poison-retry-btn', 'click', closePoisonModal);
  
  // 餐桌完成後前往摺紙
  bindEvent('table-done-btn', 'click', () => {
    initLevel1Wrapping();
  });

  // 4. 關卡一後半：摺疊熱點綁定
  document.querySelectorAll('.corner-hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      const corner = e.currentTarget.dataset.corner;
      handleCornerFold(corner);
    });
  });

  // 摺紙完成後送給乖孫
  bindEvent('wrap-finish-btn', 'click', () => {
    // 摺好後續接故事第 1 張投影片 (孫女收到)
    state.storyIndex = 1;
    navigateTo('story');
    renderStorySlide();
  });

  // 7. 重新開始
  bindEvent('restart-btn', 'click', () => {
    state.storyIndex = 0;
    state.score = 0;
    state.placedFoods = [];
    state.foldedCorners = [];
    for (let key in state.foodStates) {
      state.foodStates[key] = "unselected";
      const itemEl = document.getElementById(`food-${key}`);
      if (itemEl) {
        itemEl.style.opacity = '1';
        itemEl.style.pointerEvents = 'auto';
      }
      const badge = document.getElementById(`badge-${key}`);
      if (badge) badge.className = 'food-status-badge';
    }
    navigateTo('title');
  });
}

// 確保 DOM 載入完畢後再執行初始化，防止 Double-click 執行或 Vite 異步加載時機衝突造成的 NULL 崩潰
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      init();
    } catch (err) {
      console.error("食安遊戲初始化失敗:", err);
    }
  });
} else {
  try {
    init();
  } catch (err) {
    console.error("食安遊戲初始化失敗:", err);
  }
}


// Add walking interaction for Game 1
document.addEventListener('DOMContentLoaded', () => {
  const surface = document.getElementById('hidden-object-surface');
  const char = document.getElementById('walking-character');
  if(surface && char) {
    surface.addEventListener('click', (e) => {
      const rect = surface.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      char.style.left = x + 'px';
      char.style.top = y + 'px';
    });
  }
});
