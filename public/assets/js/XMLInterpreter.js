export default class XMLInterpreter {

    constructor() {
        this._parser = new DOMParser();
    }

    _renderText(element, previewContent) {
        const text = document.createElement('p');
        text.textContent = element.textContent;
        previewContent.appendChild(text);
    }

    _renderImage(element, previewContent) {
        const img = document.createElement('img');
        img.src = element.getAttribute('src');
        img.alt = "Imagem não pôde ser carregada";
        img.style.maxWidth = '100%';
        previewContent.appendChild(img);
    }

    _renderTable(element, previewContent) {
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';

        const rows = element.getElementsByTagName('Row');
        for (let i = 0; i < rows.length; i++) {
            const tr = document.createElement('tr');

            const cells = rows[i].getElementsByTagName('Cell');
            for (let j = 0; j < cells.length; j++) {
                const td = document.createElement('td');
                td.textContent = cells[j].textContent;
                td.style.border = '1px solid #000';
                td.style.padding = '8px';
                tr.appendChild(td);
            }

            table.appendChild(tr);
        }

        previewContent.appendChild(table);
    }

    renderPreview(xml, previewContent) {
        previewContent.innerHTML = '';
        xml = xml.replace('&', '&amp;');

        try {
            const dom = this._parser.parseFromString(xml, "text/xml");

            const parseError = dom.getElementsByTagName('parsererror');
            if (parseError.length > 0) {
                previewContent.innerHTML = '<p style="color: red;">Erro ao processar o XML</p>';
                return;
            }

            const pdfDocument = dom.getElementsByTagName('PdfDocument')[0];
            if (pdfDocument) {
                const children = pdfDocument.childNodes;
                for (let i = 0; i < children.length; i++) {
                    const element = children[i];

                    switch (element.nodeName) {
                        case 'Text':
                            this._renderText(element, previewContent);
                            break;
                        case 'Img':
                            this._renderImage(element, previewContent);
                            break;
                        case 'Table':
                            this._renderTable(element, previewContent);
                            break;
                    }
                }
            } else {
                previewContent.innerHTML = '<p style="color: red;">Nenhum documento PDF encontrado.</p>';
            }

        } catch (error) {
            previewContent.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`;
        }
    }

};
