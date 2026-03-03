// Promise Pine - Shared Navigation Component
// This file is used across all pages for consistent navigation

document.addEventListener('DOMContentLoaded', function() {
    // Get the current page from the URL to highlight the active link
    const currentPath = window.location.pathname;
    let activePage = 'home';
    
    if (currentPath.includes('/about')) activePage = 'about';
    else if (currentPath.includes('/weddings')) activePage = 'weddings';
    else if (currentPath.includes('/drone')) activePage = 'drone';
    else if (currentPath.includes('/promos')) activePage = 'promos';
    else if (currentPath.includes('/contact')) activePage = 'contact';
    else if (currentPath === '/' || currentPath === '/index.html') activePage = 'home';
    
    // Function to get the correct logo path based on current page location
    function getLogoPath() {
        if (currentPath === '/' || currentPath === '/index.html') return 'PP Logo.png';
        else return '../PP Logo.png';
    }
    
    // Navigation HTML
    const navigationHTML = `
        <!-- Contact Info Bar -->
        <div class="contact-info-bar">
            <div class="contact-info-item">
                <a href="tel:7193321001">
                    <span class="contact-full"><i class="fas fa-phone"></i> (719) 332-1001</span>
                    <span class="contact-short"><i class="fas fa-phone"></i> Call</span>
                </a>
            </div>
            <div class="contact-info-item">
                <a href="mailto:matthew@promisepine.com">
                    <span class="contact-full"><i class="fas fa-envelope"></i> matthew@promisepine.com</span>
                    <span class="contact-short"><i class="fas fa-envelope"></i> Email</span>
                </a>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="main-nav">
            <div class="nav-toggle" id="navToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul class="nav-links" id="navLinks">
                <li><a href="/" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a></li>
                <li><a href="/about/" class="nav-link ${activePage === 'about' ? 'active' : ''}">About</a></li>
                <li><a href="/weddings/" class="nav-link ${activePage === 'weddings' ? 'active' : ''}">Weddings</a></li>
                <li><a href="/drone/" class="nav-link ${activePage === 'drone' ? 'active' : ''}">Drone</a></li>
                <li><a href="/promos/" class="nav-link ${activePage === 'promos' ? 'active' : ''}">Promos</a></li>
                <li><a href="/contact/" class="nav-link ${activePage === 'contact' ? 'active' : ''}">Contact</a></li>
            </ul>
            <div class="nav-logo">
                <img src="${getLogoPath()}" alt="Promise Pine Logo">
            </div>
        </nav>
    `;
    
    // Insert navigation into the page
    const placeholder = document.getElementById('navigation-placeholder');
    if (placeholder) {
        placeholder.innerHTML = navigationHTML;
        
        // Initialize mobile navigation toggle after inserting HTML
        initializeMobileNav();
    }
    
    // Mobile navigation toggle functionality
    function initializeMobileNav() {
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navLinks.classList.toggle('active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.main-nav')) {
                    navLinks.classList.remove('active');
                }
            });
            
            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });
        }
    }
});
