@echo off
:: Grandma's Kitchen Organizer (Images Subfolder Version)
echo Organizing images into the 'images' folder...

set SRC=C:\Users\Admin\.gemini\antigravity\brain\235b7f83-be3b-45ff-9164-45c113cbbed0
set DST=C:\Users\Admin\.antigravity\LOD\images

if not exist "%DST%" mkdir "%DST%"

:: Move existing PNGs from LOD root to images (if any)
move /y "C:\Users\Admin\.antigravity\LOD\*.png" "%DST%"

:: Copy from brain folder to images subfolder
copy /y "%SRC%\bg_kitchen_watercolor_1778153270383.png" "%DST%\bg_kitchen_watercolor.png"
copy /y "%SRC%\food_bread_moldy_watercolor_1778153287018.png" "%DST%\food_bread_moldy_watercolor.png"
copy /y "%SRC%\food_can_bloated_watercolor_1778153483716.png" "%DST%\food_can_bloated_watercolor.png"
copy /y "%SRC%\food_potato_sprout_watercolor_1778153498126.png" "%DST%\food_potato_sprout_watercolor.png"
copy /y "%SRC%\food_chicken_gray_watercolor_1778153510995.png" "%DST%\food_chicken_gray_watercolor.png"
copy /y "%SRC%\food_leftovers_watercolor_1778153525761.png" "%DST%\food_leftovers_watercolor.png"
copy /y "%SRC%\food_egg_float_watercolor_1778155207830.png" "%DST%\food_egg_float_watercolor.png"
copy /y "%SRC%\food_meat_freezerburn_watercolor_1778155222206.png" "%DST%\food_meat_freezerburn_watercolor.png"

:: Copy the new granddaughter image
copy /y "%SRC%\media__1778158131056.png" "%DST%\granddaughter.png"

echo.
echo All images are now in the 'images' subfolder!
pause
