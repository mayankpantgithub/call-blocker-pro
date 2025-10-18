# iOS Call Blocker - Complete Setup Guide

This guide will help you set up the iOS Call Blocker app with system-level call blocking capabilities.

## Prerequisites

- macOS with Xcode 14.0 or later
- Physical iOS device (iOS 10.0+)
- Apple Developer Account
- Node.js and yarn installed

## Step 1: Eject from Expo

1. **Run the eject command:**
   ```bash
   cd /app/frontend
   npx expo prebuild --platform ios
   ```

   This will create the `ios` folder with native Xcode project files.

## Step 2: Create Call Directory Extension

1. **Open the project in Xcode:**
   ```bash
   open ios/frontend.xcworkspace
   ```

2. **Add Call Directory Extension Target:**
   - In Xcode, go to File → New → Target
   - Choose "Call Directory Extension" template
   - Name it: `CallBlockerExtension`
   - Language: Swift
   - Click Finish
   - When prompted, click "Activate" to activate the scheme

3. **Delete the default CallDirectoryHandler.swift** that Xcode creates

4. **Add your custom CallDirectoryHandler.swift:**
   - Right-click on the `CallBlockerExtension` folder in Xcode
   - Choose "Add Files to..."
   - Navigate to `/app/ios-native/CallDirectoryHandler.swift`
   - Make sure "CallBlockerExtension" target is checked
   - Click Add

## Step 3: Configure App Groups

App Groups allow data sharing between the main app and the extension.

1. **Enable App Groups for Main App:**
   - Select the main app target in Xcode
   - Go to "Signing & Capabilities" tab
   - Click "+ Capability" and add "App Groups"
   - Click "+" and add: `group.com.callblocker.shared`

2. **Enable App Groups for Extension:**
   - Select the `CallBlockerExtension` target
   - Go to "Signing & Capabilities" tab
   - Click "+ Capability" and add "App Groups"
   - Click "+" and add: `group.com.callblocker.shared`

## Step 4: Add Native Module Bridge

1. **Create a new group in Xcode:**
   - In your main app target, create a new group called "NativeModules"

2. **Add Swift files:**
   - Add `/app/ios-native/RNCallBlocker.swift` to this group
   - Add `/app/ios-native/RNCallBlocker.m` to this group
   - Make sure main app target is checked

3. **Create Bridging Header (if prompted):**
   - If Xcode asks to create a bridging header, click "Create"

## Step 5: Update Info.plist

1. **Add extension identifier to main app's Info.plist:**
   ```xml
   <key>CallDirectoryExtensionIdentifier</key>
   <string>com.yourcompany.frontend.CallBlockerExtension</string>
   ```

   Replace `com.yourcompany.frontend` with your actual bundle identifier.

## Step 6: Modify Storage to Use App Groups

Update `/app/frontend/src/storage.ts` to sync with native iOS:

```typescript
import { NativeModules } from 'react-native';

const { RNCallBlocker } = NativeModules;

// After saving any blocked data, sync to extension:
export const syncToNativeExtension = async () => {
  if (Platform.OS === 'ios' && RNCallBlocker) {
    try {
      const data = {
        blocked_numbers: storage.getString(BLOCKED_NUMBERS_KEY) || '[]',
        block_lists: storage.getString(BLOCK_LISTS_KEY) || '[]',
        regex_patterns: storage.getString(REGEX_PATTERNS_KEY) || '[]',
      };
      
      await RNCallBlocker.syncDataToExtension(data);
      await RNCallBlocker.reloadExtension();
    } catch (error) {
      console.error('Failed to sync to extension:', error);
    }
  }
};

// Call this function after adding/removing numbers
```

## Step 7: Configure Signing

1. **Main App Target:**
   - Select automatic signing or configure manual signing
   - Choose your development team

2. **Extension Target:**
   - Select the same signing configuration
   - Use the same team

## Step 8: Build and Run

1. **Connect your physical iOS device**

2. **Select your device in Xcode**

3. **Build and run:**
   - Select the main app scheme
   - Click the Play button or press Cmd+R

4. **Trust the developer:**
   - On your device, go to Settings → General → Device Management
   - Trust your developer certificate

## Step 9: Enable Call Blocking on Device

1. **Open iOS Settings**

2. **Go to Phone → Call Blocking & Identification**

3. **Enable "Call Blocker"** (or your app name)

4. **Test the blocking:**
   - Add a number in the app
   - Have someone call you from that number
   - The call should be blocked automatically

## Troubleshooting

### Extension Not Showing in Settings
- Make sure App Groups are configured correctly
- Rebuild the extension target
- Uninstall and reinstall the app

### Numbers Not Blocking
- Check that the extension is enabled in Settings
- Verify numbers are in E.164 format (+1234567890)
- Try manually reloading the extension in the app
- Check Xcode console for extension errors

### Build Errors
- Clean build folder (Cmd+Shift+K)
- Delete derived data: `rm -rf ~/Library/Developer/Xcode/DerivedData`
- Ensure all targets have the same Swift version

### Data Not Syncing
- Verify App Groups identifier matches exactly in both targets
- Check that UserDefaults suite name is correct
- Add logging to Swift code to debug

## Testing

1. **Add a test number:**
   - Use a friend's number or a secondary phone
   - Add it to the block list

2. **Wait a few moments:**
   - Extension updates may take 30-60 seconds

3. **Call from the blocked number:**
   - The call should be blocked silently
   - It will appear in "Recent Calls" as blocked

## Production Deployment

1. **Update bundle identifiers**
2. **Configure production signing**
3. **Archive the app** (Product → Archive)
4. **Submit to App Store Connect**
5. **Include description of call blocking feature**

## Important Notes

- **Regex Limitations:** iOS Call Directory Extension has limitations with regex. Complex patterns may need to be pre-processed into specific numbers.
- **Number Format:** All numbers MUST be in E.164 format (+country_code + number)
- **Testing:** Cannot be tested in simulator - requires physical device
- **Privacy:** Make it clear in your app description that blocking is local - no data is sent to servers

## Additional Resources

- [Apple CallKit Documentation](https://developer.apple.com/documentation/callkit)
- [Call Directory Extension Guide](https://developer.apple.com/documentation/callkit/cxcalldirectoryprovider)
- [App Groups Documentation](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_security_application-groups)

## Support

If you encounter issues:
1. Check Xcode console for errors
2. Verify all configuration steps
3. Test with a simple blocked number first
4. Review Apple's CallKit sample code