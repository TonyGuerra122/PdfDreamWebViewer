import XMLInterpreter from "./XMLInterpreter.js";

// Load Event
document.addEventListener("DOMContentLoaded", function () {

    const xmlInput = document.getElementById("xml-input");

    xmlInput.value = '<PdfDocument>\n  <Text>Escreva algo aqui...</Text>\n</PdfDocument>';

    const interpreter = new XMLInterpreter();

    // Input Event
    xmlInput.addEventListener('input', function () {
        const xml = this.value;
        const previewContent = document.getElementById("preview-content");
        interpreter.renderPreview(xml, previewContent);
    });
});
