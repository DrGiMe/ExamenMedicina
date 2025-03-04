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

    // Obtener datos completos del estudiante
    let nombre = localStorage.getItem("nombre") || "No registrado";
    let apellidoPaterno = localStorage.getItem("apellido1") || "No registrado";
    let apellidoMaterno = localStorage.getItem("apellido2") || "No registrado";
    let correo = localStorage.getItem("correo") || "No registrado";
    let matricula = localStorage.getItem("matricula") || "No registrada";
    let seccion = localStorage.getItem("seccion") || "No registrada";
    let fecha = new Date().toLocaleDateString();

    // Guardar los resultados en localStorage como lista de estudiantes
    let resultados = JSON.parse(localStorage.getItem("resultados")) || [];
    resultados.push({
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        correo,
        matricula,
        seccion,
        calificacion: calificacion.toFixed(2),
        fecha
    });

    // Guardar la lista actualizada
    localStorage.setItem("resultados", JSON.stringify(resultados));

    console.log("✅ Calificación calculada y guardada correctamente.");
}

// Función para descargar resultados en Excel ordenados por sección y apellido
function descargarExcel() {
    if (typeof XLSX === "undefined") {
        console.error("Error: XLSX no está definido. Verifica la carga del archivo xlsx.full.min.js.");
        return;
    }

    let resultados = JSON.parse(localStorage.getItem("resultados")) || [];

    if (resultados.length === 0) {
        console.warn("⚠ No hay resultados guardados.");
        alert("No hay resultados para descargar.");
        return;
    }

    // Ordenar por sección y luego por apellido paterno
    resultados.sort((a, b) => {
        if (a.seccion !== b.seccion) {
            return a.seccion - b.seccion; // Ordenar por sección
        }
        return a.apellidoPaterno.localeCompare(b.apellidoPaterno); // Ordenar por apellido
    });

    // Crear datos para Excel con los encabezados completos
    let ws_data = [
        ["Nombre", "Apellido Paterno", "Apellido Materno", "Correo", "Matrícula", "Sección", "Calificación", "Fecha"]
    ];

    resultados.forEach(estudiante => {
        ws_data.push([
            estudiante.nombre,
            estudiante.apellidoPaterno,
            estudiante.apellidoMaterno,
            estudiante.correo,
            estudiante.matricula,
            estudiante.seccion,
            estudiante.calificacion,
            estudiante.fecha
        ]);
    });

    // Crear libro y hoja de Excel
    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");

    // Descargar archivo
    XLSX.writeFile(wb, "Resultados_Examen.xlsx");
    console.log("✅ Archivo Excel generado correctamente con orden de sección y apellido.");
}
