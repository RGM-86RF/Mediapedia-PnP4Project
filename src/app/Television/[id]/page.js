import React from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

async function getShow(id){
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`);
    return res.json();

    
    
}


export default async function ({params}) {
 
    const{id} = await params
    const tv = await getShow(id);


    
    return (
         <div className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-4 py-2 bg-[#333333]">
            <div className="text-lime-300 font-bold text-x1"><a href="http://localhost:3000/">Mediapedia</a></div>
           
            <div className="flex items-center space-x-4">
                 <button className=" text-lime-300 hover:underline">MENU</button>
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
              
       </div>
       </main>
       <footer> 
        <p>Mediapedia -Student Project- by Antonio Gage</p>
      </footer>
        </div>
         
        
         
    )
}