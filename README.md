# 🧁 Baking App - Simone's Kitchen Companion

A cute, self-contained baking companion web app built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools, no external dependencies - just pure web magic! ✨

**Features:**
- 📖 Recipe book with Simone's Classics (12+ recipes)
- ⏱️ Multiple concurrent timers with presets
- ⏲️ Stopwatch with split times
- ⏰ Alarms with scheduling and snooze
- 🔧 Baking helpers (unit converter, pan size, substitutions)
- 💾 All data stored locally (works offline!)
- 🐕 Bailey & Nellie mascots with daily baking tips
- 🎨 Cute pastel UI with smooth animations

## 🚀 Quick Start

### Option 1: Open Directly
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start baking! 🎉

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📦 File Structure

```
Baking_App/
├── index.html          # Main HTML structure
├── styles.css          # Cute pastel styling & animations
├── app.js             # All functionality (recipes, timers, alarms, etc.)
└── README.md          # This file!
```

## 🌐 Deploy to GitHub Pages

### Step 1: Create GitHub Repository
```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Baking App for Simone"

# Add remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under **Source**, select **main branch**
4. Click **Save**
5. Wait 1-2 minutes for deployment
6. Your app will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### Alternative: Quick Deploy Commands
```bash
# If your repo is already set up
git add .
git commit -m "Deploy Baking App"
git push origin main

# GitHub Pages will auto-deploy!
```

## 📱 How to Download/Install

### On Desktop:
1. Visit the GitHub Pages URL
2. Bookmark it for quick access
3. Or download all files and open `index.html` locally

### On Mobile/Tablet:
1. Open the GitHub Pages URL in Safari (iOS) or Chrome (Android)
2. **iOS**: Tap Share → "Add to Home Screen"
3. **Android**: Tap Menu → "Add to Home Screen"
4. The app will work like a native app (offline too!)

## ✨ Features Guide

### 📖 Recipes
- **Simone's Classics**: 12+ pre-loaded recipes (cookies, bread, cakes, pastries)
- **Add/Edit**: Create your own recipes with ingredients, steps, and notes
- **Search & Filter**: Find recipes by name, tags, or ingredients
- **Favorites**: Mark favorites with ⭐
- **Scale**: Adjust recipes (0.5×, 1×, 2×, 3×)
- **Shopping List**: Generate combined shopping lists from multiple recipes

### ⏱️ Timers
- **Multiple Timers**: Run multiple timers simultaneously
- **Presets**: Quick presets for common tasks:
  - 🔥 Preheat Oven (10 min)
  - 🧈 Take Butter Out (30 min)
  - 🍪 Check Cookies (8 min)
  - 🍞 Bread Proofing (45 min)
  - 🎂 Cake Cooldown (20 min)
- **Alerts**: Visual + sound + browser notifications when complete

### ⏲️ Stopwatch
- **Start/Pause/Reset**: Standard stopwatch controls
- **Split Times**: Track multiple splits
- **Copy to Clipboard**: Export split times

### ⏰ Alarms
- **Scheduling**: Set time-based alarms
- **Repeat Options**: Once, Daily, Weekdays, Weekends, Custom days
- **Snooze**: 5 or 10 minute snooze options
- **Quick Presets**: Add alarms for +10m, +30m, +45m, etc.
- **⚠️ Note**: Web alarms only work while the page is open. Enable notifications for best results!

### 🔧 Baking Helpers
- **Unit Converter**: Convert between g/oz, ml/cups, °C/°F, etc.
- **Pan Size Converter**: Calculate ingredient adjustments for different pan sizes
- **Substitution Guide**: Common ingredient substitutions with safety notes

### ⚙️ Settings
- **Notifications**: Enable browser notifications (requires permission)
- **Sound Alerts**: Toggle beep sounds on/off
- **Export/Import**: Backup and restore all your data
- **Reset**: Clear all data (use with caution!)

## 🐕 Meet the Mascots

**Bailey** 🐶 (King Charles Cavalier) and **Nellie** 🦮 (Golden Retriever) are your baking companions! They appear on every page with cute baking hats and tools, and share helpful baking tips on the home screen.

## 💾 Data Storage

All data is stored locally in your browser using `localStorage`:
- ✅ **Works offline** after first visit
- ✅ **No server needed** - completely client-side
- ✅ **Privacy-friendly** - your data never leaves your device
- ⚠️ **Important**: Clearing browser data will delete all recipes/settings
- 💡 **Tip**: Use Export feature in Settings to backup your data!

## 🔔 Notifications & Alerts

### Browser Notifications
1. Go to **Settings** → Enable Browser Notifications
2. Click "Allow" when prompted by your browser
3. Now you'll get notifications even when the tab isn't active!

### Troubleshooting
- **Chrome/Edge**: Settings → Site Settings → Notifications → Allow
- **Firefox**: Address bar → 🔒 → Permissions → Notifications → Allow
- **Safari**: Safari → Settings → Websites → Notifications → Allow

## 🎨 Customization

### Change Colors
Edit `styles.css` and modify the CSS variables:
```css
:root {
    --primary: #FFB6C1;      /* Main pink */
    --secondary: #E6E6FA;    /* Lavender */
    --accent: #FFE4B5;       /* Moccasin */
    --success: #98D8C8;      /* Mint */
    --danger: #FFB3BA;       /* Light red */
}
```

### Add More Recipes
Open the app → Recipes → Add Recipe, or edit `app.js` and add to the `getSimonesClassics()` function.

### Modify Mascots
Edit the SVG code in `index.html` under the `.mascots` section.

## 🐛 Troubleshooting

### Timers not working?
- Make sure you clicked "Start" on the timer
- Keep the browser tab open (web timers can't run when tab is closed)

### Alarms not triggering?
- Ensure the alarm is enabled (toggle switch is ON)
- Browser must be open with the tab active or in background
- Enable notifications for alerts even when tab isn't focused

### Data disappeared?
- Did you clear browser data/cookies?
- Use Settings → Export to create backups regularly
- Try Settings → Import to restore from a backup

### Notifications not showing?
- Check browser notification permissions (see Notifications section above)
- Make sure notifications are enabled in Settings

## 🌟 Browser Compatibility

Works best in modern browsers:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 📝 License

This project is free to use, modify, and share. Made with ❤️ for Simone!

## 🎉 Enjoy!

Happy baking! May all your breads rise, your cookies be chewy, and your cakes be fluffy! 🍪🍞🎂

---

**Made with love for Simone 💕 | Bailey 🐶 & Nellie 🦮**
