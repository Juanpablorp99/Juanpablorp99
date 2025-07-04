document.addEventListener("DOMContentLoaded", () => {
  const precios = [25, 25, 20, 20];

  const checkboxes = [
    document.getElementById("hamburguesa1"),
    document.getElementById("hamburguesa2"),
    document.getElementById("hamburguesa3"),
    document.getElementById("hamburguesa4"),
  ];

  const cantidades = [
    document.getElementById("cantidad1"),
    document.getElementById("cantidad2"),
    document.getElementById("cantidad3"),
    document.getElementById("cantidad4"),
  ];

  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("change", () => {
      cantidades[index].disabled = !checkbox.checked;
      if (!checkbox.checked) {
        cantidades[index].value = "";
      }
      calcularTotal();
    });

    cantidades[index].addEventListener("input", calcularTotal);
  });

  function calcularTotal() {
    let total = 0;
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked && cantidades[index].value) {
        total += precios[index] * parseInt(cantidades[index].value);
      }
    });
    document.getElementById("totalDisplay").innerText = total;
  }

  function generarIDPedido() {
    const fecha = new Date();
    const id =
      "Pedido_" +
      fecha.getFullYear() +
      String(fecha.getMonth() + 1).padStart(2, "0") +
      String(fecha.getDate()).padStart(2, "0") +
      String(fecha.getHours()).padStart(2, "0") +
      String(fecha.getMinutes()).padStart(2, "0") +
      String(fecha.getSeconds()).padStart(2, "0");
    return id;
  }

  document.getElementById("btnEnviar").addEventListener("click", () => {
    let productos = "";
    let total = 0;

    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked && cantidades[index].value && parseInt(cantidades[index].value) > 0)
        {
            productos += `${checkbox.nextElementSibling.innerText} x ${cantidades[index].value}\n`;
            total += precios[index] * parseInt(cantidades[index].value);
        }
    });

    if (productos === "") {
      alert("Por favor, selecciona al menos un producto.");
      return;
    }

    const idPedido = generarIDPedido();

    fetch(
      "https://script.google.com/macros/s/AKfycbxBpsvnskGPU6ybLldatlW91BwWBrWjxZDv9HszSyEjZCsLLjgVIcHu2tUhahdT5hKC_Q/exec",
      {
        method: "POST",
        body: JSON.stringify({ idPedido, productos, total }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.text())
      .then((data) => {
        document.getElementById(
          "estado"
        ).innerHTML = `¡Pedido guardado!<br>ID Pedido: <strong>${idPedido}</strong>`;
        document.getElementById("pedidoForm").reset();
        cantidades.forEach((campo) => (campo.disabled = true));
        document.getElementById("totalDisplay").innerText = "0";
      })
      .catch((err) => {
        console.error(err);
        alert("Hubo un problema al guardar el pedido.");
    });  
  });
});
