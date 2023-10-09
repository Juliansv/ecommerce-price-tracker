import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeMeliProduct (url: string) {
    if(!url) return

    // BrightData proxy configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try {
        // Fetch the product page
        const response = await axios.get(url, options)

        const $ = cheerio.load(response.data)

        // Get the product title
        const title = $('h1').text().trim()
        const price = $('.ui-pdp-price__main-container .ui-pdp-price__second-line .andes-money-amount__fraction').text().trim()
        const availability = $('#available_quantity').text().trim().includes("disponible" || "disponibles")
        const image = $('.ui-pdp-gallery__figure img').first()[0].attribs.src


        return {title, price, availability, image}
        
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        throw new Error(`Failed to scrape product: ${message}`)
    }

}