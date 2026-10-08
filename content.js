"use strict";

(() => {
  const root = document.documentElement;
  const shortsContainers = "ytd-reel-item-renderer, ytd-shorts, ytd-reel-video-renderer, yt-shorts-lockup-view-model, ytm-shorts-lockup-view-model";
  const outsideShorts = `:not(:is(${shortsContainers}) *)`;
  const targets = {
    thumbnails: [
      `ytd-thumbnail${outsideShorts}`,
      `yt-thumbnail-view-model:not(ytd-thumbnail *)${outsideShorts}`
    ],
    avatars: ["yt-img-shadow#avatar", "yt-img-shadow#author-photo", "yt-avatar-shape", "yt-decorated-avatar-view-model:not(:has(yt-avatar-shape))"],
    shorts: [
      ":is(ytd-reel-item-renderer, yt-shorts-lockup-view-model, ytm-shorts-lockup-view-model) img",
      ":is(ytd-shorts, ytd-reel-video-renderer) video"
    ],
    player: [`#movie_player video${outsideShorts}`]
  };
  const style = document.createElement("style");
  style.id = "youtube-grayscale-style";
  style.textContent = Object.entries(targets).map(([key, selectors]) => {
    const scope = `html[data-yt-grayscale-${key}]`;
    const normal = selectors.map(selector => `${scope} ${selector}`).join(",\n");
    const hovered = selectors.map(selector => {
      if (key === "player") return `${scope} #movie_player:hover video${outsideShorts}`;
      if (key === "shorts") {
        return `${scope} ${selector.replace(/ (img|video)$/, ":hover $1")}`;
      }
      return `${scope} ${selector}:hover`;
    }).join(",\n");
    return `${normal} { filter: grayscale(1) !important; }\n${hovered} { filter: grayscale(0) !important; }`;
  }).join("\n");
  root.append(style);

  function apply(key, value) {
    root.toggleAttribute(`data-yt-grayscale-${key}`, value === true);
  }

  // Listen before reading so an early popup change cannot be missed.
  const changedDuringLoad = new Set();
  browser.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    for (const key of Object.keys(grayscaleDefaults)) {
      if (Object.hasOwn(changes, key)) {
        changedDuringLoad.add(key);
        apply(key, changes[key].newValue ?? grayscaleDefaults[key]);
      }
    }
  });
  browser.storage.local.get(grayscaleDefaults).then(settings => {
    for (const key of Object.keys(grayscaleDefaults)) {
      if (!changedDuringLoad.has(key)) apply(key, settings[key]);
    }
  }).catch(error => console.error("YouTube grayscale could not load settings", error));
})();
