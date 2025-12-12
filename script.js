document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const SHUFFLE_DURATION = 1500; // 1.5초 동안 섞기
    const DEPLOY_DELAY = 100; // 섞임이 끝나고 흩어지기 전 짧은 딜레이
    
    // 1. 모든 카드에 초기 섞임 클래스 적용
    cards.forEach(card => {
        card.classList.add('initial-shuffle');
    });

    // 2. 섞이는 애니메이션 (setInterval로 0.1초마다 위치를 랜덤하게 변경)
    const shuffleInterval = setInterval(() => {
        cards.forEach(card => {
            // 중앙에서 무작위 위치/회전값 계산 (-25px ~ 25px 범위 내에서 움직임)
            const randomX = (Math.random() - 0.5) * 50; 
            const randomY = (Math.random() - 0.5) * 50; 
            const randomRot = (Math.random() - 0.5) * 30; // -15도 ~ 15도 회전

            // 섞이는 동안은 CSS transition을 무시하고 바로 움직이게 합니다.
            card.style.transition = 'none'; 
            card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRot}deg) scale(1.05)`;
        });
    }, 100); // 0.1초마다 카드 위치 업데이트

    // 3. 섞기 종료 및 카드 펼치기 (1.6초 후에 실행)
    setTimeout(() => {
        clearInterval(shuffleInterval); // 섞기 멈춤

        // 모든 카드의 transition을 다시 복구하여 펼치는 애니메이션이 작동하게 함
        cards.forEach(card => {
            // CSS에 정의된 1초짜리 transition을 다시 활성화
            card.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
            
            // 무작위 transform 제거 -> CSS에 정의된 최종 위치(position: relative)로 이동 시작
            card.style.transform = ''; 
            card.style.opacity = 1; 
            card.classList.remove('initial-shuffle');
            card.style.position = ''; // position: absolute를 제거하여 flow로 돌아가게 함
        });
    }, SHUFFLE_DURATION + DEPLOY_DELAY); // 1600ms 후에 실행

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
