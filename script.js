document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    
    // 1. 모든 카드에 초기 섞임 클래스 적용
    // 이 클래스가 CSS의 'initial-shuffle' 스타일(중앙 모으기)을 적용합니다.
    cards.forEach(card => {
        card.classList.add('initial-shuffle');
    });

    // 2. 섞임 애니메이션 시작 및 종료 (지연 시간을 500ms로 늘림)
    // 0.5초(500밀리초) 후에 실행됩니다.
    setTimeout(() => {
        cards.forEach(card => {
            // CSS transition이 적용되어 카드가 최종 위치로 이동합니다.
            card.classList.remove('initial-shuffle');
            
            // 초기 위치 설정(initial-shuffle)에서 벗어난 후, 
            // 일반적인 흐름에 맞게 위치 관련 CSS 속성을 정리합니다.
            card.style.position = ''; // CSS 파일의 설정을 따르게 함
            card.style.transform = '';
            card.style.opacity = 1; 
        });
    }, 500); // 👈 지연 시간을 늘렸습니다. (0.5초)

    // 3. 카드 뒤집기 클릭 이벤트 리스너
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // 애니메이션이 진행 중일 때는 클릭을 무시합니다.
            if (!card.classList.contains('initial-shuffle')) {
                card.classList.toggle('is-flipped');
            }
        });
    });
});
