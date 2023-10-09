"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";

const isValidMeliURL = (url: string) => {
  try {
    const parsedURL = new URL(url);

    const hostname = parsedURL.hostname;

    // Check if the hostname is a valid MercadoLibre domain
    if (
      hostname.includes("mercadolibre.com") ||
      hostname.includes("mercadolibre.") ||
      hostname.endsWith("mercadolibre")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidMeliURL(searchPrompt);

    if (!isValidLink)
      return alert(
        "Please provide a valid Meli link. Make sure it start with https or http"
      );

    try {
      setIsLoading(true);
      // Scrape the product page
      
      const product = await scrapeAndStoreProduct(searchPrompt)
      
      
    } catch (error) {
      console.log(error);
      
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"
      />
      <button className="searchbar-btn" type="submit" disabled={searchPrompt === '' || isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
