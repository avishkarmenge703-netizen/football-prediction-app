// Simple form submission and animations

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const signupForm = document.getElementById('signup-form');
    const successMessage = document.getElementById('success-message');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            
            // Simple validation
            if (!name || !email) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual Formspree or other service)
            setTimeout(() => {
                // Show success message
                if (successMessage) {
                    successMessage.style.display = 'block';
                    this.style.display = 'none';
                    
                    // You can save to localStorage to remember the signup
                    localStorage.setItem('waitlistSignedUp', 'true');
                    
                    // Send data to Formspree (uncomment and set up)
                    // fetch(this.action, {
                    //     method: 'POST',
                    //     body: formData,
                    //     headers: {
                    //         'Accept': 'application/json'
                    //     }
                    // }).then(response => {
                    //     if (response.ok) {
                    //         successMessage.style.display = 'block';
                    //         this.style.display = 'none';
                    //     } else {
                    //         alert('Something went wrong. Please try again.');
                    //     }
                    // });
                }
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.feature-card, .step, .waitlist-card').forEach(el => {
        observer.observe(el);
    });
    
    // Update stats counter (example)
    const statNumber = document.querySelector('.stat-number');
    if (statNumber && statNumber.textContent.includes('+')) {
        // You could animate the number here
        animateCounter(statNumber, 0, 250, 2000);
    }
});

// Counter animation function
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
