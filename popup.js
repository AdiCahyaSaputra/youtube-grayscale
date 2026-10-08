"use strict";

const status = document.getElementById("status");
const fieldset = document.querySelector("fieldset");

browser.storage.local.get(grayscaleDefaults).then(settings => {
  for (const key of Object.keys(grayscaleDefaults)) {
    const input = document.getElementById(key);
    input.checked = settings[key] === true;
    input.addEventListener("change", async () => {
      input.disabled = true;
      status.textContent = "Saving...";
      try {
        await browser.storage.local.set({ [key]: input.checked });
        status.textContent = "Saved. Changes apply to open YouTube tabs.";
      } catch (error) {
        input.checked = !input.checked;
        status.textContent = "Could not save. Try again.";
        console.error("YouTube grayscale could not save settings", error);
      } finally {
        input.disabled = false;
      }
    });
  }
  fieldset.disabled = false;
  status.textContent = "Settings are saved automatically.";
}).catch(error => {
  status.textContent = "Could not load settings. Reopen this menu to retry.";
  console.error("YouTube grayscale could not load settings", error);
});
