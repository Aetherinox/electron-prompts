# About
This repo replicates a bug that exists between
- [Electron v31.x](https://github.com/electron/electron)
- [custom-electron-prompt v1.5.7](https://github.com/Araxeus/custom-electron-prompt)

<br />

Attempting to close a dialog box using the close button in the top-right will crash the Electron app and cause it to hang as a process.

```
Electron EXCEPTION_ACCESS_VIOLATION crash on BrowserWindow.destroy()
```

<br />

## References
- https://github.com/electron/electron/issues/42975

<br />

---

<br />

# Screenshots

## Electron v30.x

<div align="center">

<img src="https://private-user-images.githubusercontent.com/118329232/350675128-93aca429-06c0-4c9f-a91b-aef142fd29d5.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjE0NzUzMTgsIm5iZiI6MTcyMTQ3NTAxOCwicGF0aCI6Ii8xMTgzMjkyMzIvMzUwNjc1MTI4LTkzYWNhNDI5LTA2YzAtNGM5Zi1hOTFiLWFlZjE0MmZkMjlkNS5naWY_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNzIwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDcyMFQxMTMwMThaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hNjcyMDRiMTJiOTdjNDJiMzJjNzdjZTBlMGE3MGE4Yzg4ZmM5MGZlY2MyNjc2YTgwMTc1ZWRkM2I3NmY1YTkwJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.tkH_KyOMpugGYQ-11GY6MAGP9QQW0ZqEs7eRMhWsqo4" width="630">

</div>

<br />

## Electron v31.x +

<div align="center">

<img src="https://private-user-images.githubusercontent.com/118329232/350675367-f5a2c143-edde-4d88-9aef-80e7b454f0d4.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjE0NzUzOTQsIm5iZiI6MTcyMTQ3NTA5NCwicGF0aCI6Ii8xMTgzMjkyMzIvMzUwNjc1MzY3LWY1YTJjMTQzLWVkZGUtNGQ4OC05YWVmLTgwZTdiNDU0ZjBkNC5naWY_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNzIwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDcyMFQxMTMxMzRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1lZjU1NWIzZTA0OGQ3OGU5MmJmOWQ4YmVlMmFkNjExMDZlMjY5OGEzNjZiZWMyNDMwODQ1OTIzNWQ1NjBjM2FkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.n0Y54bYBE-V2C7fgAVNZmXnMfVypQPE-oEYk9E2qSW4" width="630">

</div>

<br />
