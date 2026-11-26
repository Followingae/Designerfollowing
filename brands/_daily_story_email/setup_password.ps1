# Asks for the Gmail app password in a Windows dialog, saves it encrypted for this Windows user,
# then sends one check email with tomorrow's Stories attached.
$ErrorActionPreference = 'Stop'
$dir = Join-Path $env:LOCALAPPDATA 'FollowingDailyStories'
New-Item -ItemType Directory -Force $dir | Out-Null
$cred = Get-Credential -UserName 'zain@following.ae' -Message 'Paste the 16-character Gmail app password'
if (-not $cred) { Write-Output 'Cancelled, nothing saved.'; exit 1 }
$cred | Export-Clixml (Join-Path $dir 'gmail.xml')
$script = Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) 'send_daily_stories.ps1'
& powershell -NoProfile -ExecutionPolicy Bypass -File $script -Date (Get-Date).AddDays(1).ToString('yyyy-MM-dd') -Test
