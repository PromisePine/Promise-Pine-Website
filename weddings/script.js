document.addEventListener('DOMContentLoaded', function() {
    // Handle special offer button click
    const specialOfferBtn = document.querySelector('a[href="#contact"]');
    if (specialOfferBtn && specialOfferBtn.textContent.includes('Book This Special Offer')) {
        specialOfferBtn.addEventListener('click', function(e) {
            const messageField = document.querySelector('textarea[name="message"]');
            if (messageField) {
                messageField.value = "I'm interested in the Last Minute Fall and Winter Weddings special offer! Could you please send me more information?";
                // Smooth scroll to the contact form
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    function highlightNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Reviews Read More/Less functionality
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reviewCard = this.closest('.review-card');
            reviewCard.classList.toggle('expanded');
            
            if (reviewCard.classList.contains('expanded')) {
                this.textContent = 'Read Less';
            } else {
                this.textContent = 'Read More';
            }
        });
    });
});
