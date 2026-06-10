const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

const rwdFix = `
/* ==========================================================================
   Comprehensive Mobile RWD Fixes (End of File to ensure highest priority)
   ========================================================================== */
@media (max-width: 768px) {
  /* 1. Fix overall screen overflowing / getting cut off */
  #game-container {
    overflow-y: auto !important;
    overflow-x: hidden !important;
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  }
  
  .screen {
    height: auto !important;
    min-height: 100dvh;
    padding-bottom: 40px !important;
    justify-content: flex-start !important; /* Allow content to flow naturally */
  }
  
  .content-box {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  /* 2. Fix Story Dialog Actions being pushed off screen */
  .story-card {
    height: auto !important;
    padding-bottom: 20px;
  }
  
  .story-actions {
    position: relative !important;
    bottom: auto !important;
    margin-top: 15px !important;
  }
  
  /* 3. Fix Kitchen Table Items overflowing off screen */
  .table-surface {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 15px !important;
    padding: 15px !important;
    height: auto !important;
    min-height: 60vh;
  }
  
  .food-item {
    width: 100% !important;
    max-width: none !important;
    height: 140px !important;
    flex-direction: column !important; /* Keep icon on top, text below */
    padding: 10px !important;
  }
  
  .food-item img {
    width: 60px !important;
    height: 60px !important;
  }
  
  /* 4. Fix Modals (Strategy, Poison) breaking layout */
  .overlay {
    align-items: center !important;
    padding: 15px !important;
  }
  
  .modal-content, .poison-modal, .quiz-explain-modal {
    max-width: 100% !important;
    max-height: 90dvh !important;
    overflow-y: auto !important;
    padding: 20px 15px !important;
    margin: 0 auto !important;
  }
  
  .strategy-list {
    text-align: left !important;
  }

  /* 5. Result Screen & AR Button layout */
  .result-box {
    margin-top: 20px !important;
  }
  
  #ar-model {
    width: 100% !important;
    height: 220px !important; /* Make it more compact on mobile */
  }
  
  /* Ensure Title Screen elements fit */
  .title-bg {
    height: 30vh !important;
    min-height: 200px !important;
  }
}
`;

if (!css.includes('Comprehensive Mobile RWD Fixes')) {
  fs.writeFileSync('style.css', css + '\n' + rwdFix);
  console.log('Mobile RWD fixes appended to style.css successfully.');
} else {
  console.log('RWD fixes already exist in style.css');
}
