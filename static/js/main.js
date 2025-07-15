
        // Funcionalidade do modo escuro eclaro
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const themeNotification = document.getElementById('themeNotification');
        const themeMessage = document.getElementById('themeMessage');
        const body = document.body;

        // Verificar tema salvo
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.add(savedTheme);
            updateThemeIcon(savedTheme === 'light-mode');
        }

        // Função para alternar entre temas
        themeToggle.addEventListener('click', () => {
            const isLightMode = body.classList.contains('light-mode');
            
            if (isLightMode) {
                body.classList.remove('light-mode');
                updateThemeIcon(false);
                showNotification('Modo escuro ativado');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                body.classList.add('light-mode');
                updateThemeIcon(true);
                showNotification('Modo claro ativado');
                localStorage.setItem('theme', 'light-mode');
            }
        });

        // Função para trocar o ícone do tema
        function updateThemeIcon(isLightMode) {
            themeIcon.textContent = isLightMode ? '☀️' : '🌙';
        }

        // Função para mostrar notificação de troca
        function showNotification(message) {
            themeMessage.textContent = message;
            themeNotification.classList.add('show');
            
            setTimeout(() => {
                themeNotification.classList.remove('show');
            }, 2000);
        }

        // Adicionar cards quando aparecem na tela
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observar todos os cards
        document.querySelectorAll('.content-card').forEach(card => {
            observer.observe(card);
        });

        // Efeito hover nos cards de categoria
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.05)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Scroll suave no cabeçalho
        let lastScrollTop = 0;
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
