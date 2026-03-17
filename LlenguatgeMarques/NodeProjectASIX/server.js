const express = require("express");
const convert = require("xml-js");

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

//  SOLO UNA VEZ
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});