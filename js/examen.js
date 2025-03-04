function calcularCalificacion() {
    let totalPreguntas = 3;
    let correctas = document.querySelectorAll('input[value="correcto"]:checked').length;
    let calificacion = (correctas / totalPreguntas) * 10;

    let resultadoTexto = `Tu calificación es: ${calificacion.toFixed(2)}/10`;
    document.getElementById("resultado").innerText = resultadoTexto;
    document.getElementById("resultado").style.display = "block";

    // Mostrar botón de descarga
    document.getElementById("descargarResultados").style.display = "block";

    // Guardar resultados
    localStorage.setItem("calificacion", resultadoTexto);
}

function descargarExcel() {
    let calificacion = localStorage.getItem("calificacion") || "No disponible";

    // Crear hoja de datos
    let ws = XLSX.utils.aoa_to_sheet([
        ["Nombre", "Apellido Paterno", "Apellido Materno", "Sección", "Calificación", "Fecha"],
        ["Juan", "Pérez", "López", "1", calificacion, new Date().toLocaleDateString()]
    ]);

    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");

    // Descargar archivo
    XLSX.writeFile(wb, "Resultados_Examen.xlsx");
}
