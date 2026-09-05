# Savan AI Web App — Mobile Version

## Mobile se chalane ka basic setup
1. Is folder ki files GitHub repository `savan-ai` mein upload karein.
2. GitHub repository Settings → Pages → Deploy from branch → `main` → `/ (root)` select karein.
3. Save ke baad GitHub Pages URL se app kholein.
4. Chrome menu → Add to Home screen.

## Voice
Mic button se Hindi speech-to-text hota hai aur browser Text-to-Speech se Hindi voice mein reply bolta hai. Installed device voices ke hisab se female Hindi voice prefer ki jaati hai.

## API key security
Is demo mein browser mein key enter karne ka option sirf local testing ke liye hai. Public GitHub website par API key expose karna unsafe hai. Final app mein OpenAI API call ko secure server/backend ke through route karein.

## Important
“Hey Savan” always-on wake word is demo mein nahi hai. Uske liye Android app + background/foreground service aur wake-word engine ki zarurat hogi.
