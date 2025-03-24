document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('rankingList');
    let draggedItem = null;

    list.addEventListener('dragstart', (e) => {
        draggedItem = e.target;
        e.target.classList.add('dragging');
        setTimeout(() => e.target.style.visibility = 'hidden', 0);
    });

    list.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
        e.target.style.visibility = 'visible';
    });

    list.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(list, e.clientY);
        if (afterElement) {
            afterElement.parentNode.insertBefore(draggedItem, afterElement);
        } else {
            list.appendChild(draggedItem);
        }
    });

    list.addEventListener('dragenter', (e) => e.preventDefault());

    list.addEventListener('dragleave', (e) => e.preventDefault());

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    document.querySelector('button').addEventListener('click', submitRanking);
});

function submitRanking() {
    const listItems = document.querySelectorAll('#rankingList li');
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<h2>Ranking Results</h2>';

    listItems.forEach((item, index) => {
        resultsDiv.innerHTML += `<p>${index + 1}. ${item.textContent}</p>`;
    });
}
