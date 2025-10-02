import React from "react";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

async function fetchSearchResults(query){
    if (!query) return [];

    const _res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );

    const data = await _res.json();
    return data.results || [];
}

export default async function searchResults({searchParams}) {
    
    const query = searchParams?.q || '';
    const results = await fetchSearchResults(query);

    return (
         <div className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-4 py-2 bg-[#333333]">
            <div className="text-lime-300 font-bold text-x1"><a href="http://localhost:3000/">Mediapedia</a></div>
           
            <div className="flex items-center space-x-4">
                 <button className=" text-lime-300 hover:underline">MENU</button>
            </div>
        </header>
        <div className="p-6">
            <h1 className="text-black font bold mb-4">Search result for: {query}</h1>
           
            {results.length > 0 ? (
            results.map((movie) => (
                <div key={movie.id} className="text-black mb-2">
                    {movie.title}
                     <Link href={`./Media/${movie.id}`} key={movie.id}>
                     <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={192}
              height={288}
              className="rounded shadow mx-auto"
              />
                     </Link>
                    </div>
            ))
        ) : (
            <p>No Results found.</p>
        )}
    
        </div>
        <footer> 
        <p>Mediapedia -Student Project- by Antonio Gage</p>
      </footer>
         </div>
    );
}