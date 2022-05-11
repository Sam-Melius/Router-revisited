import { useEffect, useState} from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';

export default function List() {
  const location = useLocation();
  const history = useHistory();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const status = new URLSearchParams(location.search).get('status') ?? 'all';
  

  const handleStatus = (event) => {
    history.push(`/?status=${event.target.value}`);
  };

  useEffect(() => {
    const getCharacters = async () => {
        setLoading(true);
  
        const statusParams = new URLSearchParams(location.search).get('status');
  
        const url = statusParams === 'all' || !statusParams 
        ? 'https://rickandmortyapi.com/api/character'
        : `https://rickandmortyapi.com/api/character?status=${statusParams}`;
        const res = await fetch(url);
        const { results } = await res.json();
        setCharacters(results);
        setLoading(false);
  
      };
      getCharacters();
    }, [location.search]);

  return (
    <>
    <h1>List of Characters</h1>
    {loading ? (
      <p>Loading</p>
    ) : (
      <section>
          <label htmlFor="status">Character status:</label>
          <select id="status" value={status} onChange={handleStatus}>
            <option value="all">All</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          {characters.map((character) => (
            <article key={character.id}>
              <Link to={`/characters/${character.id}`}>
                <h3>{character.name}</h3>
                <p>Status: {character.status}</p>
              </Link>
            </article>
          ))}
        </section>
    )}
    </>
  )
}
