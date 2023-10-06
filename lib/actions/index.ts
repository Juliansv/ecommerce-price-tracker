"use server"

import { scrapeMeliProduct } from "../scraper"

export async function scrapeAndStoreProduct(productURL: string) {
    if(!productURL) {
        return
    }
    try {
        const scrapedProduct = await scrapeMeliProduct(productURL)
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        throw new Error(`Failed to create/update product: ${message}`)
    }
}