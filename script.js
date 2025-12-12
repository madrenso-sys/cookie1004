document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const SHUFFLE_DURATION = 1500; // 시각적 섞임 시간 (1.5초)
    const DEPLOY_DELAY = 100; // 흩어지기 전 딜레이
    
    // 뒷면 이미지 경로 리스트 (8개)
    const backImages = [
        'images/back_photo_1.png', 'images/back_photo_2.png',
        'images/back_photo_3.png', 'images/back_photo_4.png',
        'images/back_photo_5.png', 'images/back_photo_6.png',
        'images/back_photo_7.png', 'images/back_photo_8.png'
    ];

    // 배열 섞기 함수 (논리적 섞임)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // 1. 논리적 섞임: 뒷면 이미지 순서를 무작위로 섞어 카드에 배치
    shuffleArray(backImages);
    cards.forEach((card, index) => {
        const backFace = card.querySelector('.card-back');
        backFace.style.backgroundImage = `url('${backImages[index]}')`;
    });
    
    // --- 2. 시각적 섞임 애니메이션 ---
    
    // 모든 카드에 초기 섞임 클래스 적용 (중앙 모으기)
    cards.forEach(card => {
        card.classList.add('initial-shuffle');
    });

    // 시각적 섞이는 애니메이션 (0.1초마다 위치를 랜덤하게 변경)
    const shuffleInterval = setInterval(() => {
        cards.forEach(card => {
            const randomX = (Math.random() - 0.5) * 50; 
            const randomY = (Math.random() - 0.5) * 50; 
            const randomRot = (Math.random() - 0.5) * 30; 

            // 섞이는 동안은 CSS transition을 무시하고 바로 움직이게 합니다.
            card.style.transition = 'none'; 
            card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRot}deg) scale(1.05)`;
        });
    }, 100); 

    // 3. 섞기 종료 및 카드 펼치기 (1.6초 후에 실행)
    setTimeout(() => {
        clearInterval(shuffleInterval); // 시각적 섞기 멈춤

        cards.forEach(card => {
            // CSS에 정의된 흩어지는 transition을 다시 활성화
            card.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
            
            // 무작위 transform 제거 -> CSS에 정의된 최종 위치로 이동 시작
            card.style.transform = ''; 
            card.style.opacity = 1; 
            card.classList.remove('initial-shuffle');
            card.style.position = ''; 
        });
    }, SHUFFLE_DURATION + DEPLOY_DELAY); 

    // 4. 카드 뒤집기 클릭 이벤트 리스너
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // 섞이는 동안 (initial-shuffle 클래스가 있을 때) 클릭 무시
            if (card.classList.contains('initial-shuffle')) {
                return; 
            }
            card.classList.toggle('is-flipped');
        });
    });
});
