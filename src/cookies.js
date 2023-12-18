// https://www.quirksmode.org/js/cookies.html

export default {
  set: function (name, value, ttl) {
    const now = new Date();
    // `ttl` is in minutes, convert it to milliseconds
    const expirationTime = now.getTime() + ttl * 60000;

    const item = {
      value: value,
      expires: expirationTime
    };

    localStorage.setItem(name, JSON.stringify(item));
  },
  get: function (name) {
    const itemStr = localStorage.getItem(name);
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Check if the item has expired
    if (now.getTime() > item.expires) {
      // If expired, remove it from storage and return null
      localStorage.removeItem(name);
      return null;
    }

    return item.value;
  }
};
