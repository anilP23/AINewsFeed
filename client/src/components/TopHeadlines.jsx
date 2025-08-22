// import { React, useState, useEffect } from "react";
// import { useParams } from 'react-router-dom'
// import EverythingCard from './EverythingCard'
// import Loader from "./Loader";


// function TopHeadlines() {
//   const params = useParams();
//   const [data, setData] = useState([]);
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
//     setIsLoading(true); 
//     fetch(`https://news-app-seven-delta.vercel.app/top-headlines?language=en&category=${params.category}&page=${page}&pageSize=${pageSize}`)
//       .then((response) => {
//         if (response.ok) {
//           // console.log(response.clone().json());
//           return response.clone().json();
//         }
//       })
//       .then((json) => {
//         // console.log(json)
//         setTotalResults(json.data.totalResults)
//         setData(json.data.articles);
//         setIsLoading(false); 
//       });
//   }, [page, params.category]);

//   return (
//     <>
//       <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
//         {!isLoading ? data.map((element, index) => {
//           return <EverythingCard
//             title={element.title} description={element.description} imgUrl={element.urlToImage}
//             publishedAt={element.publishedAt} url={element.url} author={element.author}
//             source={element.source.name} key={index}
//           />
//         }): <Loader />}
//       </div>
//       {!isLoading && <div className="pagination flex justify-center gap-14 my-10 items-center">
//         <button disabled={page <= 1} className='pagination-btn' onClick={() => handlePrev()}>Prev</button>
//         <p className='font-semibold opacity-80'>{page} of {Math.ceil(totalResults / 15)}</p>
//         <button className='pagination-btn' disabled={page > Math.ceil(totalResults / 15)} onClick={() => handleNext()}>Next</button>
//       </div>}
//     </>
//   );
// }

// export default TopHeadlines;


import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";
import { motion } from "framer-motion";

function TopHeadlines() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function handlePrev() {
    setPage(page - 1);
  }
  function handleNext() {
    setPage(page + 1);
  }
  let pageSize = 15;

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://news-app-seven-delta.vercel.app/top-headlines?language=en&category=${params.category}&page=${page}&pageSize=${pageSize}`
    )
      .then((response) => {
        if (response.ok) {
          return response.clone().json();
        }
      })
      .then((json) => {
        setTotalResults(json.data.totalResults);
        setData(json.data.articles);
        setIsLoading(false);
      });
  }, [page, params.category]);

  return (
    <>
      <motion.div
        className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {!isLoading ? (
          data.map((element, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <EverythingCard
                title={element.title}
                description={element.description}
                imgUrl={element.urlToImage}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
              />
            </motion.div>
          ))
        ) : (
          <Loader />
        )}
      </motion.div>

      {!isLoading && (
        <motion.div
          className="pagination flex justify-center gap-14 my-10 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            disabled={page <= 1}
            className="pagination-btn"
            onClick={() => handlePrev()}
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / 15)}
          </p>
          <button
            className="pagination-btn"
            disabled={page > Math.ceil(totalResults / 15)}
            onClick={() => handleNext()}
          >
            Next
          </button>
        </motion.div>
      )}
    </>
  );
}

export default TopHeadlines;
