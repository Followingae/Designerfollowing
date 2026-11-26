# Sends one morning email with the day's Following and Inflink Stories attached, through Gmail.
# -Date yyyy-MM-dd  run for another date   -DryRun  list only, send nothing   -Test  one labelled check email
param([string]$Date = (Get-Date -Format 'yyyy-MM-dd'), [switch]$DryRun, [switch]$Test)
$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = 'C:\Users\user\Desktop\DesignerFollowing'
$to = 'zain@following.ae'
$log = Join-Path $here 'send.log'
$sentMark = Join-Path $here 'sent.txt'
$credFile = Join-Path $env:LOCALAPPDATA 'FollowingDailyStories\gmail.xml'   # encrypted, readable only by this Windows user
function Log($m) { "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  $m" | Add-Content -Encoding utf8 $log; Write-Output $m }

$msg = $null; $smtp = $null
try {
  $d = [datetime]::ParseExact($Date, 'yyyy-MM-dd', [Globalization.CultureInfo]::InvariantCulture)
  $en = [Globalization.CultureInfo]::GetCultureInfo('en-GB')
  $tag = $d.ToString('MMMdd', $en)
  if ($d -gt [datetime]'2026-12-31') { Log "$Date no Stories planned past 31 Dec, nothing sent"; return }
  if (-not $DryRun -and -not $Test -and (Test-Path $sentMark) -and (Select-String -Path $sentMark -SimpleMatch $Date -Quiet)) { Log "$Date already sent, skipped"; return }

  # ST_Nov02.png, plus any extras such as ST_Nov02_2.png, all go in the same email.
  $lines = @(); $files = @()
  foreach ($b in @(@('following', 'Following'), @('inflink', 'Inflink'))) {
    $dir = Join-Path $root "brands\$($b[0])\social\exports\2026-11-12_stories"
    $found = @(Get-ChildItem $dir -File | Where-Object { $_.Name -match "^ST_$tag(_\d+)?\.png$" } | Sort-Object Name)
    if ($found.Count -eq 0) { throw "No $($b[1]) Story found for $Date" }
    $lines += "$($b[1]): $($found.Count) Story" + $(if ($found.Count -gt 1) { 's' } else { '' })
    foreach ($f in $found) { $files += [pscustomobject]@{ Path = $f.FullName; Name = "$($b[1])_$($f.Name)"; Size = $f.Length } }
  }
  $mb = [math]::Round((($files | Measure-Object Size -Sum).Sum) / 1MB, 1)
  $names = ($files.Name) -join ', '
  if ($DryRun) { Log "DRY RUN $Date | $mb MB | $names"; return }

  if (-not (Test-Path $credFile)) { throw "No saved Gmail app password. Run setup_password.ps1" }
  $cred = Import-Clixml $credFile

  $subject = "Post today's Stories: $($d.ToString('ddd d MMM', $en))"
  $body = "Don't forget to post today's Stories. Best around 10:00 GST.`r`n`r`n" + ($lines -join "`r`n") + "`r`n`r`nThe files are attached."
  if ($Test) { $subject = "Setup check, no need to post: $($d.ToString('ddd d MMM', $en)) Stories"; $body = "If this arrived with the images attached, the daily email works. The first real one comes at 08:30.`r`n`r`n" + ($lines -join "`r`n") }

  $msg = New-Object System.Net.Mail.MailMessage($cred.UserName, $to, $subject, $body)
  foreach ($f in $files) {
    $a = New-Object System.Net.Mail.Attachment($f.Path, 'image/png')
    $a.Name = $f.Name
    $msg.Attachments.Add($a)
  }
  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
  $smtp = New-Object System.Net.Mail.SmtpClient('smtp.gmail.com', 587)
  $smtp.EnableSsl = $true
  $smtp.Credentials = $cred.GetNetworkCredential()
  $smtp.Send($msg)
  if (-not $Test) { Add-Content -Encoding utf8 $sentMark $Date }
  Log "$(if ($Test) { 'TEST SENT' } else { 'SENT' }) $Date | $mb MB | $names"
} catch { Log "FAILED $Date | $($_.Exception.Message)"; exit 1 }
finally { if ($msg) { $msg.Dispose() }; if ($smtp) { $smtp.Dispose() } }
