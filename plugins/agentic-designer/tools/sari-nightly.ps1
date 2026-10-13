# Agentic Designer — Sari nightly learning session (Windows PowerShell)
# Scheduled daily at 00:00 exactly. Exits if started outside 00:00–03:59 and is stopped by the
# watchdog before 04:00 so it never runs into the morning.

$Workspace = "D:\design-workspace"                     # change if needed
$Claude    = "$env:USERPROFILE\.local\bin\claude.exe"
$LogDir    = Join-Path $Workspace "knowledge"
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null
$Stamp = Get-Date -Format "yyyy-MM-dd"
$Log   = Join-Path $LogDir "sari-run-$Stamp.txt"

$h = (Get-Date).Hour
if ($h -ge 4) { "Skipped: started at $(Get-Date -Format HH:mm), outside 00:00-03:59." | Out-File -Append $Log; exit 0 }

$deadline = (Get-Date).Date.AddHours(3).AddMinutes(55)   # hard stop 03:55
Set-Location $Workspace
$ArgLine = '-p "Run the nightly learning session per the learning-loop skill. Stay within budget. Finish and write the log before 04:00." --agent agentic-designer:sari --max-turns 40 --permission-mode auto'
$p = Start-Process -FilePath $Claude -NoNewWindow -PassThru -RedirectStandardOutput $Log -ArgumentList $ArgLine
while (-not $p.HasExited) {
  if ((Get-Date) -ge $deadline) { $p.Kill(); "Stopped by watchdog at $(Get-Date -Format HH:mm)." | Out-File -Append $Log; break }
  Start-Sleep -Seconds 30
}
