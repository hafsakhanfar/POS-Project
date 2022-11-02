import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import styles from "../style/Pagination.module.css";
const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className={styles.paginationBar}>
      <nav>
        <ul className={styles.paginationContainer}>
          <li>
            <KeyboardArrowLeftIcon
              onClick={prevPage}
              style={{ fill: "#41af4b", cursor: "pointer" }}
            />
          </li>
          {pageNumbers.map((pgNumber) => (
            <li
              key={pgNumber}
              className={styles.paginationItem}
              onClick={() => setCurrentPage(pgNumber)}
            >
              {pgNumber}
            </li>
          ))}
          <li>
            <KeyboardArrowRightIcon
              onClick={nextPage}
              style={{ fill: "#41af4b", cursor: "pointer" }}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
