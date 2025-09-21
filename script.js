// Sample product data
const products = [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        rating: 4.8,
        reviews: 124,
        featured: true,
        features: ["Noise Cancellation", "30-hour Battery", "Quick Charge", "Premium Sound"]
    },
    {
        id: 2,
        title: "Smart Fitness Watch",
        category: "electronics",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        description: "Advanced fitness tracking with heart rate monitoring and GPS capabilities.",
        rating: 4.6,
        reviews: 89,
        featured: true,
        features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "7-day Battery"]
    },
    {
        id: 3,
        title: "Premium Cotton T-Shirt",
        category: "clothing",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        description: "Soft, comfortable cotton t-shirt perfect for everyday wear.",
        rating: 4.5,
        reviews: 67,
        featured: false,
        features: ["100% Cotton", "Machine Washable", "Multiple Colors", "Comfortable Fit"]
    },
    {
        id: 4,
        title: "Designer Jeans",
        category: "clothing",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
        description: "Classic fit jeans made from premium denim with modern styling.",
        rating: 4.7,
        reviews: 156,
        featured: true,
        features: ["Premium Denim", "Classic Fit", "Durable", "Multiple Sizes"]
    },
    {
        id: 5,
        title: "Indoor Plant Collection",
        category: "home",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        description: "Beautiful collection of easy-care indoor plants to brighten your space.",
        rating: 4.4,
        reviews: 43,
        featured: false,
        features: ["Easy Care", "Air Purifying", "Decorative", "Low Maintenance"]
    },
    {
        id: 6,
        title: "Modern Coffee Maker",
        category: "home",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        description: "Programmable coffee maker with built-in grinder and multiple brewing options.",
        rating: 4.9,
        reviews: 203,
        featured: true,
        features: ["Built-in Grinder", "Programmable", "Multiple Brew Sizes", "Auto Shut-off"]
    },
    {
        id: 7,
        title: "Yoga Mat Pro",
        category: "sports",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        description: "Non-slip yoga mat with excellent grip and cushioning for all yoga practices.",
        rating: 4.6,
        reviews: 78,
        featured: false,
        features: ["Non-slip Surface", "Extra Thick", "Lightweight", "Easy to Clean"]
    },
    {
        id: 8,
        title: "Running Shoes",
        category: "sports",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        description: "Lightweight running shoes with advanced cushioning and breathable material.",
        rating: 4.8,
        reviews: 187,
        featured: true,
        features: ["Lightweight Design", "Advanced Cushioning", "Breathable", "Durable"]
    },
    {
        id: 9,
        title: "Gaming Keyboard",
        category: "electronics",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
        description: "Mechanical gaming keyboard with RGB lighting and programmable keys.",
        rating: 4.7,
        reviews: 95,
        featured: false,
        features: ["Mechanical Switches", "RGB Lighting", "Programmable Keys", "Durable"]
    },
    {
        id: 10,
        title: "Outdoor Camping Tent",
        category: "sports",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=400&h=300&fit=crop",
        description: "Weather-resistant camping tent for 4 people with easy setup.",
        rating: 4.5,
        reviews: 112,
        featured: false,
        features: ["Weather Resistant", "4-Person Capacity", "Easy Setup", "Lightweight"]
    }
];

// Global variables
let filteredProducts = [...products];
let currentFilter = 'all';
let searchTerm = '';

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const featuredProducts = document.getElementById('featuredProducts');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const noProducts = document.getElementById('noProducts');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderProducts();
    renderFeaturedProducts();
    initializeSwiper();
    setupEventListeners();
}

// Event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setActiveFilter(this);
            filterProducts(filter);
        });
    });

    // Search input
    searchInput.addEventListener('input', function() {
        searchTerm = this.value.toLowerCase();
        filterProducts(currentFilter);
    });

    // Modal close
    closeModal.addEventListener('click', closeProductModal);
    
    // Close modal when clicking outside
    productModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeProductModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && productModal.style.display === 'block') {
            closeProductModal();
        }
    });
}

// Filter functionality
function setActiveFilter(activeBtn) {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

function filterProducts(filter) {
    currentFilter = filter;
    
    filteredProducts = products.filter(product => {
        const matchesFilter = filter === 'all' || product.category === filter;
        const matchesSearch = product.title.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm) ||
                            product.category.toLowerCase().includes(searchTerm);
        return matchesFilter && matchesSearch;
    });

    renderProducts();
}

// Render products
function renderProducts() {
    if (filteredProducts.length === 0) {
        productsGrid.style.display = 'none';
        noProducts.style.display = 'block';
        return;
    }

    productsGrid.style.display = 'grid';
    noProducts.style.display = 'none';

    productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    
    return `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                </div>
                <div class="product-price">$${product.price}</div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); openProductModal(${product.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Featured products
function renderFeaturedProducts() {
    const featured = products.filter(product => product.featured);
    featuredProducts.innerHTML = featured.map(product => createFeaturedCard(product)).join('');
}

function createFeaturedCard(product) {
    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    
    return `
        <div class="swiper-slide">
            <div class="product-card" onclick="openProductModal(${product.id})">
                <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                    </div>
                    <div class="product-price">$${product.price}</div>
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize Swiper
function initializeSwiper() {
    new Swiper('.featured-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
}

// Modal functionality
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    const featuresList = product.features.map(feature => `<li>${feature}</li>`).join('');

    modalBody.innerHTML = `
        <div class="modal-product">
            <img src="${product.image}" alt="${product.title}" class="modal-image">
            <div class="modal-info">
                <h2>${product.title}</h2>
                <div class="product-category">${product.category}</div>
                <div class="modal-price">$${product.price}</div>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                </div>
                <p class="modal-description">${product.description}</p>
                <ul class="modal-features">
                    ${featuresList}
                </ul>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="closeProductModal()">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        </div>
    `;

    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    productModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cart functionality (basic implementation)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Simple cart implementation - in a real app, this would be more sophisticated
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show success message
    showNotification(`${product.title} added to cart!`, 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scrolling
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', setupLazyLoading);

// Search debouncing
let searchTimeout;
searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchTerm = this.value.toLowerCase();
        filterProducts(currentFilter);
    }, 300);
});

// Add loading state
function showLoading() {
    productsGrid.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

// Performance optimization: Throttle scroll events
let ticking = false;
function updateScrollEffects() {
    // Add any scroll-based effects here
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Export functions for global access
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.addToCart = addToCart;
window.scrollToProducts = scrollToProducts;
