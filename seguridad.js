// 📌 1️⃣ Bloqueo de Cambio de Pestaña
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        alert("⚠️ Cambio de pestaña detectado. El examen será cerrado.");
        window.location.href = "bloqueado.html";
    }
});

// 📌 2️⃣ Bloqueo de Copiar y Pegar
document.addEventListener("copy", function (event) {
    event.preventDefault();
    alert("⚠️ Copiar no está permitido.");
});

document.addEventListener("paste", function (event) {
    event.preventDefault();
    alert("⚠️ Pegar no está permitido.");
});

// 📌 3️⃣ Bloqueo de Herramientas de Desarrollador e Inspección
setInterval(function () {
    if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        alert("⚠️ Inspección detectada. El examen será cerrado.");
        window.location.href = "bloqueado.html";
    }
}, 1000);

document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey && event.shiftKey && event.key === "I") || // Ctrl + Shift + I (DevTools)
        (event.ctrlKey && event.shiftKey && event.key === "J") || // Ctrl + Shift + J (Consola)
        (event.ctrlKey && event.key === "U") || // Ctrl + U (Ver código fuente)
        (event.metaKey && event.altKey && event.key === "I")) { // ⌘ + ⌥ + I en Mac
        event.preventDefault();
        alert("⚠️ Intento de inspección detectado. El examen será cerrado.");
        window.location.href = "bloqueado.html";
    }
});

// 📌 4️⃣ Bloqueo de Intento de Imprimir (Ctrl + P / Cmd + P)
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "p") { // Ctrl + P (Windows)
        event.preventDefault();
        alert("⚠️ Imprimir no está permitido.");
    }
    if (event.metaKey && event.key === "p") { // ⌘ + P (Mac)
        event.preventDefault();
        alert("⚠️ Imprimir no está permitido.");
    }
});

// 📌 5️⃣ Bloqueo de Capturas de Pantalla (PrintScreen, Cmd + Shift + 4)
document.addEventListener("keydown", function (event) {
    if (event.key === "PrintScreen" || (event.metaKey && event.shiftKey && event.key === "4")) {
        event.preventDefault();
        alert("⚠️ Captura de pantalla detectada. El examen será cerrado.");
        window.location.href = "bloqueado.html";
    }
});

// 📌 6️⃣ Bloqueo de Grabación de Pantalla con API de Visibilidad
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        alert("⚠️ Grabación de pantalla detectada. El examen ha sido cerrado.");
        window.location.href = "bloqueado.html";
    }
});

// 📌 7️⃣ Bloqueo de Xbox Game Bar y Grabación en Windows
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "G") { // Bloquea Windows + G
        event.preventDefault();
        alert("⚠️ Grabación de pantalla bloqueada.");
    }
    if (event.key === "F10") { // Bloquea F10 (algunas grabaciones de audio/video)
        event.preventDefault();
        alert("⚠️ Grabación de pantalla bloqueada.");
    }
});

// 📌 8️⃣ Bloqueo de QuickTime en Mac
document.addEventListener("keydown", function (event) {
    if (event.metaKey && event.shiftKey && event.key === "5") { // ⌘ + Shift + 5
        event.preventDefault();
        alert("⚠️ Grabación de pantalla bloqueada.");
    }
});

// 📌 9️⃣ Bloqueo de Software de Grabación de Pantalla (OBS, ShadowPlay)
setInterval(() => {
    if (window.outerWidth - window.innerWidth > 100 || window.outerHeight - window.innerHeight > 100) {
        alert("⚠️ Software de grabación detectado. El examen ha sido cerrado.");
        window.location.href = "bloqueado.html";
    }
}, 3000);

// 📌 🔟 Desenfoque de Pantalla para Capturas con CSS
const style = document.createElement("style");
style.innerHTML = `
@media (min-width: 300px) {
    html {
        filter: blur(10px);
    }
}`;
document.head.appendChild(style);
