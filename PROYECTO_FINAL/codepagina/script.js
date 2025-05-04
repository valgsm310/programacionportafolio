let totalFinal = 0;

function calcularTotal() {
  const c1 = parseInt(document.getElementById("cant1").value) || 0;
  const c2 = parseInt(document.getElementById("cant2").value) || 0;
  const c3 = parseInt(document.getElementById("cant3").value) || 0;

  const total = (c1 * 150) + (c2 * 80) + (c3 * 50);
  totalFinal = total;

  document.getElementById("total").innerText = `Total a pagar: $${total}`;
}

function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const c1 = document.getElementById("cant1").value;
  const c2 = document.getElementById("cant2").value;
  const c3 = document.getElementById("cant3").value;

  if (!nombre || !email) {
    alert("Por favor completa los datos del cliente.");
    return;
  }

  doc.text("Comprobante de Compra - Bazar de Primavera", 20, 20);
  doc.text(`Cliente: ${nombre}`, 20, 30);
  doc.text(`Correo: ${email}`, 20, 40);
  doc.text(`Playeras: ${c1}`, 20, 50);
  doc.text(`Tazas: ${c2}`, 20, 60);
  doc.text(`Libretas: ${c3}`, 20, 70);
  doc.text(`Total a pagar: $${totalFinal}`, 20, 85);

  doc.save("comprobante_bazar.pdf");
}
