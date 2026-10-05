import Store from "./src/Store.js";

const store = new Store([
    {
        name: "Apple",
        price: 500,
        qty: 2
    },
    {
        name: "Milk",
        price: 300,
        qty: 3
    },
    {
        name: "Bread",
        price: 250,
        qty: 1
    }
]);

const productList = document.getElementById("product-list");
const totalElement = document.getElementById("total");

const productForm = document.getElementById("product-form");

const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const qtyInput = document.getElementById("qty");

const nameError = document.getElementById("name-error");
const priceError = document.getElementById("price-error");
const qtyError = document.getElementById("qty-error");




productForm.addEventListener("submit", (event) => {
    event.preventDefault();

    nameError.textContent = "";
    priceError.textContent = "";
    qtyError.textContent = "";

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    const qty = Number(qtyInput.value);

    let isValid = true;

    if (name === "") {
        nameError.textContent = "Name is required.";
        isValid = false;
    }

    if (priceInput.value === "" || price <= 0 || Number.isNaN(price)) {
        priceError.textContent = "Price must be greater than 0.";
        isValid = false;
    }

    if (
        qtyInput.value === "" ||
        !Number.isInteger(qty) ||
        qty <= 0
    ) {
        qtyError.textContent = "Quantity must be a positive number.";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    store.add({
        name: name,
        price: price,
        qty: qty
    });
    productList.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const index = Number(button.dataset.index);
    const action = button.dataset.action;

    if (action === "increase") {
        const product = store.items[index];
        store.updateQty(index, product.qty + 1);
    }

    if (action === "decrease") {
        const product = store.items[index];

        if (product.qty > 1) {
            store.updateQty(index, product.qty - 1);
        }
    }

    if (action === "remove") {
        store.remove(index);
    }

    renderProducts();
}); 





    renderProducts();
    productForm.reset();
});

function renderProducts() {
    productList.innerHTML = "";

    store.items.forEach((product, index) => {
        const productElement = document.createElement("div");

        productElement.innerHTML = `
            <strong>${product.name}</strong>
            <span>Price: ${product.price}</span>
            <span>Quantity: ${product.qty}</span>
            <button data-action="decrease" data-index="${index}">-</button>
            <button data-action="increase" data-index="${index}">+</button>
            <button data-action="remove" data-index="${index}">Delete</button>
        `;

        productList.appendChild(productElement);
    });

    totalElement.textContent = store.total;
}

renderProducts();