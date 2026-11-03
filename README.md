# Nihongo Study Deck V18.7 — PWA package

This package wraps the existing single-file HTML app as an installable Progressive Web App. The study modules, SRS logic, and localStorage keys were intentionally left in place; the HTML document title and PWA bootstrap metadata were added.

## Deploy it for other users

1. Upload **all files and folders in this package** to a static HTTPS host. Do not upload only `index.html`.
2. For GitHub Pages: create a repository, upload the contents of this folder to the repository root, then enable Pages in **Settings → Pages** and deploy from the chosen branch/root. Wait until GitHub provides the HTTPS URL.
3. Open the deployed URL on Android using Chrome. Wait for the page to finish loading, then choose **Install app** if the button appears, or use Chrome's menu → **Install app** / **Add to Home screen**.
4. Test flashcards, SRS, quizzes, reading, settings, import/export, and a reload before sharing the link.

## Important notes

- The app stores progress in the browser's localStorage. Each user's progress is normally separate on each device/browser profile; it does not sync across devices or between users.
- Keep using the in-app backup/export and restore features. Before changing hosting URLs or clearing browser data, export a backup.
- The service worker caches the app shell and uses network-first loading for the main HTML. An initial successful online load is required before the cached shell can be used offline. Some optional features (such as generated reading via a configured backend and speech synthesis) may still require network or device/browser support.
- When publishing an update, increment `CACHE_VERSION` in `service-worker.js` so installed clients refresh the cache. Users may need to close/reopen the app once to receive an update.
- Use HTTPS. Service workers and installability do not work reliably from ordinary `file://` URLs or plain HTTP hosts.
- This package has not been deployed to a public URL; hosting must be completed by the owner.
