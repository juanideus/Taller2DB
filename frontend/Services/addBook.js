const URL = "http://localhost:8080/libros";

console.log("Base URL:", URL);

const form = document.getElementById("addBook");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nombre: document.getElementById("name").value,

    genero: Number(document.getElementById("gender").value),

    autor: document.getElementById("autor").value,

    fechaRecepcion: document.getElementById("date").value,

    cantCopias: Number(document.getElementById("copy").value),

    edadSugerida: Number(document.getElementById("age").value),

    editorial: document.getElementById("editorial").value,

    precio: Number(document.getElementById("price").value),

    estado: document.getElementById("state").checked ? 1 : 0,
  };

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();

  const message = document.getElementById("message");
  if (response.ok) {
    message.style.display = "block";
    message.className = "success";
    message.textContent = responseData.message || "Libro agregado exitosamente";
    form.reset();
  } else {
    message.style.display = "block";
    message.className = "error";

    const errores = responseData.message.split(",");

    message.innerHTML = `
  <h3>Errores encontrados:</h3>
  <ul>
    ${errores.map((error) => `<li>${error.trim()}</li>`).join("")}
  </ul>
`;
  }
});
