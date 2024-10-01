import { useEffect, useState } from "react";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

useEffect(() => {
    const fetchBooks = async () => {
        try {
            setLoading(true);

            const response = await fetch("https://openlibrary.org/people/mekBot/books/currently-reading.json");

            const data = await response.json();

            setBooks(data.reading_log_entries);
            setLoading(false);
        } catch(error) {
            setError(error.message)
        }
    };

    fetchBooks();
},[])

  if (loading) return <p>Loading Books...</p>;
  if (error) return <p>Error loading books...</p>;

  return (
    <>
      <div>
        <h1>Book Library</h1>
        <ul>
            {books.map((book) => (
                <li key={book.work.cover_id}>
                    {book.work.title}
                </li>
            ))}
        </ul>
      </div>
    </>
  )
};

export default Books;