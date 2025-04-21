document.addEventListener('DOMContentLoaded', () => {
    // Переключение между формой и FAQ
    const switchButtons = document.querySelectorAll('.switch-btn');
    const formContent = document.getElementById('feedback-form');
    const faqContent = document.getElementById('faq-content');
    
    switchButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const content = button.dataset.content;
            formContent.classList.toggle('show', content === 'form');
            faqContent.classList.toggle('show', content === 'faq');
        });
    });

    // Раскрытие/скрытие ответов FAQ
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.toggle-icon');
            
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            icon.textContent = answer.style.display === 'block' ? '▲' : '▼';
        });
    });

    // Валидация формы
    const form = document.getElementById('feedback-form');
    const confirmation = document.getElementById('confirmation');
    const newMessageBtn = document.getElementById('new-message-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        if (validateForm()) {
            form.reset();
            form.classList.remove('show');
            confirmation.classList.remove('hidden');
        }
    });

    newMessageBtn.addEventListener('click', () => {
        confirmation.classList.add('hidden');
        form.classList.add('show');
        document.querySelector('.switch-btn[data-content="form"]').click();
    });

    function validateForm() {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Валидация имени
        const name = document.getElementById('name');
        if (name.value.trim().length < 2) {
            showError(name, 'Имя должно содержать минимум 2 символа');
            isValid = false;
        }

        // Валидация email
        const email = document.getElementById('email');
        if (!emailRegex.test(email.value)) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }

        // Валидация сообщения
        const message = document.getElementById('message');
        if (message.value.trim().length < 10) {
            showError(message, 'Сообщение должно содержать минимум 10 символов');
            isValid = false;
        }

        return isValid;
    }

    function showError(input, message) {
        const error = input.parentElement.querySelector('.error-message');
        error.textContent = message;
        error.style.display = 'block';
        input.style.borderColor = '#ff4444';
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        document.querySelectorAll('input, textarea').forEach(input => {
            input.style.borderColor = '#ddd';
        });
    }
});