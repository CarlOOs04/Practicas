// 1. Datos iniciales (Uso de objetos)
const estudiosIniciales = [
    {
        periodo: "En curso",
        titulo: "Grado Superior de Desarrollo de Aplicaciones Web",
        centro: "I.E.S Gregorio Prieto (Valdepeñas)"
    },
    {
        periodo: "2021 — 2025",
        titulo: "Grado Medio de Sistemas Microinformáticos y Redes",
        centro: "I.E.S Maestro de Calatrava (Ciudad Real)"
    },
    {
        periodo: "2016 — 2020",
        titulo: "Educación Secundaria Obligatoria",
        centro: "I.E.S Antonio Calvín (Almagro)"
    }
];

// 2. Función para pintar los estudios en el HTML
function renderizarEstudios() {
    const contenedor = document.getElementById('formacion-container');
    if (!contenedor) return; 
    
    contenedor.innerHTML = ''; // Limpiamos la sección para evitar duplicados
    
    estudiosIniciales.forEach(estudio => {
        const tarjeta = `
            <article class="card">
                <time>${estudio.periodo}</time>
                <h3>${estudio.titulo}</h3>
                <span>${estudio.centro}</span>
            </article>
        `;
        contenedor.insertAdjacentHTML('beforeend', tarjeta);
    });
}

// 3. Ejecución principal cuando la web esté lista
document.addEventListener('DOMContentLoaded', () => {
    // Pintar los estudios por primera vez
    renderizarEstudios();

    // Control del Formulario para añadir nuevos estudios
    const formulario = document.getElementById('form-estudios');
    if (formulario) {
        formulario.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita que la página se recargue
            
            // Crear el nuevo objeto leyendo los inputs
            const nuevoEstudio = {
                periodo: document.getElementById('input-periodo').value.trim(),
                titulo: document.getElementById('input-titulo').value.trim(),
                centro: document.getElementById('input-centro').value.trim()
            };
            
            // Añadir al principio del array
            estudiosIniciales.unshift(nuevoEstudio);
            
            // Volver a pintar la interfaz con el nuevo elemento
            renderizarEstudios();
            
            // Limpiar los campos del formulario
            formulario.reset();
        });
    }

    // Control del Modo Oscuro
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleBtn.textContent = '☀️ Modo Claro';
        }
        
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const esOscuro = document.body.classList.contains('dark-mode');
            themeToggleBtn.textContent = esOscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
            localStorage.setItem('theme', esOscuro ? 'dark' : 'light');
        });
    }
});