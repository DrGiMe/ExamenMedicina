// Importamos SheetJS para generar el archivo Excel
function descargarExcel(resultados) {
    // Ordenamos los resultados por sección y alfabéticamente por apellido
    resultados.sort((a, b) => {
        if (a.seccion !== b.seccion) {
            return a.seccion - b.seccion;
        }
        return a.apellido1.localeCompare(b.apellido1);
    });

    // Creamos la hoja de cálculo
    const ws = XLSX.utils.json_to_sheet(resultados, {
        header: ["fecha", "nombreExamen", "nombre", "apellido1", "apellido2", "correo", "matricula", "seccion", "calificacion"],
        skipHeader: false
    });

    // Creamos el libro de Excel
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resultados Examen");

    // Nombre del archivo
    const nombreArchivo = `Resultados_Examen_${new Date().toISOString().split("T")[0]}.xlsx`;

    // Descargamos el archivo
    XLSX.writeFile(wb, nombreArchivo);
}

// Función para guardar los resultados
function guardarResultados(calificacion) {
    // Obtener la fecha actual
    const fecha = new Date().toLocaleDateString();

    // Datos del usuario registrados previamente
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // Nombre del examen
    const nombreExamen = "Examen de Medicina";

    // Validar que haya datos registrados
    if (!usuario) {
        alert("Error: No se encontraron datos del usuario.");
        return;
    }

    // Crear el objeto de resultado
    const resultado = {
        fecha: fecha,
        nombreExamen: nombreExamen,
        nombre: usuario.nombre,
        apellido1: usuario.apellido1,
        apellido2: usuario.apellido2,
        correo: usuario.correo,
        matricula: usuario.matricula,
        seccion: usuario.seccion,
        calificacion: calificacion
    };

    // Obtener datos guardados previamente
    let resultadosPrevios = JSON.parse(localStorage.getItem("resultados")) || [];

    // Agregar nuevo resultado
    resultadosPrevios.push(resultado);

    // Guardar en localStorage
    localStorage.setItem("resultados", JSON.stringify(resultadosPrevios));

    // Descargar Excel
    descargarExcel(resultadosPrevios);
}
