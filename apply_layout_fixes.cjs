const fs = require('fs');

let styleContent = fs.readFileSync('style.css', 'utf8');

const newCSS = `
/* --- 全景廚房與結算畫面最終優化 --- */

/* 1. 結算畫面加寬與捲動軸設定 */
.result-box {
  width: 95% !important;
  max-width: 800px !important; /* 加寬讓文字不再被擠壓 */
  padding: 30px 20px !important;
}

.wisdom-card {
  width: 100% !important;
  box-sizing: border-box;
}

#wisdom-text {
  max-height: 50vh; /* 超過螢幕一半高度時出現捲動軸 */
  overflow-y: auto;
  padding-right: 15px; /* 留出捲動軸空間 */
}

/* 美化捲動軸 */
#wisdom-text::-webkit-scrollbar {
  width: 8px;
}
#wisdom-text::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
#wisdom-text::-webkit-scrollbar-thumb {
  background: var(--color-wood, #8b5a2b);
  border-radius: 4px;
}

/* 2. 第一關廚房全景背景替換 */
.hidden-object-surface {
  background-image: url('./images/bg_panoramic_kitchen.png') !important;
  background-size: cover !important;
  background-position: center center !important;
  width: 200vh !important; /* 調整全景寬度，讓桌子視覺上變小 */
}

@media (max-width: 600px) {
  .result-box {
    max-width: 95% !important;
    padding: 20px 10px !important;
  }
  .wisdom-card {
    flex-direction: column !important;
    padding: 15px !important;
  }
  #wisdom-text {
    max-height: 45vh;
  }
  .hidden-object-surface {
    width: 250vh !important; /* 手機上維持較長的可拖曳範圍 */
  }
}
`;

if (!styleContent.includes('全景廚房與結算畫面最終優化')) {
  fs.writeFileSync('style.css', styleContent + newCSS);
  console.log('Appended final UI layout CSS.');
} else {
  console.log('Final UI layout CSS already applied.');
}
