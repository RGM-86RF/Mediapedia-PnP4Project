'use client'
import React, {useEffect,useState} from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY






export default function Movieinfo() {
    const{id} = useParams();
    const [query, setQuery] = useState('');
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [person,setPerson] = useState(null);
    const [loading, setloading] = useState(false);
    
    
    useEffect(() => {
        if(!id) return;

    async function getPerson(){
    try{    
    const res = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}`);
     const data = await res.json();
     setPerson(data);
     setloading(false);
    } catch (err){
        console.error('Error fetching show: ', err);
        setloading(false);
    }
    }

    getPerson();
    }, [id]);

    
    if(loading || !person) {
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

        <nav className="bg-gray-300 text-black px-6 py-3 flex space-x-6 justify-center shadow">
          <Link href={"/Movies"}>Movies</Link>
          <Link href={"/Tv"}>TV</Link>
          <Link href={"/People"}>People</Link>
        </nav>

        <main className="mt-20 px-6 pb-10 flex-grow">
        <div key={person.id} className="p-10 w-250 text-black ">
            <h1 className="text-lg font-bold mb-2">{person.name}</h1>
             <img
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt={person.name}
              width={250}
              height={550}
              className="rounded shadow"
              />
              <p className="mt-4 text-lg">Overview:</p>
              <p className="text-lg bg-gray-300 rounded shadow">{person.biography}</p>

             
              

       </div>
       </main>
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
         
        
         
    )
}