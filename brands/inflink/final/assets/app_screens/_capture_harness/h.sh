#!/bin/bash
# capture helpers: source me
export MSYS_NO_PATHCONV=1
CAP=/c/Users/user/AppData/Local/Temp/claude/C--Users-user-Desktop-DesignerFollowing/41c0ea2c-927d-4a07-bf82-5cc6b9b547c2/scratchpad/cap
OUT=/c/Users/user/Desktop/DesignerFollowing/brands/inflink/final/assets/app_screens
mkdir -p "$OUT" "$CAP/raw"
go() { adb shell am start -a android.intent.action.VIEW -d "'exp://10.0.2.2:8095/--/$1'" host.exp.exponent >/dev/null; sleep "${2:-4}"; }
shot() { adb exec-out screencap -p > "$CAP/raw/$1.png"; ls -la "$CAP/raw/$1.png" | awk '{print $5, $NF}'; }
tap() { adb shell input tap "$1" "$2"; sleep "${3:-1.5}"; }
swipe() { adb shell input swipe "$1" "$2" "$3" "$4" "${5:-600}"; sleep 1.5; }
text() { adb shell input text "$1"; sleep .5; }
ui() { adb shell uiautomator dump /sdcard/u.xml >/dev/null 2>&1; adb exec-out cat /sdcard/u.xml | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{for(const m of s.matchAll(/<node [^>]*?(?:text|content-desc)="([^"]+)"[^>]*?bounds="([^"]+)"/g))console.log(m[1].slice(0,60),m[2])})'; }
demo() {
  adb shell settings put global sysui_demo_allowed 1
  b() { adb shell am broadcast -a com.android.systemui.demo -e command "$@" >/dev/null; }
  b enter
  b clock -e hhmm 0941
  b battery -e level 100 -e plugged false
  b network -e wifi show -e level 4 -e fully true
  b network -e mobile show -e datatype null -e level 4 -e fully true
  b notifications -e visible false
}
