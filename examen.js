// Verificar si XLSX está disponible antes de continuar
if (typeof XLSX === "undefined") {
    console.error("Error: XLSX no está definido. Verifica la carga del archivo xlsx.full.min.js.");
} else {
    console.log("✅ Librería XLSX cargada correctamente.");
}

// Función para calcular la calificación
function calcularCalificacion() {
    let respuestasCorrectas = {
        q1: "Corazón",
        q2: "Tendones",
        q3: "Transportar oxígeno"
    };

    let totalPreguntas = Object.keys(respuestasCorrectas).length;
    let respuestasCorrectasUsuario = 0;

    for (let pregunta in respuestasCorrectas) {
        let opciones = document.getElementsByName(pregunta);
        for (let opcion of opciones) {
            if (opcion.checked && opcion.value === respuestasCorrectas[pregunta]) {
                respuestasCorrectasUsuario++;
            }
        }
    }

    let calificacion = (respuestasCorrectasUsuario / totalPreguntas) * 10;
    document.getElementById("resultado").innerText = `Tu calificación es: ${calificacion.toFixed(2)}`;
    localStorage.setItem("calificacion", calificacion.toFixed(2));
}

// Función para descargar resultados en Excel
function descargarExcel() {
    if (typeof XLSX === "undefined") {
        console.error("Error: XLSX no está definido. Verifica la carga del archivo xlsx.full.min.js.");
        return;
    }

    let fecha = localStorage.getItem("fecha") || new Date().toLocaleDateString();
    let calificacion = localStorage.getItem("calificacion") || "No disponible";

    // Datos a exportar
    let ws_data = [
        ["Nombre", "Apellido Paterno", "Apellido Materno", "Sección", "Calificación", "Fecha"],
        ["Juan", "Pérez", "López", "1", calificacion, fecha]
    ];

    // Crear libro y hoja de Excel
    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");

    // Descargar archivo
    XLSX.writeFile(wb, "Resultados_Examen.xlsx");
    console.log("✅ Archivo Excel generado correctamente.");
}
