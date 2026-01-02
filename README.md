# 🍰 Baking App

A cute, cozy, pastel-themed baking companion mobile app featuring Bailey the King Charles Cavalier and Nellie the Golden Retriever! Built with React Native and Expo for both iOS and Android.

## ✨ Features

### Core Functionality
- **📖 Recipe Book** - Browse, search, and scale 12+ preloaded classic recipes
  - Search by name, description, or tags
  - Filter by category (Cookies, Cakes, Bread, Pastries, Desserts)
  - Scale recipes (0.5×, 1×, 2×, 3×)
  - Favorite recipes and track last baked
  - Detailed ingredient lists and step-by-step instructions

- **⏱️ Multi-Timer** - Run multiple timers simultaneously
  - Quick preset timers (5min, 10min, 25min, 60min)
  - Custom timers with labels
  - Visual countdown display
  - Notification when complete

- **⏲️ Stopwatch** - Precision timing with split/lap recording
  - Start, pause, resume, reset
  - Record unlimited split times
  - Millisecond precision
  - Fun mascot reactions every 5 splits

- **⏰ Alarms** - Set alarms with helpful presets
  - Quick presets: Preheat oven, Take butter out, Check cookies, Bread proofing, Cake cooldown
  - Custom alarm scheduling
  - Snooze support
  - Background notifications

- **📏 Baking Helpers**
  - **Unit Converter** - Temperature, weight, and volume conversions
  - **Ingredient Substitutions** - 10+ common ingredients with substitutes and ratios
  - **Pan Size Guide** - Pan equivalents and conversion tips

### Mascot Features
- Bailey (King Charles Cavalier) and Nellie (Golden Retriever) appear throughout the app
- Rotating baking tips from both mascots
- Friendly encouragement and reactions
- Cute illustrations with baking hats and utensils

### Design
- Pastel color palette (soft pink, blue, peach, cream)
- Rounded UI elements
- Gentle animations
- Cozy, warm, playful tone
- Fully offline-capable

## 🛠️ Tech Stack

- **React Native** with **Expo SDK**
- **TypeScript** for type safety
- **React Navigation** (Bottom tabs + Stack)
- **AsyncStorage** for local data persistence
- **Expo Notifications** for alarms and timers
- **React Native SVG** for mascot illustrations

## 📱 System Requirements

- **Node.js** 18+ and npm
- **Expo CLI** (installed via npx)
- **iOS**: macOS with Xcode (for simulator) or Expo Go app
- **Android**: Android Studio (for emulator) or Expo Go app

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/JMcMullen1/Baking_App.git
cd Baking_App
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
```

This will start the Expo development server and display a QR code.

### 4. Run on Device/Simulator

#### Option A: Physical Device (Easiest)
1. Install **Expo Go** app on your iOS or Android device
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Scan the QR code from the terminal with your camera (iOS) or Expo Go app (Android)

#### Option B: iOS Simulator (macOS only)
```bash
npm run ios
```
Requires Xcode to be installed.

#### Option C: Android Emulator
```bash
npm run android
```
Requires Android Studio and an Android Virtual Device (AVD) to be set up.

#### Option D: Web Browser (Limited functionality)
```bash
npm run web
```
Note: Notifications and native features won't work in web mode.

## 📦 Project Structure

```
Baking_App/
├── src/
│   ├── assets/
│   │   ├── images/          # Mascot SVG illustrations
│   │   └── sounds/          # (Future: Alarm sounds)
│   ├── components/
│   │   ├── common/          # Reusable UI (Button, Card)
│   │   └── mascot/          # MascotTip component
│   ├── data/
│   │   ├── recipes.ts       # 12 preloaded recipes
│   │   ├── alarmPresets.ts  # Quick alarm configurations
│   │   └── mascotTips.ts    # Baking tips from Bailey & Nellie
│   ├── navigation/
│   │   └── AppNavigator.tsx # Tab & stack navigation setup
│   ├── screens/
│   │   ├── Home/            # Home screen
│   │   ├── Recipes/         # Recipe list & detail
│   │   ├── Timers/          # Multi-timer screen
│   │   ├── Stopwatch/       # Stopwatch with splits
│   │   ├── Alarms/          # Alarm management
│   │   ├── Settings/        # App settings
│   │   └── Helpers/         # Converter, Substitutions, Pan Sizes
│   ├── services/
│   │   ├── storage.ts       # AsyncStorage wrapper
│   │   └── notifications.ts # Expo Notifications wrapper
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   └── utils/
│       ├── theme.ts         # Colors, spacing, typography
│       ├── conversions.ts   # Unit conversion utilities
│       └── substitutions.ts # Ingredient substitution data
├── __tests__/               # Unit tests
├── App.tsx                  # App entry point
├── app.json                 # Expo configuration
├── package.json             # Dependencies
└── README.md                # This file
```

## 🧪 Running Tests

```bash
npm test
```

Tests cover:
- Temperature conversions (°C ↔ °F)
- Weight conversions (g, kg, oz, lb)
- Volume conversions (ml, l, cup, tbsp, tsp)
- Recipe scaling logic
- Time formatting utilities

## 🏗️ Building for Production

### 🌐 Web Deployment (Netlify/Vercel/GitHub Pages)

This app can be deployed as a web application with limited functionality (notifications won't work in browsers).

#### Prerequisites
- The app now includes `react-dom` and `react-native-web` dependencies
- `.npmrc` file is configured for compatibility
- `netlify.toml` is pre-configured for Netlify deployment

#### Deploy to Netlify

1. **Connect Repository to Netlify**
   - Go to [Netlify](https://netlify.com) and sign in
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Select the `main` branch (or any branch you want to deploy)

2. **Build Settings** (Auto-detected from `netlify.toml`)
   - Build command: `npx expo export --platform web`
   - Publish directory: `dist`
   - Node version: 18

3. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your app
   - Your app will be available at `https://[your-site-name].netlify.app`

#### Deploy to Vercel

Create a `vercel.json` file in the root:
```json
{
  "buildCommand": "npm run build:web",
  "outputDirectory": "dist",
  "devCommand": "npm run web",
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Then connect your repository at [Vercel](https://vercel.com).

#### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json` scripts:
   ```json
   "predeploy": "npm run build:web",
   "deploy": "gh-pages -d dist"
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

#### Manual Build

To build the web version locally:

```bash
npm run build:web
```

This creates a `dist` folder with static files ready for deployment.

#### Important Notes for Web Deployment
- ⚠️ **Limited Functionality**: Notifications, alarms, and some native features won't work in browsers
- ✅ **Works**: Recipe browsing, timers (visual only), stopwatch, unit converter, substitutions, pan sizes
- 📱 **Best Experience**: Use the mobile app (Expo Go or native build) for full functionality

### 📱 Mobile Builds (Full Functionality)

For the complete app experience with notifications and alarms:

#### iOS Build

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios
```

#### Android Build

```bash
# Build APK for Android
eas build --platform android --profile preview

# Or build for Google Play Store
eas build --platform android
```

#### Local Builds

For local development builds without EAS:

```bash
# iOS (macOS only)
npx expo run:ios

# Android
npx expo run:android
```

## 📱 App Permissions

The app requests the following permissions:

### iOS
- **Notifications** - For alarms and timer completion alerts

### Android
- **NOTIFICATIONS** - For alarms and timer alerts
- **SCHEDULE_EXACT_ALARM** - For precise alarm timing
- **USE_EXACT_ALARM** - For exact alarm scheduling

## ⚠️ Known Limitations

### Alarm System
- **Background limitations**: Some Android devices may limit background notifications due to battery optimization
- **Best for foreground use**: Alarms work best when app is running in foreground or background
- **System alarm recommendation**: For critical baking timings, use device's system alarms as backup
- **Notification channels**: Ensure notifications are enabled in device settings

### Platform Differences
- iOS requires physical device for testing push notifications (simulator doesn't support them fully)
- Android devices vary in notification handling based on manufacturer (Samsung, Xiaomi, etc.)

## 🎨 Mascot Assets

The app includes placeholder SVG mascots:
- **Bailey**: King Charles Cavalier with blue baking hat and whisk
- **Nellie**: Golden Retriever with pink baking hat and wooden spoon

To replace with custom artwork:
1. Edit `/src/assets/images/BaileyMascot.tsx`
2. Edit `/src/assets/images/NellieMascot.tsx`
3. Keep the same component structure and props interface

## 🔧 Configuration

### Customizing the App

#### Change User Name
Edit `/src/screens/Home/HomeScreen.tsx`:
```typescript
const [userName] = useState('Simone'); // Change 'Simone' to desired name
```

#### Add More Recipes
Edit `/src/data/recipes.ts` and add new recipe objects following the `Recipe` interface.

#### Modify Theme Colors
Edit `/src/utils/theme.ts` to change the pastel color palette.

#### Add More Alarm Presets
Edit `/src/data/alarmPresets.ts` to add custom quick alarm options.

## 📄 Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm run web` - Run in web browser
- `npm test` - Run unit tests
- `npm run lint` - Run ESLint (if configured)

## 🤝 Contributing

This is a personal project for Simone, but suggestions are welcome!

## 📝 License

This project is built for personal use. Feel free to fork and adapt for your own needs!

## 🙏 Credits

Created with ❤️ for all baking enthusiasts, featuring:
- **Bailey** - The King Charles Cavalier baking expert
- **Nellie** - The Golden Retriever pastry chef

Happy Baking! 🍪🎂🍞

---

## 🐛 Troubleshooting

### "Expo Go" not finding the app
- Ensure your phone and computer are on the same Wi-Fi network
- Try using tunnel mode: `npx expo start --tunnel`

### Notifications not working
- Check device notification settings for Expo Go
- Verify permissions in Settings screen
- On Android, check battery optimization settings

### Build errors
- Clear cache: `npx expo start -c`
- Delete node_modules: `rm -rf node_modules && npm install`
- Clear Metro bundler cache: `npx expo start -c`

### Type errors
- Ensure TypeScript is installed: `npm install --save-dev typescript`
- Regenerate types: `npx expo install`

## 📧 Support

For issues or questions, please open an issue on the GitHub repository.

---

**Version**: 1.0.0
**Last Updated**: January 2026
**Platform**: iOS & Android via Expo
