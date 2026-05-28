import os
import asyncio
import edge_tts

VOICE = "zh-TW-HsiaoChenNeural"

# Ensure audio directory exists
output_dir = "public/audio"
if not os.path.exists(output_dir):
    os.makedirs(output_dir, exist_ok=True)

texts = {
    "spring_roll.mp3": "這是我自己包的春捲，很好吃喔！乖孫快點吃！",
    "safe_bread.mp3": "這麵包包裝得很好，上面還有綠色安全標章，這樣吃起來才放心。",
    "moldy_bread.mp3": "阿嬤跟你說，這個麵包發霉了，通通都要丟掉，絕對不能吃喔！",
    "sprouted_potato.mp3": "阿嬤跟你說，馬鈴薯發芽就有毒了，煮湯就會出事情啦！",
    "bloated_can.mp3": "阿嬤跟你說，罐頭膨脹泡泡的，代表裡面壞掉了，吃下去會拉肚子喔！"
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
