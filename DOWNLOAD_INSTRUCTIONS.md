# 📥 Download Instructions for Call Blocker App

## What You Need to Download

To build and test the app on your device with Xcode, you need to download these files from the server:

### Required Folders:

```
/app/frontend/          # Main project (REQUIRED)
/app/ios-native/        # Native iOS files (REQUIRED)
/app/XCODE_SETUP.md     # This setup guide (HELPFUL)
```

## 📦 How to Download

### Method 1: Download via Web Interface

If you have access to a file browser or web interface:

1. Download the entire `/app/frontend` folder
2. Download the `/app/ios-native` folder  
3. Download `/app/XCODE_SETUP.md`

### Method 2: Using Git (if available)

```bash
# If you have git access, clone the repository
git clone <your-repo-url>
```

### Method 3: Using Command Line (SCP/SFTP)

From your Mac's Terminal:

```bash
# Replace 'user' and 'server' with your actual credentials
scp -r user@server:/app/frontend ~/Desktop/CallBlocker
scp -r user@server:/app/ios-native ~/Desktop/CallBlocker/ios-native
scp user@server:/app/XCODE_SETUP.md ~/Desktop/CallBlocker/
```

### Method 4: Create ZIP Archive

If you can run commands on the server:

```bash
cd /app
tar -czf callblocker-app.tar.gz frontend/ ios-native/ XCODE_SETUP.md README.md
```

Then download `callblocker-app.tar.gz` and extract on your Mac.

## 📂 Expected Folder Structure on Your Mac

After downloading, your folder should look like this:

```
CallBlocker/
├── frontend/
│   ├── ios/                    # Native iOS project (created by expo prebuild)
│   │   ├── frontend.xcodeproj
│   │   ├── frontend.xcworkspace (after pod install)
│   │   ├── Podfile
│   │   └── frontend/
│   ├── app/                    # React Native screens
│   ├── src/                    # Utilities
│   ├── assets/
│   ├── package.json
│   └── node_modules/           # Will install with yarn
│
├── ios-native/
│   ├── CallDirectoryHandler.swift
│   ├── RNCallBlocker.swift
│   ├── RNCallBlocker.m
│   └── SETUP_GUIDE.md
│
└── XCODE_SETUP.md             # Your main setup guide
```

## 🚀 Quick Start After Download

Once you have the files on your Mac:

### 1. Install Dependencies

```bash
cd ~/Desktop/CallBlocker/frontend
yarn install
```

### 2. Install CocoaPods

```bash
cd ios
pod install
```

### 3. Open in Xcode

```bash
open frontend.xcworkspace
```

### 4. Follow the Setup Guide

Open `XCODE_SETUP.md` and follow Steps 4-12 to:
- Add Call Directory Extension
- Configure App Groups
- Add native bridge files
- Setup signing
- Build and run on your device

## 📱 What You'll Get

After completing the setup:
- ✅ Native iOS app installed on your device
- ✅ System-level call blocking functionality
- ✅ All features working (block numbers, lists, regex patterns)
- ✅ Data stored locally on device
- ✅ Integration with iOS Phone settings

## ⚠️ Important Prerequisites

Before you start, make sure you have:

- ✅ **macOS** (Windows/Linux won't work for iOS development)
- ✅ **Xcode 14+** installed from Mac App Store
- ✅ **Homebrew** (optional but recommended)
- ✅ **Node.js & Yarn** installed
- ✅ **Physical iPhone** with iOS 10+
- ✅ **USB cable** to connect device
- ✅ **Apple Developer Account** (free tier works)

### Install Requirements (if needed)

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js and Yarn
brew install node yarn

# Install CocoaPods
sudo gem install cocoapods
```

## 🆘 Need Help?

If you encounter issues:

1. **Can't download files?**
   - Ask your system administrator for file access
   - Try using a different download method
   - Request a ZIP archive of the project

2. **Don't have macOS?**
   - iOS development requires macOS and Xcode
   - Consider using a Mac or cloud Mac service (MacStadium, AWS EC2 Mac)
   - Cannot build iOS apps on Windows or Linux

3. **Build errors in Xcode?**
   - Follow the troubleshooting section in XCODE_SETUP.md
   - Make sure all dependencies are installed
   - Check Apple Developer forums

## 📞 Contact & Support

For technical questions about the app:
- Check README.md for app documentation
- Review SETUP_GUIDE.md in ios-native folder
- Consult XCODE_SETUP.md for Xcode-specific issues

## ✅ Checklist Before You Start

- [ ] Downloaded frontend folder
- [ ] Downloaded ios-native folder  
- [ ] Downloaded XCODE_SETUP.md
- [ ] Have macOS with Xcode installed
- [ ] Have physical iPhone ready
- [ ] Have Apple Developer account
- [ ] Node.js and Yarn installed
- [ ] CocoaPods installed

---

**Ready to build!** Follow XCODE_SETUP.md for detailed step-by-step instructions. 🚀
