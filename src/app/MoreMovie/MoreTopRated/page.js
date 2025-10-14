'use client'
import React, {useEffect, useState} from "react";
import Link from "next/link";
import { useRouter,} from "next/navigation";

 const API_KEY = process.env.NEXT_PUBLIC_API_KEY;


export default function nowPlaying(){
    const [page, setPage] = useState(1);
    
    const [query, setQuery] = useState('');
    const [movie, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();
    const [loading, setloading] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);


    

    useEffect(() => {
        
        setPage(1);
    }, []);

    useEffect(() => {
        
        const fetchData = async () => {
           setloading(true);
            try{
            const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`);
            const data = await res.json();
            setMovies(data.results);
            setTotalPages(data.total_pages || 1);
            }catch (err) {
                console.error("Error fetching data:", err);
            } 
            finally {
                setloading(false);
            }
        };

      fetchData();  
    }, [page]);

    const handleSubmit = (e) => {

    e.preventDefault();
    setPage(1);
     console.log('Query:', query);

    if(queries.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }

    
   
  };

   const handleDropDown = () => {
    setMenuOpen(!isMenuOpen);
  };
    
  
   

    return (
         <div className="flex flex-col min-h-screen bg-[#DDF6D2]">
        <header className="flex items-center justify-between px-4 py-2 bg-[#333333]">
            <div className="text-lime-300 font-bold text-1"><a href="http://localhost:3000/">Mediapedia</a></div>
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



        <main className="flex">
         


            <div className="w-[100%]">
            
            {loading && <p>Loading...</p>}
            {!loading && movie.length === 0&& <p>No Results Found</p>}
            

           <div className="grid grid-cols-3 gap-4">
            {movie.map((item) => (
                <div key={item.id} className="text-black text-center">
                    <h2 className="mt-2 text-sm font-semibold">{item.title}</h2>
                    <p className="text-xs italic text-gray-500">{item.media_type}</p>
                    <div className="mb-2">
                   <Link href={`../Media/${item.id}`} key={item.id}>
                 
                     <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
              width={192}
              height={288}
              className="rounded shadow mx-auto"
              />
              
                     </Link>
                    
                    </div>
                    </div>
            
            ))}
            
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
      </footer>
         </div>
    );
}