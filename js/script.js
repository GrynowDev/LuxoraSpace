document.addEventListener('DOMContentLoaded', function () {

    // Old Navbar Scroll Effect Removed - Now handled by nav_scroll logic at bottom

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                const navbarCollapse = document.getElementById('navbarNavDropdown');
                if (navbarCollapse) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        });
    });

    // Form Submission Handler
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simulate API call/processing
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Your request has been received. We will contact you shortly.');
                btn.innerHTML = 'Sent Successfully';
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-success');
                bookingForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.classList.add('btn-primary');
                    btn.classList.remove('btn-success');

                    // Close modal
                    const modalEl = document.getElementById('contactModal');
                    const modal = bootstrap.Modal.getInstance(modalEl);
                    modal.hide();
                }, 2000);
            }, 1500);
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up'); // Ensure you have this class in CSS if you want this
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize Swiper for Video Section
    // Initialize Swiper for Video Section
    const videoSwiper = new Swiper('.video-swiper', {
        slidesPerView: 1.2,
        spaceBetween: 15,
        centeredSlides: false,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2.2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3.2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 4.5,
                spaceBetween: 25,
            },
        },
    });

    document.querySelectorAll('.service-card, .hover-card').forEach(el => {
        // observer.observe(el); // Optional: enable if you add animation classes
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('vidzy-navbar');

    function handleScroll() {
        if (window.scrollY > 50) {
            nav.classList.add('navbar-scrolled');
        } else {
            nav.classList.remove('navbar-scrolled');
        }
    }

    // Initial check
    handleScroll();

    // Listener
    window.addEventListener('scroll', handleScroll);
});
// Timed Popup Modal Logic
setTimeout(function () {
    const popupModalEl = document.getElementById('timedPopupModal');
    // Only show if it exists and hasn't been shown yet (sessionStorage could be used here)
    if (popupModalEl && !sessionStorage.getItem('interiroPopupShown')) {
        const popupModal = new bootstrap.Modal(popupModalEl);
        popupModal.show();
        sessionStorage.setItem('interiroPopupShown', 'true');
    }
}, 5000); // 5000ms = 5 seconds

// Add submit handler for popup form just to dismiss it
const popupForm = document.getElementById('popupForm');
if (popupForm) {
    popupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            const modalEl = document.getElementById('timedPopupModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();
            alert('Thank you! We will get back to you shortly.');
            btn.innerText = originalText;
            btn.disabled = false;
            this.reset();
        }, 1000);
    });
}

