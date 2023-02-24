import Link from "next/link";
import { useRouter } from "next/router";
import { useFetch } from "usehooks-ts";

// Step 0 : Define the types
// API Response
type SearchResponse = {
  products: {
    title: string;
  }[];
};

type SearchSuggestion = {
  title: string;
  url: string;
};

const SearchSuggestions = () => {
  const router = useRouter();
  // Step 1: Parse the router path

  const query =
    router.asPath
      .split("/")
      .filter((q) => !!q)
      .pop() ?? ""; // transforms: "/products/iphone" into "iphone"

  // Step 2: Create the URL
  // We're using dummyjson as an example
  // Most likely you have your own search api or If you're using algolia, that's even better.
  const url = new URL("https://dummyjson.com/products/search");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "4");

  // Step 3: Call the search API using useFetch. This can be improved If you have your search API
  const { data = { products: [] }, error } = useFetch<SearchResponse>(
    url.toString()
  );

  // Step 4: Map the results to our list of suggestions to show the user
  const suggestions = data?.products.map<SearchSuggestion>((p) => {
    return {
      title: p.title,
      // using home page route since the api doesn't return some kind of URL.
      url: "/",
    };
  });

  if (!data || error) return null;

  // Step 5: render the alternative suggestions
  return (
    <ul className="grid grid-cols-2 my-2">
      {suggestions.map((item, index) => (
        <li key={index}>
          <Link
            href={item.url}
            className="hover:underline hover:text-indigo-400 text-indigo-500 "
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestions;
