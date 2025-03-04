function guardarRegistro() {
    let nombre = document.getElementById("nombre").value.trim();
    let apellido1 = document.getElementById("apellido1").value.trim();
    let apellido2 = document.getElementById("apellido2").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let matricula = document.getElementById("matricula").value.trim();
    let seccion = document.getElementById("seccion").value;

    // Validar que no haya campos vacíos
    if (!nombre || !apellido1 || !apellido2 || !correo || !matricula || !seccion) {
        alert("Por favor, completa todos los campos antes de continuar.");
        return;
    }

    // Guardar los datos en localStorage
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellido1", apellido1);
    localStorage.setItem("apellido2", apellido2);
    localStorage.setItem("correo", correo);
    localStorage.setItem("matricula", matricula);
    localStorage.setItem("seccion", seccion);

    console.log("✅ Datos guardados. Redirigiendo al examen...");

    // Redirigir al examen
    window.location.href = "examen.html";
}
