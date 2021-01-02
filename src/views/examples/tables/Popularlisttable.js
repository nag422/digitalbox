import React from "react";
import PropTypes from 'prop-types';

// reactstrap components
import {    
    Media,
    Table,
    Alert
} from "reactstrap";
import Moment from 'react-moment';

const Popularlisttable = (props) => {

    // function hideSwalert() {
    //     setSwlert("");
    // }


    return (

        <>



            {/* Button trigger modal */}

            Total Records: {props.totalpages}
            <Table className="align-items-center table-flush" responsive>

                <thead className="thead-light">
                    <tr>

                        <th scope="col">URL</th>
                        <th scope="col">Image</th>
                        <th scope="col">Category</th>
                        <th scope="col">Clicked</th>
                        <th scope="col">pubdate</th>
                        <th scope="col">lastmodifieddate</th>

                    </tr>
                </thead>
                <tbody>
                    {props.tools.map((row, index) => (

                        <tr key={index} className={row.id}>


                            <th scope="row">




                                {index + 1}

                            </th>

                            <td>

                                <Media className="align-items-center">
                                    <a
                                        className=" mr-3"
                                        href={row.URL}

                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            alt="..."
                                            height="auto"
                                            width="150px"
                                            src={row.image}
                                        />
                                    </a>

                                </Media>

                            </td>
                            <td>{row.category}</td>
                            









                            {/* <td>{row.isactive ? "Active" : "Deactivate"}</td> */}

                            <td>{row.clicked}</td>
                            <td><Moment date={row.videopublishedat} /></td>
                            <td><Moment date={row.lastmodified} /></td>




                            {/* <td>{props.refcats.map(ris => (parseInt(ris.id) === parseInt(row.refrence) ? ris.category : null))}</td>
            <td>{props.masterefcat.map(ris => (parseInt(ris.id) === parseInt(row.masterrefrence) ? ris.category : null))}</td> */}



                            <td>

                            </td>
                        </tr>



                    )
                    )}

                </tbody>
            </Table>




        </>
    )
}
Alert.propTypes = {
    className: PropTypes.string,
    closeClassName: PropTypes.string,
    color: PropTypes.string, // default: 'success'
    isOpen: PropTypes.bool,  // default: true
    toggle: PropTypes.func,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    fade: PropTypes.bool, // default: true
    // Controls the transition of the alert fading in and out
    // See Fade for more details
}
export default Popularlisttable
