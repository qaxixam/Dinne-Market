
const menuBtn = document.getElementById("menuBtn");

const closeBtn = document.getElementById("closeBtn");

const mobileSidebar = document.getElementById("mobileSidebar");

const menuOverlay = document.getElementById("menuOverlay");


// ==========================================
// OPEN MENU
// ==========================================

menuBtn.addEventListener("click", () => {

    mobileSidebar.classList.add("active");

    menuOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

});


// ==========================================
// CLOSE MENU
// ==========================================

function closeMenu() {

    mobileSidebar.classList.remove("active");

    menuOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


// Close button

closeBtn.addEventListener("click", closeMenu);


// Click overlay

menuOverlay.addEventListener("click", closeMenu);


// ==========================================
// CLOSE MENU AFTER CLICKING LINK
// ==========================================

const mobileLinks =
    document.querySelectorAll(".sidebar-links a");

mobileLinks.forEach((link) => {

    link.addEventListener("click", closeMenu);

});

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
async function chunkApiData() {
    let response = await fetch('https://fakestoreapi.com/products');
    let data = await response.json();
    let container = document.querySelector(".Product-Container");
    let selectedProducts = data.slice(0, 4);
    console.log(selectedProducts);

    let card = selectedProducts.map((product) => {
        return `
      <div class="Card">

        <div class="img-box">
          <img src="${product.image}" alt="${product.title}">
        </div>

        <div class="card-info">
          <p class="category">${product.category}</p>

          <h3 class="title">
            ${product.title}
          </h3>

          <p class="price">$${product.price}</p>
        </div>

      </div>
    `;
    }).join("");

    container.innerHTML = card;
}

ApiData();
chunkApiData();

