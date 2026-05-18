// ==========================================================================
// 1. MODELADO DE DATOS (Uso de objetos para los estudios iniciales)
// ==========================================================================
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

// ==========================================================================
// 2. LÓGICA DE MANIPULACIÓN DEL DOM (Clean Code e Iteración)
// ==========================================================================

// Pinta los estudios del array en la lista dinámica
function renderizarEstudios() {
    const contenedor = document.getElementById('formacion-container');
    if (!contenedor) return;
    
    contenedor.innerHTML = ''; // Limpiamos para evitar duplicados
    
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

// ==========================================================================
// 3. CONSUMO DE API: BUSCADOR ASÍNCRONO DE GITHUB
// ==========================================================================
async function buscarUsuarioGitHub(username) {
    const contenedorResultado = document.getElementById('github-result-container');
    if (!contenedorResultado) return;

    // Ponemos un mensaje temporal de carga
    contenedorResultado.innerHTML = `<p style="color: #cbd5e1;">Buscando a ${username}...</p>`;

    try {
        const respuesta = await fetch(`https://api.github.com/users/${username}`);
        
        if (!respuesta.ok) {
            if (respuesta.status === 404) {
                contenedorResultado.innerHTML = `<p class="error-msg">❌ Usuario "${username}" no encontrado.</p>`;
            } else {
                throw new Error(`Error: ${respuesta.status}`);
            }
            return;
        }

        const usuario = await respuesta.json();

        // Controlamos si la bío está vacía (Clean Code)
        const biografia = usuario.bio ? usuario.bio : 'Sin bío disponible';
        const nombreMostrar = usuario.name ? usuario.name : usuario.login;

        // Estructuramos la tarjeta del perfil basada en la captura exacta de la práctica
        const tarjetaPerfilHTML = `
            <div class="user-card">
                <img src="${usuario.avatar_url}" alt="Avatar de ${usuario.login}" class="user-avatar">
                <div class="user-info">
                    <h3>${nombreMostrar}</h3>
                    <p class="user-bio">${biografia}</p>
                    <span class="user-repos-badge">Repositorios: ${usuario.public_repos}</span>
                </div>
            </div>
        `;

        // Añadimos la tarjeta al DOM limpiando el texto anterior
        contenedorResultado.innerHTML = tarjetaPerfilHTML;

    } catch (error) {
        console.error("Fallo al conectar con GitHub:", error);
        contenedorResultado.innerHTML = `<p class="error-msg">❌ Error al conectar con el servidor.</p>`;
    }
}

// ==========================================================================
// 4. INICIALIZADOR PRINCIPAL Y GESTIÓN DE EVENTOS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Ejecución inicial de pintado de estudios
    renderizarEstudios();

    // Evento del Buscador de GitHub
    const formGitHub = document.getElementById('form-github');
    if (formGitHub) {
        formGitHub.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitamos que refresque la página entera
            const usernameInput = document.getElementById('input-username').value.trim();
            if (usernameInput) {
                buscarUsuarioGitHub(usernameInput);
            }
        });
    }

    // Evento del Formulario de nuevos estudios
    const formularioEstudios = document.getElementById('form-estudios');
    if (formularioEstudios) {
        formularioEstudios.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const nuevoEstudio = {
                periodo: document.getElementById('input-periodo').value.trim(),
                titulo: document.getElementById('input-titulo').value.trim(),
                centro: document.getElementById('input-centro').value.trim()
            };
            
            estudiosIniciales.unshift(nuevoEstudio); // Se mete al inicio del array
            renderizarEstudios();                  // Se refresca la interfaz automáticamente
            formularioEstudios.reset();            // Limpia los campos
        });
    }

    // Persistencia del Modo Oscuro (localStorage)
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        // Cargar estado previo
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleBtn.textContent = '☀️ Modo Claro';
        }
        
        // Alternar al hacer click
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const esOscuro = document.body.classList.contains('dark-mode');
            themeToggleBtn.textContent = esOscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
            localStorage.setItem('theme', esOscuro ? 'dark' : 'light');
        });
    }
});