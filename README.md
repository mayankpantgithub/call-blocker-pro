# iOS Call Blocker App

A professional iOS application for blocking unwanted phone calls using Apple's CallKit framework. Block individual numbers, manage lists, and use regex patterns to filter calls at the system level.

## ✨ Features

- 📱 **Block Individual Numbers** - Add and manage single phone numbers with labels
- 📋 **Block Lists** - Create and manage lists of multiple numbers
- 🔢 **Regex Patterns** - Block number ranges using regular expressions  
- 🛡️ **System-Level Blocking** - Integrates with iOS Call Directory Extension
- 🔒 **Local Storage** - All data stored locally on device (privacy-first)
- ⚡ **No Backend Required** - Fully offline functionality

## 📱 App Structure

### Screens
1. **Home Dashboard** - Overview with stats and quick access
2. **Blocked Numbers** - Manage individual phone numbers
3. **Block Lists** - Organize numbers into named groups
4. **Regex Patterns** - Create patterns to block number ranges
5. **Setup Instructions** - Step-by-step guide for enabling blocking

## 🚀 Getting Started

### Current State (Expo)
The app is currently running in Expo and can be tested for UI/UX:
- All screens are functional
- Data management works
- Local storage operational

### For Production (Native iOS)
To enable actual call blocking, you need to:

1. **Eject from Expo:**
   ```bash
   cd /app/frontend
   npx expo prebuild --platform ios
   ```

2. **Follow the complete setup guide:**
   See `/app/ios-native/SETUP_GUIDE.md` for detailed instructions on:
   - Adding Call Directory Extension in Xcode
   - Configuring App Groups
   - Adding native modules
   - Building for physical device

## 🛠️ Technology Stack

### Frontend
- React Native + Expo Router
- TypeScript
- MMKV (fast local storage)
- libphonenumber-js (validation)

### Native iOS (After Ejecting)
- CallKit Framework
- Call Directory Extension
- Swift Native Modules
- App Groups

## 📂 Project Structure

```
/app
├── frontend/
│   ├── app/                    # Expo Router screens
│   │   ├── index.tsx           # Home dashboard
│   │   ├── blocked-numbers.tsx # Individual numbers
│   │   ├── block-lists.tsx     # Number lists
│   │   ├── regex-patterns.tsx  # Regex patterns
│   │   ├── add-*.tsx           # Add screens
│   │   └── setup.tsx           # Instructions
│   └── src/
│       ├── storage.ts          # Local storage
│       └── phoneValidator.ts   # Validation
│
└── ios-native/                 # Native iOS files
    ├── CallDirectoryHandler.swift
    ├── RNCallBlocker.swift
    ├── RNCallBlocker.m
    └── SETUP_GUIDE.md          # Detailed setup
```

## 🔧 How It Works

### Call Blocking Flow

```
User adds number in app
         ↓
Stored in local MMKV
         ↓
Synced to App Groups (after native setup)
         ↓
Call Directory Extension reads data
         ↓
iOS system blocks calls
```

### Storage

- **MMKV**: Fast local key-value storage
- **App Groups**: Share data between app and extension
- **E.164 Format**: All numbers stored as +country_code + number

## 📝 Usage

### Add Individual Number
1. Tap "Blocked Numbers"
2. Tap the + button
3. Enter phone number (with country code)
4. Optional: Add label (e.g., "Spam")
5. Tap "Add to Block List"

### Create Block List
1. Tap "Block Lists"
2. Tap the + button
3. Enter list name
4. Paste numbers (one per line or comma-separated)
5. Tap "Create List"

### Add Regex Pattern
1. Tap "Regex Patterns"
2. Tap the + button
3. Choose preset or create custom
4. Enter description
5. Tap "Add Pattern"

## ⚠️ Important Notes

- **iOS Only**: CallKit is Apple-specific
- **Physical Device Required**: Cannot test in simulator
- **E.164 Format**: Numbers must include country code (+1234567890)
- **Extension Updates**: May take 30-60 seconds to apply
- **Privacy**: All data stays on device, never sent to servers

## 🎯 Next Steps

To make the app fully functional:

1. **Review the code** - All screens and logic are complete
2. **Eject from Expo** - Run `npx expo prebuild --platform ios`
3. **Follow Setup Guide** - See `/app/ios-native/SETUP_GUIDE.md`
4. **Add Native Files** - Copy Swift files to Xcode project
5. **Configure Xcode** - Add Call Directory Extension target
6. **Build & Test** - Install on physical iOS device

## 📚 Resources

- **Setup Guide**: `/app/ios-native/SETUP_GUIDE.md`
- **Apple CallKit Docs**: https://developer.apple.com/documentation/callkit
- **Call Directory Guide**: https://developer.apple.com/documentation/callkit/cxcalldirectoryprovider

## 🔐 Privacy

- ✅ All data stored locally
- ✅ No network requests
- ✅ No analytics or tracking
- ✅ Numbers never leave device
- ✅ No backend or cloud storage

## 📄 License

MIT License - Free to use and modify

---

**Ready to Block Calls!** 🚫📞

The React Native app is complete and functional. Follow the native iOS setup guide to enable system-level call blocking.
