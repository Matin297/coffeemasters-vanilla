const store = {
  menu: null,
  cart: [],
};

const storeProxy = new Proxy(store, {
  set(target, property, value) {
    target[property] = value;

    if (property === "menu") {
      window.dispatchEvent(new CustomEvent("menuchange"));
    }

    if (property === "cart") {
      window.dispatchEvent(new CustomEvent("cartchange"));
    }

    return true;
  },
});

export default storeProxy;
