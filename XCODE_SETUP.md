# 🚀 Xcode Setup Guide for Call Blocker App

## Prerequisites Checklist

Before you begin, make sure you have:
- ✅ macOS with Xcode 14.0 or later installed
- ✅ Physical iOS device (iOS 10.0+)
- ✅ Apple Developer Account (free or paid)
- ✅ USB cable to connect your device

## 📦 Step 1: Download the Project

You need to download the entire `/app/frontend` folder to your Mac.

**Option A: Using SCP/SFTP (if you have server access)**
```bash
scp -r user@server:/app/frontend ~/CallBlocker
```

**Option B: Download as ZIP**
If you're accessing this through a web interface, download the entire frontend folder.

## 🔧 Step 2: Install Dependencies on Your Mac

Open Terminal and navigate to the project:

```bash
cd ~/CallBlocker  # or wherever you saved the project
yarn install
cd ios
pod install
cd ..
```

## 📱 Step 3: Open in Xcode

```bash
cd ios
open frontend.xcworkspace
```

⚠️ **Important:** Open the `.xcworkspace` file, NOT the `.xcodeproj` file!

## 🛠️ Step 4: Add Call Directory Extension

### 4.1 Create Extension Target

1. In Xcode, go to **File → New → Target**
2. Select **Call Directory Extension** (under iOS)
3. Click **Next**
4. Configure:
   - Product Name: `CallBlockerExtension`
   - Language: **Swift**
   - Project: frontend
   - Embed in Application: frontend
5. Click **Finish**
6. When prompted "Activate scheme?", click **Activate**

### 4.2 Replace Extension Handler

1. In the Project Navigator (left sidebar), find the `CallBlockerExtension` folder
2. **Delete** the default `CallDirectoryHandler.swift` file (Move to Trash)
3. Right-click on `CallBlockerExtension` folder → **Add Files to "frontend"...**
4. Navigate to where you saved the project files
5. Find and select `/ios-native/CallDirectoryHandler.swift`
6. ✅ Check **"Copy items if needed"**
7. ✅ Make sure **CallBlockerExtension** target is selected
8. Click **Add**

## 🔐 Step 5: Configure App Groups

App Groups allow the main app and extension to share data.

### 5.1 Enable for Main App

1. Select the **frontend** target (main app)
2. Go to **Signing & Capabilities** tab
3. Click **+ Capability**
4. Add **App Groups**
5. Click the **+** button under App Groups
6. Enter: `group.com.callblocker.shared`
7. Click **OK**

### 5.2 Enable for Extension

1. Select the **CallBlockerExtension** target
2. Go to **Signing & Capabilities** tab
3. Click **+ Capability**
4. Add **App Groups**
5. Click the **+** button
6. Enter: `group.com.callblocker.shared` (same as above)
7. Click **OK**

## 🔗 Step 6: Add React Native Bridge

### 6.1 Create Native Modules Folder

1. In Project Navigator, right-click on the **frontend** folder (main app)
2. Select **New Group**
3. Name it: `NativeModules`

### 6.2 Add Swift Bridge Files

1. Right-click on `NativeModules` folder → **Add Files to "frontend"...**
2. Add these files from `/ios-native/`:
   - `RNCallBlocker.swift`
   - `RNCallBlocker.m`
3. ✅ Check **"Copy items if needed"**
4. ✅ Select **frontend** target (main app, NOT extension)
5. Click **Add**

### 6.3 Create Bridging Header (if needed)

If Xcode asks "Would you like to configure an Objective-C bridging header?":
- Click **Create Bridging Header**

If not, create one manually:
1. Right-click on **frontend** folder → **New File**
2. Select **Header File**
3. Name it: `frontend-Bridging-Header.h`
4. Add this line:
   ```objc
   #import <React/RCTBridgeModule.h>
   ```

Then in Build Settings:
1. Select **frontend** target
2. Search for "bridging"
3. Set **Objective-C Bridging Header** to: `frontend/frontend-Bridging-Header.h`

## 📝 Step 7: Update Info.plist

### 7.1 Main App Info.plist

1. Select **frontend** target
2. Go to **Info** tab
3. Click **+** button to add a new row
4. Key: `CallDirectoryExtensionIdentifier`
5. Type: String
6. Value: `com.yourcompany.frontend.CallBlockerExtension`

   ⚠️ Replace `com.yourcompany` with your actual Bundle Identifier prefix

### 7.2 Verify Extension Info.plist

The extension's Info.plist should already be configured, but verify:
1. Select **CallBlockerExtension** target
2. Go to **Info** tab
3. Make sure `NSExtension` section exists with:
   - NSExtensionPointIdentifier: `com.apple.callkit.call-directory`
   - NSExtensionPrincipalClass: `CallDirectoryHandler`

## ✍️ Step 8: Configure Signing

### 8.1 Main App Signing

1. Select **frontend** target
2. Go to **Signing & Capabilities**
3. **Team**: Select your Apple Developer account
4. **Bundle Identifier**: Use a unique identifier (e.g., `com.yourname.callblocker`)
5. ✅ Check **Automatically manage signing**

### 8.2 Extension Signing

1. Select **CallBlockerExtension** target
2. Go to **Signing & Capabilities**
3. **Team**: Same team as main app
4. **Bundle Identifier**: Should be `com.yourname.callblocker.CallBlockerExtension`
5. ✅ Check **Automatically manage signing**

## 📲 Step 9: Connect Your Device

1. Connect your iPhone via USB
2. Unlock your device
3. If prompted, tap **Trust This Computer** on your iPhone
4. Enter your device passcode

## ▶️ Step 10: Build and Run

1. In Xcode, select your device from the top toolbar (not a simulator)
2. Select the **frontend** scheme (not CallBlockerExtension)
3. Click the **Play** button (▶️) or press **Cmd + R**
4. Wait for the build to complete

### First Launch

When you first try to run:
1. Xcode will build and install the app
2. On your device, you may see "Untrusted Developer"
3. Go to **Settings → General → VPN & Device Management**
4. Find your developer account
5. Tap **Trust "[Your Name]"**
6. Confirm by tapping **Trust**

## 🔓 Step 11: Enable Call Blocking

### On Your iPhone:

1. Open **Settings** app
2. Scroll down to **Phone**
3. Tap **Call Blocking & Identification**
4. Find **Call Blocker** in the list
5. **Toggle it ON** ✅

## 🧪 Step 12: Test Call Blocking

### Add a Test Number

1. Open the Call Blocker app on your device
2. Tap **Blocked Numbers**
3. Tap the **+** button
4. Enter a phone number you want to test (your friend's number)
5. Add a label: "Test"
6. Tap **Add to Block List**

### Test the Block

1. Have someone call you from the blocked number
2. The call should be **blocked silently**
3. It won't ring
4. Check **Recent** in Phone app - you'll see "Blocked" label

## 🐛 Troubleshooting

### Extension Not in Settings
- Make sure App Groups match in both targets
- Verify Bundle IDs are correct (extension should be parent.ExtensionName)
- Clean build folder: **Product → Clean Build Folder** (Cmd+Shift+K)
- Rebuild and reinstall the app

### Build Errors
- Check all targets have valid signing
- Make sure CocoaPods are installed: `cd ios && pod install`
- Try: **File → Workspace Settings → Build System → Legacy Build System**

### Numbers Not Blocking
- Verify extension is enabled in Settings
- Check numbers are in E.164 format (+1234567890)
- Wait 1-2 minutes after adding numbers
- Try force-quitting and reopening the app

### Swift Version Errors
- Make sure all targets use the same Swift version
- Check **Build Settings → Swift Language Version**

## 📊 Debugging

### View Extension Logs

1. In Xcode, go to **Window → Devices and Simulators**
2. Select your device
3. Click **Open Console**
4. Filter for "CallBlocker" to see logs

### Test Extension Reload

Add this to your app to manually reload:
```swift
import CallKit

CXCallDirectoryManager.sharedInstance.reloadExtension(
    withIdentifier: "your.bundle.id.CallBlockerExtension"
) { error in
    if let error = error {
        print("Extension reload error: \(error)")
    } else {
        print("Extension reloaded successfully!")
    }
}
```

## ✅ Success Checklist

Before considering setup complete:
- [ ] App builds without errors
- [ ] App runs on device
- [ ] Extension appears in Settings → Phone → Call Blocking
- [ ] Extension is toggled ON
- [ ] Test number added in app
- [ ] Test call is blocked successfully

## 📚 Additional Resources

- **Apple CallKit Docs**: https://developer.apple.com/documentation/callkit
- **Call Directory Guide**: https://developer.apple.com/documentation/callkit/cxcalldirectoryprovider
- **App Groups Guide**: https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_security_application-groups

## 🆘 Need Help?

Common issues and solutions:

1. **"Pod install failed"**
   - Make sure you're on macOS
   - Run: `sudo gem install cocoapods`
   - Try: `cd ios && pod install --repo-update`

2. **"No signing identity found"**
   - Add your Apple ID in Xcode Preferences
   - Make sure you're logged into your developer account

3. **"Unable to install app"**
   - Delete app from device first
   - Clean build folder
   - Rebuild

4. **Extension doesn't load numbers**
   - Check App Groups identifier matches exactly
   - Verify both targets have the same App Group
   - Check MMKV storage is saving correctly

---

**Good luck! 🚀 You're building a native iOS app with system-level call blocking!**
