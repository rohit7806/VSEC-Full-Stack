const shape = document.getElementById('shape');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');
let currentSize = 80;
increaseBtn.addEventListener('click', function() {
    currentSize += 50;
    shape.style.width = currentSize + 'px';
    shape.style.height = currentSize + 'px';
});
decreaseBtn.addEventListener('click', function() {
    if (currentSize > 20) {
        currentSize -= 20;
        shape.style.width = currentSize + 'px';
        shape.style.height = currentSize + 'px';
    }
});
