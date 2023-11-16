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
  },
  go(route, addToHistory = true) {},
};

export default router;
