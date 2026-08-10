async function ApiData() {
    let response = await fetch('https://fakestoreapi.com/products');
    let data = await response.json();

    let container = document.querySelector('.Product-Container');

    let card = data.map((product) => {
        return `
            <div class="Card">
                <div class="img-box">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <h3 class="title">${product.title}</h3>
                <p class="category">${product.category}</p>
                <p class="price">$${product.price}</p>
            </div>
        `;
    }).join("");

    container.innerHTML = card;
}

ApiData();