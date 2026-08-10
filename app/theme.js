export const COLOR_MODE_STORAGE_KEY = 'tomtran-color-mode'

// Runs before hydration so a saved/system dark preference is applied before
// the first paint on either root layout. The try/catch also covers browsers
// that restrict localStorage access.
export const colorModeScript = `
(function () {
  try {
    var key = '${COLOR_MODE_STORAGE_KEY}';
    var saved = localStorage.getItem(key);
    var mode = saved === 'dark' || saved === 'light'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.colorMode = mode;
  } catch (error) {
    document.documentElement.dataset.colorMode = 'light';
  }
})();
`
