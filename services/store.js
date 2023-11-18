const store = {
  menu: null,
  cart: [],
};

const storeProxy = new Proxy(store, {
  set(target, property, value) {
    target[property] = value;

    if (property === "menu") {
      window.dispatchEvent(new Event("menuchange"));
    }

    if (property === "cart") {
      window.dispatchEvent(new Event("cartchange"));
    }

    return true;
  },
});

export default storeProxy;
