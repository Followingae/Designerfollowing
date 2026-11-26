// Capture-only stand-in for native modules Expo Go lacks. Never committed.
const fn = () => Promise.resolve({ granted: false, status: 'denied', data: '', remove() {} });
const sub = () => ({ remove() {} });
module.exports = new Proxy(
  {
    __esModule: true,
    Video: { compress: async (u) => u },
    AndroidImportance: { DEFAULT: 3 },
    setNotificationHandler() {},
    addNotificationResponseReceivedListener: sub,
    addNotificationReceivedListener: sub,
    getLastNotificationResponseAsync: async () => null,
  },
  { get: (t, k) => (k in t ? t[k] : typeof k === 'string' ? fn : undefined) },
);
