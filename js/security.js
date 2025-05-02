// Основная функция для очистки HTML
const security = {
    // Экранирование специальных символов
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    },

    // Проверка на наличие вредоносного кода
    hasXSS(input) {
        const dangerous = [
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            /javascript:/gi,
            /onerror=/gi,
            /onclick=/gi,
            /onload=/gi,
            /onmouseover=/gi
        ];
        return dangerous.some(pattern => pattern.test(input));
    },

    // Безопасная вставка текста
    safeInsertText(element, text) {
        if (element) {
            element.textContent = this.escapeHtml(text);
        }
    },

    // Безопасная вставка HTML с использованием DOMPurify
    safeInsertHTML(element, html) {
        if (eвlement) {
            element.innerHTML = DOMPurify.sanitize(html, {
                ALLOWED_TAGS: ['p', 'br', 'b', 'i', 'em', 'strong', 'a'],
                ALLOWED_ATTR: ['href']
            });
        }
    },

    // Валидация URL
    sanitizeUrl(url) {
        if (!url) return '#';
        return encodeURIComponent(url.replace(/javascript:/gi, ''));
    },

    // Безопасная обработка пользовательского ввода
    sanitizeInput(input) {
        if (this.hasXSS(input)) {
            console.warn('Обнаружен потенциально опасный ввод');
            return '';
        }
        return this.escapeHtml(input);
    }
};
