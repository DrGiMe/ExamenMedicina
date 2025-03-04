// Verificar si XLSX está disponible antes de continuar
if (typeof XLSX === "undefined") {
    console.error("Error: XLSX no está definido. Verifica la carga del archivo xlsx.full.min.js.");
} else {
    console.log("✅ Librería XLSX cargada correctamente.");
}

// Función para cargar los datos del usuario al iniciar el examen
function cargarDatosUsuario() {
    let nombre = localStorage.getItem("nombre") || "No registrado";
    let apellidoPaterno = localStorage.getItem("apellido1") || "No registrado";
    let apellidoMaterno = localStorage.getItem("apellido2") || "No registrado";
    let correo = localStorage.getItem("correo") || "No registrado";
    let matricula = localStorage.getItem("matricula") || "No registrada";
    let seccion = localStorage.getItem("seccion") || "No registrada";

    console.log("👤 Datos del usuario cargados:");
    console.log(`Nombre: ${nombre}`);
    console.log(`Apellido Paterno: ${apellidoPaterno}`);
    console.log(`Apellido Materno: ${apellidoMaterno}`);
    console.log(`Correo: ${correo}`);
    console.log(`Matrícula: ${matricula}`);
    console.log(`Sección: ${seccion}`);
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

    let fecha = new Date().toLocaleDateString();

    // Obtener datos del usuario
    let nombre = localStorage.getItem("nombre");
    let apellido1 = localStorage.getItem("apellido1");
    let apellido2 = localStorage.getItem("apellido2");
    let correo = localStorage.getItem("correo");
    let matricula = localStorage.getItem("matricula");
    let seccion = localStorage.getItem("seccion");

    // Guardar resultados
    let resultados = JSON.parse(localStorage.getItem("resultados")) || [];
    resultados.push({ nombre, apellido1, apellido2, correo, matricula, seccion, calificacion: calificacion.toFixed(2), fecha });
    localStorage.setItem("resultados", JSON.stringify(resultados));

    console.log("✅ Calificación calculada y guardada correctamente.");
}

// Función para descargar los resultados en Excel
function descargarExcel() {
    let resultados = JSON.parse(localStorage.getItem("resultados")) || [];

    if (resultados.length === 0) {
        alert("No hay resultados para descargar.");
        return;
    }

    // Ordenar por sección y apellido
    resultados.sort((a, b) => {
        if (a.seccion !== b.seccion) {
            return a.seccion - b.seccion;
        }
        return a.apellido1.localeCompare(b.apellido1);
    });

    // Crear datos para Excel
    let ws_data = [["Nombre", "Apellido Paterno", "Apellido Materno", "Correo", "Matrícula", "Sección", "Calificación", "Fecha"]];
    resultados.forEach(estudiante => {
        ws_data.push([estudiante.nombre, estudiante.apellido1, estudiante.apellido2, estudiante.correo, estudiante.matricula, estudiante.seccion, estudiante.calificacion, estudiante.fecha]);
    });

    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");
    XLSX.writeFile(wb, "Resultados_Examen.xlsx");

    console.log("✅ Archivo Excel generado correctamente.");
}

// Cargar datos del usuario al abrir la página
document.addEventListener("DOMContentLoaded", function () {
    let nombre = localStorage.getItem("nombre");
    let apellido1 = localStorage.getItem("apellido1");
    let apellido2 = localStorage.getItem("apellido2");
    let correo = localStorage.getItem("correo");
    let matricula = localStorage.getItem("matricula");
    let seccion = localStorage.getItem("seccion");

    if (!nombre || !apellido1 || !apellido2) {
        alert("No hay un usuario registrado. Redirigiendo al registro...");
        window.location.href = "registro.html";
        return;
    }

    document.getElementById("bienvenida").innerText = `Bienvenido, ${nombre} ${apellido1} ${apellido2}`;

    console.log("✅ Usuario cargado correctamente.");
});

function calcularCalificacion() {
    let respuestas = {
        q1: "Corazón",
        q2: "Tendones"
    };

    let aciertos = 0;
    let totalPreguntas = Object.keys(respuestas).length;

    for (let key in respuestas) {
        let seleccionada = document.querySelector(`input[name="${key}"]:checked`);
        if (seleccionada && seleccionada.value === respuestas[key]) {
            aciertos++;
        }
    }

    let calificacion = (aciertos / totalPreguntas) * 100;
    document.getElementById("resultado").innerText = `Tu calificación: ${calificacion.toFixed(2)}`;

    localStorage.setItem("calificacion", calificacion.toFixed(2));
    console.log(`✅ Calificación calculada: ${calificacion}`);
}

function descargarExcel() {
    let nombre = localStorage.getItem("nombre");
    let apellido1 = localStorage.getItem("apellido1");
    let apellido2 = localStorage.getItem("apellido2");
    let correo = localStorage.getItem("correo");
    let matricula = localStorage.getItem("matricula");
    let seccion = localStorage.getItem("seccion");
    let calificacion = localStorage.getItem("calificacion");
    let fecha = new Date().toLocaleDateString();

    let datos = [
        ["Nombre", "Apellido Paterno", "Apellido Materno", "Correo", "Matrícula", "Sección", "Calificación", "Fecha"],
        [nombre, apellido1, apellido2, correo, matricula, seccion, calificacion, fecha]
    ];

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");
    XLSX.writeFile(wb, "Resultados_Examen.xlsx");

    console.log("✅ Archivo Excel generado.");
}
🔹 3. examen.html (Formulario del examen)
Incluye la lógica de preguntas y botones funcionales.

html
Copiar
Editar
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Examen de Medicina</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <h1 id="bienvenida">Cargando...</h1>

    <form id="examenForm">
        <p>1. ¿Qué órgano bombea la sangre en el cuerpo humano?</p>
        <input type="radio" name="q1" value="Pulmones"> Pulmones<br>
        <input type="radio" name="q1" value="Hígado"> Hígado<br>
        <input type="radio" name="q1" value="Corazón"> Corazón<br>

        <p>2. ¿Qué estructura conecta los músculos con los huesos?</p>
        <input type="radio" name="q2" value="Arterias"> Arterias<br>
        <input type="radio" name="q2" value="Tendones"> Tendones<br>
        <input type="radio" name="q2" value="Cartílago"> Cartílago<br>

        <button type="button" onclick="calcularCalificacion()">Finalizar Examen</button>
    </form>

    <p id="resultado"></p>
    <button onclick="descargarExcel()">Descargar Resultados</button>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <script src="js/examen.js"></script>
</body>
</html>
