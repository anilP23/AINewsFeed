// import { React, useState, useEffect } from 'react'
// import EverythingCard from './EverythingCard'
// import Loader from './Loader';

// function AllNews() {

//   const [data, setData] = useState([])
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   function handlePrev() {
//     setPage(page - 1)
//   }
//   function handleNext() {
//     setPage(page + 1)
//   }
//   let pageSize = 15;
//   useEffect(() => {
//     fetch(`https://news-app-seven-delta.vercel.app/all-news?page=${page}&pageSize=${pageSize}`)
//       .then(response => {
//         // console.log(response) 
//         if (response.ok) {
//           // console.log(response.clone().json());
//           setIsLoading(true)
//           return response.clone().json();
//         }
//       })
//       .then(myJson => {
//         // console.log(myJson)
//         setTotalResults(myJson.data.totalResults)
//         setData(myJson.data.articles)
//       })
//     setIsLoading(false);
//   }, [page])

//   return (
//     <>
//       <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
//         {isLoading ? data.map((element, index) => {
//           return <EverythingCard
//             title={element.title} description={element.description} imgUrl={element.urlToImage}
//             publishedAt={element.publishedAt} url={element.url} author={element.author}
//             source={element.source.name} key={index}
//           />
//         }) : <Loader />}

//       </div>
//       {isLoading && <div className="pagination flex justify-center gap-14 my-10 items-center">
//         <button disabled={page <= 1} className='pagination-btn text-center' onClick={() => handlePrev()}>&larr; Prev</button>
//         <p className='font-semibold opacity-80'>{page} of {Math.ceil(totalResults / 15)}</p>
//         <button className='pagination-btn text-center' disabled={page > Math.ceil(totalResults / 15)} onClick={() => handleNext()}>Next &rarr;</button>
//       </div>}
//     </>
//   )
// }

// export default AllNews

import { React, useState, useEffect } from "react";
import Loader from "./Loader";
import { motion } from "framer-motion";

function AllNews() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  let pageSize = 15;

  function handlePrev() {
    setPage((p) => p - 1);
  }
  function handleNext() {
    setPage((p) => p + 1);
  }

  useEffect(() => {
    setIsLoading(false);
    fetch(
      `https://news-app-seven-delta.vercel.app/all-news?page=${page}&pageSize=${pageSize}`
    )
      .then((response) => {
        if (response.ok) {
          setIsLoading(true);
          return response.clone().json();
        }
      })
      .then((myJson) => {
        setTotalResults(myJson.data.totalResults);
        setData(myJson.data.articles);
      });
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 md:px-12 lg:px-20">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center text-gray-900 py-10 tracking-tight"
      >
        📰 Top Stories
      </motion.h2>

      {/* Hero Section */}
      {isLoading && data.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-16"
        >
          <img
            src={data[0].urlToImage}
            alt={data[0].title}
            className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-10">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-xl">
              {data[0].title}
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mb-4">
              {data[0].description}
            </p>
            <a
              href={data[0].url}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-teal-600 rounded-xl text-white font-semibold shadow-lg hover:opacity-90 transition"
            >
              Read More →
            </a>
          </div>
        </motion.div>
      )}

      {/* News Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading ? (
          data.slice(1).map((article, index) => (
            <motion.a
              key={index}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative block rounded-2xl overflow-hidden group shadow-md"
            >
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <span className="text-sm text-amber-400 font-bold">
                  {article.source?.name || "Unknown Source"}
                </span>
                <h3 className="text-xl font-bold text-white mt-2 group-hover:text-amber-200 transition">
                  {article.title}
                </h3>
              </div>
            </motion.a>
          ))
        ) : (
          <Loader />
        )}
      </div>

      {/* Pagination */}
      {isLoading && (
        <div className="flex justify-center gap-6 my-16">
          <button
            disabled={page <= 1}
            onClick={handlePrev}
            className={`px-8 py-3 rounded-full font-semibold shadow-lg transition-all ${
              page <= 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-500 to-teal-600 text-white hover:opacity-90"
            }`}
          >
            ← Prev
          </button>

          <p className="text-lg font-bold text-gray-700">
            {page} / {Math.ceil(totalResults / 15)}
          </p>

          <button
            disabled={page >= Math.ceil(totalResults / 15)}
            onClick={handleNext}
            className={`px-8 py-3 rounded-full font-semibold shadow-lg transition-all ${
              page >= Math.ceil(totalResults / 15)
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-600 to-amber-500 text-white hover:opacity-90"
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default AllNews;
