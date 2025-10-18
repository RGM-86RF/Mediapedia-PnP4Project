'use client'
import React, {useEffect , useState,} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


 const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Movies(){
    const [isMenuOpen, setMenuOpen] = useState(false);
const [query, setQuery] = useState('');
const router = useRouter();
const [popMovies, setPopMovies] = useState([]);
const [topMovies, setTopMovies] = useState([]);

      useEffect(() => {
        const fetchMovie = async () => {
          try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
            const data = await response.json();
            setPopMovies(data.results); 
          } catch (error) {
            console.error('Error fetching movie:', error);
          }
        };
        fetchMovie();
      }, []);

       useEffect(() => {
        const fetchTopMovie = async () => {
          try {
            const response1 = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
            const data1 = await response1.json();
            setTopMovies(data1.results); 
          } catch (error) {
            console.error('Error fetching movie:', error);
          }
        };
        fetchTopMovie();
      }, []);

  const handleSubmit = (e) => {

    e.preventDefault();
     console.log('Query:', query);
    if(query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }

  };

  const handleDropDown = () => {
    setMenuOpen(!isMenuOpen);
  };
   
  return (
    <div className="flex flex-col min-h-screen bg-[#DDF6D2]">
    <header className="flex items-center justify-between px-4 py-2 bg-[#333333]">
        <div className="text-lime-300 font-bold text-x1"><a href="http://localhost:3000/">Mediapedia</a></div>
        <form onSubmit={handleSubmit} className="flex-1 mx-4">
          <input
            type="search"
            placeholder="Search to Explore..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-100 px-4 py-2 bg-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-lime-300"
            />
        </form>
        <div className="flex items-center space-x-4 relative">
           <div className="text-lime-300 hover:underline text-x1 px-4 py-2"><a href="http://localhost:3000/">Home</a></div>
          <button onClick={handleDropDown} className=" text-lime-300 hover:underline relative">
          MENU</button>
          {isMenuOpen &&(
             <ul className=" text-black absolute top-full mt-2 bg-gray-100 border border-gray-300 shadow-lg rounded w-20 z-10">
                <li className="hover:bg-gray-300"><Link href={"/Movies"}>Movies</Link></li>
                <li className=" hover:bg-gray-300"> <Link href={"/Tv"}>TV</Link></li>
                <li className="hover:bg-gray-300"><Link href={"/People"}>People</Link></li>
            </ul> 
          )}

        </div>
      </header>
          <nav className="bg-gray-300 text-black px-6 py-3 flex space-x-6 justify-center shadow">
          <Link href={"/Movies"}>Movies</Link>
          <Link href={"/Tv"}>TV</Link>
          <Link href={"/People"}>People</Link>
        </nav>

      <section className=" px-10 py-10 text-black">
       <h1 className="point">Movies</h1> 
        
      </section>

    
    <div className="text-black font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 pb-20 gap-8 sm:p-20 px-2">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start bg-gray-300 rounded shadow px-2">
            <div className="overflow-x-auto"
            style={{ width: '1400px' }}> Popular:
              <div className="flex space-x-4 flex-nowrap bg-gray-300 rounded shadow"> 
                {popMovies.filter((movie) => !movie.adult).map((movie) => (
                  <div key={movie.id} className="flex-shrink-0 w-48 text-center bg-gray-300 rounded shadow">
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
                <Link href={"/MoreMovie/MorePopular"}>
                <div className="flex-shrink-0 w-48 h-[288px] text-lime-300 bg-black rounded shadow text-center flex items-center justify-center">
                  Show More
                  </div>
                </Link>
                </div>
          </div>
        
      </main>
      
      </div>
      
      
    <div className="text-black font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-4 pb-20 gap-8 sm:p-20 px-2 ">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <div className="overflow-x-auto bg-gray-300 rounded shadow px-2"
            style={{ width: '1400px' }}> Top Rated:
              <div className="flex space-x-4 flex-nowrap bg-gray-300 rounded shadow"> 
                {topMovies.filter((movies) => !movies.adult).map((movies) => (
                  <div key={movies.id} className="flex-shrink-0 w-48 text-center bg-gray-300 rounded shadow">
              <Link href={`./Media/${movies.id}`} key={movies.id}>
              <img
              src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
              alt={movies.title}
              width={192}
              height={288}
              className="rounded shadow mx-auto"
              />
              </Link>
              <h2 className="text-lg font-bold mb-2">{movies.title}</h2>
              </div>

                ))}
                <Link href={"/MoreMovie/MoreTopRated"}>
                <div className="flex-shrink-0 w-48 h-[288px] text-lime-300 bg-black rounded shadow text-center flex items-center justify-center">
                  Show More
                  </div>
                </Link>
                </div>
          </div>
        
      </main>
      
      </div>
      
      <footer> 
        <p>Mediapedia -Student Project- by Antonio Gage</p>
        <div className="px-6">
        <img
        src={"/TMDBAttribution.svg"}
        width={75}
        height={75}
        className=""
        />
        </div>
      </footer>
    
  
    
  </div>
  );
}

