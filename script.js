// Seleccionamos elementos del DOM
const contenedorLista = document.getElementById("contenedor-lista");
const input = document.getElementById("tarea-input");
const botonAgregar = document.getElementById("boton-agregar");
const svgMarcado = `<svg fill="#003adb" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-7.2 -7.2 38.40 38.40" xml:space="preserve" width="48px" height="48px" stroke="#003adb" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:none;} </style> <g> <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.5,0-8-3.5-8-8s3.5-8,8-8s8,3.5,8,8 S16.5,20,12,20z"></path> <polygon points="9.8,16.8 6.1,13.2 7.5,11.7 9.8,14 15.5,7.9 17,9.3 "></polygon> </g> <rect class="st0" width="24" height="24"></rect> </g></svg>`;
const svgMarcar = `<svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-7.2 -7.2 38.40 38.40" xml:space="preserve" width="48px" height="48px" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:none;} </style> <g> <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.5,0-8-3.5-8-8s3.5-8,8-8s8,3.5,8,8 S16.5,20,12,20z"></path> <polygon points="9.8,16.8 6.1,13.2 7.5,11.7 9.8,14 15.5,7.9 17,9.3 "></polygon> </g> <rect class="st0" width="24" height="24"></rect> </g></svg>`;
const svgEliminar = `<svg fill="#ff4524" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-7.2 -7.2 38.40 38.40" xml:space="preserve" width="48px" height="48px" stroke="#ff4524" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:none;} </style> <g> <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.5,0-8-3.5-8-8s3.5-8,8-8s8,3.5,8,8 S16.5,20,12,20z"></path> <polygon points="15.5,7.1 12,10.6 8.5,7.1 7.1,8.5 10.6,12 7.1,15.5 8.5,16.9 12,13.4 15.5,16.9 16.9,15.5 13.4,12 16.9,8.5 "></polygon> </g> <rect class="st0" width="24" height="24"></rect> </g></svg>`;

// función para agregar tarea
function agregarTarea(event) {
    event.preventDefault(); // Evitamos que se recarge la página

    let textoTarea = input.value.trim();

    if(textoTarea === '') {
        mostrarMensaje("No puedes agregar una tarea vacía.");
        return;
    }

    // Comprobar si ya existe una tarea con el mismo texto
    const tareasExistentes = document.querySelectorAll(".texto-tarea")
    for (let tarea of tareasExistentes) {
        if (tarea.textContent.trim() === textoTarea) {
            mostrarMensaje("Esta tarea ya esta en la lista")
            return;
        }
    }

    // Creamos la tarea en el html
    const nuevaTarea = document.createElement("div");
    nuevaTarea.classList.add("contenedor-tarea");

    nuevaTarea.innerHTML = `
        <p class="texto-tarea">${textoTarea}</p>
        <div class="boton-tarea">
            <button onclick="marcarTarea(this)" class="botonOk">${svgMarcar}</button>
            <button onclick="eliminarTarea(this)" class="botonEliminar">${svgEliminar}</button>
        </div>
    `;

    // Agregar la nueva tarea al body
    contenedorLista.appendChild(nuevaTarea);

    // Comprobar si el contenedorLista ocupa toda la pantalla
    if (contenedorLista.offsetHeight < window.innerHeight) {
        // Eliminar cualquier animación de "bajar" antes de aplicar "subir"
        contenedorLista.classList.remove("bajar");
        // Solo aplicar la animación si el contenedor no ocupa toda la pantalla
        contenedorLista.classList.remove("subir");

        // Forzar que la animación se reinicie
        void contenedorLista.offsetWidth;

        // Aplicar la animación de subir al contenedor
        contenedorLista.classList.add("subir");
    };

    // Aplicar la clase visible después de un pequeño retraso para que la animación ocurra
    setTimeout(() => {
        // Aplicar la clase visible para animar la tarea
        nuevaTarea.classList.add("visible");
    }, 10);

    // Limpiamos el input
    input.value = '';
};

// Activamos esta función con el botón
botonAgregar.addEventListener('click', agregarTarea);

// Detectar "Enter" en el input
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        agregarTarea();
    }
});

// Eliminar tarea
function eliminarTarea(boton) {
    const tarea = boton.parentElement.parentElement;
    tarea.classList.add("eliminando"); // Agrega clase para animación

    // Esperar la duración de la transición antes de eliminar el elemento del DOM
    tarea.addEventListener("transitionend", () => {
        tarea.remove(); // Eliminar la tarea cuando termine la animación

        // Eliminar cualquier animación de "subir" antes de aplicar "bajar"
        if (contenedorLista.offsetHeight < window.innerHeight) {
            contenedorLista.classList.remove("subir");
            contenedorLista.classList.remove("bajar");

            // Forzar que la animación se reinicie
            void contenedorLista.offsetWidth;

            // Aplicar la animación de bajar al contenedor
            contenedorLista.classList.add("bajar");
        }
    });
}

function marcarTarea(boton) {
    if (boton.innerHTML.includes(svgMarcado)) {
        boton.innerHTML = svgMarcar;
    } else {
        boton.innerHTML = svgMarcado;
    }
}

function mostrarMensaje(mensaje) {
    // Comprobar si ya existe un div con la clase 'mensaje-error'
    const mensajeExistente = document.querySelector('.mensaje-error');

    // Si existe, no crear uno nuevo
    if (mensajeExistente) {
        return;
    }

    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = 'mensaje-error';
    document.body.appendChild(mensajeDiv);

    setTimeout(() => mensajeDiv.remove(), 3000); // Eliminar después de 3 segundos
}
