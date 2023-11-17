const API = {
  url: "/data/menu.json",
  fetchMenu: async function () {
    const result = await fetch(this.url);
    return await result.json();
  },
  fetchCSS: async function (filename) {
    const result = await fetch(`/components/${filename}.css`);
    return await result.text();
  },
};

export default API;
