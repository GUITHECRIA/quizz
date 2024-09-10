document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: 'Qual é o prato mais famoso da Espanha?',
            options: ['Paella', 'Tacos', 'Sushi', 'Pizza'],
            answer: 'Paella'
        },
        {
            question: 'Qual é o festival em que as pessoas jogam tomates umas nas outras?',
            options: ['La Tomatina', 'Carnaval', 'San Fermín', 'Feria de Abril'],
            answer: 'La Tomatina'
        },
        {
            question: 'Qual dança é tradicional na Espanha?',
            options: ['Samba', 'Tango', 'Flamenco', 'Polka'],
            answer: 'Flamenco'
        },
        {
            question: 'Qual é a principal característica da Paella?',
            options: ['Feita com batatas', 'Sopa fria', 'Mistura de arroz com frutos do mar', 'Doce frito'],
            answer: 'Mistura de arroz com frutos do mar'
        },
        {
            question: 'Qual é a bebida popular servida com Churros?',
            options: ['Vinho', 'Cerveja', 'Chocolate quente', 'Café'],
            answer: 'Chocolate quente'
        },
        {
            question: 'Qual é a região da Espanha conhecida pelo Flamenco?',
            options: ['Catalunha', 'Andaluzia', 'Galícia', 'Valência'],
            answer: 'Andaluzia'
        },
        {
            question: 'Qual é o nome do doce frito servido com chocolate quente?',
            options: ['Empanada', 'Tortilla', 'Churros', 'Flan'],
            answer: 'Churros'
        },
        {
            question: 'Qual é a capital da Espanha?',
            options: ['Barcelona', 'Valência', 'Madri', 'Bilbao'],
            answer: 'Madri'
        },
        {
            question: 'Qual prato é uma omelete feita com batatas e cebolas?',
            options: ['Paella', 'Gazpacho', 'Tortilla Española', 'Churros'],
            answer: 'Tortilla Española'
        },
        {
            question: 'Qual é o estilo de música e dança que se originou na Andaluzia?',
            options: ['Salsa', 'Flamenco', 'Merengue', 'Bachata'],
            answer: 'Flamenco'
        }
    ];

    const startButton = document.getElementById('start-quiz');
    const quizModal = document.getElementById('quiz-modal');
    const closeButton = document.querySelector('.close-btn');
    const quizContainer = document.getElementById('quiz-container');
    const nextButton = document.getElementById('next-question');
    const resultContainer = document.getElementById('result');
    const tomatoVideo = document.getElementById('tomatoVideo');

    let currentQuestionIndex = 0;
    let score = 0;

    startButton.addEventListener('click', () => {
        quizModal.style.display = 'block';
        startButton.classList.add('hidden');
        createEmojiRain();
        showQuestion(currentQuestionIndex);

  
    
        // Scroll automático para o topo da página
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Adiciona um efeito de rolagem suave
        });
    });
    

    closeButton.addEventListener('click', () => {
        quizModal.style.display = 'none';
        startButton.classList.remove('hidden');
        resetQuiz();
    });

    nextButton.addEventListener('click', () => {
        const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
        if (selectedOption) {
            const isCorrect = selectedOption.value === quizData[currentQuestionIndex].answer;
            handleAnswer(isCorrect);
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                setTimeout(() => {
                    showQuestion(currentQuestionIndex);
                }, 1000); // Espera 1 segundo para a animação
            } else {
                quizContainer.style.display = 'none';
                nextButton.classList.add('hidden');
                displayResult();
            }
        } else {
            alert('Por favor, selecione uma opção.');
        }
    });

    function showQuestion(index) {
        quizContainer.innerHTML = `
            <div class="quiz-question animate__animated animate__fadeIn">
                <h3>${quizData[index].question}</h3>
                <ul class="quiz-options">
                    ${quizData[index].options.map((option, i) => `
                        <li>
                            <label>
                                <input type="radio" name="question${index}" value="${option}">
                                ${option}
                            </label>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        quizContainer.style.display = 'block';
        nextButton.classList.remove('hidden');
    }

    function handleAnswer(isCorrect) {
        const coverAnimation = document.createElement('div');
        coverAnimation.classList.add('cover-animation');
        document.querySelector('.modal-content').appendChild(coverAnimation);
    
        if (isCorrect) {
            score++;
            createCoverAnimation(coverAnimation, 'emoji', '✅', 100);
        } else {
            createCoverAnimation(coverAnimation, 'x', '❌', 100);
            showTomatoExplosion(); // Mostra o vídeo de explosão do tomate se a resposta estiver errada
        }
    
        setTimeout(() => {
            coverAnimation.remove();
        }, 4000);
    }
    
    
    function showTomatoExplosion() {
        const tomatoVideo = document.getElementById('tomatoVideo');
        tomatoVideo.style.display = 'block';
        tomatoVideo.play(); // Inicia a reprodução do vídeo e do áudio
    
        setTimeout(() => {
            tomatoVideo.style.display = 'none';
            tomatoVideo.pause();
            tomatoVideo.currentTime = 0; // Reinicia o vídeo para a próxima vez
        }, 1000); // Mostra o vídeo por 1 segundo
    }
    
    
    

    function createCoverAnimation(container, type, icon, count) {
        for (let i = 0; i < count; i++) { // Ajuste a quantidade de emojis criados
            const element = document.createElement('div');
            element.classList.add(type);
            element.innerHTML = icon;
            element.style.left = `${Math.random() * 100}vw`;
            element.style.top = `${Math.random() * 100}vh`;
            element.style.animationDuration = `${Math.random() * 2 + 1}s`;
            container.appendChild(element);
        }
    }

    function createEmojiRain() {
        const emojiList = ['🌮', '💃', '🍷', '🎸', '🎊', '🐂'];
        for (let i = 0; i < 50; i++) {
            const emoji = document.createElement('div');
            emoji.classList.add('emoji');
            emoji.innerHTML = emojiList[Math.floor(Math.random() * emojiList.length)];
            emoji.style.position = 'absolute';
            emoji.style.left = `${Math.random() * 100}vw`;
            emoji.style.top = `${Math.random() * 100}vh`;
            emoji.style.animationDuration = `${Math.random() * 2 + 3}s`;
            emoji.style.zIndex = '1'; // Z-index menor para ficar atrás do modal
            document.body.appendChild(emoji);
        }
    }

    function displayResult() {
        let resultMessage;
        if (score === 0) {
            resultMessage = 'Você acertou 0 perguntas. Oops! Parece que você realmente não conhece nada sobre a Espanha. 😅';
        } else if (score <= 4) {
            resultMessage = `Você acertou ${score} perguntas. Hmmm, eu acho que cabe mais! 🤔`;
        } else if (score <= 6) {
            resultMessage = `Você acertou ${score} perguntas. Bom trabalho! Mas ainda há espaço para melhorar. 👍`;
        } else {
            resultMessage = `Você acertou ${score} perguntas! Excelente! Você é um verdadeiro especialista em Espanha! 🎉`;
        }
        resultContainer.textContent = resultMessage;
        resultContainer.classList.add('animate__animated', 'animate__fadeIn');
         // Reproduzir o som do sino
    const bellSound = document.getElementById('bellSound');
    bellSound.play();
    }

    function resetQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizContainer.innerHTML = '';
        resultContainer.textContent = '';
        nextButton.classList.add('hidden');
        const emojis = document.querySelectorAll('.emoji');
        emojis.forEach(emoji => emoji.remove());
    }
});


// Exemplo de uso:
function checkAnswer(isCorrect) {
    if (!isCorrect) {
        showTomatoExplosion();
    }
}

// Exemplo de chamada
checkAnswer(false); // Chamado quando a resposta está errada
