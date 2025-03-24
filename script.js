document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('rankingList');
    let draggedItem = null;

    // Function to handle the starting of dragging
    function handleDragStart(e) {
        draggedItem = e.target;
        e.target.classList.add('dragging');
        setTimeout(() => e.target.style.visibility = 'hidden', 0);
    }

    // Function to handle the ending of dragging
    function handleDragEnd(e) {
        if (draggedItem) {
            draggedItem.classList.remove('dragging');
            draggedItem.style.visibility = 'visible';
            draggedItem = null;
        }
    }

    // Function to handle sorting while dragging
    function handleDragOver(e) {
        e.preventDefault();
        const afterElement = getDragAfterElement(list, e.clientY || e.touches[0].clientY);
        if (afterElement) {
            afterElement.parentNode.insertBefore(draggedItem, afterElement);
        } else if (draggedItem) {
            list.appendChild(draggedItem);
        }
    }

    // Attach events for desktop
    list.addEventListener('dragstart', handleDragStart);
    list.addEventListener('dragend', handleDragEnd);
    list.addEventListener('dragover', handleDragOver);

    // Attach events for mobile
    list.addEventListener('touchstart', handleDragStart, {passive: true});
    list.addEventListener('touchmove', handleDragOver, {passive: false});
    list.addEventListener('touchend', handleDragEnd);

    // Function to determine where to insert the dragged item
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

    // Function to handle submission and display results
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
