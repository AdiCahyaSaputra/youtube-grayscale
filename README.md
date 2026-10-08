# YouTube grayscale

A Firefox extension with four checkboxes: thumbnails, avatars, Shorts, and the video player. Selected images and videos turn grayscale and return to color while hovered. Choices save locally and apply to all open YouTube tabs.

Thumbnails, avatars, and Shorts start enabled. The main video player starts disabled. Shorts has its own setting, separate from normal thumbnails and the main player. The Shorts setting affects preview images and playing Shorts videos.

## Try it in Firefox

1. Use Firefox 142 or newer.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on...** and select this folder's `manifest.json`.
4. Open or refresh `https://www.youtube.com/`.
5. Open **YouTube grayscale** from the extensions menu. Change the checkboxes and hover over a selected component.

Temporary extensions stay installed until Firefox restarts. To test an updated version, click **Reload** on the extension's debugging entry, then refresh your YouTube tabs. Mozilla documents this process in its [temporary installation guide](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/).

## Scope

Works on desktop `www.youtube.com`. No build step, account, background service, or data collection. Only the storage permission is requested. CSS rules also apply to newly loaded recommendations as you scroll or navigate within YouTube.

YouTube can change its HTML, which may require updating the selectors in `content.js`. Embedded players and the mobile website are outside this version's scope.
