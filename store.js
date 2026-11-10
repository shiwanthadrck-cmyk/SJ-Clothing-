// S.J CLOTHING - Shared Store & Database Management using localStorage

// Initial default seed products
const DEFAULT_PRODUCTS = [
  {
    id: "p1",
    name: "Apex Oversized Tee",
    category: "Men",
    price: 3800,
    originalPrice: 3800,
    discountPrice: 3200,
    isDiscounted: true,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop",
    description: "Engineered for maximum comfort and style. Featuring an ultra-soft heavy cotton blend, drop shoulders, and a bold minimal S.J logo on the chest. Designed to withstand your heaviest lifting sessions and look premium on the street.",
    fit: "Oversized fit. Go one size down for a standard regular fit.",
    inStock: true
  },
  {
    id: "p2",
    name: "Relentless Gym Shorts",
    category: "Men",
    price: 3400,
    originalPrice: 3400,
    discountPrice: null,
    isDiscounted: false,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
    description: "Built for movement. These lightweight shorts feature a high-stretch breathable fabric, zippered side pockets, and an adjustable waistband. Ideal for leg day, running, or casual wear.",
    fit: "Regular fit, 5-inch inseam. Fits true to size.",
    inStock: true
  },
  {
    id: "p3",
    name: "Elite Training Hoodie",
    category: "Men",
    price: 5800,
    originalPrice: 5800,
    discountPrice: null,
    isDiscounted: false,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
    description: "The ultimate training hoodie. Made with a heavy-weight fleece lining to keep you warm, dynamic paneling for mobility, and a modern clean fit. Ideal for warmups or cold-weather outdoor training.",
    fit: "Athletic fitted silhouette.",
    inStock: true
  },
  {
    id: "p4",
    name: "Sculpt Seamless Leggings",
    category: "Women",
    price: 4500,
    originalPrice: 4500,
    discountPrice: 3900,
    isDiscounted: true,
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=600&auto=format&fit=crop",
    description: "Experience absolute confidence. Our seamless knit leggings feature a supportive high waistband, sweat-wicking materials, and contouring textures to highlight your physique.",
    fit: "High-waisted compression fit. Fits true to size.",
    inStock: true
  },
  {
    id: "p5",
    name: "Empower Sports Bra",
    category: "Women",
    price: 3200,
    originalPrice: 3200,
    discountPrice: null,
    isDiscounted: false,
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop",
    description: "Medium-to-high support sports bra built for intense training. Designed with a cross-strap back detail for ventilation, removable cups, and an ultra-soft underband.",
    fit: "Fitted, high support. Cups are removable.",
    inStock: true
  },
  {
    id: "p6",
    name: "Ascent Seamless Set",
    category: "Women",
    price: 6900,
    originalPrice: 6900,
    discountPrice: 5900,
    isDiscounted: true,
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=600&auto=format&fit=crop",
    description: "A premium 2-piece seamless activewear set including a matching crop top and leggings. Engineered with flexible, ribbed structures and moisture-wicking technology.",
    fit: "Fitted stretch fit. Sold as a set.",
    inStock: true
  },
  {
    id: "p7",
    name: "SJ Alpha Shaker 700ml",
    category: "Accessories",
    price: 1800,
    originalPrice: 1800,
    discountPrice: null,
    isDiscounted: false,
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=600&auto=format&fit=crop",
    description: "Leak-proof, BPA-free shaker cup with a metallic blending ball. Easy carrying loop and volume measurements on the side. Matte premium finish.",
    fit: "700ml Capacity. BPA free.",
    inStock: true
  },
  {
    id: "p8",
    name: "Pro Training Gym Bag",
    category: "Accessories",
    price: 5500,
    originalPrice: 5500,
    discountPrice: null,
    isDiscounted: false,
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    description: "Heavy-duty gym duffel with a dedicated ventilated shoe compartment, water-resistant base, and multiple zipped pockets. Padded shoulder strap included.",
    fit: "35L Capacity. Water-resistant nylon.",
    inStock: true
  }
];

// Initial default discount codes
const DEFAULT_DISCOUNTS = [
  { code: "SJ10", discountPercent: 10 },
  { code: "RELENTLESS20", discountPercent: 20 },
  { code: "FREESHIP", discountPercent: 0, isFreeShipping: true }
];

// Initialize Data Store in localStorage
function initStore() {
  if (!localStorage.getItem("sj_products")) {
    localStorage.setItem("sj_products", JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem("sj_discounts")) {
    localStorage.setItem("sj_discounts", JSON.stringify(DEFAULT_DISCOUNTS));
  }
  if (!localStorage.getItem("sj_cart")) {
    localStorage.setItem("sj_cart", JSON.stringify([]));
  }
  if (!localStorage.getItem("sj_users")) {
    // Admin is hardcoded here but can be added to user lists
    const defaultUsers = [
      { username: "customer", name: "John Doe", email: "customer@sj.com", password: "customer123", address: "123 Galle Road, Colombo 03", phone: "0771234567" }
    ];
    localStorage.setItem("sj_users", JSON.stringify(defaultUsers));
  }
  if (!localStorage.getItem("sj_orders")) {
    localStorage.setItem("sj_orders", JSON.stringify([]));
  }
}

// RUN INITIALIZATION
initStore();

// --- PRODUCT DATABASE API ---
function getProducts() {
  return JSON.parse(localStorage.getItem("sj_products")) || [];
}

function getProductById(id) {
  const products = getProducts();
  return products.find(p => p.id === id) || null;
}

function saveProducts(products) {
  localStorage.setItem("sj_products", JSON.stringify(products));
}

function addProduct(product) {
  const products = getProducts();
  // Auto generate ID
  product.id = "p_" + Date.now();
  products.push(product);
  saveProducts(products);
  return product;
}

function updateProduct(updatedProduct) {
  let products = getProducts();
  products = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
  saveProducts(products);
}

function deleteProduct(id) {
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  
  // Also clean cart items of deleted product
  let cart = getCart();
  cart = cart.filter(item => item.productId !== id);
  saveCart(cart);
}

// --- CART API ---
function getCart() {
  return JSON.parse(localStorage.getItem("sj_cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("sj_cart", JSON.stringify(cart));
  // Dispatch custom event to notify other scripts that cart updated
  window.dispatchEvent(new Event("sj_cart_updated"));
}

function addToCart(productId, size, quantity = 1) {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.productId === productId && item.size === size);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ productId, size, quantity });
  }

  saveCart(cart);
}

function updateCartQuantity(index, quantity) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart[index].quantity = Math.max(1, quantity);
    saveCart(cart);
  }
}

function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart(cart);
  }
}

function clearCart() {
  saveCart([]);
}

function getCartDetails() {
  const cart = getCart();
  return cart.map((item, index) => {
    const product = getProductById(item.productId);
    return {
      index,
      productId: item.productId,
      name: product ? product.name : "Unknown Item",
      price: product ? (product.isDiscounted ? product.discountPrice : product.price) : 0,
      image: product ? product.image : "assets/placeholder.jpg",
      size: item.size,
      quantity: item.quantity,
      subtotal: (product ? (product.isDiscounted ? product.discountPrice : product.price) : 0) * item.quantity
    };
  });
}

function getCartTotals(promoCode = null) {
  const items = getCartDetails();
  let subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  let discount = 0;
  let isFreeShipping = false;
  
  if (promoCode) {
    const activeDiscounts = getDiscounts();
    const discountObj = activeDiscounts.find(d => d.code.toUpperCase() === promoCode.toUpperCase());
    if (discountObj) {
      if (discountObj.isFreeShipping) {
        isFreeShipping = true;
      } else {
        discount = (subtotal * discountObj.discountPercent) / 100;
      }
    }
  }

  // Delivery: LKR 450 flat rate. Free delivery if subtotal > LKR 10000 or if free shipping code is applied
  let shipping = (subtotal > 10000 || subtotal === 0 || isFreeShipping) ? 0 : 450;
  let total = subtotal - discount + shipping;

  return {
    subtotal,
    discount,
    shipping,
    total,
    isFreeShipping
  };
}

// --- DISCOUNT CODES API ---
function getDiscounts() {
  return JSON.parse(localStorage.getItem("sj_discounts")) || [];
}

function saveDiscounts(discounts) {
  localStorage.setItem("sj_discounts", JSON.stringify(discounts));
}

function addDiscount(code, discountPercent, isFreeShipping = false) {
  const discounts = getDiscounts();
  // Check if exists
  if (discounts.some(d => d.code.toUpperCase() === code.toUpperCase())) {
    return false;
  }
  discounts.push({ code: code.toUpperCase(), discountPercent: Number(discountPercent), isFreeShipping });
  saveDiscounts(discounts);
  return true;
}

function deleteDiscount(code) {
  let discounts = getDiscounts();
  discounts = discounts.filter(d => d.code.toUpperCase() !== code.toUpperCase());
  saveDiscounts(discounts);
}

// --- USER AUTHENTICATION API ---
function getUsers() {
  return JSON.parse(localStorage.getItem("sj_users")) || [];
}

function registerUser(userData) {
  const users = getUsers();
  if (users.some(u => u.username.toLowerCase() === userData.username.toLowerCase())) {
    return { success: false, message: "Username already exists." };
  }
  if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
    return { success: false, message: "Email already registered." };
  }
  users.push(userData);
  localStorage.setItem("sj_users", JSON.stringify(users));
  return { success: true };
}

function loginUser(username, password) {
  // Check if admin login
  if (username === "admin" && password === "admin123") {
    const adminSession = { username: "admin", name: "Administrator", role: "admin" };
    localStorage.setItem("sj_admin_session", JSON.stringify(adminSession));
    return { success: true, role: "admin", user: adminSession };
  }

  const users = getUsers();
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
  
  if (user) {
    localStorage.setItem("sj_current_user", JSON.stringify(user));
    return { success: true, role: "customer", user };
  }
  return { success: false, message: "Invalid username or password." };
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("sj_current_user")) || null;
}

function logoutUser() {
  localStorage.removeItem("sj_current_user");
}

function getAdminSession() {
  return JSON.parse(localStorage.getItem("sj_admin_session")) || null;
}

function logoutAdmin() {
  localStorage.removeItem("sj_admin_session");
}

// --- ORDERS API ---
function getOrders() {
  return JSON.parse(localStorage.getItem("sj_orders")) || [];
}

function saveOrders(orders) {
  localStorage.setItem("sj_orders", JSON.stringify(orders));
}

function createOrder(customerDetails, promoCode = null) {
  const orders = getOrders();
  const cartItems = getCartDetails();
  if (cartItems.length === 0) return null;

  const totals = getCartTotals(promoCode);
  
  const newOrder = {
    orderId: "SJ" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    customer: customerDetails,
    items: cartItems,
    totals: totals,
    promoCode: promoCode || "None",
    status: "Pending" // Pending, Shipped, Delivered, Cancelled
  };

  orders.unshift(newOrder); // Add to beginning
  saveOrders(orders);
  
  // Clear cart on successful order
  clearCart();
  return newOrder;
}

function updateOrderStatus(orderId, newStatus) {
  let orders = getOrders();
  orders = orders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o);
  saveOrders(orders);
}
