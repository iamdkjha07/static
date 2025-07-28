// Initialize EmailJS
(function() {
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init("hJeTB7dAhXvbk77Fr");
})();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Form validation
function validateForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!firstName) {
        showNotification('Please enter your first name.', 'error');
        return false;
    }
    
    if (!lastName) {
        showNotification('Please enter your last name.', 'error');
        return false;
    }
    
    if (!email) {
        showNotification('Please enter your email address.', 'error');
        return false;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!subject) {
        showNotification('Please enter a subject.', 'error');
        return false;
    }
    
    if (!message) {
        showNotification('Please enter your message.', 'error');
        return false;
    }
    
    if (message.length < 10) {
        showNotification('Please enter a more detailed message (at least 10 characters).', 'error');
        return false;
    }
    
    return true;
}

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form first
    if (!validateForm()) {
        return;
    }
    
    const submitBtn = document.querySelector('.submit-btn');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Get form data
    const templateParams = {
        from_name: document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
        first_name: document.getElementById('firstName').value,
        last_name: document.getElementById('lastName').value,
        from_email: document.getElementById('email').value,
        phone: document.getElementById('phone').value || 'Not provided',
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        newsletter: document.getElementById('newsletter').checked ? 'Yes' : 'No',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };
    
    // Send email using EmailJS
    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
    emailjs.send('service_ri6c2sm', 'template_cqnagsf', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.log('FAILED...', error);
            showNotification('Oops! Something went wrong. Please try again or contact us directly.', 'error');
        })
        .finally(function() {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        });
});

// Show notification function
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    const messageElement = notification.querySelector('.notification-message');
    
    messageElement.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    // Auto hide after 6 seconds
    setTimeout(() => {
        hideNotification();
    }, 6000);
}

// Hide notification function
function hideNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('show');
}

// Close notification manually
document.querySelector('.notification-close').addEventListener('click', hideNotification);

// Add animation to service cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Add loading animation for images (if you add any)
document.addEventListener('DOMContentLoaded', function() {
    // Form focus effects
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

// Prevent form submission if EmailJS is not loaded
window.addEventListener('load', function() {
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS not loaded. Please check your internet connection.');
        showNotification('Unable to load email service. Please check your internet connection and refresh the page.', 'error');
    }
});

// Handle form input changes for better UX
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
    input.addEventListener('input', function() {
        if (this.checkValidity()) {
            this.style.borderColor = '#28a745';
        } else {
            this.style.borderColor = '#e1e5e9';
        }
    });
});
