'use client'
import React, {useEffect, useState} from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";


const API_KEY = process.env.NEXT_PUBLIC_API_KEY


export default function searchResults(){
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [queries, setQueries] = useState(query)
    const [page, setPage] = useState(1);
    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();
    const [loading, setloading] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [sortOpt, setSortOpt] = useState('');
    const [mediaFilter, setMediaFilter] = useState('all');

    

    useEffect(() => {
        setQueries(query);
        setPage(1);
    }, [query]);

    useEffect(() => {
        if (!query){
            setResults([]);
            setTotalPages(1);
            return
        }

        const fetchData = async () => {
           setloading(true);
            try{
            const res = await fetch(`https://api.themoviedb.org/3/search/multi?include_adult=false&api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
            const data = await res.json();
            setResults(data.results || []);
            setTotalPages(data.total_pages || 1);
            }catch (err) {
                console.error("Error fetching data:", err);
            } 
            finally {
                setloading(false);
            }
        };

      fetchData();  
    }, [query, page]);

    const handleSubmit = (e) => {

    e.preventDefault();
    setPage(1);
     console.log('Query:', query);

    if(queries.trim()) {
      router.push(`/search?q=${encodeURIComponent(queries)}`);
    }

    
   
  };

   const handleDropDown = () => {
    setMenuOpen(!isMenuOpen);
  };
    
  const sortedResults = [...results].sort((a,b) => {
    if (sortOpt === 'popularity'){
      return b.popularity - a.popularity;
    }
    if(sortOpt === 'release_date_desc') {
      const dateA = new Date(a.release_date || a.first_air_date || '1900-01-01');
      const dateB = new Date(b.release_date || b.first_air_date || '1900-01-01');
      return dateB - dateA;
    }
    if(sortOpt === 'release_date_aesc') {
      const dateA = new Date(a.release_date || a.first_air_date || '1900-01-01');
      const dateB = new Date(b.release_date || b.first_air_date || '1900-01-01');
      return dateA - dateB;
    }
    return 0;
  });


  const filteredResults = sortedResults.filter(item => {
    if(mediaFilter === 'all') return true;
    return item.media_type === mediaFilter;
  });
   

    return (
         <div className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-4 py-2 bg-[#333333]">
            <div className="text-lime-300 font-bold text-1"><a href="http://localhost:3000/">Mediapedia</a></div>
           <form onSubmit={handleSubmit} className="flex-1 mx-4">
          <input
            type="search"
            placeholder="Search to Explore..."
            value={queries}
            onChange={(e) => setQueries(e.target.value)}
            className="w-100 px-4 py-2 bg-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-lime-300"
            />
        </form>
            <div className="flex items-center space-x-4 relative">
               <div className="text-lime-300 hover:underline text-x1 px-4 py-2"><a href="http://localhost:3000/">Home</a></div>
                 <button onClick={handleDropDown} className=" text-lime-300 hover:underline">MENU</button>
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



        <main className="flex bg-[#DDF6D2] ">
            <div className="w-[25%] pr-4 border-r border-gray-400 text-black">
                <h2 className="text-lg font-semibold mb-2">Sort & Filter</h2>
                <div className="mb-4">
                  <label className="block font-medium mb-1">Sort By:</label>
                  <select
                    value={sortOpt}
                    onChange={(e) => setSortOpt(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded"
                    >
                      <option value="">Default</option>
                      <option value="popularity">Popularity</option>
                      <option value="release_date_desc">Release Date Descending</option>
                      <option value="release_date_aesc">Release Date Asecending</option>
                    </select>
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-1">Filter By:</label>
                  <select
                    value={mediaFilter}
                    onChange={(e) => setMediaFilter(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded"
                    >
                      <option value="all">All</option>
                      <option value="movie">Movies</option>
                      <option value="tv">TV</option>
                      <option value="person">People</option>
                    </select>
                </div>

            </div>


            <div className="w-[75%] pl-4">
            <h1 className="text-black font bold mb-4">Search result for: {query || "(empty)"}</h1>
            {loading && <p>Loading...</p>}
            {!loading && results.length === 0 && <p>No results found.</p>}

           <div className="grid grid-cols-3 gap-4">
            {filteredResults.map((item) => {
                const isMovie = item.media_type === 'movie';
                const isTV = item.media_type === 'tv';
                const isPerson = item.media_type === 'person';

                const title = isMovie ? item.title : isTV ? item.name : isPerson ? item.name : 'Unknown';

                const imagePath =
                 isMovie || isTV
                 ? item.poster_path
                 : isPerson
                 ? item.profile_path
                 : null;


                 const linkPath = isMovie ? `/Media/${item.id}`
                    : isTV ? `/Television/${item.id}`
                    : isPerson ? `Person/${item.id}`
                    : '#';

                return (
                <div key={`${item.media_type}-${item.id}`} className="text-black text-center">
                    <h2 className="mt-2 text-sm font-semibold">{title}</h2>
                    <p className="text-xs italic text-gray-500">{item.media_type.toUpperCase()}</p>
                    <div className="mb-2">
                   <Link href={linkPath}>
                 
                   {imagePath ? (
                     <img
              src={`https://image.tmdb.org/t/p/w500${imagePath}`}
              alt={title}
              width={192}
              height={288}
              className="rounded shadow mx-auto"
              />
              ) : (
                 <div className="w-48 h-72 bg-gray-100 flex items-center justify-center text-gray-700 rounded mx-auto">
              No image
            </div>
              )}
                     </Link>
                    
                    </div>
                    </div>
                );
            })}
            </div>
            </div>
            
        </main>
        <div className="flex justify-center items-center space-x-4 mt-6">
             <button
             onClick={()=> setPage((p) => Math.max(p-1,1))}
             disabled={page == 1 || loading}
             className="px-4 py-2 bg-lime-300 text-black rounded disabled:opacity-50">
                Previous
             </button>
             <span className="text-black">
                Page {page} of {totalPages}
             </span>

             <button
             onClick={()=> setPage((p) => Math.min(p+1,totalPages))}
             disabled={page == totalPages || loading}
             className="px-4 py-2 bg-lime-300 text-black rounded disabled:opacity-50">
                Next
             </button>
            
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