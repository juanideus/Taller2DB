const URL = "http://localhost:8080/libros";

const body = document.querySelector("body");

try {
  const response = await fetch(URL, {
    method: "GET",
  });

  const data = await response.json();
  if (!response.ok) {
    alert(data.message || "Error al obtener los libros");
  }

  console.log("Libros obtenidos:", data.data);

  body.innerHTML = data.data
    .map(
      (libro) => `
    <div class="book-card">
        <h2>Título: ${libro.Nombre}</h2>

        <div class="book-info">
            <p><span>Autor:</span> ${libro.Autor}</p>
            <p><span>Fecha de Recepción:</span> ${libro.fecha_recepcion}</p>
            <p><span>Edad Sugerida:</span> ${libro.edad_sugerida} años</p>
            <p><span>Editorial:</span> ${libro.editorial}</p>
            <p><span>Cantidad de Copias:</span> ${libro.cantidad_copias}</p>
            <p class="price">Precio: $${libro.precio}</p>
            <p><span>Estado:</span> ${libro.estado === 1 ? "Disponible" : "No Disponible"}</p>
        </div>
    </div>
`,
    )
    .join("");
} catch (error) {
  alert(error.message || "Error al obtener los libros");
}
