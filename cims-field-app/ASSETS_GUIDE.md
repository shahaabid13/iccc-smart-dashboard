# App Assets Guide

## Splash Screen

Place splash screen images in `resources/splash/`:

### iOS
- `icon-default.png` (2732 x 2732 px, recommended)

### Android
- `splash-mdpi.png` (320 x 470 px)
- `splash-hdpi.png` (480 x 720 px)
- `splash-xhdpi.png` (720 x 1280 px)
- `splash-xxhdpi.png` (1080 x 1920 px)
- `splash-xxxhdpi.png` (1440 x 2560 px)

Generate using Ionic CLI:
```bash
npx ionic capacitor copy
npx capacitor update
```

## App Icon

Place app icon in `resources/icon/`:

### iOS
- `icon.png` (1024 x 1024 px minimum)

### Android
- `icon.png` (1024 x 1024 px minimum)

Capacitor will automatically scale and resize for all required dimensions.

## Quick Setup

1. Create `resources/` directory in project root
2. Add `icon/` and `splash/` subdirectories
3. Place icon and splash images
4. Run:
   ```bash
   npm run build
   npm run cap:copy
   ```

The Capacitor CLI will handle scaling and placement for both platforms.

## Recommended Tools

- **Figma** — Design and export multisize assets
- **ImageMagick** — Batch resize images
- **Online Icon Generator** — [romannurik.github.io/AndroidAssetStudio](https://romannurik.github.io/AndroidAssetStudio/)

## Placeholder

For testing, use any PNG file. Replace with actual branding before release.
