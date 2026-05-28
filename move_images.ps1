# Grandma's Kitchen Organizer (PowerShell Version)
Write-Host "Organizing images into the 'images' folder..." -ForegroundColor Yellow

$SRC = "C:\Users\Admin\.gemini\antigravity\brain\235b7f83-be3b-45ff-9164-45c113cbbed0"
$DST = "C:\Users\Admin\.antigravity\LOD\images"

if (!(Test-Path $DST)) { New-Item -ItemType Directory -Path $DST }

# Move stray PNGs from root to images
Get-ChildItem "C:\Users\Admin\.antigravity\LOD\*.png" | Move-Item -Destination $DST -Force

$files = @(
    "bg_kitchen_watercolor_1778153270383.png",
    "food_bread_moldy_watercolor_1778153287018.png",
    "food_can_bloated_watercolor_1778153483716.png",
    "food_potato_sprout_watercolor_1778153498126.png",
    "food_chicken_gray_watercolor_1778153510995.png",
    "food_leftovers_watercolor_1778153525761.png",
    "food_egg_float_watercolor_1778155207830.png",
    "food_meat_freezerburn_watercolor_1778155222206.png",
    "media__1778158131056.png"
)

$renames = @(
    "bg_kitchen_watercolor.png",
    "food_bread_moldy_watercolor.png",
    "food_can_bloated_watercolor.png",
    "food_potato_sprout_watercolor.png",
    "food_chicken_gray_watercolor.png",
    "food_leftovers_watercolor.png",
    "food_egg_float_watercolor.png",
    "food_meat_freezerburn_watercolor.png",
    "granddaughter.png"
)

for ($i=0; $i -lt $files.Length; $i++) {
    $srcFile = Join-Path $SRC $files[$i]
    $dstFile = Join-Path $DST $renames[$i]
    if (Test-Path $srcFile) {
        Copy-Item -Path $srcFile -Destination $dstFile -Force
        Write-Host "Organized: $($renames[$i])" -ForegroundColor Green
    }
}

Write-Host "Done! All images are in the 'images' subfolder." -ForegroundColor Cyan
pause
