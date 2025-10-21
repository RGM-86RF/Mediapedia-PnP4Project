'use client'
import React, {useEffect,useState} from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY






export default function Movieinfo() {
    const{id} = useParams();
    const [query, setQuery] = useState('');
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [person,setPerson] = useState(null);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [loading, setloading] = useState(false);
    const router = useRouter();
    
    
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

      useEffect(() => {
                const fetchCast = async () => {
                  try {
                    const castResponse = await fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}`);
                    const castData = await castResponse.json();
                    setCast(castData.cast); 
                  } catch (error) {
                    console.error('Error fetching trailer:', error);
                  }
                };
                if(id){
                fetchCast();
                }
              }, [id]);

                useEffect(() => {
                const fetchCrew = async () => {
                  try {
                    const crewResponse = await fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}`);
                    const crewData = await crewResponse.json();
                    setCrew(crewData.crew); 
                  } catch (error) {
                    console.error('Error fetching trailer:', error);
                  }
                };
                if(id){
                fetchCrew();
                }
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

  const movies = cast.filter((item) => item.media_type === 'movie')
  const TV = cast.filter((item) => item.media_type === 'tv')

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
        <div className="text-lime-300 hover:underline text-x1 px-4 py-2"><a href="http://localhost:3000/">Home</a></div>
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
               <div className="flex flex-col lg:flex-row gap-6 mt-6 w-full max-w-screen-xl mx-auto">
              <div className=" flex-grow bg-gray-300 rounded shadow mx-auto">
              <p className="mt-4 text-lg font-bold text-decleration-line: underline">Known For:</p>
              <p className="text-lg bg-gray-300">{person.known_for_department}</p>
              <p className="mt-4 text-lg font-bold text-decleration-line: underline">Overview:</p>
              <p className="text-lg bg-gray-300 ">{person.biography}</p>
              </div>
              </div>

              <div className="mt-8 bg-gray-300 rounded shadow px-2">
                <h2 className="text-1 font-bold mb-4 ">Cast</h2>
                <div className="flex space-x-4 overflow-x-auto ">
               {cast.filter((peeps) => !peeps.adult).map((peeps) => (
                  <div key={`movies-${peeps.id}-${peeps.character}`} className="flex-shrink-0 w-48 text-center ">
              <Link href={peeps.media_type === 'movie' ? `../Media/${peeps.id}` : ` ../Television/${peeps.id}`} key={peeps.id}>
              <img
              src={`https://image.tmdb.org/t/p/w500${peeps.poster_path}`}
              alt={peeps.title || peeps.name}
              width={192}
              height={288}
              className="rounded shadow mx-auto"
              />
              </Link>
              <h2 className="text-lg font-bold mb-2">{peeps.title || peeps.name}</h2>
              <p className="text-sm italic text-gray-600">{peeps.character}</p>
              <p className="mt-2 text-sm italic text-gray-600">{peeps.media_type}</p>
              </div>

                ))}
                </div>
                </div>

                <div className="mt-8 bg-gray-300 rounded shadow px-2">
                <h2 className="text-1 font-bold mb-4">Crew</h2>
                <div className="flex space-x-4 overflow-x-auto">
               {crew.map((jobs) => (
                  <div key={`crew-${jobs.id}-${jobs.job}`} className="flex-shrink-0 w-48 text-center ">
              <Link href={
                jobs.media_type === 'movie' ? `../Media/${jobs.id}` : ` ../Television/${jobs.id}`} key={jobs.id}>
              <img
              src={`https://image.tmdb.org/t/p/w500${jobs.poster_path}`}
              alt={jobs.title || jobs.name}
              width={192}
              height={288}
              className="rounded shadow mx-auto"
              />
              </Link>
              <h2 className="text-lg font-bold mb-2">{jobs.title || jobs.name}</h2>
              <p className="text-sm italic text-gray-600">{jobs.job}</p>
              <p className="mt-2 text-sm italic text-gray-600">{jobs.media_type}</p>
              </div>

                ))}
                </div>
                </div>
              
              

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