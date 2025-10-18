'use client'
import React, {useEffect,useState} from "react";
import { useRouter ,  useParams } from "next/navigation";
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
    const router = useRouter();
    
    
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
            const fetchRec = async () => {
              try {
                const recResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`);
                const recData = await recResponse.json();
                setRecommend(recData.results); 
              } catch (error) {
                console.error('Error fetching trailer:', error);
              }
            };
            if(id){
            fetchRec();
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

        <main className="mt-20 px-6 pb-10 flex-grow bg-[#DDF6D2] w-full ">
        <div key={movie.id} className="p-10 w-250 text-black  w-auto ">
          
            <h1 className="text-lg font-bold mb-2 px-40 ">{movie.title}</h1>
            <div className="flex flex-col lg:flex-row gap-6 bg-gray-300 rounded shadow py-2">
              
            <div className="flex-shrink-0 px-40 ">
             <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={250}
              height={550}
              className="rounded shadow "
              />
              </div>
              
              {trailer ? (
                <div className="flex-grow">
                  <div className="aspect-w-16 aspect-h-10 ">
                    <iframe
                      width="75%"
                      height="375"
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


              <div className="flex flex-col lg:flex-row gap-6 mt-6 w-full max-w-screen-xl mx-auto">
              <div className=" flex-grow bg-gray-300 rounded shadow mx-auto">
              <p className="mt-4 text-lg font-bold text-decleration-line: underline">{movie.title}</p>
              <p className="mt-4 text-lg font-bold">"{movie.tagline}"</p>
              <p className="mt-4  text-lg font-bold text-decleration-line: underline">Overview:</p>
              <p className="mt-4  text-lg">{movie.overview}</p>
              <p className="mt-4  text-lg font-bold text-decleration-line: underline">Status:</p>
              <p className="mt-4  text-lg">{movie.status}</p>
              <p className="mt-4  text-lg font-bold text-decleration-line: underline">Release Date:</p>
              <p className="mt-4  text-lg">{movie.release_date}</p>
              <p className="mt-4  text-lg font-bold text-decleration-line: underline">Run Time:</p>
              <p className="mt-4  text-lg">{movie.runtime} mins</p>
              
              
              

              </div>
                <div className="w-full lg:max-w-sm xl:max-w-xs bg-gray-300 rounded shadow p-6">
                  <h2 className="text-1 font-bold mb-4 ">Where to watch</h2>
                  <h3 className="text-1 font-bold text-decleration-line: underline">Stream:</h3>
                    {providers && providers.US && providers.US.flatrate? (
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
                        <p className="mb-4">No streaming providers available</p>
                       )}
                        <h2 className="text-1 font-bold mb-1 text-decleration-line: underline">Buy/Rent:</h2>
                       {providers && providers.US && providers.US.rent? (
                        <ul>
                       {providers.US.rent.map((rentPro) => (
                        <li key={rentPro.provider_id} className="mb-2 flex items-center space-x-2">
                          <img 
                          src={`https://image.tmdb.org/t/p/w45${rentPro.logo_path}`}
                          alt={rentPro.provider_name}
                          className="inline-block"
                          />
                          <span>{rentPro.provider_name}</span>
                        </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No streaming providers available</p>
                       
                      )}
                      </div>

                      </div>


              <div className="mt-8 bg-gray-300 rounded shadow px-2">
                <h2 className="text-1 font-bold mb-4 ">Cast</h2>
                <div className="flex space-x-4 overflow-x-auto ">
               {cast.map((peeps) => (
                  <div key={`cast-${peeps.id}-${peeps.job}`} className="flex-shrink-0 w-48 text-center ">
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

              <div className="flex  gap-6 mt-6 w-full max-w-screen-xl mx-auto">
              <div className=" flex-grow bg-gray-300 rounded shadow mx-auto">
                <p className="mt-4  text-lg font-bold text-decleration-line: underline">Budget:</p>
              <p className="mt-4 text-lg">${movie.budget}</p>
              <p className="mt-4  text-lg font-bold text-decleration-line: underline">Revenue:</p>
              <p className="mt-4  text-lg">${movie.revenue}</p>
              </div>
              </div>

                 <div className="mt-8 bg-gray-300 rounded shadow px-2">
                <h2 className="text-1 font-bold mb-4">Crew</h2>
                <div className="flex space-x-4 overflow-x-auto">
               {crew.map((peep) => (
                  <div key={`crew-${peep.id}-${peep.job}`} className="flex-shrink-0 w-48 text-center ">
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
              
              
              

              <div className="mt-8 bg-gray-300 rounded shadow px-2">
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