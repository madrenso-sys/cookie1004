document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    
    // 1. 모든 카드에 초기 섞임 클래스 적용
    cards.forEach(card => {
        card.classList.add('initial-shuffle');
    });

    // 2. 섞임 애니메이션 시작 및 종료 (지연 시간을 1초로 설정)
    setTimeout(() => {
        cards.forEach(card => {
            // 이 클래스를 제거하면 CSS transition이 발동되어 카드가 펼쳐집니다.
            card.classList.remove('initial-shuffle');
            // position과 transform 속성 제거하여 CSS의 최종 위치로 이동하도록 함
            card.style.position = ''; 
            card.style.transform = '';
            card.style.opacity = 1; // 1초 동안 서서히 나타나게 함
        });
    }, 1000); // 👈 지연 시간을 1.0초로 늘렸습니다.

    // 3. 카드 뒤집기 클릭 이벤트 리스너
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // 애니메이션이 끝나야 뒤집을 수 있도록 합니다.
            if (!card.classList.contains('initial-shuffle')) {
                card.classList.toggle('is-flipped');
            }
        });
    });
});
