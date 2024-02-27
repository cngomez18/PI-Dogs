import { useState } from 'react';
import Cards from './Cards';

export default function Pagination({onClose,dogs}) {
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8; // Set the number of dogs per page

    // Calculate the total number of pages based on the number of dogs
    const totalPages = Math.ceil(dogs.length / dogsPerPage);

    // Calculate the index range for the dogs to display on the current page
    const startIndex = (currentPage - 1) * dogsPerPage;
    const endIndex = startIndex + dogsPerPage;

    // Slice the dogs array to get the dogs for the current page
    const dogsOnCurrentPage = dogs.slice(startIndex, endIndex);

    // Handler for changing to the previous page
    const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    // Handler for changing to the next page
    const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    return (
    <div>
        <Cards dogs={dogsOnCurrentPage} onClose={onClose} />
        {/* Pagination controls */}
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous Page
        </button>
        
        <span>{`Page ${currentPage} of ${totalPages}`}</span>

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next Page
        </button>
    </div>
);
}