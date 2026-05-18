// Selección de elementos del DOM
const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;

// 1. Cargar del localStorage el tema seleccionado previamente
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    bodyElement.classList.add('dark-mode');
    themeToggleBtn.textContent = '☀️ Modo Claro';
} else {
    bodyElement.classList.remove('dark-mode');
    themeToggleBtn.textContent = '🌙 Modo Oscuro';
}

// 2. Gestionar el cambio mediante el evento click
themeToggleBtn.addEventListener('click', () => {
    // Alternamos la clase dark-mode en el body
    bodyElement.classList.toggle('dark-mode');
    
    // Comprobamos si el modo oscuro está activo para actualizar texto y localStorage
    if (bodyElement.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = '☀️ Modo Claro';
        // Almacenar el tema seleccionado en localStorage
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggleBtn.textContent = '🌙 Modo Oscuro';
        // Almacenar el tema seleccionado en localStorage
        localStorage.setItem('theme', 'light');
    }
});