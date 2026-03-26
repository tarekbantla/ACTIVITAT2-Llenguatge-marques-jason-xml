const express = require("express");
const convert = require("xml-js");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

// permet rebre JSON
app.use(express.json());

// servir fitxers estàtics (HTML, JS, CSS)
app.use(express.static("public"));

// endpoint d'exemple
app.post("/convert", (req, res) => {
  const { data } = req.body;
  const result = data.toUpperCase();
  res.json({ result });
});

// XML → JSON
app.post("/convertXMLtoJson", (req, res) => {
  const { data } = req.body;
  if (!data) return res.status(400).json({ error: "No se recibió XML" });

  try {
    const result = convert.xml2json(data, { compact: true, spaces: 2 });
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: "Error en la conversión XML → JSON" });
  }
});

// JSON → XML
app.post("/convertJsontoXML", (req, res) => {
  const { data } = req.body;

  try {
    const result = convert.json2xml(data, { compact: true, spaces: 2 });
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: "Error en la conversión JSON → XML" });
  }
});

// ==================== NUEVA ACTIVIDAD 3: POKEAPI ====================

// 1. Función que crida a la pokeapi amb el nom d'un Pokémon i retorna un XML
app.post("/pokemonToXml", async (req, res) => {
  const { pokemonName } = req.body;
  
  if (!pokemonName) {
    return res.status(400).json({ error: "No se proporcionó nombre de Pokémon" });
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    
    if (!response.ok) {
      return res.status(404).json({ error: "Pokémon no encontrado" });
    }
    
    const pokemonData = await response.json();
    const xmlResult = convert.json2xml(JSON.stringify(pokemonData), { compact: true, spaces: 2 });
    
    res.json({ result: xmlResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en la conversión Pokémon → XML" });
  }
});

// 2. Funció que mostra les habilitats del Pokémon
app.post("/pokemonAbilities", async (req, res) => {
  const { pokemonName } = req.body;
  
  if (!pokemonName) {
    return res.status(400).json({ error: "No se proporcionó nombre de Pokémon" });
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    
    if (!response.ok) {
      return res.status(404).json({ error: "Pokémon no encontrado" });
    }
    
    const pokemonData = await response.json();
    
    const abilities = pokemonData.abilities.map(ability => ({
      name: ability.ability.name,
      is_hidden: ability.is_hidden,
      slot: ability.slot
    }));
    
    res.json({ 
      pokemon: pokemonData.name,
      abilities: abilities 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener habilidades del Pokémon" });
  }
});

// 3. Funció que mostra l'imatge del Pokémon
app.post("/pokemonImage", async (req, res) => {
  const { pokemonName } = req.body;
  
  if (!pokemonName) {
    return res.status(400).json({ error: "No se proporcionó nombre de Pokémon" });
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    
    if (!response.ok) {
      return res.status(404).json({ error: "Pokémon no encontrado" });
    }
    
    const pokemonData = await response.json();
    const imageUrl = pokemonData.sprites.front_default;
    
    res.json({ 
      pokemon: pokemonData.name,
      imageUrl: imageUrl 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener imagen del Pokémon" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
