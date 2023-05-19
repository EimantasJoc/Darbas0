var draggedItem = null;
var container = document.querySelector('.container');
var rows = document.querySelectorAll('row');

var savedState = localStorage.getItem('vip_list');
if (savedState) {
    container.innerHTML = savedState;
}

rows.forEach(function (row) {
    row.addEventListener('dragstart', function (event) {
    draggedItem = row;
    event.dataTransfer.setData('text/plain', null);
});

row.addEventListener('dragover', function (event) {
    event.preventDefault();
});

document.addEventListener('drop', function (event) {
    event.preventDefault();
    var currentIndex = Array.from(rows).indexOf(row);
    var draggedItem = Array.from(rows).indexOf(draggedItem);
    var shouldSwap = currentIndex !== draggedItem;

    if(shouldSwap) {
        swapRows(currentIndex, draggedItem);
        saveState();
    }
});
});

function swapRows(indexA, indexB) {
    var rowA = rows[indexA];
    var rowB = rows[indexB];

    container.insertBefore(rowA, rowB);
};

function saveState() {
    var state = container.innerHTML;
    localStorage.setItem('vip_list', state);
};