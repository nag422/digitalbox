import React from "react";
import PropTypes from 'prop-types';

// reactstrap components
import {
    Button,
    Table,
    Row,
    Col
} from "reactstrap";


function Supsubcategoriestable(props) {
    


    return (
        <div>

            <Row className="mr-2 mb-1">
                <Col md="12" >
                    <Button
                        size="sm"
                        className="float-right"
                        color="primary"
                        type="button"
                        onClick={props.addsupsubcategorymodel}
                    >
                        Add Sup Sub Category<i className="fa fa-user-plus ml-2" area-hidden="true"></i>
                    </Button>
                   
                </Col>

            </Row>

            <Table className="align-items-center table-flush" responsive>

                <thead className="thead-light">
                    <tr>
                        <th>
                            #
                        </th>
                        <th scope="col">Sup Sub Category</th>
                        <th scope="col">Sub Category</th>
                        <th scope="col">Topics</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.cats.map((row, index) => (

                        <tr key={row.id}>




                            <th scope="row">


                            {index + 1}



                            </th>

                            <td>{row.category}</td>


                            <td>{props.refcats.map(ris => (parseInt(ris.id) === parseInt(row.refrence) ? ris.category : null))}</td>
                            <td>{props.masterefcat.map(ris => (parseInt(ris.id) === parseInt(row.masterrefrence) ? ris.category : null))}</td>



                            <td>

                                <Button color="danger" size="sm" type="button" data-id={row.id}
                                    onClick={props.supsubcatgorydeletebutton}
                                >
                                    <i className="fa fa-trash" aria-hidden="true" data-id={row.id}></i>
                                </Button>
                                {/* <Button color="info" size="sm" type="button"
                                    data-username={row.username}
                                    data-id={row._id}
                                    data-email={row.email}
                                    onClick={toggleeditModal}
                                >
                                    <i className="fas fa-pen" aria-hidden="true"></i>
                                </Button> */}

                            </td>
                        </tr>



                    )
                    )}

                </tbody>
            </Table>









        </div>
    )
}

export default Supsubcategoriestable
