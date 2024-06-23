const puppeteer = require('puppeteer');
const qrcode = require('qrcode-terminal');

async function adicionarBotWhatsApp() {
    let browser;

    try {
        browser = await puppeteer.launch({
            headless: false, // Altere para true para testes finais
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--display=:99']
        });
        const page = await browser.newPage();

        console.log('Navegando para o WhatsApp Web...');
        await page.goto('https://web.whatsapp.com', { waitUntil: 'load' });

        console.log('Aguardando o QR code...');
        // Espera até que o elemento com atributo data-ref seja visível
        await page.waitForSelector('div[data-ref]', { timeout: 60000 });

        // Captura o atributo data-ref do elemento
        const qrContent = await page.evaluate(() => {
            const qrElement = document.querySelector('div[data-ref]');
            return qrElement ? qrElement.getAttribute('data-ref') : null;
        });
        if (qrContent) {
          console.log('QR code capturado, exibindo no terminal...');
          qrcode.generate(qrContent, { small: true });

          // Aguarda até que o QR code não esteja mais presente na página
          await page.waitForFunction(
              () => !document.querySelector('div[data-ref]'),
              { polling: 'raf' }
          );

          console.log('Bot está logado, adicionando dispositivo...');
          // Lógica para aguardar a presença de elementos que indicam que o bot está logado
          await page.waitForSelector('div#pane-side', { timeout: 240000 });
          console.log('Dispositivo adicionado com sucesso!');
      } else {
          console.log('Não foi possível capturar o QR code.');
      }
  } catch (error) {
      console.error('Erro ao adicionar o bot como novo dispositivo:', error);
  } finally {
      if (browser) {
          await browser.close();
      }
  }
}

adicionarBotWhatsApp()
  .then(() => console.log('Instalação concluída com sucesso!'))
  .catch((err) => console.error('Erro durante a instalação:', err));