// ==================== ACTIVIDADES ANTERIORES ====================
const btn = document.getElementById("btn");
const btnXmlToJson = document.getElementById("xmltojson");
const btnJsonToXml = document.getElementById("jsontoxml");

btn.addEventListener("click", async () => {
  const text = document.getElementById("input").value;
  const res = await fetch("/convert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: text })
  });
  const json = await res.json();
  document.getElementById("output").value = json.result;
});

btnXmlToJson.addEventListener("click", async () => {
  const text = document.getElementById("input").value;
  const res = await fetch("/convertXMLtoJson", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: text })
  });
  const json = await res.json();
  document.getElementById("output").value = json.result;
});

btnJsonToXml.addEventListener("click", async () => {
  const text = document.getElementById("input").value;
  const res = await fetch("/convertJsontoXML", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: text })
  });
  const json = await res.json();
  document.getElementById("output").value = json.result;
});

// ==================== NUEVA ACTIVIDAD 3: POKEAPI ====================

// Obtener referencias a los nuevos elementos
const getPokemonXmlBtn = document.getElementById("getPokemonXml");
const getPokemonAbilitiesBtn = document.getElementById("getPokemonAbilities");
const getPokemonImageBtn = document.getElementById("getPokemonImage");
const pokemonInput = document.getElementById("pokemonInput");
const pokemonXmlOutput = document.getElementById("pokemonXmlOutput");
const abilitiesList = document.getElementById("abilitiesList");
const pokemonImage = document.getElementById("pokemonImage");

// 1. Función que crida a la pokeapi amb el nom d'un Pokémon i retorna un XML
getPokemonXmlBtn.addEventListener("click", async () => {
  const pokemonName = pokemonInput.value.trim();
  
  if (!pokemonName) {
    alert(" Por favor, ingresa el nombre de un Pokémon");
    return;
  }
  
  try {
    const res = await fetch("/pokemonToXml", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pokemonName: pokemonName })
    });
    
    const data = await res.json();
    
    if (data.error) {
      alert(data.error);
      pokemonXmlOutput.value = "";
    } else {
      pokemonXmlOutput.value = data.result;
    }
  } catch (error) {
    console.error("Error:", error);
    alert(" Error al obtener el Pokémon");
  }
});

// 2. Funció que mostra les habilitats del Pokémon
getPokemonAbilitiesBtn.addEventListener("click", async () => {
  const pokemonName = pokemonInput.value.trim();
  
  if (!pokemonName) {
    alert(" Por favor, ingresa el nombre de un Pokémon");
    return;
  }
  
  try {
    const res = await fetch("/pokemonAbilities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pokemonName: pokemonName })
    });
    
    const data = await res.json();
    
    if (data.error) {
      alert(data.error);
      abilitiesList.innerHTML = "";
    } else {
      // Mostrar las habilidades formateadas
      let abilitiesHtml = `<strong> Habilidades de ${data.pokemon.toUpperCase()}:</strong><br><br>`;
      data.abilities.forEach(ability => {
        abilitiesHtml += ` ${ability.name}`;
        if (ability.is_hidden) {
          abilitiesHtml += ` <span style="color: #ff6b6b; font-size: 12px;">(Habilidad Oculta)</span>`;
        }
        abilitiesHtml += `<br>`;
      });
      abilitiesList.innerHTML = abilitiesHtml;
    }
  } catch (error) {
    console.error("Error:", error);
    alert(" Error al obtener las habilidades");
  }
});

// 3. Funció que mostra l'imatge del Pokémon
getPokemonImageBtn.addEventListener("click", async () => {
  const pokemonName = pokemonInput.value.trim();
  
  if (!pokemonName) {
    alert(" Por favor, ingresa el nombre de un Pokémon");
    return;
  }
  
  try {
    const res = await fetch("/pokemonImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pokemonName: pokemonName })
    });
    
    const data = await res.json();
    
    if (data.error) {
      alert(data.error);
      pokemonImage.style.display = "none";
      // Eliminar caption si existe
      const caption = document.getElementById("imageCaption");
      if (caption) caption.remove();
    } else {
      pokemonImage.src = data.imageUrl;
      pokemonImage.style.display = "block";
      pokemonImage.alt = `Imagen de ${data.pokemon}`;
      
      // Añadir o actualizar caption
      let caption = document.getElementById("imageCaption");
      if (!caption) {
        caption = document.createElement("div");
        caption.id = "imageCaption";
        caption.className = "image-caption";
        pokemonImage.insertAdjacentElement('afterend', caption);
      }
      caption.innerHTML = ` ${data.pokemon.toUpperCase()} `;
    }
  } catch (error) {
    console.error("Error:", error);
    alert(" Error al obtener la imagen");
  }
});
