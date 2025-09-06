document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clientCards = document.querySelectorAll('.client-card');
    
    let activeFilter = 'all';

    function filterClients() {
        const searchText = searchInput.value.toLowerCase();
    
        const cardsArray = Array.from(clientCards);
    
        if (activeFilter === 'all') {
            cardsArray.sort((a, b) => {
                const aPriority = parseInt(a.getAttribute('data-priority') || 999);
                const bPriority = parseInt(b.getAttribute('data-priority') || 999);
                return aPriority - bPriority;
            });
        }
        
        const clientsGrid = document.querySelector('.clients-grid');
        clientsGrid.innerHTML = '';
        
        cardsArray.forEach(card => {
            const title = card.querySelector('.client-title').textContent.toLowerCase();
            const description = card.querySelector('.client-description').textContent.toLowerCase();
            const platforms = Array.from(card.querySelectorAll('.platform-tag')).map(tag => tag.textContent.toLowerCase());
            const protocols = Array.from(card.querySelectorAll('.protocol-tag')).map(tag => tag.textContent.toLowerCase());
            const cardProtocols = card.getAttribute('data-protocols').split(',');
            
            const matchesSearch = searchText === '' || 
                title.includes(searchText) || 
                description.includes(searchText) ||
                platforms.some(os => os.includes(searchText)) ||
                protocols.some(proto => proto.includes(searchText));
            
            const matchesFilter = activeFilter === 'all' || 
                cardProtocols.includes(activeFilter);
            
            if (matchesSearch && matchesFilter) {
                clientsGrid.appendChild(card);
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
                clientsGrid.appendChild(card);
            }
        });
        
        const visibleCards = cardsArray.filter(card => card.style.display !== 'none');
        if (visibleCards.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = '<i class="fas fa-search fa-2x"></i><h3>Ничего не найдено</h3><p>Попробуйте изменить параметры поиска</p>';
            clientsGrid.appendChild(noResults);
        }
    }
    
    searchInput.addEventListener('input', filterClients);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const protocol = this.getAttribute('data-protocol');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            activeFilter = protocol;
            filterClients();
        });
    });
    
    filterClients();
});