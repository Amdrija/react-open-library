import './css/searchBook.css';
import { Link } from 'react-router-dom';

function SearchBook(props) {
  return (
    <Link to={`/books/${props.olid}`} className="link">
      <div className="searchBook">
        <img
          src={`https://covers.openlibrary.org/b/olid/${props.olid}-M.jpg`}
        />
        <div>
          <h2>{props.title}</h2>
          <h3>{props.author}</h3>
          <h3>{props.firstPublished}</h3>
        </div>
      </div>
    </Link>
  );
}

export default SearchBook;
