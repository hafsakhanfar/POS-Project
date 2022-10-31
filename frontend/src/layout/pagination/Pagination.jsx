import React from "react"
const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

  const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

  

  const nextPage = () => {
          if(currentPage !== nPages) setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
      if(currentPage !== 1) setCurrentPage(currentPage - 1)
  }
  return (
      <nav>
          <ul className='pagination justify-content-center'>
              <li className="page-item">
                  <a className="page-link" 
                      onClick={prevPage} 
                      href='#'>
                      
                      Previous
                  </a>
              </li>
              {pageNumbers.map(pgNumber => (
                  <li key={pgNumber} 
                      className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

                      <a onClick={() => setCurrentPage(pgNumber)}  
                          className='page-link' 
                          href='#'>
                          
                          {pgNumber}
                      </a>
                  </li>
              ))}
              <li className="page-item">
                  <a className="page-link" 
                      onClick={nextPage}
                      href='#'>
                      
                      Next
                  </a>
              </li>
          </ul>
      </nav>
  )
}

export default Pagination

// import React from "react";
// import classnames from "classnames";
// import { usePagination, DOTS } from "./UsePagination";
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// const Pagination = (props) => {
//   const {
//     onPageChange,
//     totalCount,
//     siblingCount = 1,
//     currentPage,
//     pageSize,
//     className,
//   } = props;

//   const paginationRange = usePagination({
//     currentPage,
//     totalCount,
//     siblingCount,
//     pageSize,
//   });

//   if (currentPage === 0 || paginationRange.length < 2) {
//     return null;
//   }

//   const onNext = () => {
//     onPageChange(currentPage + 1);
//   };

//   const onPrevious = () => {
//     onPageChange(currentPage - 1);
//   };

//   let lastPage = paginationRange[paginationRange.length - 1];
//   return (
//     <ul
//       className={classnames("pagination-container", { [className]: className })}
//     >
//       <li
//         className={classnames("pagination-item", {
//           disabled: currentPage === 1,
//         })}
//         onClick={onPrevious}
//       >
//         <div className="arrow left"><ArrowLeftIcon/></div>
//       </li>
//       {paginationRange.map((pageNumber) => {
//         if (pageNumber === DOTS) {
//           return <li className="pagination-item dots">&#8230;</li>;
//         }

//         return (
//           <li
//             className={classnames("pagination-item", {
//               selected: pageNumber === currentPage,
//             })}
//             onClick={() => onPageChange(pageNumber)}
//           >
//             {pageNumber}
//           </li>
//         );
//       })}
//       <li
//         className={classnames("pagination-item", {
//           disabled: currentPage === lastPage,
//         })}
//         onClick={onNext}
//       >
//         <div className="arrow right" />
//       </li>
//     </ul>
//   );
// };

// export default Pagination;
