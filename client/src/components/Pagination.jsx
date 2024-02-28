import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Cards from './Cards';
import { setCurrentPage, setDogs } from '../redux/actions';
import '../styles/Pagination.css'

function Pagination({ onClose, dogs, currentPage, setCurrentPage }) {
  const dogsPerPage = 8;

  // Calculate total pages based on the number of dogs
  const totalPages = Math.ceil(dogs.length / dogsPerPage);

  // Calculate the start and end index of dogs for the current page
  const startIndex = (currentPage - 1) * dogsPerPage;
  const endIndex = Math.min(startIndex + dogsPerPage, dogs.length);
  const dogsOnCurrentPage = dogs.slice(startIndex, endIndex);

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the setDogs action when dogs or currentPage changes
    dispatch(setDogs(dogsOnCurrentPage));
  }, [dispatch, dogs, currentPage, dogsOnCurrentPage]);

  return (
    <div className='pagination-container'>
      <Cards dogs={dogsOnCurrentPage} onClose={onClose} />

      <div className="pagination-buttons">
        {/* Pagination controls */}
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="rounded-button">
          Previous Page
        </button>

        <span>{`Page ${currentPage} of ${totalPages}`}</span>

        <button
          onClick={() =>
            setCurrentPage(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="rounded-button">
          Next Page
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
});

export default connect(mapStateToProps, { setCurrentPage })(Pagination);
