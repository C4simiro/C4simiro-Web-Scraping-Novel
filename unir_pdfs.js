// Importa as bibliotecas necessárias
const fs = require('fs')
const path = require('path')
const { PDFDocument } = require('pdf-lib')

// Define a pasta onde estão os PDFs
const inputDir = path.join(__dirname, 'pdfs')
// Define o nome e local do arquivo PDF final
const outputFile = path.join(__dirname, 'Lord_of_Mysteries_Completo.pdf')

// Função assíncrona para unir os PDFs
async function mergePdfs() {
    try {
        console.log('Iniciando a união dos PDFs...')

        // Lê todos os nomes de arquivo da pasta 'pdfs'
        const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.pdf'))

        // Ordena os arquivos para garantir a sequência correta
        files.sort()

        // Cria um novo documento PDF vazio
        const mergedPdf = await PDFDocument.create()

        // Loop para ler e adicionar as páginas de cada arquivo
        for (const file of files) {
            const filePath = path.join(inputDir, file)
            const pdfBytes = fs.readFileSync(filePath)
            const pdfDoc = await PDFDocument.load(pdfBytes)

            const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices())
            pages.forEach(page => mergedPdf.addPage(page))

            console.log(`✅ Adicionado: ${file}`)
        }

        // Salva o novo arquivo PDF
        const mergedPdfBytes = await mergedPdf.save()
        fs.writeFileSync(outputFile, mergedPdfBytes)

        console.log(`\n🎉 Processo concluído! Todos os capítulos foram unidos em: ${outputFile}`)

    } catch (error) {
        console.error('❌ Ocorreu um erro durante a união dos PDFs:', error)
    }
}

// Inicia a função de união
mergePdfs()