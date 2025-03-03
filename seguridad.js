@media (min-width: 300px) {
    html {
        filter: blur(10px);
    }
}
document.addEventListener("keydown", function (event) {
    if (
        event.key === "F12" || // Bloqueo de F12
        (event.ctrlKey && event.shiftKey && event.key === "I") || // Ctrl + Shift + I
        (event.ctrlKey && event.shiftKey && event.key === "J") || // Ctrl + Shift + J
        (event.ctrlKey && event.key === "U") // Ctrl + U (ver código fuente)
    ) {
        event.preventDefault();
        alert("⚠️ Acción no permitida.");
    }
});
document.addEventListener("keydown", function (event) {
    // Para Mac: ⌘ + Shift + 4
    if (event.metaKey && event.shiftKey && event.key === "4") {
        event.preventDefault();
        alert("⚠️ Captura de pantalla bloqueada.");
    }

    // Para Windows: Atajo de "Snipping Tool"
    if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "S")) {
        event.preventDefault();
        alert("⚠️ Herramientas de captura bloqueadas.");
    }
});
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        alert("⚠️ Imprimir no está permitido.");
    }
    if (event.metaKey && event.key === "p") { // Para Mac (⌘ + P)
        event.preventDefault();
        alert("⚠️ Imprimir no está permitido.");
    }
});
document.addEventListener("keyup", function (event) {
    if (event.key === "PrintScreen") {
        alert("⚠️ Captura de pantalla detectada. El examen será cerrado.");
        window.location.href = "bloqueado.html";
    }
});
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        alert("⚠️ Cambio de pestaña detectado. El examen será cerrado.");
        window.location.href = "bloqueado.html"; // Redirigir a página de advertencia
    }
});
document.addEventListener("copy", function (event) {
    event.preventDefault();
    alert("⚠️ Copiar no está permitido.");
});

document.addEventListener("paste", function (event) {
    event.preventDefault();
    alert("⚠️ Pegar no está permitido.");
});
setInterval(function () {
    if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        alert("⚠️ Inspección detectada. El examen será cerrado.");
        window.location.href = "bloqueado.html"; // Redirigir a página de advertencia
    }
}, 1000);
