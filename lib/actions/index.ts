"use server"

import { connectToDB } from "../mongoose"
import { scrapeMeliProduct } from "../scraper"

export async function scrapeAndStoreProduct(productURL: string) {
    if(!productURL) {
        return
    }
    try {
        // connect to db
        connectToDB()

        const scrapedProduct = await scrapeMeliProduct(productURL)
        
        if (!scrapedProduct) return;
        
        // store product in database

        
        // return product
        return scrapedProduct
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        throw new Error(`Failed to create/update product: ${message}`)
    }
}