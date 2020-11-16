import React from 'react'
import {
    CardFooter,
    Pagination
} from "reactstrap";

function Paginationtable() {
    return (
        <>

            <CardFooter className="py-4">
                <nav aria-label="...">
                    <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                    >
                       
                    </Pagination>
                </nav>
            </CardFooter>

        </>
    )
}

export default Paginationtable
