// SelectPage.jsx (ou o nome do seu componente de seleção de página)
import PropTypes from 'prop-types';

const SelectPage = ({ currentPage, onPageChange, totalPages }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="select-page">
            <span>Ir para a página:</span>
            <select value={currentPage} onChange={(e) => onPageChange(Number(e.target.value))}>
                {pageNumbers.map((pageNumber) => (
                    <option key={pageNumber} value={pageNumber}>
                        {pageNumber}
                    </option>
                ))}
            </select>
        </div>
    );
};

SelectPage.propTypes = {
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
};

export default SelectPage;