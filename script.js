document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const container = document.querySelector('.card-container');
    const containerRect = container.getBoundingClientRect();
    
    // 1. 모든 카드에 초기 섞임 클래스 적용
    cards.forEach(card => {
        card.classList.add('initial-shuffle');
    });

    // 2. 0.1초 후 섞임 애니메이션 시작
    setTimeout(() => {
        // 'initial-shuffle' 클래스를 제거하여 CSS에 정의된 최종 위치로 이동시킵니다.
        cards.forEach(card => {
             // 'initial-shuffle' 클래스를 제거하기 전에, transform 속성을 제거하여 최종 위치로 자연스럽게 이동시킵니다.
            card.style.transform = '';
            card.classList.remove('initial-shuffle');
            card.style.position = 'relative'; // 최종 위치로 이동 후 position을 relative로 변경
            card.style.opacity = 1; 
        });
    }, 100); 

    // 3. 카드 뒤집기 클릭 이벤트 리스너
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // 초기 섞임 애니메이션이 끝난 후에만 뒤집기 허용
            if (!card.classList.contains('initial-shuffle')) {
                card.classList.toggle('is-flipped');
            }
        });
    });
});
