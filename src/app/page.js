'use client'
import React, {useEffect , useState, useRef} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {
const [isMenuOpen, setMenuOpen] = useState(false);
const [query, setQuery] = useState('');
const router = useRouter();
const [movies, setMovies] = useState([]);
const [bgmovies, setBGMovies] = useState([]);
const [randmovies, setRandMovies] = useState([])
const [tv, setTV] = useState([]);
const [seasonMovies, setSeasonMovies] = useState([])
const seasonalRef = useRef(null)
const nowPlayingRef = useRef(null)
const nowAiringRef = useRef(null)


const getSeasonalID = () =>{
  const month = new Date().getMonth() + 1;
  if(month == 10) return 3335
  if(month == 11) return 4543
  if(month == 12) return 207317
  if(month == 2) return 160404
  if(month == 4) return 9921
  return '0'
}


 useEffect(() => {
        const fetchSeasonMovie = async () => {
          try {
            const keyword_id = getSeasonalID();
            const response = await fetch(`https://api.themoviedb.org/3/keyword/${keyword_id}/movies?api_key=${API_KEY}`);
            const data = await response.json();
            setSeasonMovies(data.results); 
          } catch (error) {
            console.error('Error fetching movies:', error);
          }
        };
        fetchSeasonMovie();
      }, []);

      useEffect(() => {
        const fetchMovie = async () => {
          try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
            const data = await response.json();
            setMovies(data.results); 
          } catch (error) {
            console.error('Error fetching movie:', error);
          }
        };
        fetchMovie();
      }, []);

      useEffect(() => {
        const fetchBG = async () => {
          try {
            const bgResponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
            const bgData = await bgResponse.json();
            setBGMovies(bgData.results); 
            const random = bgData.results[Math.floor(Math.random() * bgData.results.length)];
            setRandMovies(random)
          } catch (error) {
            console.error('Error fetching movie:', error);
          }
        };
        fetchBG();
      }, []);

      useEffect(() => {
        const fetchTV = async () => {
          try { 
            const tvResponse = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}`);
            const tvData = await tvResponse.json();
            setTV(tvData.results); 
          } catch (error) {
            console.error('Error fetching movie:', error);
          }
        };
        fetchTV();
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

 
  const scrollLeft = (ref) => {
    if(ref.current)
      ref.current.scrollBy({left: -1250, behavior: 'smooth'})
  }

  const scrollRight = (ref) => {
    if(ref.current)
      ref.current.scrollBy({left: 1250, behavior: 'smooth'})
  }
  
   
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
        <div className="text-lime-300 hover:underline text-x1 px-4 py-2"><a href="http://localhost:3000/">Home</a></div>
        <div className="flex items-center space-x-4 relative">
           
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

      <nav className="bg-[#c3b8c7] text-black px-6 py-3 flex space-x-6 justify-center shadow">
          <Link href={"/Movies"}>Movies</Link>
          <Link href={"/Tv"}>TV</Link>
          <Link href={"/People"}>People</Link>
        </nav>

          <div className="px-10 py-20 bg-[#DDF6D2]">

          </div>

      <section className="relative px-20 py-40 bg-cover bg-center drop-shadow text-lime-300"
      style={{backgroundImage : randmovies?.backdrop_path ? `url(https://image.tmdb.org/t/p/original${randmovies.backdrop_path})`
      : 'none',

      }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex flex-col justify-start items-start h-full pt-10">
       <h1 className="point drop-shadow-lg">Welcome to Mediapedia</h1>
       <h2 className="text-x1 drop-shadow" >Mediapedia is a media information website that utilizes the TMDB api to share info for your favorite Movies, TV, Cast and Crew members.</h2>
       </div>
      </section>

    <section className="bg-[#DDF6D2]">
    <div className="text-black font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[30px] row-start-2 items-center sm:items-start">

  <div className="relative">
        <button onClick={() =>scrollLeft(seasonalRef)} className=" absolute p-2 bg-black text-lime-300 left-0 top-1/2 transform-translate-y-1/2 z-10 rounded hover: bg-gray-800 ">
          ◀
        </button>
            <div ref={seasonalRef}
            className="overflow-x-auto  bg-[#EBD2F6] rounded shadow scrollbar-hide"
            style={{ scrollBehavior:'smooth', width:'1400px' }}>Holiday Movies: 
              <div className="flex space-x-4 flex-nowrap bg-[#EBD2F6] rounded shadow px-2"> 
                {seasonMovies.map((movies) => (
                  <div key={movies.id} className="flex-shrink-0 w-48 text-center bg-[#EBD2F6] rounded shadow">
              <Link href={`./Media/${movies.id}`} key={movies.id}>
              <img
              src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
              alt={movies.title}
              width={192}
              height={288}
              className="rounded shadow mx-auto bg-gray-300"
              />
              </Link>
              <h2 className="text-lg font-bold mb-2">{movies.title}</h2>
              </div>

                ))}
                <Link href={"/MoreMovie/MoreNowPlaying"}>
                <div className="flex-shrink-0 w-48 h-[288px] text-lime-300 bg-black rounded shadow text-center flex items-center justify-center">
                  Show More
                  </div>
                </Link>


                </div>
                
          </div>

          
                  <button onClick={() =>scrollRight(seasonalRef)} className=" absolute p-2 bg-black text-lime-300 right-0 top-1/2 transform-translate-y-1/2 z-10  rounded hover: bg-gray-800" >
          ▶
        </button>
          </div>
                
        <div className="relative">
        <button onClick={() =>scrollLeft(nowPlayingRef)} className=" absolute p-2 bg-black text-lime-300 left-0 top-1/2 transform-translate-y-1/2 z-10 rounded hover: bg-gray-800 ">
          ◀
        </button>
            <div ref={nowPlayingRef}
            className="overflow-x-auto  bg-[#EBD2F6] rounded shadow scrollbar-hide"
            style={{ scrollBehavior:'smooth', width:'1400px' }}>Now Playing: 
              <div className="flex space-x-4 flex-nowrap bg-[#EBD2F6] rounded shadow px-2"> 
                {movies.map((movie) => (
                  <div key={movie.id} className="flex-shrink-0 w-48 text-center bg-[#EBD2F6] rounded shadow">
              <Link href={`./Media/${movie.id}`} key={movie.id}>
              <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={192}
              height={288}
              className="rounded shadow mx-auto bg-gray-300"
              />
              </Link>
              <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
              </div>

                ))}
                <Link href={"/MoreMovie/MoreNowPlaying"}>
                <div className="flex-shrink-0 w-48 h-[288px] text-lime-300 bg-black rounded shadow text-center flex items-center justify-center">
                  Show More
                  </div>
                </Link>


                </div>
                
          </div>
                  <button onClick={() =>scrollRight(nowPlayingRef)} className=" absolute p-2 bg-black text-lime-300 right-0 top-1/2 transform-translate-y-1/2 z-10  rounded hover: bg-gray-800" >
          ▶
        </button>
          </div>

                 <div className="relative">
        <button onClick={() =>scrollLeft(nowAiringRef)} className=" absolute p-2 bg-black text-lime-300 left-0 top-1/2 transform-translate-y-1/2 z-10  rounded hover: bg-gray-800">
          ◀
        </button>
           <div ref={nowAiringRef}
           className="overflow-x-auto bg-[#EBD2F6] rounded shadow px-2"
            style={{ scrollBehavior: 'smooth',width:'1400px' }}>Airing Today: 
              <div className="flex space-x-4 flex-nowrap bg-[#EBD2F6] rounded shadow"> 
                {tv.map((TV) => (
                  <div key={TV.id} className="flex-shrink-0 w-48 text-center bg-[#EBD2F6] rounded shadow">
              <Link href={`./Television/${TV.id}`} key={TV.id}>
              <img
              src={`https://image.tmdb.org/t/p/w500${TV.poster_path}`}
              alt={TV.name}
              width={192}
              height={288}
              className="rounded shadow mx-auto bg-gray-300 "
              />
              </Link>
              <h2 className="text-lg font-bold mb-2">{TV.name}</h2>
              </div>

                ))}
                <Link href={"/MoreTV/MoreAiringToday"}>
                <div className="flex-shrink-0 w-48 h-[288px] text-lime-300 bg-black rounded shadow text-center flex items-center justify-center">
                  Show More
                  </div>
                </Link>


                </div>
                
          </div>
          <button onClick={() =>scrollRight(nowAiringRef)} className=" absolute p-2 bg-black text-lime-300 right-0 top-1/2 transform-translate-y-1/2 z-10  rounded hover: bg-gray-800" >
          ▶
        </button>
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
    
    </section>
    
  </div>
  );
}
