const router = {
  init() {
    const anchorLinks = document.querySelectorAll("a.navlink");

    anchorLinks.forEach((anchorLink) => {
      anchorLink.addEventListener("click", (event) => {
        event.preventDefault();

        const href = event.target.getAttribute("href");
        this.go(href);
      });
    });

    this.go(location.pathname);

    window.addEventListener("popstate", (event) => {
      this.go(event.state.route, false);
    });
  },
  go(route, addToHistory = true) {
    console.log(`going to ${route}`);

    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    let pageElement = null;

    switch (route) {
      case "/":
      case "/index.html":
        pageElement = document.createElement("menu-page");
        break;

      case "/order":
        pageElement = document.createElement("order-page");
        break;

      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          const [_, product, category] = route.split("/");

          pageElement.dataset.category = category;
          pageElement.dataset.productId = product.split("-")[1];
        }
        break;
    }

    if (pageElement) {
      const mainWrapper = document.querySelector("main");
      mainWrapper.innerHTML = "";
      mainWrapper.append(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    }
  },
};

export default router;
