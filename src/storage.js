/**
 * storage.js — Drop-in replacement for Claude artifact's window.storage API.
 *
 * The app uses window.storage.get/set/delete everywhere.
 * This file makes those same calls work against the browser's localStorage,
 * so all app code runs identically with zero changes.
 *
 * HOW IT HANDLES shared vs personal:
 *   shared=true  → key stored as-is  (same data for everyone on this machine)
 *   shared=false → key stored with "__personal__" prefix (per browser profile)
 *
 * On Windows, each user has their own browser profile, so localStorage is
 * already siloed per user. shared=true vs false is a no-op in practice,
 * but the prefix is kept for forward-compatibility.
 */

const storage = {
  async get(key, shared = false) {
    try {
      const storeKey = shared ? key : `__personal__${key}`;
      const val = localStorage.getItem(storeKey);
      return val !== null ? { key, value: val, shared } : null;
    } catch (e) {
      console.warn('[storage] get error:', e);
      return null;
    }
  },

  async set(key, value, shared = false) {
    try {
      const storeKey = shared ? key : `__personal__${key}`;
      localStorage.setItem(storeKey, value);
      return { key, value, shared };
    } catch (e) {
      console.warn('[storage] set error:', e);
      return null;
    }
  },

  async delete(key, shared = false) {
    try {
      const storeKey = shared ? key : `__personal__${key}`;
      localStorage.removeItem(storeKey);
      return { key, deleted: true, shared };
    } catch (e) {
      console.warn('[storage] delete error:', e);
      return null;
    }
  },

  async list(prefix = '', shared = false) {
    try {
      const keys = Object.keys(localStorage)
        .filter(k => shared
          ? k.startsWith(prefix) && !k.startsWith('__personal__')
          : k.startsWith(`__personal__${prefix}`)
        )
        .map(k => shared ? k : k.replace('__personal__', ''));
      return { keys, prefix, shared };
    } catch (e) {
      return null;
    }
  }
};

// Polyfill — makes window.storage work exactly like the Claude artifact API
if (typeof window !== 'undefined') {
  window.storage = storage;
}

export default storage;
