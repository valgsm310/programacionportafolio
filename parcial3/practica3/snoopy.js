function evaluarRespuestas() {
    const respuestas = {
        pregunta1: document.getElementById('pregunta1').value,
        pregunta2: document.getElementById('pregunta2').value,
        pregunta3: document.getElementById('pregunta3').value,
        pregunta4: document.getElementById('pregunta4').value
    };

    const respuestasCorrectas = {
        pregunta1: 'beagle',
        pregunta2: 'woodstock',
        pregunta3: 'casa-de-perro',
        pregunta4: 'as de la aviación'
    };

    let calificacion = 0;
    const puntosPorPregunta = [0, 0, 0, 0];

    if (respuestas.pregunta1 === respuestasCorrectas.pregunta1) {
        calificacion++;
        puntosPorPregunta[0] = 1;
    }

    if (respuestas.pregunta2 === respuestasCorrectas.pregunta2) {
        calificacion++;
        puntosPorPregunta[1] = 1;
    }

    if (respuestas.pregunta3 === respuestasCorrectas.pregunta3) {
        calificacion++;
        puntosPorPregunta[2] = 1;
    }

    if (respuestas.pregunta4 === respuestasCorrectas.pregunta4) {
        calificacion++;
        puntosPorPregunta[3] = 1;
    }

    document.getElementById('calificacion').textContent = calificacion;
    document.getElementById('resultado').classList.remove('oculto');
    document.getElementById('grafico').classList.remove('oculto');
    document.getElementById('descargar-pdf').classList.remove('oculto');

    generarGrafico(puntosPorPregunta);
    document.getElementById('descargar-pdf').onclick = () => generarPDF(puntosPorPregunta, calificacion);
}

function generarGrafico(puntos) {
    const ctx = document.getElementById('miGrafico').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4'],
            datasets: [{
                label: 'Puntos Obtenidos',
                data: puntos,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function generarPDF(puntos, calificacion) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text('Resultados del Diagnóstico sobre Snoopy', 10, 20);

    pdf.setFontSize(12);
    pdf.text(`Tu calificación total es: ${calificacion} / 4`, 10, 35);

    pdf.text('Puntos por Pregunta:', 10, 50);
    puntos.forEach((punto, index) => {
        pdf.text(`Pregunta ${index + 1}: ${punto} / 1`, 20, 60 + (index * 10));
    });

    // Convertir el canvas a imagen y añadirla al PDF
    const canvas = document.getElementById('miGrafico');
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 10, 90, 190, 70); // Ajusta las coordenadas y dimensiones según necesites

    pdf.save('diagnostico_snoopy.pdf');
}