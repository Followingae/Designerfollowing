#!/bin/sh
# Render a mock to a transparent PNG at 2x: sh render.sh name width height
D="C:/Users/user/Desktop/DesignerFollowing/brands/following/explorations/mocks"
P="C:/Users/user/AppData/Local/Temp/claude/C--Users-user-Desktop-DesignerFollowing/41c0ea2c-927d-4a07-bf82-5cc6b9b547c2/scratchpad/chromeprof"
"C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --user-data-dir="$P" --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=2 --default-background-color=00000000 --virtual-time-budget=8000 \
  --window-size=$2,$3 --screenshot="$D/$1.png" "file:///$D/$1.html" 2>&1 | tail -1
