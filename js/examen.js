document.addEventListener("DOMContentLoaded", function () {
    cargarPreguntas();
    document.getElementById("btnFinalizar").addEventListener("click", finalizarExamen);
    document.getElementById("btnDescargar").addEventListener("click", descargarExcel);
});

// 🔹 Lista de preguntas con respuestas correctas
let preguntas = [
    { id: 1, pregunta: "¿Cuál es el órgano más grande del cuerpo humano?", opciones: ["Corazón", "Piel", "Hígado", "Pulmones"], respuesta: "Piel" },
    { id: 2, pregunta: "¿Cuántos huesos tiene un adulto?", opciones: ["206", "215", "180", "195"], respuesta: "206" },
    { id: 3, pregunta: "¿Qué vitamina se obtiene del sol?", opciones: ["Vitamina C", "Vitamina D", "Vitamina B12", "Vitamina K"], respuesta: "Vitamina D" }
];

// 🔹 Función para cargar las preguntas en la página
function cargarPreguntas() {
    let contenedor = document.getElementById("preguntas");
    contenedor.innerHTML = "";
    preguntas.forEach((pregunta, index) => {
        let div = document.createElement("div");
        div.classList.add("pregunta");
        div.innerHTML = `<p><b>${index + 1}.</b> ${pregunta.pregunta}</p>`;
        pregunta.opciones.forEach(opcion => {
            div.innerHTML += `<label><input type="radio" name="pregunta${index}" value="${opcion}"> ${opcion}</label><br>`;
        });
        contenedor.appendChild(div);
    });
}

// 🔹 Función para finalizar el examen y calcular calificación
function finalizarExamen() {
    let respuestasCorrectas = 0;
    preguntas.forEach((pregunta, index) => {
        let seleccionada = document.querySelector(`input[name="pregunta${index}"]:checked`);
        if (seleccionada && seleccionada.value === pregunta.respuesta) {
            respuestasCorrectas++;
        }
    });

    let calificacion = (respuestasCorrectas / preguntas.length) * 10;
    calificacion = Math.round(calificacion * 100) / 100; // Redondear a 2 decimales

    document.getElementById("resultado").innerText = `Tu calificación es: ${calificacion}`;

    guardarResultados(calificacion);
}

// 🔹 Función para guardar los resultados en localStorage
function guardarResultados(calificacion) {
    let nombre = localStorage.getItem("nombre") || "Desconocido";
    let apellidoP = localStorage.getItem("apellidoP") || "Desconocido";
    let apellidoM = localStorage.getItem("apellidoM") || "Desconocido";
    let correo = localStorage.getItem("correo") || "Desconocido";
    let matricula = localStorage.getItem("matricula") || "Desconocido";
    let seccion = localStorage.getItem("seccion") || "Desconocido";
    let fecha = new Date().toLocaleDateString();

    let resultados = JSON.parse(localStorage.getItem("resultados")) || [];
    resultados.push({ nombre, apellidoP, apellidoM, correo, matricula, seccion, calificacion, fecha });

    localStorage.setItem("resultados", JSON.stringify(resultados));
}

// 🔹 Función para descargar los resultados en Excel
function descargarExcel() {
    if (typeof XLSX === "undefined") {
        alert("Error: No se encontró la biblioteca XLSX.");
        return;
    }

    let datos = JSON.parse(localStorage.getItem("resultados")) || [];

    if (datos.length === 0) {
        alert("No hay resultados para descargar.");
        return;
    }

    // 🔹 Ordenar por sección y apellido paterno
    datos.sort((a, b) => {
        if (a.seccion === b.seccion) {
            return a.apellidoP.localeCompare(b.apellidoP);
        }
        return a.seccion - b.seccion;
    });

    // 🔹 Crear la hoja de Excel con los datos
    let ws_data = [
        ["Nombre", "Apellido Paterno", "Apellido Materno", "Correo", "Matrícula", "Sección", "Calificación", "Fecha"]
    ];
    
    datos.forEach(d => {
        ws_data.push([d.nombre, d.apellidoP, d.apellidoM, d.correo, d.matricula, d.seccion, d.calificacion, d.fecha]);
    });

    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");

    // 🔹 Descargar archivo Excel
    XLSX.writeFile(wb, "Resultados_Examen.xlsx");
}
