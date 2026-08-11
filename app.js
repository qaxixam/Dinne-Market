<<<<<<< HEAD

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

ApiData();

=======
// ============================================================
// CART STATE - localStorage se cart load karo
// ============================================================
let cart = JSON.parse(localStorage.getItem('dinemarket_cart')) || [];

// Products ko id se store karo taake onclick mein safely use ho sake
const productsMap = {};

function saveCart() {
    localStorage.setItem('dinemarket_cart', JSON.stringify(cart));
}

// ID se product dhundh ke cart mein add karo (onclick safe method)
window.addToCartById = function(id) {
    let product = productsMap[id];
    if (!product) { console.error('Product not found:', id); return; }
    addToCart(product);
};

// Cart mein product add karo
function addToCart(product) {
    let existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCartUI();
    openCartSidebar();
}

// Cart item ki quantity update karo
window.updateQuantity = function(productId, change) {
    let item = cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    saveCart();
    updateCartUI();
    renderCartItems();
};

// Cart item remove karo
window.removeFromCart = function(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    updateCartUI();
    renderCartItems();
};

// Cart badges aur header count update karo
function updateCartUI() {
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Badges
    let desktopBadge = document.getElementById('desktopCartBadge');
    let mobileBadge  = document.getElementById('mobileCartBadge');
    let headerCount  = document.getElementById('cartHeaderCount');
    let totalEl      = document.getElementById('cartTotalPrice');

    if (desktopBadge) desktopBadge.textContent = totalItems;
    if (mobileBadge)  mobileBadge.textContent  = totalItems;
    if (headerCount)  headerCount.textContent   = `(${totalItems})`;
    if (totalEl)      totalEl.textContent       = `$${totalPrice.toFixed(2)}`;

    // Badge hide karo agar 0 ho
    [desktopBadge, mobileBadge].forEach(b => {
        if (!b) return;
        b.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

// Cart items render karo inside sidebar
function renderCartItems() {
    let container = document.getElementById('cartItemsContainer');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="fa-solid fa-cart-shopping cart-empty-icon"></i>
                <p>Your cart is empty</p>
                <a href="All_Product.html" class="cart-shop-link">Start Shopping</a>
            </div>
        `;
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item" id="cart-item-${item.id}">
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <p class="cart-item-title">${item.title}</p>
                <p class="cart-item-price">$${Number(item.price).toFixed(2)}</p>
                <div class="cart-qty-row">
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <span class="qty-count">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <span class="cart-item-subtotal">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
            <button class="cart-remove-btn" onclick="removeFromCart(${item.id})" aria-label="Remove item">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `).join('');

    updateCartUI();
}

// Cart sidebar open karo
function openCartSidebar() {
    let sidebar = document.getElementById('cartSidebar');
    let overlay = document.getElementById('cartOverlay');
    if (sidebar) sidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    renderCartItems();
}

// Cart sidebar close karo
function closeCartSidebar() {
    let sidebar = document.getElementById('cartSidebar');
    let overlay = document.getElementById('cartOverlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

// ============================================================
// PRODUCT LISTING - Product cards render karo
// ============================================================
async function ApiData() {
    let container = document.querySelector('.Product-Container');
    if (!container) return;

    container.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading Products...</p>
        </div>
    `;

    try {
        let response = await fetch('https://fakestoreapi.com/products');
        let data = await response.json();

        // Saare products map mein store karo (id => product)
        data.forEach(p => { productsMap[p.id] = p; });

        let targetCategory = container.dataset.category || 'all';

        let filteredData = data;
        if (targetCategory && targetCategory.toLowerCase() !== 'all') {
            filteredData = data.filter(product =>
                product.category.toLowerCase() === targetCategory.toLowerCase()
            );
        }

        if (filteredData.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No products found in this category.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredData.map(product => `
            <div class="Card">
                <div class="img-box" onclick="window.location.href='product_detail.html?id=${product.id}'">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <h3 class="title" onclick="window.location.href='product_detail.html?id=${product.id}'">${product.title}</h3>
                <p class="category">${product.category}</p>
                <div class="card-bottom">
                    <p class="price">$${Number(product.price).toFixed(2)}</p>
                    <button class="card-cart-btn" onclick="addToCartById(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error("Error fetching products:", error);
        container.innerHTML = `
            <div class="error-state">
                <p>Failed to load products. Please check your connection and try again.</p>
            </div>
        `;
    }
}

// ============================================================
// PRODUCT DETAIL PAGE
// ============================================================
async function loadProductDetail() {
    let detailContainer = document.getElementById('productDetailContent');
    if (!detailContainer) return;

    let urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('id');

    if (!productId) {
        detailContainer.innerHTML = `
            <div class="error-state">
                <p>No product selected. <a href="All_Product.html">Return to products</a></p>
            </div>
        `;
        return;
    }

    detailContainer.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading Product Details...</p>
        </div>
    `;

    try {
        let response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        let product = await response.json();

        if (!product || !product.id) {
            detailContainer.innerHTML = `
                <div class="error-state">
                    <p>Product not found. <a href="All_Product.html">Return to products</a></p>
                </div>
            `;
            return;
        }

        // Product detail page par bhi map mein store karo
        productsMap[product.id] = product;

        document.title = `${product.title} - FixIt Store`;

        detailContainer.innerHTML = `
            <div class="product-detail-wrapper">
                <!-- Left: Gallery -->
                <div class="detail-gallery">
                    <div class="main-img-box">
                        <img id="mainProductImg" src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="thumbnail-grid">
                        <div class="thumb-box active" onclick="changeMainImage('${product.image}', this)">
                            <img src="${product.image}" alt="Thumb 1">
                        </div>
                        <div class="thumb-box" onclick="changeMainImage('${product.image}', this)">
                            <img src="${product.image}" alt="Thumb 2">
                        </div>
                        <div class="thumb-box" onclick="changeMainImage('${product.image}', this)">
                            <img src="${product.image}" alt="Thumb 3">
                        </div>
                        <div class="thumb-box" onclick="changeMainImage('${product.image}', this)">
                            <img src="${product.image}" alt="Thumb 4">
                        </div>
                    </div>
                </div>

                <!-- Right: Info -->
                <div class="detail-info">
                    <h1 class="detail-title">${product.title}</h1>
                    <p class="detail-category">${product.category}</p>
                    <p class="detail-price">$${Number(product.price).toFixed(2)}</p>

                    <hr class="detail-divider">

                    <div class="detail-section">
                        <h3 class="section-heading">Description</h3>
                        <p class="description-text">${product.description || 'No description available.'}</p>
                    </div>

                    <hr class="detail-divider">

                    <button class="add-to-cart-btn" onclick="addToCartById(${product.id})">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Add to Cart
                    </button>

                    <div class="product-spec-box">
                        <h4 class="spec-title">Product Details</h4>
                        <ul class="spec-list">
                            <li><span class="bullet">•</span> Material: Premium quality</li>
                            <li><span class="bullet">•</span> Color: As shown in image</li>
                            <li><span class="bullet">•</span> Size: Standard fit</li>
                            <li><span class="bullet">•</span> Care: Machine washable</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error loading product detail:", error);
        detailContainer.innerHTML = `
            <div class="error-state">
                <p>Failed to load product details. Please try again later.</p>
            </div>
        `;
    }
}

// Main image thumbnail switch
window.changeMainImage = function(src, element) {
    let mainImg = document.getElementById('mainProductImg');
    if (mainImg) mainImg.src = src;
    document.querySelectorAll('.thumb-box').forEach(t => t.classList.remove('active'));
    if (element) element.classList.add('active');
};

// ============================================================
// MOBILE MENU TOGGLE
// ============================================================
function initMobileMenu() {
    let menuBtn = document.getElementById('menuBtn');
    let closeBtn = document.getElementById('closeBtn');
    let mobileSidebar = document.getElementById('mobileSidebar');
    let menuOverlay = document.getElementById('menuOverlay');

    if (!mobileSidebar || !menuOverlay) return;

    function openMenu() {
        mobileSidebar.classList.add('active');
        menuOverlay.classList.add('active');
    }

    function closeMenu() {
        mobileSidebar.classList.remove('active');
        menuOverlay.classList.remove('active');
    }

    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
}

// ============================================================
// CART SIDEBAR TOGGLE (from navbar cart icon)
// ============================================================
function initCartSidebar() {
    let cartLink       = document.getElementById('cartLink');
    let mobileCartLink = document.getElementById('mobileCartLink');
    let closeCartBtn   = document.getElementById('closeCartBtn');
    let cartOverlay    = document.getElementById('cartOverlay');
    let checkoutBtn    = document.getElementById('checkoutBtn');

    if (cartLink)       cartLink.addEventListener('click', e => { e.preventDefault(); openCartSidebar(); });
    if (mobileCartLink) mobileCartLink.addEventListener('click', e => { e.preventDefault(); openCartSidebar(); });
    if (closeCartBtn)   closeCartBtn.addEventListener('click', closeCartSidebar);
    if (cartOverlay)    cartOverlay.addEventListener('click', closeCartSidebar);

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            alert(`Proceeding to Checkout!\nTotal: $${total.toFixed(2)}\n\nThank you for shopping! 🛒`);
        });
    }
}

// ============================================================
// ACTIVE NAV HIGHLIGHT
// ============================================================
function highlightActiveNav() {
    let currentPath = window.location.pathname.split('/').pop();
    if (!currentPath || currentPath === 'index.html') currentPath = 'All_Product.html';

    document.querySelectorAll('.categories ul li a, .sidebar-links a').forEach(link => {
        let href = link.getAttribute('href');
        if (href === currentPath || href === decodeURIComponent(currentPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================================
// INIT ON PAGE LOAD
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    ApiData();
    loadProductDetail();
    initMobileMenu();
    initCartSidebar();
    highlightActiveNav();
    updateCartUI();    // badge refresh on load
});
>>>>>>> e7927b92372c60a847e22429d3352956c080e78e
