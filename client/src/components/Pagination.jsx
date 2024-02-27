import { useState } from 'react';
import Cards from './Cards';

export default function Pagination({ onClose, dogs}) {
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8; 

    const totalPages = Math.ceil(dogs.length / dogsPerPage);

    const startIndex = (currentPage - 1) * dogsPerPage;
    const endIndex = startIndex + dogsPerPage;

    const dogsOnCurrentPage = dogs.slice(startIndex, endIndex);

    const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

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