addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('search');
    if (search) {
        search.addEventListener('input', () => {
            const query = search.value.toLowerCase();
            document.querySelectorAll('.item').forEach(item => {
                item.style.display = item.textContent.toLowerCase().includes(query) ? 'block' : 'none';
            });
        });
    }
});