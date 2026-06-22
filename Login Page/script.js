document.getElementById('goToSignup').addEventListener('click', function(e) {
            e.preventDefault();
            switchPage('signupPage');
        });

        document.getElementById('goToLogin').addEventListener('click', function(e) {
            e.preventDefault();
            switchPage('loginPage');
        });

        document.getElementById('forgotPasswordLink').addEventListener('click', function(e) {
            e.preventDefault();
            switchPage('forgotPasswordPage');
            showStep('recoveryMethodStep');
        });

        document.getElementById('backToLoginFromForgot').addEventListener('click', function(e) {
            e.preventDefault();
            switchPage('loginPage');
        });

        function switchPage(pageId) {

            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            setTimeout(() => {
                document.getElementById(pageId).classList.add('active');
            }, 300);
        }

        function setupPasswordToggle(passwordId, toggleId) {
            const passwordInput = document.getElementById(passwordId);
            const toggleButton = document.getElementById(toggleId);
            
            toggleButton.addEventListener('click', function() {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    toggleButton.textContent = 'Hide';
                } else {
                    passwordInput.type = 'password';
                    toggleButton.textContent = 'Show';
                }
            });
        }

        setupPasswordToggle('loginPassword', 'toggleLoginPassword');
        setupPasswordToggle('signupPassword', 'toggleSignupPassword');
        setupPasswordToggle('signupConfirmPassword', 'toggleConfirmPassword');
        setupPasswordToggle('newPassword', 'toggleNewPassword');
        setupPasswordToggle('confirmNewPassword', 'toggleConfirmNewPassword');

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function isValidCnic(cnic) {
            const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
            return cnicRegex.test(cnic);
        }

        function isValidDob(dob) {
            if (!dob) return false;
            
            const birthDate = new Date(dob);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                return age - 1 >= 12;
            }
            
            return age >= 12;
        }

        function isValidPhone(phone) {
            const phoneRegex = /^03\d{9}$/;
            return phoneRegex.test(phone);
        }

        function showError(inputId, errorId, message) {
            document.getElementById(inputId).classList.add('error');
            const errorElement = document.getElementById(errorId);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        function hideError(inputId, errorId) {
            document.getElementById(inputId).classList.remove('error');
            document.getElementById(errorId).style.display = 'none';
        }

        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            validateLoginForm();
        });

        function validateLoginForm() {
            let isValid = true;
            
            const name = document.getElementById('loginName').value;
            if (name.trim() === '') {
                showError('loginName', 'loginNameError', 'Please enter your name');
                isValid = false;
            } else {
                hideError('loginName', 'loginNameError');
            }
            
             const email = document.getElementById('loginEmail').value;
            if (!isValidEmail(email)) {
                showError('loginEmail', 'loginEmailError', 'Please enter a valid email address');
                isValid = false;
            } else {
                hideError('loginEmail', 'loginEmailError');
            }
            
             const password = document.getElementById('loginPassword').value;
            if (password.length < 6) {
                showError('loginPassword', 'loginPasswordError', 'Password must be at least 6 characters');
                isValid = false;
            } else {
                hideError('loginPassword', 'loginPasswordError');
            }
            
            if (isValid) {
                alert('Login successful!');
            }
        }

        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            validateSignupForm();
        });

        function validateSignupForm() {
            let isValid = true;
            
             const name = document.getElementById('signupName').value;
            if (name.trim() === '') {
                showError('signupName', 'signupNameError', 'Please enter your name');
                isValid = false;
            } else {
                hideError('signupName', 'signupNameError');
            }
            
              const cnic = document.getElementById('signupCnic').value;
            if (!isValidCnic(cnic)) {
                showError('signupCnic', 'signupCnicError', 'CNIC must be in format: xxxxx-xxxxxxx-x');
                isValid = false;
            } else {
                hideError('signupCnic', 'signupCnicError');
            }
           
            const dob = document.getElementById('signupDob').value;
            if (!isValidDob(dob)) {
                showError('signupDob', 'signupDobError', 'You must be at least 12 years old to register');
                isValid = false;
            } else {
                hideError('signupDob', 'signupDobError');
            }
            
            const phone = document.getElementById('signupPhone').value;
            if (!isValidPhone(phone)) {
                showError('signupPhone', 'signupPhoneError', 'Phone number must be 11 digits starting with 03');
                isValid = false;
            } else {
                hideError('signupPhone', 'signupPhoneError');
            }
            
            const email = document.getElementById('signupEmail').value;
            if (!isValidEmail(email)) {
                showError('signupEmail', 'signupEmailError', 'Please enter a valid email address');
                isValid = false;
            } else {
                hideError('signupEmail', 'signupEmailError');
            }
            
            const password = document.getElementById('signupPassword').value;
            if (password.length < 6) {
                showError('signupPassword', 'signupPasswordError', 'Password must be at least 6 characters');
                isValid = false;
            } else {
                hideError('signupPassword', 'signupPasswordError');
            }
            
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            if (password !== confirmPassword) {
                showError('signupConfirmPassword', 'signupConfirmPasswordError', 'Passwords do not match');
                isValid = false;
            } else {
                hideError('signupConfirmPassword', 'signupConfirmPasswordError');
            }
            
            if (isValid) {
                alert('Registration successful!');
            }
        }

        function showStep(stepId) {
            document.querySelectorAll('.step').forEach(step => {
                step.classList.remove('active');
            });
            document.getElementById(stepId).classList.add('active');
        }

        document.getElementById('recoverByEmail').addEventListener('click', function() {
            showStep('emailRecoveryStep');
        });

        document.getElementById('recoverByPhone').addEventListener('click', function() {
            document.getElementById('phoneLastDigits').textContent = '****1234';
            document.getElementById('phoneMessage').style.display = 'block';
            showStep('phoneRecoveryStep');
        });

        document.getElementById('backToRecoveryMethod').addEventListener('click', function() {
            showStep('recoveryMethodStep');
        });

        document.getElementById('backToRecoveryMethod2').addEventListener('click', function() {
            showStep('recoveryMethodStep');
        });

        function generateCaptcha() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let captcha = '';
            for (let i = 0; i < 5; i++) {
                captcha += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return captcha;
        }

        document.getElementById('emailCaptchaCode').textContent = generateCaptcha();
        document.getElementById('phoneCaptchaCode').textContent = generateCaptcha();

        document.getElementById('refreshEmailCaptcha').addEventListener('click', function() {
            document.getElementById('emailCaptchaCode').textContent = generateCaptcha();
        });

        document.getElementById('refreshPhoneCaptcha').addEventListener('click', function() {
            document.getElementById('phoneCaptchaCode').textContent = generateCaptcha();
        });

        document.getElementById('verifyEmailCaptcha').addEventListener('click', function() {
            const email = document.getElementById('recoveryEmail').value;
            const captchaInput = document.getElementById('emailCaptcha').value;
            const captchaCode = document.getElementById('emailCaptchaCode').textContent;
            
            let isValid = true;
            
            if (!isValidEmail(email)) {
                showError('recoveryEmail', 'recoveryEmailError', 'Please enter a valid email address');
                isValid = false;
            } else {
                hideError('recoveryEmail', 'recoveryEmailError');
            }
            
            if (captchaInput !== captchaCode) {
                showError('emailCaptcha', 'emailCaptchaError', 'Please enter the correct captcha');
                isValid = false;
            } else {
                hideError('emailCaptcha', 'emailCaptchaError');
            }
            
            if (isValid) {
                showStep('resetPasswordStep');
            }
        });

         document.getElementById('verifyPhoneCaptcha').addEventListener('click', function() {
            const phone = document.getElementById('recoveryPhone').value;
            const captchaInput = document.getElementById('phoneCaptcha').value;
            const captchaCode = document.getElementById('phoneCaptchaCode').textContent;
            
            let isValid = true;
            
            if (!isValidPhone(phone)) {
                showError('recoveryPhone', 'recoveryPhoneError', 'Phone number must be 11 digits starting with 03');
                isValid = false;
            } else {
                hideError('recoveryPhone', 'recoveryPhoneError');
            }
            
            if (captchaInput !== captchaCode) {
                showError('phoneCaptcha', 'phoneCaptchaError', 'Please enter the correct captcha');
                isValid = false;
            } else {
                hideError('phoneCaptcha', 'phoneCaptchaError');
            }
            
            if (isValid) {
                showStep('resetPasswordStep');
            }
        });

        document.getElementById('saveNewPassword').addEventListener('click', function() {
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmNewPassword').value;
            
            let isValid = true;
            
            if (newPassword.length < 6) {
                showError('newPassword', 'newPasswordError', 'Password must be at least 6 characters');
                isValid = false;
            } else {
                hideError('newPassword', 'newPasswordError');
            }
            
            if (newPassword !== confirmPassword) {
                showError('confirmNewPassword', 'confirmNewPasswordError', 'Passwords do not match');
                isValid = false;
            } else {
                hideError('confirmNewPassword', 'confirmNewPasswordError');
            }
            
            if (isValid) {
                showStep('successStep');
            }
        });

        document.getElementById('goToLoginAfterReset').addEventListener('click', function() {
            switchPage('loginPage');
        });

        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('blur', function() {
                const formId = this.closest('form')?.id;
                if (formId === 'loginForm') {
                    validateLoginField(this.id);
                } else if (formId === 'signupForm') {
                    validateSignupField(this.id);
                }
            });
        });

        function validateLoginField(fieldId) {
            switch(fieldId) {
                case 'loginName':
                    const name = document.getElementById('loginName').value;
                    if (name.trim() === '') {
                        showError('loginName', 'loginNameError', 'Please enter your name');
                    } else {
                        hideError('loginName', 'loginNameError');
                    }
                    break;
                case 'loginEmail':
                    const email = document.getElementById('loginEmail').value;
                    if (!isValidEmail(email)) {
                        showError('loginEmail', 'loginEmailError', 'Please enter a valid email address');
                    } else {
                        hideError('loginEmail', 'loginEmailError');
                    }
                    break;
                case 'loginPassword':
                    const password = document.getElementById('loginPassword').value;
                    if (password.length < 6) {
                        showError('loginPassword', 'loginPasswordError', 'Password must be at least 6 characters');
                    } else {
                        hideError('loginPassword', 'loginPasswordError');
                    }
                    break;
            }
        }

        function validateSignupField(fieldId) {
            switch(fieldId) {
                case 'signupName':
                    const name = document.getElementById('signupName').value;
                    if (name.trim() === '') {
                        showError('signupName', 'signupNameError', 'Please enter your name');
                    } else {
                        hideError('signupName', 'signupNameError');
                    }
                    break;
                case 'signupCnic':
                    const cnic = document.getElementById('signupCnic').value;
                    if (!isValidCnic(cnic)) {
                        showError('signupCnic', 'signupCnicError', 'CNIC must be in format: xxxxx-xxxxxxx-x');
                    } else {
                        hideError('signupCnic', 'signupCnicError');
                    }
                    break;
                case 'signupDob':
                    const dob = document.getElementById('signupDob').value;
                    if (!isValidDob(dob)) {
                        showError('signupDob', 'signupDobError', 'You must be at least 12 years old to register');
                    } else {
                        hideError('signupDob', 'signupDobError');
                    }
                    break;
                case 'signupPhone':
                    const phone = document.getElementById('signupPhone').value;
                    if (!isValidPhone(phone)) {
                        showError('signupPhone', 'signupPhoneError', 'Phone number must be 11 digits starting with 03');
                    } else {
                        hideError('signupPhone', 'signupPhoneError');
                    }
                    break;
                case 'signupEmail':
                    const email = document.getElementById('signupEmail').value;
                    if (!isValidEmail(email)) {
                        showError('signupEmail', 'signupEmailError', 'Please enter a valid email address');
                    } else {
                        hideError('signupEmail', 'signupEmailError');
                    }
                    break;
                case 'signupPassword':
                    const password = document.getElementById('signupPassword').value;
                    if (password.length < 6) {
                        showError('signupPassword', 'signupPasswordError', 'Password must be at least 6 characters');
                    } else {
                        hideError('signupPassword', 'signupPasswordError');
                    }
                    break;
                case 'signupConfirmPassword':
                    const confirmPassword = document.getElementById('signupConfirmPassword').value;
                    const originalPassword = document.getElementById('signupPassword').value;
                    if (originalPassword !== confirmPassword) {
                        showError('signupConfirmPassword', 'signupConfirmPasswordError', 'Passwords do not match');
                    } else {
                        hideError('signupConfirmPassword', 'signupConfirmPasswordError');
                    }
                    break;
            }
        }