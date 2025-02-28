Here are the .gitignore and README.md files for your Safari Web Extension Xcode project.

📌 .gitignore (For Xcode & Safari Extensions)

This ensures you don’t commit unnecessary files, keeping your repo clean.

# Xcode project files
*.xcworkspace/
*.xcuserstate
*.xcuserdata/

# Build products
DerivedData/
build/
*.ipa
*.app
*.dSYM/

# Swift Packages
.swiftpm/
Package.resolved

# Logs & temp files
*.log
*.xcresult/
*.swp
*.swo
*.DS_Store

# Safari Extension Generated Files
*.entitlements
*.mobileprovision
*.pbxproj
*.mode1v3
*.mode2v3
*.perspectivev3
*.xcassets

# Ignore Pods if using CocoaPods
Pods/
Podfile.lock

# Ignore Carthage if using
Carthage/

# Ignore fastlane metadata
fastlane/report.xml
fastlane/Preview.html
fastlane/screenshots/
fastlane/test_output/

# Ignore environment files
.env

📌 README.md (For Safari Web Extension Project)

# URLCopyExtension - Safari Web Extension

## 📌 Overview
**URLCopyExtension** is a **Safari Web Extension** that allows users to quickly copy the **current webpage URL** using the keyboard shortcut **Cmd + Shift + C**. When triggered, the extension:
1. **Copies the URL** to the clipboard.
2. **Displays a toast notification** confirming the copy action.

---

## 🚀 Features
- ✅ **Clipboard Shortcut** - Press `Cmd + Shift + C` to copy the URL instantly.
- ✅ **Visual Feedback** - A toast notification appears when the URL is copied.
- ✅ **Lightweight & Fast** - Minimal impact on performance.
- ✅ **Safari Native Integration** - Works directly inside Safari as an extension.

---

## 🛠 Installation

### 1️⃣ **Run in Xcode**
1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/URLCopyExtension.git
   cd URLCopyExtension
```

	2.	Open the project in Xcode:

```sh
open URLCopyExtension.xcodeproj
```


	3.	Select the Safari Web Extension Target and click Run (Cmd + R).

### 2️⃣ Enable in Safari
	1.	Open Safari → Settings (Cmd + ,).
	2.	Go to Extensions and enable URLCopyExtension.

### 🔑 Usage
	•	Press Cmd + Shift + C → The URL is copied to the clipboard.
	•	A toast message confirms the copy.

### 🔧 Development & Debugging
	•	Modify content.js to change how the extension interacts with Safari.
	•	Modify manifest.json or Info.plist to adjust permissions.
	•	Use console.log() to debug inside Safari Web Inspector (Cmd + Option + C).

### 🎯 Roadmap
	•	Add Options Page to configure shortcuts.
	•	Allow custom toast styles.
	•	Publish on the Mac App Store.

### 🤝 Contributing

Pull requests are welcome! Open an issue for bug reports or feature requests.

---

### 📜 License

MIT License © 2025 Your Name

---

### **💡 Next Steps**
- Add this `.gitignore` and `README.md` to your repo:
  ```sh
  echo "# URLCopyExtension" > README.md
  echo "*.xcworkspace/" > .gitignore
  git add .gitignore README.md
  git commit -m "Added gitignore and README"
  git push origin main

	•	Run Xcode (Cmd + R) and test!

Would you like help publishing the extension to the Mac App Store? 🚀