# HledgerPWA

A single-file, offline-first HTML5 PWA for lightweight, terminal-style bookkeeping with hledger-compatible logic.

**Live Demo:**  
https://eozalp.github.io/hledgerpwa

## Features

### Offline-First
- Full PWA caching  
- Works without internet  
- Optional file mounting (File System Access API)  
- Safe writes with rollback protection  

### Smart Ledger Engine
- Double-entry accounting  
- Implicit balancing  
- Strict/relaxed modes  
- Aliases, balance assertions  
- Built-in math evaluator  

### Predictive CLI
- Context-aware suggestion chips  
- Auto-completion with ghost text  
- Inline math (`= 250/3`)  
- Built-in tutorial system  

### Visual Analytics
- Line, bar, area, scatter, donut  
- Smooth curves and gradients  
- Crosshair and tooltips  
- Trendline forecasting  

### Storage & Safety
- Undo  
- Export to file / CSV / clipboard  
- Optional mount mode for real .hledger/.journal files  

## Installation

```sh
git clone https://github.com/eozalp/hledgerpwa.git
cd hledgerpwa
```

Open `index.html` in your browser.

## PWA Installation
Inside the app:

```
pwa install
```

Place the downloaded `sw.js` next to `index.html`.

## License
MIT