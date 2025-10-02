'use client'
import Image from "next/image";
import React, {useEffect , useState} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {

const [query, setQuery] = useState('');
const router = useRouter();
const [movies, setMovies] = useState([]);

      useEffect(() => {
        const fetchMovie = async () => {
          try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
            const data = await response.json();
            setMovies(data.results); 
          } catch (error) {
            console.error('Error fetching movie:', error);
          }
        };
        fetchMovie();
      }, []);

  const handleSubmit = (e) => {

    e.preventDefault();
     console.log('Query:', query);
    if(query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }

  };

   
  return (
    <div className="flex flex-col min-h-screen">
    <header className="flex items-center justify-between px-4 py-2 bg-[#333333]">
        <div className="text-lime-300 font-bold text-x1">Mediapedia</div>
        <form onSubmit={handleSubmit} className="flex-1 mx-4">
          <input
            type="search"
            placeholder="Search to Explore..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-100 px-4 py-2 bg-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-lime-300"
            />
        </form>
        <div className="flex items-center space-x-4">
          <button className=" text-lime-300 hover:underline">MENU</button>
        </div>
      </header>
      <section className="text-black px-20 py-40">
       <h1 className="point">Welcome to Mediapedia</h1> 
        
      </section>

    <section>
    <div className="text-black font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <div className="overflow-x-auto"
            style={{ width: '1400px' }}>
              <div className="flex space-x-4 flex-nowrap"> 
                {movies.map((movie) => (
                  <div key={movie.id} className="flex-shrink-0 w-48 text-center">
              <Link href={`./Media/${movie.id}`} key={movie.id}>
              <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={192}
              height={288}
              className="rounded shadow mx-auto"
              />
              </Link>
              <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
              </div>

                ))}
                </div>
          </div>
        
      </main>
      </div>
      <footer> 
        <p>Mediapedia -Student Project- by Antonio Gage</p>
      </footer>
    
    </section>
    
  </div>
  );
}
