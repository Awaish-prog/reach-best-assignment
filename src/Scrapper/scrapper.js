import * as puppeteer from 'puppeteer';

export async function scrapCryptoData(){
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(process.env.CRYPTO_SITE_URL);
        await page.evaluate(() => {
          window.scrollTo(0, 2000);
        });

        await new Promise((resolve, reject) => setTimeout(() => {resolve(1)}, 1000))

        await page.evaluate(() => {
            window.scrollTo(2000, 4000);
        });

        await new Promise((resolve, reject) => setTimeout(() => {resolve(1)}, 1000))

        await page.evaluate(() => {
            window.scrollTo(4000, 6000);
        });

        await new Promise((resolve, reject) => setTimeout(() => {resolve(1)}, 1000))

        await page.evaluate(() => {
            window.scrollTo(6000, 8000);
        });


        const tbody = await page.waitForSelector('tbody');
        
        const tbodyContent = await page.evaluate((element) => {
            const rows = Array.from(element.querySelectorAll('tr'));

            return rows.map((row) => {
                const cells = Array.from(row.querySelectorAll('td'));
                return cells.map((cell) => cell.textContent.trim());
            });
        }, tbody);
      
        await browser.close();
        return tbodyContent
    }
    catch(e){
        console.log(e);
    }   
}