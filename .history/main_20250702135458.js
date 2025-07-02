        // Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const mobileNavLinks = document.querySelectorAll('.mobile-menu .nav-links a');

        function toggleMobileMenu() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        }

        function closeMobileMenu() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        hamburger.addEventListener('click', toggleMobileMenu);
        mobileOverlay.addEventListener('click', closeMobileMenu);

        // Close mobile menu when clicking nav links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });

        // Form Validation
        const ctaForm = document.getElementById('ctaForm');
        const emailInput = document.getElementById('emailInput');
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');
        const submitBtn = document.getElementById('submitBtn');

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function showError(message) {
            emailInput.classList.add('error');
            emailInput.classList.remove('success');
            errorMessage.textContent = message;
            errorMessage.classList.add('show');
            successMessage.classList.remove('show');
        }

        function showSuccess(message) {
            emailInput.classList.add('success');
            emailInput.classList.remove('error');
            successMessage.textContent = message;
            successMessage.classList.add('show');
            errorMessage.classList.remove('show');
        }

        function clearMessages() {
            emailInput.classList.remove('error', 'success');
            errorMessage.classList.remove('show');
            successMessage.classList.remove('show');
        }

        // Real-time validation
        emailInput.addEventListener('input', () => {
            const email = emailInput.value.trim();
            
            if (email === '') {
                clearMessages();
            } else if (!validateEmail(email)) {
                showError('Please enter a valid email address');
            } else {
                showSuccess('Email looks good!');
            }
        });

        // Form submission
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (email === '') {
                showError('Email address is required');
                emailInput.focus();
                return;
            }
            
            if (!validateEmail(email)) {
                showError('Please enter a valid email address');
                emailInput.focus();
                return;
            }

            // Simulate form submission
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showSuccess('Thank you! We\'ll be in touch soon.');
                emailInput.value = '';
                submitBtn.textContent = 'Get Started For Free';
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    clearMessages();
                }, 3000);
            }, 1500);
        });

        // Clear validation on focus
        emailInput.addEventListener('focus', () => {
            if (emailInput.value.trim() === '') {
                clearMessages();
            }
        });
    </script>