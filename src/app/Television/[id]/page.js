'use client'
import React, {useEffect,useState} from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY






export default function Movieinfo() {
    const{id} = useParams();
    const [query, setQuery] = useState('');
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [tv,setTV] = useState(null);
    const [loading, setloading] = useState(false);
    const [providers, setProviders] = useState(null);
    
    useEffect(() => {
        if(!id) return;

    async function getShow(){
    try{    
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`);
     const data = await res.json();
     setTV(data);
     setloading(false);
    } catch (err){
        console.error('Error fetching show: ', err);
        setloading(false);
    }
    }

    getShow();
    }, [id]);

     useEffect(() => {
                const fetchProviders = async () => {
                  try {
                    const response1 = await fetch(`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${API_KEY}`);
                    const data1 = await response1.json();
                    setProviders(data1.results); 
                  } catch (error) {
                    console.error('Error fetching movie:', error);
                  }
                };
                fetchProviders();
              }, []);

    
    if(loading || !tv) {
        return <div className="p-8 text-black">Loading...</div>
    }

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
         <div className="flex flex-col min-h-screen">
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
                 <button onClick={handleDropDown} className=" text-lime-300 hover:underline relative">MENU</button>
                 {isMenuOpen &&(
            <ul className=" text-black absolute top-full mt-2 bg-gray-100 border border-gray-300 shadow-lg rounded w-20 z-10">
                <li className="hover:bg-gray-300"><Link href={"/Movies"}>Movies</Link></li>
                <li className=" hover:bg-gray-300"> <Link href={"/Tv"}>TV</Link></li>
                <li className="hover:bg-gray-300"><Link href={"/People"}>People</Link></li>
            </ul> 
          )}
            </div>
        </header>

        <main className="mt-20 px-6 pb-10 flex-grow">
        <div key={tv.id} className="p-10 w-250 text-black ">
            <h1 className="text-lg font-bold mb-2">{tv.title}</h1>
             <img
              src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
              alt={tv.title}
              width={250}
              height={550}
              className="rounded shadow"
              />
              <p className="mt-4 text-lg">Overview:</p>
              <p className="  text-lg">{tv.overview}</p>

              <div className="mt-8">
                <h2 className="text-1 font-bold mb-4">Where to watch</h2>
                {providers && providers.US && providers.US.flatrate ? (
                <ul>
                    {providers.US.flatrate.map((provider) => (
                        <li key={provider.provider_id} className="mb-2 flex items-center space-x-2">
                          <img 
                          src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                          alt={provider.provider_name}
                          className="inline-block"
                          />
                          <span>{provider.provider_name}</span>
                        </li>
                    ))}
                </ul>
                ) : (
                  <p>No streaming providers available</p>
                )}
              </div>
              

       </div>
       </main>
       <footer> 
        <p>Mediapedia -Student Project- by Antonio Gage</p>
      </footer>
        </div>
         
        
         
    )
}