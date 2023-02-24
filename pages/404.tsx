import dynamic from "next/dynamic";
import Link from "next/link";
import SearchSuggestions from "../components/SearchSuggestions";
// const SearchSuggestions = dynamic(
//   () => import("../components/SearchSuggestions")
// );
const Custom404 = () => {
  return (
    <div className="grid place-content-center h-screen">
      <div className="container lg:mx-auto max-w-md text-center">
        <h1 className="text-4xl font-bold text-zinc-700 my-4">
          404 - Page Not Found
        </h1>
        <p className="text-zinc-400">
          Sorry, we could not find the page you are looking for. Instead, here
          are some similar pages that could help:
        </p>
        <SearchSuggestions />
        {/*TODO: Create Search bar component here */}
        <div className="border border-b-gray-50 my-4"></div>
        {/* Add navigation to important pages */}
        <div>
          <Link
            className="hover:underline hover:text-indigo-400 text-indigo-500"
            href="/"
          >
            Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Custom404;
