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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});