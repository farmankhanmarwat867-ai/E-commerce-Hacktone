document.addEventListener("DOMContentLoaded", () => {
  // ============================
  // DARK MODE TOGGLE
  // ============================
  const darkToggle = document.getElementById("darkModeToggle");

  // Apply saved mode on load
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "true") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Toggle dark mode on button click
  darkToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    // Save current mode
    localStorage.setItem(
      "darkMode",
      document.documentElement.classList.contains("dark"),
    );
  });
  // ============================
  // HERO SLIDER
  // ============================
  const slides = document.querySelectorAll("#hero-slider img");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  let currentSlide = 0;

  // function to show a slide
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("hidden", i !== index);
    });
  }

  // initial slide
  showSlide(currentSlide);

  // prev / next buttons
  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  // optional: auto slide every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);

  // =========================
  // LOCAL STORAGE DATA
  // =========================
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const cartBadge = document.getElementById("cartBadge");
  const wishlistBadge = document.getElementById("wishlistBadge");

  function updateBadges() {
    if (cartBadge) cartBadge.textContent = cart.length;
    if (wishlistBadge) wishlistBadge.textContent = wishlist.length;
  }
  updateBadges();

  // =========================
  // PRODUCTS DATA
  // =========================
  const products = [
    {
      id: 1,
      name: "Red Shirt",
      category: "Clothing",
      price: 29,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRaUGIgWFswaGvlYGk3IvaGWzXD8cnX4jxCA&st",
    },
    {
      id: 2,
      name: "Blue Jeans",
      category: "Clothing",
      price: 49,
      image:
        "https://t3.ftcdn.net/jpg/04/83/25/50/360_F_483255019_m1r1ujM8EOkr8PamCHF85tQ0rHG3Fiqz.jpg",
    },
    {
      id: 3,
      name: "Running Shoes",
      category: "Shoes",
      price: 79,
      image:
        "https://aiksow.pk/wp-content/uploads/2023/11/Latest-Imported-Mens-Running-Shoes-available-in-Pakistan-Best-Sports-shoes-Buy-on-Shoppkey-15-scaled.webp",
    },
    {
      id: 4,
      name: "Smart Watch",
      category: "Accessories",
      price: 199,
      image:
        "https://getnow.pk/wp-content/uploads/2024/03/W08-Apple-Smart-Watch.jpg",
    },
    {
      id: 5,
      name: "Sunglasses",
      category: "Accessories",
      price: 59,
      image:
        "https://www.arcadiolifestyle.com/cdn/shop/products/ROVER-Premium-Sunglass-AR-PL344-ARCADIO-842.jpg?v=1696035502",
    },
    {
      id: 6,
      name: "Jacket",
      category: "Clothing",
      price: 129,
      image:
        "https://media.istockphoto.com/id/163208487/photo/male-coat-isolated-on-the-white.jpg?s=612x612&w=0&k=20&c=3Sdq5xnVS2jOYPNXI6JLwAumzyelcP_VgKVW0MVUhwo=",
    },

    {
      id: 7,
      name: "Backpack",
      category: "Accessories",
      price: 89,
      image:
        "https://media.istockphoto.com/id/2167589456/photo/yellow-backpack-opened-isolated-on-white-school-bag-advertisement-design-knapsack-rucksack.jpg?s=612x612&w=0&k=20&c=5B7A5M35ZEcneBbRoLWkIpPcij1HKTdPtkXEm71MMKI=",
    },
    {
      id: 8,
      name: "Sneakers",
      category: "Shoes",
      price: 69,
      image:
        "https://media.istockphoto.com/id/1688015574/photo/white-sneaker-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=gz8bGn7h_eaF4uJGJjdZYYhJDrrigHAygo2Vi8tZjH8=",
    },

    {
      id: 2,
      name: "Smart Watch",
      price: 2500,
      image:
        "https://www.xiaomistore.pk/xiaomi_images/product/images/new_goods/gallery_img/1141_656ef4e2301d8_1701770466.webp",
      description: "Track your fitness and notifications.",
    },
    {
      id: 9,
      name: "Headphones",
      price: 1800,
      image:
        "https://www.action.pk/cdn/shop/files/p9-wireless-bluetooth-headphones-random-colors-5.webp?v=1730371051&width=1920",
      description: "High quality sound with noise cancellation.",
    },
    {
      id: 10,
      name: "Backpack",
      category: "Accessories",
      price: 89,
      image:
        "https://media.istockphoto.com/id/2167589456/photo/yellow-backpack-opened-isolated-on-white-school-bag-advertisement-design-knapsack-rucksack.jpg?s=612x612&w=0&k=20&c=5B7A5M35ZEcneBbRoLWkIpPcij1HKTdPtkXEm71MMKI=",
    },
  ];

  // =========================
  // DOM ELEMENTS
  // =========================
  const productGrid = document.getElementById("productGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const priceSort = document.getElementById("priceSort");
  const pagination = document.getElementById("pagination");

  let currentPage = 1;
  const perPage = 6;

  // =========================
  // RENDER PRODUCTS
  // =========================
  function renderProducts(list) {
    if (!productGrid) return;

    productGrid.innerHTML = "";
    const start = (currentPage - 1) * perPage;
    const items = list.slice(start, start + perPage);

    items.forEach((p) => {
      productGrid.innerHTML += `
        <div class="bg-white rounded-xl shadow p-4 flex flex-col">
          <img src="${p.image}" class="h-40 object-cover rounded mb-2">
          <h4 class="font-semibold">${p.name}</h4>
          <p class="text-blue-600 font-bold">$${p.price}</p>
          <div class="flex gap-2 mt-auto">
            <button onclick="addToCart(${p.id})"
              class="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Add
            </button>
            <button onclick="addToWishlist(${p.id})"
              class="px-3 bg-pink-500 text-white rounded hover:bg-pink-600">
              ❤
            </button>
          </div>
        </div>
      `;
    });

    renderPagination(list.length);
  }

  // =========================
  // PAGINATION
  // =========================
  function renderPagination(total) {
    if (!pagination) return;
    const pages = Math.ceil(total / perPage);
    pagination.innerHTML = "";

    for (let i = 1; i <= pages; i++) {
      pagination.innerHTML += `
        <button onclick="goToPage(${i})"
          class="px-3 py-1 rounded ${currentPage === i ? "bg-blue-600 text-white" : "bg-gray-200"}">
          ${i}
        </button>
      `;
    }
  }

  window.goToPage = (page) => {
    currentPage = page;
    filterProducts();
  };

  // =========================
  // FILTER + SEARCH + SORT
  // =========================
  function filterProducts() {
    let filtered = [...products];

    const search = searchInput?.value.toLowerCase() || "";
    if (search)
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(search));

    if (categoryFilter?.value !== "All")
      filtered = filtered.filter((p) => p.category === categoryFilter.value);

    if (priceSort?.value === "low") filtered.sort((a, b) => a.price - b.price);
    if (priceSort?.value === "high") filtered.sort((a, b) => b.price - a.price);

    renderProducts(filtered);
  }

  searchInput?.addEventListener("input", () => {
    currentPage = 1;
    filterProducts();
  });
  categoryFilter?.addEventListener("change", () => {
    currentPage = 1;
    filterProducts();
  });
  priceSort?.addEventListener("change", () => {
    currentPage = 1;
    filterProducts();
  });

  // =========================
  // CART FUNCTIONS
  // =========================
  window.addToCart = (id) => {
    const product = products.find((p) => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateBadges();
  };

  // =========================
  // WISHLIST FUNCTIONS
  // =========================
  window.addToWishlist = (id) => {
    const product = products.find((p) => p.id === id);
    if (!wishlist.find((p) => p.id === id)) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateBadges();
    }
  };

  // INITIAL LOAD
  filterProducts();
});

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // SIGNUP FUNCTION
  // =========================
  const signupForm = document.getElementById("signupForm");
  const message = document.getElementById("message");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      // Basic validation
      if (!name || !email || !password) {
        message.textContent = "All fields are required!";
        message.classList.remove("text-green-500");
        message.classList.add("text-red-500");
        return;
      }

      // Get existing users
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Check duplicate email
      const existingUser = users.find((u) => u.email === email);

      if (existingUser) {
        message.textContent = "Email already exists!";
        message.classList.remove("text-green-500");
        message.classList.add("text-red-500");
        return;
      }

      // Save new user
      const newUser = { name, email, password };
      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));

      message.textContent = "Signup successful! Redirecting...";
      message.classList.remove("text-red-500");
      message.classList.add("text-green-500");

      // Redirect after 1.5s
      // setTimeout(() => {
      //   window.location.href = "login.html";
      // }, 1500);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // LOGIN FUNCTION
  // =========================
  const loginForm = document.getElementById("loginForm");
  const message = document.getElementById("message");

  // Agar user already login hai → direct home
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // if (currentUser && loginForm) {
  //   window.location.href = "index.html";
  // }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      // Validation
      if (!email || !password) {
        message.textContent = "Please fill all fields!";
        message.classList.remove("text-green-500");
        message.classList.add("text-red-500");
        return;
      }

      // Get users from storage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Find matching user
      const user = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (!user) {
        message.textContent = "Invalid email or password!";
        message.classList.remove("text-green-500");
        message.classList.add("text-red-500");
        return;
      }

      // Save logged-in user
      localStorage.setItem("currentUser", JSON.stringify(user));

      message.textContent = "Login successful! Redirecting...";
      message.classList.remove("text-red-500");
      message.classList.add("text-green-500");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1200);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // PROTECT PAGE (LOGIN REQUIRED)
  // =========================
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  // =========================
  // LOAD CART DATA
  // =========================
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  // =========================
  // RENDER CART
  // =========================
  function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        "<p class='text-gray-500'>Your cart is empty 🛒</p>";
      cartTotal.textContent = "0";
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * (item.qty || 1);

      const div = document.createElement("div");
      div.className =
        "bg-white p-4 rounded-lg shadow flex items-center justify-between";

      div.innerHTML = `
        <div class="flex items-center gap-4">
          <img src="${item.image}" class="w-16 h-16 object-cover rounded">
          <div>
            <h4 class="font-semibold">${item.name}</h4>
            <p class="text-gray-600">₹${item.price}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button class="bg-gray-200 px-2 rounded" onclick="changeQty(${index}, -1)">-</button>
          <span>${item.qty || 1}</span>
          <button class="bg-gray-200 px-2 rounded" onclick="changeQty(${index}, 1)">+</button>
        </div>

        <button class="text-red-500 font-bold" onclick="removeItem(${index})">
          ✕
        </button>
      `;

      cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = total.toFixed(2);
  }

  // =========================
  // CHANGE QUANTITY
  // =========================
  window.changeQty = function (index, amount) {
    cart[index].qty = (cart[index].qty || 1) + amount;

    if (cart[index].qty <= 0) cart[index].qty = 1;

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  // =========================
  // REMOVE ITEM
  // =========================
  window.removeItem = function (index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  // =========================
  // INITIAL LOAD
  // =========================
  renderCart();
});

/* =========================
   STORAGE KEYS
========================= */
const CART_KEY = "swiftshop_cart";
const WISHLIST_KEY = "swiftshop_wishlist";
const USER_KEY = "swiftshop_user";

/* =========================
   HELPERS
========================= */
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getWishlist() {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

/* =========================
   LOGIN PAGE
========================= */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    // dummy auth
    if (email === "admin@gmail.com" && password === "123456") {
      localStorage.setItem(USER_KEY, JSON.stringify({ email }));
      message.style.color = "green";
      message.textContent = "Login successful! Redirecting...";
      setTimeout(() => (window.location.href = "index.html"), 10000);
    } else {
      message.textContent = "Invalid email or password";
    }
  });
}

/* =========================
   CART PAGE
========================= */
const cartContainer = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");

if (cartContainer) renderCart();

function renderCart() {
  const cart = getCart();
  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.className =
      "bg-white p-4 rounded shadow flex justify-between items-center";

    div.innerHTML = `
      <div>
        <h3 class="font-semibold">${item.name}</h3>
        <p class="text-gray-500">₹${item.price}</p>
      </div>
      <button class="bg-red-500 text-white px-3 py-1 rounded remove-btn">
        Remove
      </button>
    `;

    div.querySelector(".remove-btn").addEventListener("click", () => {
      cart.splice(index, 1);
      saveCart(cart);
      renderCart();
    });

    cartContainer.appendChild(div);
  });

  if (cartTotalEl) cartTotalEl.textContent = total;
}

/* =========================
   WISHLIST PAGE
========================= */
const wishlistContainer = document.getElementById("wishlistItems");

if (wishlistContainer) renderWishlist();

function renderWishlist() {
  const wishlist = getWishlist();
  wishlistContainer.innerHTML = "";

  wishlist.forEach((item, index) => {
    const div = document.createElement("div");
    div.className =
      "bg-white p-4 rounded shadow flex justify-between items-center";

    div.innerHTML = `
      <div>
        <h3 class="font-semibold">${item.name}</h3>
        <p class="text-gray-500">₹${item.price}</p>
      </div>
      <button class="bg-red-500 text-white px-3 py-1 rounded remove-wish">
        Remove
      </button>
    `;

    div.querySelector(".remove-wish").addEventListener("click", () => {
      wishlist.splice(index, 1);
      saveWishlist(wishlist);
      renderWishlist();
    });

    wishlistContainer.appendChild(div);
  });
}

/* =========================
   GLOBAL FUNCTIONS
   (USE IN PRODUCTS PAGE)
========================= */
function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  alert("Added to cart");
}

function addToWishlist(product) {
  const list = getWishlist();
  list.push(product);
  saveWishlist(list);
  alert("Added to wishlist");
}

/* =========================
   PRODUCT DETAIL PAGE
========================= */

const productDetailContainer = document.getElementById("productDetail");

if (productDetailContainer) {
  initProductDetail();
}

function initProductDetail() {
  const products = getAllProducts();

  // get id from url ?id=1
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const product = products.find((p) => p.id == id);

  if (!product) {
    productDetailContainer.innerHTML =
      "<p class='text-red-500'>Product not found</p>";
    return;
  }

  renderProductDetail(product);
}

function renderProductDetail(product) {
  productDetailContainer.innerHTML = `
    <div class="flex flex-col md:flex-row gap-6">
      <img src="${product.image}" class="w-full md:w-1/2 rounded-lg" />

      <div class="flex flex-col gap-3">
        <h2 class="text-2xl font-bold">${product.name}</h2>
        <p class="text-gray-600">${product.description}</p>
        <p class="text-xl font-semibold">₹${product.price}</p>

        <div class="flex gap-3 mt-4">
          <button id="addCartBtn" class="bg-blue-500 text-white px-4 py-2 rounded">
            Add to Cart
          </button>
          <button id="addWishBtn" class="bg-pink-500 text-white px-4 py-2 rounded">
            Wishlist
          </button>
        </div>
      </div>
    </div>
  `;

  document
    .getElementById("addCartBtn")
    .addEventListener("click", () => addToCart(product));

  document
    .getElementById("addWishBtn")
    .addEventListener("click", () => addToWishlist(product));
}

/* =========================
   SAMPLE PRODUCTS DATA
   (Replace with API later)
========================= */
function getAllProducts() {
  return [
    {
      id: 1,
      name: "Running Shoes",
      price: 1200,
      image:
        "https://img.drz.lazcdn.com/static/pk/p/18be6e07ee3dd2c3384101a1bbadb722.jpg_720x720q80.jpg",
      description: "Comfortable running shoes for everyday use.",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 2500,
      image:
        "https://www.xiaomistore.pk/xiaomi_images/product/images/new_goods/gallery_img/1141_656ef4e2301d8_1701770466.webp",
      description: "Track your fitness and notifications.",
    },
    {
      id: 3,
      name: "Headphones",
      price: 1800,
      image:
        "https://www.action.pk/cdn/shop/files/p9-wireless-bluetooth-headphones-random-colors-5.webp?v=1730371051&width=1920",
      description: "High quality sound with noise cancellation.",
    },
    {
      id: 4,
      name: "Backpack",
      category: "Accessories",
      price: 89,
      image:
        "https://media.istockphoto.com/id/2167589456/photo/yellow-backpack-opened-isolated-on-white-school-bag-advertisement-design-knapsack-rucksack.jpg?s=612x612&w=0&k=20&c=5B7A5M35ZEcneBbRoLWkIpPcij1HKTdPtkXEm71MMKI=",
    },
    {
      id: 5,
      name: "Sneakers",
      category: "Shoes",
      price: 69,
      image:
        "https://media.istockphoto.com/id/1688015574/photo/white-sneaker-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=gz8bGn7h_eaF4uJGJjdZYYhJDrrigHAygo2Vi8tZjH8=",
    },
  ];
}
