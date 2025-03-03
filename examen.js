document.addEventListener("DOMContentLoaded", function () {
    const examenForm = document.getElementById("examen-form");
    const resultado = document.getElementById("resultado");

    // Respuestas correctas
    const respuestasCorrectas = {
        p1: "nefrona",
        p2: "insulina",
        p3: "cerebelo"
    };

    // Temporizador
    let tiempoRestante = 600; // 10 minutos en segundos
    const tiempoElemento = document.getElementById("tiempo");

    function actualizarTemporizador() {
        let minutos = Math.floor(tiempoRestante / 60);
        let segundos = tiempoRestante % 60;
        tiempoElemento.textContent = `${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;

        if (tiempoRestante <= 0) {
            alert("⏳ Tiempo agotado. El examen se enviará automáticamente.");
            enviarExamen();
        } else {
            tiempoRestante--;
            setTimeout(actualizarTemporizador, 1000);
        }
    }

    // Inicia el temporizador
    actualizarTemporizador();

    // Función para evaluar respuestas
    function enviarExamen() {
        let respuestasCorrectasContadas = 0;
        Object.keys(respuestasCorrectas).forEach(pregunta => {
            const seleccionada = document.querySelector(`input[name="${pregunta}"]:checked`);
            if (seleccionada && seleccionada.value === respuestasCorrectas[pregunta]) {
                respuestasCorrectasContadas++;
            }
        });

        // Calificación final
        const totalPreguntas = Object.keys(respuestasCorrectas).length;
        const puntaje = (respuestasCorrectasContadas / totalPreguntas) * 10;
        resultado.innerHTML = `✅ Examen finalizado. Tu calificación es: <strong>${puntaje.toFixed(1)}/10</strong>`;

        // Bloquear cambios en las respuestas
        document.querySelectorAll("input").forEach(input => input.disabled = true);
    }

    // Evento de envío del examen
    examenForm.addEventListener("submit", function (event) {
        event.preventDefault();
        enviarExamen();
    });
});
