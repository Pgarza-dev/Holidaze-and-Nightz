import { API_VENUES } from "@/shared/ApiEndPoints";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Venue = {
  id: string;
  name: string;
  media: { url: string }[];
};

function SearchBar() {
  const [data, setData] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        let currentPage = 1;
        let isLastPage = false;
        const venues = [];

        while (!isLastPage) {
          const response = await fetch(
            `${API_VENUES}/search?q=${searchTerm}&page=${currentPage}`,
          );
          const result = await response.json();
          venues.push(...result.data);
          isLastPage = result.meta.isLastPage;
          currentPage++;
        }
        setData(venues);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (searchTerm) {
      getData();
    }
  }, [searchTerm]);

  const [filteredProducts, setFilteredProducts] = useState<Venue[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const filteredData = data.filter((venue: { name: string }) => {
        return venue?.name.toLowerCase().includes(term.toLowerCase());
      });
      setFilteredProducts(filteredData);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleLinkClick = () => {
    setFilteredProducts([]);
  };

  return (
    <form className="relative">
      <input
        type="text"
        placeholder="Search for venues"
        autoComplete="on"
        onChange={handleSearch}
        className="flex w-96 flex-1 rounded-lg border border-background bg-background p-2 text-foreground outline-none transition-all duration-300 ease-in-out placeholder:text-sm focus:border-primary dark:bg-customWhite dark:text-customBlack md:block"
      />
      {filteredProducts.map((venue: any) => (
        <div
          key={venue?.id}
          className=" absolute flex w-96 flex-col gap-4 rounded-lg bg-customBlack p-4"
        >
          <Link
            href={`/venues/${venue?.id}`}
            key={venue?.id}
            onClick={handleLinkClick}
            className="text-base text-background hover:text-secondary dark:text-darkText"
          >
            <div className="flex h-10 flex-row items-center justify-start gap-4">
              <Image
                src={venue?.media[0]?.url}
                alt={venue?.name}
                width={50}
                height={50}
                className="max-h-12 rounded-lg object-cover"
              />
              <span className="truncate">{venue?.name}</span>
            </div>
          </Link>
        </div>
      ))}
    </form>
  );
}

export default SearchBar;
