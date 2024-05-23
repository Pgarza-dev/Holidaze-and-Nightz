import useFetch from "@/lib/hooks/data";
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

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        let currentPage = 1;
        let isLastPage = false;
        const venues = [];

        while (!isLastPage) {
          const response = await fetch(`${API_VENUES}?page=${currentPage}`);
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

    getData();
  }, []);

  const [filteredProducts, setFilteredProducts] = useState<Venue[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;

    if (searchTerm.length > 0) {
      const filteredData = data.filter((venue: { name: string }) => {
        return venue?.name.toLowerCase().includes(searchTerm.toLowerCase());
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
        className=" hidden w-96 flex-1 rounded-lg border border-background bg-background p-2 text-foreground outline-none transition-all duration-300 ease-in-out placeholder:text-sm focus:border-primary md:block"
      />
      {filteredProducts.map((venue: any) => (
        <div className=" absolute flex w-96 flex-col gap-4 rounded-lg bg-customBlack p-4">
          <Link
            href={`/venues/${venue?.id}`}
            key={venue?.id}
            onClick={handleLinkClick}
            className="text-base text-background hover:text-secondary dark:text-darkText"
          >
            <div className="h- flex flex-row items-center justify-start gap-4">
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
