import os
import asyncio
import edge_tts

VOICE = "zh-TW-HsiaoYuNeural"

# Ensure audio directory exists
output_dir = "public/audio"
if not os.path.exists(output_dir):
    os.makedirs(output_dir, exist_ok=True)

texts = {
    "spring_roll.mp3": "這春捲阿嬤自己做的，切細細，好呷閣安全，乖孫緊來食！",
    "safe_bread.mp3": "這麵包包裝完好，頂懸閣有綠色安全標章，真正予人安心！",
    "moldy_bread.mp3": "阿嬤講：這吐司發霉啊，共發霉的所在切掉，閣會使食啦！",
    "sprouted_potato.mp3": "阿嬤講：這馬鈴薯發穎啊，共伊挖掉，煮湯就無代誌啦！",
    "bloated_can.mp3": "阿嬤講：這罐頭脹泡啊，代表空氣飽滿，提出來配飯拄拄好啦！"
}

async def generate():
    for filename, text in texts.items():
        output_path = os.path.join(output_dir, filename)
        print(f"Generating {filename}...")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(output_path)

if __name__ == "__main__":
    asyncio.run(generate())
    print("TTS generation complete!")
