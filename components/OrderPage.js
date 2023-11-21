import API from "../services/api.js";

export default class OrderPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    API.fetchCSS("OrderPage").then((styles) => {
      style.textContent = styles;
    });

    const section = document.createElement("section");

    this.root.append(style, section);
  }

  connectedCallback() {
    window.addEventListener("cartchange", () => {
      this.render();
    });
    this.render();
  }

  render() {
    const section = this.root.querySelector("section");
    const cart = coffee_app.store.cart;

    if (cart.length === 0) {
      section.innerHTML = '<p class="empty">You cart is empty!</p>';
    } else {
      section.innerHTML = `
        <h2>Your Order</h2>
        <ul></ul>
      `;

      const template = document.getElementById("order-form-template");
      const content = template.content.cloneNode(true);
      section.append(content);

      const cartList = section.querySelector("ul");
      cart.forEach((cartItem) => {
        const cartListItem = document.createElement("cart-item");
        cartListItem.dataset.item = JSON.stringify(cartItem);
        cartList.append(cartListItem);
      });

      const totalPrice = cart.reduce(
        (acc, { quantity, price }) => acc + price * quantity,
        0
      );
      const totalPriceElement = document.createElement("li");
      totalPriceElement.innerHTML = `
        <p class='total'>Total</p>
        <p class='price-total'>$${totalPrice.toFixed(2)}</p>
      `;
      cartList.append(totalPriceElement);
    }
  }
}
