import React, { Fragment } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const paginationFilter = (props) => {

    let paginationItems = [];
    
    // Total number of items, Current page number, items per page
    let pager = getPager(props.paginationDetails.totalNumberOfElements,
        props.paginationFilter.currentPage,
        props.paginationFilter.pageSize);

    paginationItems = pager.pages.map( (page, index) => (
        <PaginationItem key={index}
        active={props.paginationFilter.currentPage === page}>
                    <PaginationLink onClick={() => props.changePaginationPage(page)}>
                        {page}
                    </PaginationLink>
        </PaginationItem>
    ) )

    let content = (
        <Fragment>
            <Pagination aria-label="Page navigation example">
                <PaginationItem disabled={props.paginationFilter.currentPage === 1}>
                    <PaginationLink onClick={() => props.changePaginationPage(1)} first/>
                </PaginationItem>
                <PaginationItem disabled={props.paginationFilter.currentPage === 1}>
                    <PaginationLink previous onClick={() => props.changePaginationPage(props.paginationFilter.currentPage - 1)}/>
                </PaginationItem>

                    {paginationItems}
                    
                <PaginationItem disabled={props.paginationFilter.currentPage === pager.totalPages}>
                    <PaginationLink next onClick={() => props.changePaginationPage(props.paginationFilter.currentPage + 1)}/>
                </PaginationItem>
                <PaginationItem disabled={props.paginationFilter.currentPage === pager.totalPages}>
                    <PaginationLink onClick={() => props.changePaginationPage(pager.totalPages)} last  />
                </PaginationItem>
            </Pagination>
        </Fragment>
    );

    return (content);
}

const getPager = (totalItems, currentPage = 1, pageSize = 10) => {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) { 
        currentPage = 1; 
    } else if (currentPage > totalPages) { 
        currentPage = totalPages; 
    }
    
    let startPage, endPage;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}

export default paginationFilter;