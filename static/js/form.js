const selectProvincias = document.getElementById("selectProvincias");
  const selectLocalidades = document.getElementById("selectLocalidades");

  // Obtener provincias y llenar el select de provincias
  fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre")
    .then(response => response.json())
    .then(data => {
      if (data.provincias) {
        data.provincias.forEach(provincia => {
          const option = document.createElement("option");
          option.value = provincia.id;
          option.text = provincia.nombre;
          selectProvincias.appendChild(option);
        });
      }
    })
    .catch(error => {
      console.error("Error al obtener las provincias: " + error);
    });

    // Obtener localidades según la provincia seleccionada
  selectProvincias.addEventListener("change", function() {
    const provinciaId = selectProvincias.value;
    const localidadesUrl = `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinciaId}&campos=id,nombre&max=1814`;

    // Limpiar el select de localidades
    selectLocalidades.innerHTML = "";

    // Obtener las localidades y llenar el select de localidades
    fetch(localidadesUrl)
      .then(response => response.json())
      .then(data => {
        if (data.localidades) {
          data.localidades.forEach(localidad => {
            const option = document.createElement("option");
            option.value = localidad.id;
            option.text = localidad.nombre;
            selectLocalidades.appendChild(option);
          });
        }
      })
      .catch(error => {
        console.error("Error al obtener las localidades: " + error);
      });
  });

  document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío automático del formulario

    const name = document.getElementsByName("name")[0].value;
    const telefono = document.getElementsByName("telefono")[0].value;
    const email = document.getElementsByName("email")[0].value;
    const comentarios = document.getElementsByName("Comentarios")[0].value;
    const provincia = selectProvincias.options[selectProvincias.selectedIndex].text;
    const localidad = selectLocalidades.options[selectLocalidades.selectedIndex].text;
    const modeloInteres = document.getElementsByName("modeloInteres")[0].value;
    const formaPago = document.getElementsByName("formaPago")[0].value;

    // Construir los datos a enviar por correo
    const formData = new FormData();
    formData.append("name", name);
    formData.append("telefono", telefono);
    formData.append("email", email);
    formData.append("Comentarios", comentarios);
    formData.append("Provincia", provincia);
    formData.append("Localidad", localidad);
    formData.append("modeloInteres", modeloInteres);
    formData.append("formaPago", formaPago);

    // Enviar los datos utilizando FormSubmit
    fetch("https://formsubmit.co/robledoca@gmail.com", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log("Respuesta del envío por correo:", data);
        // Aquí puedes realizar cualquier acción adicional después del envío, como mostrar un mensaje de confirmación al usuario
      })
      .catch(error => {
        console.error("Error al enviar el formulario:", error);
        // Aquí puedes manejar cualquier error que ocurra durante el envío del formulario
      });
  });