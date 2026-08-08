const overlay = document.getElementById('darkOverlay');
window.addEventListener('mousemove', function(event) {
    overlay.style.setProperty('--x', event.clientX + 'px');
    overlay.style.setProperty('--y', event.clientY + 'px');
});
