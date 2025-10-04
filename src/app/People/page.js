'use client'
import React, {useEffect , useState,} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


 const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function People(){
const [isMenuOpen, setMenuOpen] = useState(false);
const [query, setQuery] = useState('');
const router = useRouter();
const [popPeople, setPopPeople] = useState([]);


      useEffect(() => {
        const fetchPopPeople = async () => {
          try {
            const response = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`);
            const data = await response.json();
            setPopPeople(data.results); 
          } catch (error) {
            console.error('Error fetching movie:', error);
          }
        };
        fetchPopPeople();
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
      <section className="text-black">
       <h1 className="point">People</h1> 
        
      </section>

    <section> 
    <div className="text-black font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20 gap-8 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <div className="overflow-x-auto"
            style={{ width: '1400px' }}> Popular:
              <div className="flex space-x-4 flex-nowrap"> 
                {popPeople.map((peeps) => (
                  <div key={peeps.id} className="flex-shrink-0 w-48 text-center">
              <Link href={`./Peoples/${peeps.id}`} key={peeps.id}>
              <img
              src={`https://image.tmdb.org/t/p/w500${peeps.profile_path}`}
              alt={peeps.name}
              width={192}
              height={288}
              className="rounded shadow mx-auto"
              />
              </Link>
              <h2 className="text-lg font-bold mb-2">{peeps.name}</h2>
              </div>

                ))}
                </div>
          </div>
        
      </main>
      
      </div>
      </section>
     
      <footer> 
        <p>Mediapedia -Student Project- by Antonio Gage</p>
      </footer>
    
  
    
  </div>
  );
}