const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const arHTML = `
            <div id="ar-gift-container" style="margin: 30px auto; text-align: center;">
              <h3 style="color: var(--color-wood); margin-bottom: 15px; font-size: 1.8rem;">🎁 阿嬤的神秘 3D 禮物</h3>
              <model-viewer 
                id="ar-model"
                src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" 
                ios-src="https://modelviewer.dev/shared-assets/models/Astronaut.usdz" 
                ar 
                ar-modes="webxr scene-viewer quick-look" 
                camera-controls 
                auto-rotate
                shadow-intensity="1"
                style="width: 100%; max-width: 300px; height: 300px; margin: 0 auto; background-color: rgba(255,255,255,0.7); border-radius: 20px; border: 3px dashed var(--color-wood);"
                alt="阿嬤的3D太空驚喜">
              </model-viewer>
              
              <button class="btn-handdrawn" onclick="document.getElementById('ar-model').activateAR()" style="margin-top: 15px; position: relative; z-index: 100; white-space: nowrap; font-size: 1.2rem; padding: 10px 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
                ✨ 開啟手機 AR 模式 ✨
              </button>

              <p style="margin-top: 15px; font-size: 1.1rem; color: #666; font-weight: bold; background: #fff; padding: 10px; border-radius: 10px;">
                💡 【跨裝置互動】<br>若您使用電腦，點擊按鈕將出現 QR Code，<br>請拿出手機掃描，即可透過相機將禮物投影到現實世界中！
              </p>
            </div>
`;

if (!html.includes('id="ar-gift-container"')) {
  // Inject before the restart button
  html = html.replace('<button id="restart-btn"', arHTML + '\n            <button id="restart-btn"');
  fs.writeFileSync('index.html', html);
  console.log('AR HTML injected successfully.');
} else {
  console.log('AR HTML already exists.');
}
