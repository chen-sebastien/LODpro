const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const rwdFix = `
/* ==========================================================================
   Targeted Mobile RWD Fixes (V2)
   ========================================================================== */
@media (max-width: 600px) {
  /* 1. Allow the game container to scroll if content exceeds screen height */
  #game-container {
    overflow-y: auto !important;
    overflow-x: hidden !important;
    -webkit-overflow-scrolling: touch;
  }
  
  /* Make sure screens can expand if content needs it, but keep centering for others */
  .screen {
    min-height: 100dvh;
    height: max-content;
  }
  
  /* 2. Fix Kitchen Table Items: Use a 2-column Grid instead of a single long column */
  .table-surface {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 10px !important;
    padding: 10px !important;
    height: auto !important;
    min-height: 50vh;
  }
  
  .food-item {
    width: 100% !important;
    max-width: none !important;
    height: 120px !important;
    flex-direction: column !important;
    padding: 10px !important;
  }
  
  .food-item img {
    width: 60px !important;
    height: 60px !important;
  }
  
  /* 3. Fix Story Dialog Actions being pushed off screen */
  .story-frame {
    height: 35vh !important;
    min-height: 250px !important;
  }
  
  .story-actions {
    position: relative !important;
    bottom: auto !important;
    margin-top: 15px !important;
  }
  
  /* 4. Fix Modals */
  .overlay {
    padding: 15px !important;
  }
  
  .modal-content, .poison-modal, .quiz-explain-modal {
    max-width: 100% !important;
    max-height: 85dvh !important;
    overflow-y: auto !important;
    width: 95% !important;
    margin: 0 auto !important;
  }
  
  /* 5. Result Screen: Shrink AR model slightly so it fits better */
  #ar-model {
    height: 220px !important;
  }
}
`;

if (!css.includes('Targeted Mobile RWD Fixes')) {
  fs.writeFileSync('style.css', css + '\n' + rwdFix);
  console.log('RWD V2 fixes appended successfully.');
} else {
  console.log('RWD V2 already exists.');
}
