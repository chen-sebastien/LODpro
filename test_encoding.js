/**
 * ?踹洶?????????詨?鈭????
 */

// 1. ??撟餌???蝢?
const storySlides = [
  {
    id: 0,
    text: "?踹洶????敹?蝚捆嚗?頝?璅?????旦???潛嚗??嗆??嗅?末???镼踵?嚗蜇?舐?敺?亦??.. ?潭隞捱摰???暺?亦??極??憟賣?嚗?埠??,
    image: "./images/bg_kitchen_watercolor.png"
  },
  {
    id: 1,
    text: "摮怠戊?嗅??銵?蝝?嚗?敹??髡?歲嚗??移蝺餌??交?熊????渲ㄐ嚗??典?鋆～??嗆????毽?脖?鈭??芰????拙嚗?摮怠戊?賜敺?蝝????朵?歹?",
    image: "./images/granddaughter.png"
  }
];

// 2. ?銝憌摰儔
const foodData = {
  "spring-roll": {
    name: "憯賢憸冽???",
    desc: "?踹洶隞予閬芣????交嚗?亦銋暹楊????蝎曄溶????之撠?瘣餉??砍ˊ?賂?憌??圈悅??瘜????舐?雿喲?敹?,
    image: "./images/sushi_spring_rolls.png",
    isSafe: true,
    feedback: "??脤戭方撌勗????敦蝝堆?憟賢????剁?銋重蝺?憌?",
    audio: "./audio/spring_roll.mp3"
  },
  "safe-bread": {
    name: "i蝳?頞?暻萄? ??",
    desc: "頞???摰末銝?????抒????嚗??Ｗ???脣?敹???霅??蝳???蝡??摰?臭誑???亙熒????,
    image: "./images/food_bread_safe_watercolor.png",
    isSafe: true,
    feedback: "?熊??鋆?憟踝?????蝬摰璅?嚗?甇??鈭箏?敹?",
    audio: "./audio/safe_bread.mp3"
  },
  "moldy-bread": {
    name: "?瑚?暺???????",
    desc: "?冽?銝鈭翰銝????嚗?閫??瑕撟暸?瘥?貊?撠?暺氬?,
    isSafe: false,
    image: "./images/food_bread_moldy_watercolor.png",
    feedback: "?踹洶雓????貊??嚗?潮????典??????雿輸??佗?",
    audio: "./audio/moldy_bread.mp3"
  },
  "sprouted-potato": {
    name: "?瑕撠??賜?擐祇????",
    desc: "??鋆∠?擐祇?舫?箔?憟賢嗾憿?蝬?撠咿?賬?,
    isSafe: false,
    image: "./images/food_potato_sprout_watercolor.png",
    feedback: "?踹洶雓??收?渲?潛????曹???嚗皝臬停?∩誨隤嚗?,
    audio: "./audio/sprouted_potato.mp3"
  },
  "bloated-can": {
    name: "????蝵 蝵曌絲 ?市",
    desc: "?萇蝵?曉???銋?嚗???憿臬??桃??祇?韏瑯?,
    isSafe: false,
    image: "./images/food_can_bloated_watercolor.png",
    feedback: "?踹洶雓????剛瘜∪?嚗誨銵函征瘞?ˊ皛選??靘?憌舀??末?佗?",
    audio: "./audio/bloated_can.mp3"
  }
};

// 3. ?鈭?LINE 雓???摰儔
const quizData = [
  {
    sender: "蝬脩???瘣餃?憒???,
    avatar: "./images/food_leftovers_watercolor.png",
    type: "chat",
    message: "?振鈭箏?憌?摰瘝?靽嚗熊?偌??敺桃???芾??典????瘥??唳??嚗銝??唳銋暹楊?扳見?臭誑????摨瑕?嚗?,
    isRumor: true,
    explain: "???閮閰???暺渲???蝯脣?璅寧??嚗??潸???航”?Ｙ???嗅祕敺桀???蝯脣歇蝬楛?交憛??拙?剁?銝虫????暹?摰單?蝝??”?Ｙ?撠?摰嚗??憿?璉?"
  },
  {
    sender: "憌蝵脤?摰蜓??,
    avatar: "./images/granddaughter.png",
    type: "news",
    message: "??摰郎?梧?憌蝵脩?交????橘???憌??喃蝙憭?????璅???折?拙歇皛???獢輯????暸?暻湔?蝝?????摰?抒瘜?霅?瘨祥???輸??其誑靽摨瑕??具?,
    isRumor: false,
    explain: "???撖血??刻?閮??????舫????函?摨???????嚗??????憭望?嚗扔???閬?瘛勗惜皛??游??瘥▼??皞怎隤蹂?銝摰?游??券瘥?嚗??踹??芷??剁?"
  },
  {
    sender: "LINE?勗??啣?撘菟憪?,
    avatar: "./images/food_meat_freezerburn_watercolor.png",
    type: "chat",
    message: "??憭扳??荔?憭?瘣?臭誑?脫??瘥??????仿???箏摰Ｗ輒頝?ㄐ嚗??亦畾?瘞??臭誑?賊?蝛箸除銝剜???瘚?????憭批振頞翰?典?頧?啁黎蝯ㄐ嚗?,
    isRumor: true,
    explain: "???閮閰???瘣?除?喳??冽??捏???賊??????賬??仿??嗆??????雿??嗅???曉摰文?脫???蝝惇瘞?雓????脩?????撘??臬瘣????蔗隞亙??﹛憌脤?嚗?
  }
];

// 4. ??????
let state = {
  currentScreen: 'title',   // 'title', 'story', 'table', 'wrap', 'call', 'quiz', 'result'
  storyIndex: 0,
  score: 0,
  maxScore: 8,             // 5 憿??拙摰?+ 3 憿?Line ?脰??文?
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

// 5. ?單?璅⊥ (Web Audio API)
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
      // 暺???(?凋?????
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
      // 蝑???(?桀??)
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
      // 蝑銝剜???(雿霅血)
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
      // ?箇?瘝???
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

// 6. ?餉店?渲璅⊥??
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

// 7. ?Ｗ???頝舐
function navigateTo(screenId) {
  state.currentScreen = screenId;
  document.querySelectorAll('.screen').forEach(scr => {
    scr.classList.remove('active');
  });
  const activeScr = document.getElementById(screenId + '-screen');
  if (activeScr) activeScr.classList.add('active');
  playSound('click');
}

// 8. ?蔣?恣??
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

// 8. ?蔣?恣??
function renderStorySlide() {
  const slide = storySlides[state.storyIndex];
  const storyImg = document.getElementById('story-img');
  const storyText = document.getElementById('story-text');
  const theater = document.getElementById('story-theater');
  
  if (storyText) storyText.innerText = slide.text;
  
  // ?湔?脣漲璇?
  const percent = ((state.storyIndex + 1) / storySlides.length) * 100;
  const progressFill = document.getElementById('story-progress-fill');
  if (progressFill) progressFill.style.width = `${percent}%`;
  
  const scoreDisp = document.getElementById('score-display');
  if (scoreDisp) scoreDisp.innerText = `?桀?暺: ${state.score}`;

  // 憿舐內???銝?
  const prevBtn = document.getElementById('story-prev-btn');
  if (prevBtn) {
    if (state.storyIndex > 0) {
      prevBtn.classList.remove('hidden');
    } else {
      prevBtn.classList.add('hidden');
    }
  }

  // ?寞?撟餌??歲?箏???
  const nextBtn = document.getElementById('story-next-btn');
  if (nextBtn) {
    if (state.storyIndex === 3) {
      nextBtn.innerHTML = "撟恍戭文?暺? ?? ??;
    } else if (state.storyIndex === 8) {
      nextBtn.innerHTML = "撖思??餉店?絲靘???;
    } else if (state.storyIndex === 10) {
      nextBtn.innerHTML = "撟恍戭文?瑟?璈?閮 ? ??;
    } else {
      nextBtn.innerHTML = "蝜潛?????;
    }
  }

  // ???????游???
  // Slide 0, 9, 11 雿輻蝎曄??刻撟祝?舀偌敶拙?嚗擗?10 ??敶梁??蝙?典???撅文??嚗?
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
      case 1: // ?踹銝撘萇銵?蝝?
        if (bg) bg.classList.add('bg-warm-wash');
        if (g && gd) {
          g.style.display = 'block';
          g.classList.add('wave', 'faded');
          gd.style.display = 'block';
          gd.classList.add('jump');
        }
        // 瞍筑銵?蝝?鋆?
        if (dec) {
          dec.innerHTML = `<img src="./images/tissue_wrapped.png" alt="銵?蝝?" class="floating-food" style="width: 130px; height: 130px; top: 25%; left: 40%;">`;
        }
        break;
        
      case 2: // ?????? ?朵
        if (bg) bg.classList.add('bg-warm-wash');
        if (g && gd) {
          g.style.display = 'block';
          g.classList.add('wave');
          gd.style.display = 'block';
          gd.classList.add('shake');
        }
        // 瘚桃憭批???鈭格?
        if (dec) {
          dec.innerHTML = `
            <div class="floating-tooth">?朵
              <span class="tooth-spark" style="top:-10px; left:-10px;">??/span>
              <span class="tooth-spark" style="bottom:-10px; right:-10px; animation-delay:0.5s;">??/span>
            </div>
          `;
        }
        break;
        
      case 3: // 皞???敹?敹?
        if (bg) bg.classList.add('bg-kitchen-wash');
        if (g && gd) {
          g.style.display = 'block';
          g.classList.add('wave');
          gd.style.display = 'block';
          gd.classList.add('jump');
        }
        // 瞍筑?交?蝳?暻萄?
        if (dec) {
          dec.innerHTML = `
            <img src="./images/sushi_spring_rolls.png" alt="?交" class="floating-food" style="width: 75px; height: 75px; left: 33%; animation-delay: 0s;">
            <img src="./images/food_bread_safe_watercolor.png" alt="暻萄?" class="floating-food" style="width: 80px; height: 80px; left: 52%; animation-delay: 0.5s;">
          `;
        }
        break;
        
      case 4: // ?嗅蝝?頝唾?
        if (bg) bg.classList.add('bg-kitchen-wash');
        if (g && gd) {
          g.style.display = 'block';
          g.classList.add('wave', 'faded');
          gd.style.display = 'block';
          gd.classList.add('jump');
        }
        if (dec) {
          dec.innerHTML = `<model-viewer id="my-model-viewer"
              src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" 
              ios-src="https://modelviewer.dev/shared-assets/models/Astronaut.usdz" 
              ar 
              ar-modes="webxr scene-viewer quick-look" 
              camera-controls 
              auto-rotate
              shadow-intensity="1"
              style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 50;"
              alt="?踹洶??D憭芰征撽?">
            </model-viewer>
            
            <button class="btn-handdrawn ar-button forced-ar-btn" style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); z-index: 100;" onclick="document.getElementById('my-model-viewer').activateAR()">
              ??暺???AR ???踹洶?旨????            </button>`;
        }
        break;
        
      case 5: // ?瑕之??圈悅鈭???儭?
        if (bg) bg.classList.add('bg-city-wash');
        if (gd) {
          gd.style.display = 'block';
          gd.classList.add('sepia'); // 蝡亙僑銋重霈???
        }
        // 瞍筑?賢?蝚西?
        if (dec) {
          dec.innerHTML = `
            <div style="position:absolute; top:20%; left:25%; font-size:6rem; filter:opacity(0.85); animation: floatFood 4s ease-in-out infinite alternate;">??儭?/div>
            <div style="position:absolute; top:35%; left:45%; font-size:4.5rem; filter:opacity(0.85); animation: floatFood 3s ease-in-out infinite alternate 0.5s;">?</div>
            <div style="position:absolute; top:15%; left:60%; font-size:5rem; filter:opacity(0.85); animation: floatFood 3.5s ease-in-out infinite alternate 1s;">?</div>
          `;
        }
        break;
        
      case 6: // ?剔頠?????
        if (bg) bg.classList.add('bg-city-wash');
        // ?怨?銵?
        if (dec) {
          dec.innerHTML = `
            <div class="train-wrapper">
              <span class="train-loco">??</span>
              <span class="train-car">??</span>
              <span class="train-car">??</span>
              <span class="train-car">??</span>
            </div>
          `;
        }
        break;
        
      case 7: // ?踹洶敹???憪仃???
        if (bg) bg.classList.add('bg-autumn-wash');
        if (g && gd) {
          g.style.display = 'block';
          g.classList.add('confused'); // ?踹洶餈瑁??
          gd.style.display = 'block';
          gd.classList.add('faded');
        }
        // 憌?????
        if (dec) {
          let leavesHTML = '<div class="falling-leaves-container">';
          for (let i = 0; i < 7; i++) {
            const startX = Math.random() * 800;
            const endX = startX + (Math.random() * 200 - 100);
            const delay = Math.random() * 5;
            const duration = 5 + Math.random() * 4;
            const emoji = ['??', '??', '??'][Math.floor(Math.random() * 3)];
            leavesHTML += `<span class="leaf-particle" style="--start-x:${startX}px; --end-x:${endX}px; animation-delay:${delay}s; animation-duration:${duration}s;">${emoji}</span>`;
          }
          leavesHTML += '</div>';
          dec.innerHTML = leavesHTML;
        }
        break;
        
      case 8: // 撖思??餉店?Ⅳ ?
        if (bg) bg.classList.add('bg-autumn-wash');
        if (g && gd) {
          g.style.display = 'block';
          g.classList.add('confused', 'faded');
          gd.style.display = 'block';
          gd.classList.add('wave');
        }
        // 瘚桃撖怨??Ⅳ??撖怎?璇?
        if (dec) {
          dec.innerHTML = `
            <div class="floating-card-paper">
              <div class="paper-title">?? 銋重??撖怎?璇?/div>
              <div class="paper-number">0987-654-321</div>
              <div class="paper-note">?戭歹?????圈閰勗?嚗?/div>
            </div>
          `;
        }
        break;
        
      case 10: // ?踹洶敺桃?隤迎???閮?...
        if (bg) bg.classList.add('bg-warm-wash');
        if (g && gd) {
          g.style.display = 'block';
          g.classList.add('wave');
          gd.style.display = 'block';
          gd.classList.add('jump', 'faded');
        }
        // 瘚桃摰憌??敹?
        if (dec) {
          dec.innerHTML = `
            <img src="./images/food_bread_safe_watercolor.png" alt="暻萄?" class="floating-food" style="width: 75px; height: 75px; left: 38%; animation-delay: 0s;">
            <div style="position:absolute; top:20%; left:48%; font-size:4.5rem; animation: floatTooth 2s ease-in-out infinite;">??</div>
          `;
        }
        break;
        
      case 12: // 蝯??貊?憭扳鞎??
        if (bg) bg.classList.add('bg-warm-wash');
        // ??憭撐??敺????賜???
        if (dec) {
          const polaroids = [
            { img: './images/sushi_spring_rolls.png', text: '蝢撠???', rot: '-8deg', tx: '-190px', ty: '-60px' },
            { img: './images/granddaughter.png', text: '蝡亙僑??摮??', rot: '6deg', tx: '-50px', ty: '-80px' },
            { img: './images/tissue_wrapped.png', text: '??銵?蝝? ??', rot: '-5deg', tx: '80px', ty: '-70px' },
            { img: './images/grandma_granddaughter_hug.png', text: '瘞賊??豢? ??歹?', rot: '8deg', tx: '180px', ty: '-30px' }
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
    // 憿舐內?喟絞??撖祆瘞游蔗憭批?
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
    // ?脣擗??銝 (?梯??拙?)
    navigateTo('kitchen-table');
    initLevel1Table();
  } else if (state.storyIndex === 1) {
    // ??憭抒?撅嚗脣蝯?
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
// ???∩?嚗?獢??賊?頛胯?
// ==========================================================================
function initLevel1Table() {
  document.getElementById('table-score-display').innerText = `?桀?暺: ${state.score}`;
  
  // ?? BGM
  startBGM();

  // ?冽??摩
  const container = document.getElementById('hidden-object-container');
  const surface = document.getElementById('hidden-object-surface');
  let isDragging = false;
  let startX;
  let currentTranslate = 0;
  let prevTranslate = 0;

  // 閮??憭批皛曉?蝭?
  // 摰孵撖砍漲憭抒??航撟祝嚗urface撖砍漲 1400px
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
    
    // ??蝭?
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

  // 蝬???獢?????
  document.querySelectorAll('.food-item').forEach(item => {
    item.addEventListener('click', (e) => {
      // ?踹???孛?潮???
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
  
  // ?剜 TTS ?啗?隤
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

// ???臭誑??銝????菟???
function handleFoodChoice(isUserSafe) {
  const foodId = state.currentZoomedId;
  const food = foodData[foodId];
  closeFoodZoomModal();
  
  if (isUserSafe) {
    state.foodStates[foodId] = 'safe';
    if (!state.placedFoods.includes(foodId)) {
      state.placedFoods.push(foodId);
    }
    showStatusBadge(foodId, 'safe', '???臭誑??);
    playSound('success');
  } else {
    state.foodStates[foodId] = 'unsafe';
    showStatusBadge(foodId, 'unsafe', '?歇銝?');
    playSound('success');
    const itemEl = document.getElementById(`food-${foodId}`);
    if (itemEl) {
      itemEl.style.opacity = '0.2';
      itemEl.style.pointerEvents = 'none';
    }
  }
  checkTableCompletion();
}

  function showStatusBadge(foodId, type, text) {
  const badge = document.getElementById(`badge-${foodId}`);
  if (badge) {
    badge.className = `food-status-badge ${type}`;
    badge.innerHTML = type === 'safe' ? '?? : '??;
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
    scoreEl.innerText = `撌脣?? ${processed} / 5`;
  }
}`;
}

// ==========================================================================
// ???∩?敺?嚗????箇????摩??
// ==========================================================================
function initLevel1Wrapping() {
    navigateTo('tissue-wrap');
    document.getElementById('wrap-instruction').innerText = "蝚砌?甇伐?隢??刻??箏隞亙????拇?啗???銝?..";
    
    state.placedFoods = []; // 皜征??曄蔭???
    state.foldedCorners = [];
    
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
  }

  function placeFoodOnTissue(foodId) {
    if (state.placedFoods.includes(foodId)) return;
    
    playSound('click');
    state.placedFoods.push(foodId);
    
    const pileEl = document.getElementById(`pile-${foodId}`);
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

  function startFoldingMode() {
  document.getElementById('wrap-instruction').innerText = "蝚砌?甇伐?憭芣?鈭?隢?摨?暺????????賬?摰?韏瑚??改?";
  
  // 憿舐內???賡??暺?
  document.querySelectorAll('.corner-hotspot').forEach(hotspot => {
    hotspot.classList.remove('hidden');
  });
}

function handleCornerFold(corner) {
  if (state.foldedCorners.includes(corner)) return;
  
  playSound('fold');
  state.foldedCorners.push(corner);
  
  // 蝯血????銝韏?class
  const flap = document.getElementById(`flap-${corner}`);
  if (flap) flap.classList.add('folded');
  
  // ?梯?暺??梢?
  const hotspot = document.getElementById(`hotspot-${corner}`);
  if (hotspot) hotspot.classList.add('folded-done');
  
  // 瑼Ｘ???臬?賣????
  if (state.foldedCorners.length === 4) {
    setTimeout(completeTissueWrapping, 600);
  }
}

function completeTissueWrapping() {
  playSound('success');
  state.score++; // 摰???嚗?暺??嚗?
  document.getElementById('wrap-score-display').innerText = `?桀?暺: ${state.score}`;
  document.getElementById('wrap-instruction').innerText = "???踹洶閬芣????????末??鋆⊿鋆遛鈭?銋重?????;
  
  // 銵?蝝?頨怎????
  const canvas = document.getElementById('tissue-canvas');
  canvas.classList.add('wrapped');
  
  // 皜征憌?韏琿蝵拚＊蝷?
  document.getElementById('tissue-food-holder').innerHTML = '';
  document.querySelectorAll('.tissue-flap').forEach(f => f.classList.remove('folded'));

  // ?梯?銝敺?憌???
  document.getElementById('food-pile-container').innerHTML = '';

  // 憿舐內?末銝?甇交???
  document.getElementById('wrap-finish-btn').classList.remove('hidden');
}



// ==========================================================================
// ??撠曉之?貊倏??蝞＊蝷箝?
// ==========================================================================
function showFinalResult() {
  const finalScoreEl = document.getElementById('final-score');
  if (finalScoreEl) finalScoreEl.style.display = 'none';
  
  let msg = "?戭斤?憌?蝮賜??n\n";
  let perfect = true;

  if (state.foodStates["moldy-bread"] === "safe") {
    msg += "?? 雿?銝??潮??熊???潮????拙雿踹??????唳嚗?蝯脖?撌脩?瘛勗?折鈭?蝯?銝??\n\n";
    perfect = false;
  }
  if (state.foodStates["sprouted-potato"] === "safe") {
    msg += "?? ??嚗???賜?擐祇?舐?銝?鈭?擐祇?舐?賣??Ｙ?擃?摨衣?樴暽潘???桃?銋瘜憯????葉瘥?嚗n\n";
    perfect = false;
  }
  if (state.foodStates["bloated-can"] === "safe") {
    msg += "?? 瘜冽?嚗???鈭?寧?蝵?誨銵刻ㄐ?Ｗ歇蝬?蝝啗?嚗??航?瘥▼???Ｙ?瘞??嚗?銝?虜?梢嚗?摰?銝?嚗n\n";
    perfect = false;
  }
  
  if (state.foodStates["safe-bread"] === "unsafe" || state.foodStates["spring-roll"] === "unsafe") {
    msg += "? ?踹洶?潛雿?憟賢末?擙桅??抬????莎?銝?鈭??見??瘚芾祥憌??銝活閬?隞敦??\n\n";
    perfect = false;
  }

  if (perfect) {
    msg += "?? 憭芣?鈭?雿?蝢???潸擐祇?胯?熊???刻蝵??摰?梧?摰蝜潭鈭戭斤??箸嚗戭日?銵?蝝?憟賢?敹?";
  } else {
    msg += "銝活鞎瑁???蝞望?嚗?摰?閮???憌?撠霅?嚗?;
  }

  document.getElementById('wisdom-text').innerText = msg;
}

// ==========================================================================
// ???其?隞嗥?摰?????
// ==========================================================================
function bindEvent(id, event, callback) {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener(event, callback);
  } else {
    console.warn(`[憌??霅血] ?曆???ID ??"${id}" ??DOM ??嚗歇頝喲?閰脫???摰);
  }
}

function init() {
  // 1. 璅?????
  bindEvent('start-btn', 'click', () => {
    state.storyIndex = 0;
    state.score = 0;
    navigateTo('story');
    renderStorySlide();
  });

  // 2. ???蔣??閬?
  bindEvent('story-next-btn', 'click', handleStoryNext);
  bindEvent('story-prev-btn', 'click', handleStoryPrev);

  // 3. ?銝嚗?獢?憭批摰?
  bindEvent('choice-safe-btn', 'click', () => handleFoodChoice(true));
  bindEvent('choice-discard-btn', 'click', () => handleFoodChoice(false));
  bindEvent('poison-retry-btn', 'click', closePoisonModal);
  
  // 擗?摰?敺?敺?箇?
  bindEvent('table-done-btn', 'click', () => {
    initLevel1Wrapping();
  });

  // 4. ?銝敺?嚗?暺?摰?
  document.querySelectorAll('.corner-hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      const corner = e.currentTarget.dataset.corner;
      handleCornerFold(corner);
    });
  });

  // ?箇?摰?敺策銋重
  bindEvent('wrap-finish-btn', 'click', () => {
    // ?箏末敺??交?鈭洵 1 撘菜?敶梁? (摮怠戊?嗅)
    state.storyIndex = 1;
    navigateTo('story');
    renderStorySlide();
  });

  // 7. ???
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

// 蝣箔? DOM 頛摰敺??瑁??????脫迫 Double-click ?瑁???Vite ?唳郊????銵?????NULL 撏拇蔑
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      init();
    } catch (err) {
      console.error("憌?????仃??", err);
    }
  });
} else {
  try {
    init();
  } catch (err) {
    console.error("憌?????仃??", err);
  }
}

