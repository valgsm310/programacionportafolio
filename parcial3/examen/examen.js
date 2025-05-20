document.addEventListener('DOMContentLoaded', () => {
    const tareaInput = document.getElementById('nueva-tarea');
    const agregarBoton = document.getElementById('agregar-tarea');
    const listaTareas = document.getElementById('tareas');

    agregarBoton.addEventListener('click', agregarNuevaTarea);
    listaTareas.addEventListener('click', manejarClickLista);

    function agregarNuevaTarea() {
        const textoTarea = tareaInput.value.trim();

        if (textoTarea !== "") {
            const nuevaTarea = document.createElement('li');
            nuevaTarea.innerHTML = `
                <span>${textoTarea}</span>
                <button class="eliminar-tarea">Listuki</button>
            `;
            listaTareas.appendChild(nuevaTarea);
            tareaInput.value = "";
        }
    }

    function manejarClickLista(evento) {
        if (evento.target.classList.contains('eliminar-tarea')) {
            const listItem = evento.target.parentNode;
            listaTareas.removeChild(listItem);
        }
    }
});