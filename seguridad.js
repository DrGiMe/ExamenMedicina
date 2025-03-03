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
