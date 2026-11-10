// S.J CLOTHING - Shared UI Logic & Cart Drawer Management

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inject Cart Drawer into Body
  injectCartDrawer();
  
  // 2. Setup Navbar Events & Cart Count Badge
  setupNavbar();
  
  // 3. Render Cart Items inside Drawer
  renderCartDrawer();
  
  // 4. Listen for Cart Update Events
  window.addEventListener("sj_cart_updated", () => {
    updateNavbarBadge();
    renderCartDrawer();
  });
});

// --- DYNAMIC INJECTIONS ---
function injectCartDrawer() {
  const drawerHTML = `
    <!-- Cart Overlay -->
    <div id="cart-overlay" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 opacity-0 pointer-events-none"></div>
    
    <!-- Cart Drawer Container -->
    <div id="cart-drawer" class="fixed top-0 right-0 h-full w-full max-w-md bg-[#0f0f0f] border-l border-white/10 z-50 translate-x-full transition-transform duration-300 flex flex-col shadow-2xl text-white">
      <!-- Drawer Header -->
      <div class="p-6 border-b border-white/10 flex justify-between items-center">
        <h3 class="text-xl font-bold font-display tracking-wider">YOUR CART</h3>
        <button id="close-cart-btn" class="p-2 text-gray-400 hover:text-white transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Drawer Items (Scrollable) -->
      <div id="cart-drawer-items" class="flex-1 overflow-y-auto p-6 space-y-6">
        <!-- Rendered dynamically -->
      </div>
      
      <!-- Drawer Footer -->
      <div class="p-6 border-t border-white/10 bg-[#070707] space-y-4">
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-400">Subtotal</span>
          <span id="cart-drawer-subtotal" class="font-bold text-lg">LKR 0.00</span>
        </div>
        <p class="text-xs text-gray-400 italic">Shipping and discounts calculated at checkout.</p>
        <div class="grid grid-cols-2 gap-3 pt-2">
          <button id="view-cart-btn" onclick="window.location.href='cart.html'" class="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-sm tracking-wider uppercase transition-all duration-200">
            View Cart
          </button>
          <button id="drawer-checkout-btn" onclick="window.location.href='cart.html?checkout=true'" class="py-3 px-4 bg-[#ccff00] hover:bg-[#b5e000] text-black font-extrabold text-sm tracking-wider uppercase transition-all duration-200 shadow-[0_0_15px_rgba(204,255,0,0.3)]">
            Checkout
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification Container -->
    <div id="toast-container" class="fixed bottom-6 right-6 z-50 space-y-3 pointer-events-none"></div>
  `;
  
  document.body.insertAdjacentHTML("beforeend", drawerHTML);

  // Hook close events
  const closeBtn = document.getElementById("close-cart-btn");
  const overlay = document.getElementById("cart-overlay");
  
  if (closeBtn) closeBtn.addEventListener("click", closeCartDrawer);
  if (overlay) overlay.addEventListener("click", closeCartDrawer);
}

// --- DRAWER ACTIONS ---
function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  
  if (drawer && overlay) {
    document.body.style.overflow = "hidden"; // Disable scroll
    overlay.classList.remove("pointer-events-none", "opacity-0");
    overlay.classList.add("opacity-100");
    drawer.classList.remove("translate-x-full");
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  
  if (drawer && overlay) {
    document.body.style.overflow = ""; // Re-enable scroll
    overlay.classList.add("pointer-events-none", "opacity-0");
    overlay.classList.remove("opacity-100");
    drawer.classList.add("translate-x-full");
  }
}

function renderCartDrawer() {
  const container = document.getElementById("cart-drawer-items");
  const subtotalEl = document.getElementById("cart-drawer-subtotal");
  const checkoutBtn = document.getElementById("drawer-checkout-btn");
  
  if (!container) return;

  const cartItems = getCartDetails();
  const totals = getCartTotals();

  if (cartItems.length === 0) {
    container.innerHTML = `
      <div class="h-full flex flex-col justify-center items-center text-center text-gray-400 py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 stroke-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <p class="font-bold text-white tracking-wider mb-2">YOUR CART IS EMPTY</p>
        <p class="text-sm px-6">Explore our premium collections and elevate your style.</p>
        <button onclick="closeCartDrawer(); window.location.href='shop.html'" class="mt-6 px-6 py-2.5 bg-[#ccff00] text-black font-extrabold text-xs tracking-wider uppercase hover:bg-[#b5e000] transition-colors">
          Shop Now
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = "LKR 0.00";
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  if (checkoutBtn) checkoutBtn.disabled = false;
  if (subtotalEl) subtotalEl.textContent = `LKR ${totals.subtotal.toLocaleString()}`;

  container.innerHTML = cartItems.map(item => `
    <div class="flex items-center space-x-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
      <img src="${item.image}" alt="${item.name}" class="w-20 h-24 object-cover border border-white/10 bg-neutral-900" onerror="this.src='https://via.placeholder.com/150x200?text=Apparel'">
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-sm tracking-wide truncate text-white uppercase">${item.name}</h4>
        <p class="text-xs text-gray-400 mt-0.5">Size: <span class="text-[#ccff00] font-bold">${item.size}</span></p>
        <p class="text-sm font-semibold mt-1 text-[#ccff00]">LKR ${item.price.toLocaleString()}</p>
        
        <!-- Quantity Controls -->
        <div class="flex items-center mt-3 border border-white/10 rounded-none w-24">
          <button onclick="updateCartQuantity(${item.index}, ${item.quantity - 1})" class="w-8 h-7 text-gray-400 hover:text-white flex items-center justify-center text-xs font-bold">-</button>
          <span class="w-8 text-center text-xs font-bold text-white">${item.quantity}</span>
          <button onclick="updateCartQuantity(${item.index}, ${item.quantity + 1})" class="w-8 h-7 text-gray-400 hover:text-white flex items-center justify-center text-xs font-bold">+</button>
        </div>
      </div>
      <button onclick="removeFromCart(${item.index})" class="p-2 text-gray-500 hover:text-red-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  `).join("");
}

// --- NAVBAR MANAGEMENT ---
function setupNavbar() {
  // Setup Cart trigger buttons
  const cartTriggers = document.querySelectorAll(".cart-trigger");
  cartTriggers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  // Setup Mobile Menu toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  updateNavbarBadge();
  setupUserAccountIcon();
}

function updateNavbarBadge() {
  const badges = document.querySelectorAll(".cart-count-badge");
  const cartItems = getCart();
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  badges.forEach(badge => {
    if (totalQty > 0) {
      badge.textContent = totalQty;
      badge.classList.remove("hidden");
      // Add a scale pop animation
      badge.classList.add("scale-110");
      setTimeout(() => badge.classList.remove("scale-110"), 200);
    } else {
      badge.textContent = "0";
      badge.classList.add("hidden");
    }
  });
}

function setupUserAccountIcon() {
  const accountLinks = document.querySelectorAll(".account-link");
  const user = getCurrentUser();
  const admin = getAdminSession();
  
  accountLinks.forEach(link => {
    if (admin) {
      link.href = "admin.html";
    } else if (user) {
      link.href = "account.html";
    } else {
      link.href = "account.html"; // Redirects to login
    }
  });
}

// --- TOAST NOTIFICATIONS ---
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toastId = "toast_" + Date.now();
  const bgClass = type === "success" ? "bg-neutral-900 border-l-4 border-[#ccff00] text-white" : "bg-red-950 border-l-4 border-red-500 text-white";
  const icon = type === "success" 
    ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#ccff00] mr-3" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
       </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
       </svg>`;

  const toastHTML = `
    <div id="${toastId}" class="flex items-center p-4 min-w-[300px] shadow-2xl rounded-none transition-all duration-300 translate-y-10 opacity-0 ${bgClass} border border-white/5 pointer-events-auto">
      ${icon}
      <div class="text-sm font-semibold uppercase tracking-wider">${message}</div>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", toastHTML);
  const toast = document.getElementById(toastId);

  // Trigger enter animation
  setTimeout(() => {
    toast.classList.remove("translate-y-10", "opacity-0");
  }, 10);

  // Auto remove after 3.5s
  setTimeout(() => {
    toast.classList.add("translate-y-[-10px]", "opacity-0");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}
