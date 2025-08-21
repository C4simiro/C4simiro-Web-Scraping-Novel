// Importa as bibliotecas necessárias para o projeto
const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

// Gera a lista de URLs de forma automática, de 1 a 1432
const chapterUrls = []
for (let i = 1; i <= 1432; i++) {
    chapterUrls.push(`https://centralnovel.com/lord-of-mysteries-capitulo-${i}/`)
}

const outputDir = path.join(__dirname, 'pdfs')

// Verifica se a pasta de saída 'pdfs' já existe. Se não, a cria.
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
}

// Define a função assíncrona principal que executa toda a lógica
async function scrapeAndSavePDF() {
    // Inicializa o navegador Chromium. { headless: false } o torna visível.
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    let currentPage = 1

    // Loop que percorre cada URL na lista gerada
    for (const url of chapterUrls) {
        console.log(`\nProcessando o capítulo ${currentPage} - URL: ${url}`)
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })

        // Extrai o título e o conteúdo do capítulo
        const title = await page.$eval('.entry-title', el => el.innerText.trim()).catch(() => `Capítulo ${currentPage}`)
        const content = await page.$eval('.entry-content', el => el.innerHTML).catch(() => null)

        if (!content) {
            console.log(`Conteúdo do capítulo ${currentPage} não encontrado. Pulando.`)
            currentPage++
            continue
        }

        // Cria o HTML para o PDF
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <title>${title}</title>
              <style>
                body { font-family: sans-serif; padding: 2cm; margin-top: 1.5cm; }
                h1 { text-align: center; }
              </style>
            </head>
            <body>
              <h1>${title}</h1>
              ${content}
            </body>
            </html>
        `

        // Define o nome do arquivo e salva o PDF
        const fileName = `${currentPage.toString().padStart(4, '0')}_${title.replace(/ /g, '_')}.pdf`
        const filePath = path.join(outputDir, fileName)
        await page.setContent(htmlContent)
        await page.pdf({ path: filePath, format: 'A4' })
        console.log(`✅ Salvo: ${filePath}`)

        currentPage++
    }

    // Fecha o navegador quando o loop terminar
    await browser.close()
    console.log('\nProcesso de extração e conversão concluído!')
}

// Chama a função principal para iniciar o script
scrapeAndSavePDF()