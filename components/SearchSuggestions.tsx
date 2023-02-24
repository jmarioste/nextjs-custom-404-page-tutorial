import Link from "next/link";
import { useRouter } from "next/router";
import { useFetch } from "usehooks-ts";
type Product = {
  title: string;
};

type SearchResponse = {
  products: Product[];
};

type SearchSuggestion = {
  title: string;
  url: string;
};
const SearchSuggestions = () => {
  const router = useRouter();
  const query =
    router.asPath
      .split("/")
      .filter((q) => !!q)
      .pop() ?? ""; // transforms: "/products/iphone" into "iphone"

  // create the URL
  const url = new URL("https://dummyjson.com/products/search");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "4");

  // Call the search API using useFetch. This can be improved If you have your search API
  const { data = { products: [] }, error } = useFetch<SearchResponse>(
    url.toString()
  );

  // list of suggestions to show the user
  const suggestions = data?.products.map<SearchSuggestion>((p) => {
    return {
      title: p.title,
      url: "/",
    };
  });

  if (!data || error) return null;

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
