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