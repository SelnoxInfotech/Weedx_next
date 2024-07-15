import { BiChevronLeft } from "react-icons/bi"
import { BiChevronRight } from "react-icons/bi"
import { IconButton } from "@material-ui/core";
import useStyles from "@/styles/style";
import React from "react";
const BlogPaginate = ({ postsPerPage, totalPosts, paginate, previousPage, nextPage }) => {
    const classes = useStyles()
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <React.Fragment>
            <div className="Blog_paginateList">
                <ul className="Blog_pagination_UL">
                    <li onClick={previousPage} className="page-number">
                        <IconButton className={classes.blogPaginateIconButton}><BiChevronLeft size={18} /></IconButton>
                    </li>
                    {pageNumbers.map((number, index) => {
                        return (
                            <IconButton
                                key={index}
                                onClick={() => paginate(number)}
                                className={classes.blogPaginateIconButtonNumber}>
                                <li
                                    className="pageNumberLists"
                                >
                                    {number}
                                </li></IconButton>
                        )
                    })}
                    <li onClick={nextPage} className="page-number">
                        <IconButton className={classes.blogPaginateIconButton}><BiChevronRight size={18} /></IconButton>
                    </li>
                </ul>
            </div>

        </React.Fragment>
    )
}
export default BlogPaginate