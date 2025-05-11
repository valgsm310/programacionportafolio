const categorias = {
  "ROPA": [
    { nombre: "Blusa de Encaje", precio: 280, tallas: ["S", "M", "L"], colores: ["Blanco", "Negro"] },
    { nombre: "Pantalón de Mezclilla", precio: 350, tallas: ["28", "30", "32"], colores: ["Azul", "Negro"] },
    { nombre: "Vestido Floral", precio: 420, tallas: ["S", "M", "L"], colores: ["Rosa", "Verde"] }
  ],
  "OLIVO KIDS": [
    { nombre: "Juguete Educativo", precio: 150 },
    { nombre: "Set de Colores Infantiles", precio: 90 },
    { nombre: "Playera Infantil", precio: 200, tallas: ["2", "4", "6", "8"], colores: ["Rojo", "Azul", "Verde"] }
  ],
  "MAQUILLAJE": [
    { nombre: "Base Líquida", precio: 230 },
    { nombre: "Labial Mate", precio: 120, colores: ["Rojo", "Nude", "Vino"] },
    { nombre: "Sombras Compactas", precio: 190 }
  ],
  "SKINCARE": [
    { nombre: "Crema Hidratante", precio: 210 },
    { nombre: "Tónico Facial", precio: 180 },
    { nombre: "Sérum Antiedad", precio: 290 }
  ],
  "PERFUMES": [
    { nombre: "Perfume de Rosas", precio: 320 },
    { nombre: "Fragancia Cítrica", precio: 280 },
    { nombre: "Colonia de Vainilla", precio: 310 }
  ],
  "BOLSAS Y MOCHILAS": [
    { nombre: "Bolsa de Mano", precio: 400, colores: ["Negro", "Camel", "Rosa"] },
    { nombre: "Mochila Casual", precio: 350, colores: ["Gris", "Azul", "Verde Militar"] },
    { nombre: "Bolsa Crossbody", precio: 300 }
  ],
  "VELAS Y JABONES": [
    { nombre: "Vela de Lavanda", precio: 90 },
    { nombre: "Jabón Artesanal", precio: 60, colores: ["Rosa", "Amarillo", "Beige"] },
    { nombre: "Set Vela + Jabón", precio: 140 }
  ],
  "OBSEQUIOS": [
    { nombre: "Caja de Regalo", precio: 50 },
    { nombre: "Tarjeta Personalizada", precio: 30 },
    { nombre: "Decoración Navideña", precio: 100 }
  ]
};

const carrito = [];

window.onload = () => {
  const contenedor = document.getElementById("productos-container");
  for (const categoria in categorias) {
    const productos = categorias[categoria];
    const divCategoria = document.createElement("div");
    divCategoria.innerHTML = `<h4>${categoria}</h4>`;

    productos.forEach((producto, i) => {
      divCategoria.innerHTML += `
        <label>${producto.nombre} ($${producto.precio}): </label>
        <input type="number" min="0" value="0" onchange="actualizarCarrito('${categoria}', ${i}, this.value, this.parentNode.querySelector('.talla')?.value, this.parentNode.querySelector('.color')?.value)">
        ${producto.tallas ? '<select class="talla">' + producto.tallas.map(t => `<option value="${t}">${t}</option>`).join('') + '</select>' : ''}
        ${producto.colores ? '<select class="color">' + producto.colores.map(c => `<option value="${c}">${c}</option>`).join('') + '</select>' : ''}<br>`;
    });

    contenedor.appendChild(divCategoria);
  }
};

function actualizarCarrito(categoria, index, cantidad, talla, color) {
  cantidad = parseInt(cantidad);
  const producto = categorias[categoria][index];
  const key = `${categoria}-${producto.nombre}-${talla || ''}-${color || ''}`;
  const i = carrito.findIndex(p => p.key === key);

  if (cantidad > 0) {
    if (i >= 0) {
      carrito[i].cantidad = cantidad;
    } else {
      carrito.push({ ...producto, cantidad, key, talla, color });
    }
  } else {
    if (i >= 0) carrito.splice(i, 1);
  }

  calcularTotal();
}

function calcularTotal() {
  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  document.getElementById("total").textContent = total;
}

function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  if (!nombre || !correo || carrito.length === 0) {
    alert("Por favor, completa tus datos y selecciona al menos un producto.");
    return;
  }

  let y = 10;
  doc.setFontSize(14);
  doc.text(`Comprobante de Compra - Bazar Olivo`, 10, y); y += 10;
  doc.setFontSize(12);
  doc.text(`Cliente: ${nombre}`, 10, y); y += 8;
  doc.text(`Correo: ${correo}`, 10, y); y += 8;
  doc.text(`Productos:`, 10, y); y += 8;

  carrito.forEach(p => {
    let desc = `- ${p.nombre} x${p.cantidad} = $${p.precio * p.cantidad}`;
    if (p.talla) desc += ` (Talla: ${p.talla})`;
    if (p.color) desc += ` (Color: ${p.color})`;
    doc.text(desc, 10, y);
    y += 7;
  });

  y += 5;
  doc.text(`Total: $${total}`, 10, y);

  doc.save("comprobante.pdf");
}