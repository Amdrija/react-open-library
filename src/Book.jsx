import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import SearchBook from './SearchBook';

export default function Book(props) {
  let params = useParams();
  const [book, setBook] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://openlibrary.org/books/${params.olid}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }

        return response.json();
      })
      .then((data) => {
        setBook(data);
        setError(false);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {error && <h1>An error occuredd</h1>}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="search-results">
          <SearchBook
            olid={params.olid}
            title={book.title}
            author={book.author_name}
            firstPublished={book.first_publish_year}
          />
        </div>
      )}
    </div>
  );
}
