import React from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  console.log("totalPosts", totalPosts);
  console.log("postsPerPage", postsPerPage);
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  console.log("pages", pages);

  return (
    <div className="d-flex justify-content-center mt-3">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`btn btn-outline-primary mx-1 ${
              page === currentPage ? "active" : ""
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
