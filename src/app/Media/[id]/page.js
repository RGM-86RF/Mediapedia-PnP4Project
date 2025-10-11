'use client'
import React, {useEffect,useState} from "react";
import { useParams } from "next/navigation";
import Link from "next/link";


const API_KEY = process.env.NEXT_PUBLIC_API_KEY






export default function Movieinfo() {
    const{id} = useParams();
    const [query, setQuery] = useState('');
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [movie,setMovie] = useState(null);
    const [loading, setloading] = useState(false);
    const [providers, setProviders] = useState(null);
    const [video, setVideo] = useState([])
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [rec, setRecommend] = useState([]);
    
    useEffect(() => {
        if(!id) return;

    async function getMovie(){
    try{    
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
     const data = await res.json();
     setMovie(data);
     setloading(false);
    } catch (err){
        console.error('Error fetchign movie: ', err);
        setloading(false);
    }
    }

    getMovie();
    }, [id]);

    useEffect(() => {
            const fetchProviders = async () => {
              try {
                const response1 = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`);
                const data1 = await response1.json();
                setProviders(data1.results); 
              } catch (err) {
                console.error('Error fetching movie:', err);
              }
            };
            fetchProviders();
          }, []);


     useEffect(() => {
            const fetchVideo = async () => {
              try {
                const vidResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`);
                const vidData = await vidResponse.json();
                setVideo(vidData.results); 
              } catch (error) {
                console.error('Error fetching trailer:', error);
              }
            };
            if(id){
            fetchVideo();
            }
          }, [id]);

          useEffect(() => {
            const fetchCast = async () => {
              try {
                const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
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
                const crewResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
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

           useEffect(() => {
            const fetchCrew = async () => {
              try {
                const recResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`);
                const recData = await recResponse.json();
                setRecommend(recData.results); 
              } catch (error) {
                console.error('Error fetching trailer:', error);
              }
            };
            if(id){
            fetchCrew();
            }
          }, [id]);

          
    
    if(loading || !movie) {
        return <div className="p-8 text-black">Loading...</div>
    }

    const trailer = video.find((vid) => vid.type === "Trailer" && vid.official == true &&vid.site === "YouTube");

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
        <div key={movie.id} className="p-10 w-250 text-black ">
            <h1 className="text-lg font-bold mb-2">{movie.title}</h1>
            <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-shrink-0">
             <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={250}
              height={550}
              className="rounded shadow"
              />
              </div>
              
              {trailer ? (
                <div className="flex-grow">
                  <div className="aspect-w-16 aspect-h-9 w-full">
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title={trailer.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      ></iframe>
                  </div>
                  </div>
              ) :( 
                <p className="text-black">No trailer available</p>
              )}
              </div>




              <p className="mt-4  text-lg"> Runtime: {movie.runtime} mins</p>
              <p className="mt-4  text-lg">{movie.overview}</p>
              <p className="mt-4  text-lg">Budget:</p>
              <p className="  text-lg">${movie.budget}</p>
              <p className="mt-4  text-lg">Revenue:</p>
              <p className="mt-4  text-lg">${movie.revenue}</p>



              <div className="mt-8">
                <h2 className="text-1 font-bold mb-4">Cast</h2>
                <div className="flex space-x-4 overflow-x-auto">
               {cast.map((peeps) => (
                  <div key={`cast-${peeps.id}-${peeps.job}`} className="flex-shrink-0 w-48 text-center">
              <Link href={`../Person/${peeps.id}`} key={peeps.id}>
              <img
              src={`https://image.tmdb.org/t/p/w500${peeps.profile_path}`}
              alt={peeps.name}
              width={192}
              height={288}
              className="rounded shadow mx-auto"
              />
              </Link>
              <h2 className="text-lg font-bold mb-2">{peeps.name}</h2>
              <p className="text-sm italic text-gray-600">{peeps.character}</p>
              </div>

                ))}
                </div>
                </div>

                 <div className="mt-8">
                <h2 className="text-1 font-bold mb-4">Cast</h2>
                <div className="flex space-x-4 overflow-x-auto">
               {crew.map((peep) => (
                  <div key={`crew-${peep.id}-${peep.job}`} className="flex-shrink-0 w-48 text-center">
              <Link href={`../Person/${peep.id}`} key={peep.id}>
              <img
              src={`https://image.tmdb.org/t/p/w500${peep.profile_path}`}
              alt={peep.name}
              width={192}
              height={288}
              className="rounded shadow mx-auto"
              />
              </Link>
              <h2 className="text-lg font-bold mb-2">{peep.name}</h2>
              <p className="text-sm italic text-gray-600">{peep.job}</p>
              </div>

                ))}
                </div>
                </div>
              
              
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

              <div className="mt-8">
                <h2 className="text-1 font-bold mb-4">Recomendations</h2>
                <div className="flex space-x-4 overflow-x-auto">
               {rec.map((recs) => (
                  <div key={recs.id} className="flex-shrink-0 w-48 text-center">
              <Link href={`/Media/${recs.id}`} key={recs.id}>
              <img
              src={`https://image.tmdb.org/t/p/w500${recs.poster_path}`}
              alt={recs.title}
              width={192}
              height={288}
              className="rounded shadow mx-auto"
              />
              </Link>
              <h2 className="text-lg font-bold mb-2">{recs.title}</h2>
              
              </div>

                ))}
                </div>
                </div>
              
       </div>
       </main>
       <footer> 
        <p>Mediapedia -Student Project- by Antonio Gage</p>
      </footer>
        </div>
         
        
         
    )
}