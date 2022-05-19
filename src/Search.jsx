import SearchBook from './SearchBook';
import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './css/search.css';
import debounce from './debounce';
import Loader from './Loader';
import { useSearchParams } from 'react-router-dom';
function Search() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchWord = search || searchParams.get('search');
    console.log(searchWord);
    if (!searchWord) {
      return;
    }

    setIsLoading(true);
    fetch(
      `http://openlibrary.org/search.json?q=${searchWord.replace(
        ' ',
        '+'
      )}&limit=10`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }

        return response.json();
      })
      .then((data) => {
        setBooks(data.docs);
        setError(false);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [search]);

  const handleChange = debounce((e) => {
    setBooks([]);
    setSearch(e.target.value);
    setSearchParams({ search: e.target.value });
  }, 300);

  return (
    <div className="container">
      {error && <h1>An error occuredd</h1>}
      <input
        type="text"
        name="search"
        onChange={handleChange}
        placeholder="Search"
      />
      <h1>Search Results</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="search-results">
          {books.map((book) => (
            <SearchBook
              key={book.key}
              olid={book.cover_edition_key}
              title={book.title}
              author={book.author_name}
              firstPublished={book.first_publish_year}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
