import React from "react";
import PropTypes from 'prop-types';

// reactstrap components
import {
    Button,
    Table,
    Row,
    Col,
   
} from "reactstrap";


function Subcategoriestable(props) {
   


    return (
        <div>

            <Row className="mr-2 mb-1">
                <Col md="12" >
                    <Button
                        size="sm"
                        className="float-right"
                        color="primary"
                        type="button"
                        onClick={props.addsubcategorymodel}
                    >
                        Add Sub Category<i className="fa fa-user-plus ml-2" area-hidden="true"></i>
                    </Button>
                    {/* <Button
                        size="sm"
                        className="float-right mr-1"
                        color="danger"
                        type="button"
                        onClick={props.deleteThisGoal}
                    >
                        Delete Category<i className="fa fa-user-plus ml-2" area-hidden="true"></i>
                    </Button> */}
                </Col>

            </Row>
           
            <Table className="align-items-center table-flush" responsive>
                
                <thead className="thead-light">
                    <tr>
                        <th>
                            #
                        </th>

                        <th scope="col">Sub Category</th>
                        <th scope="col">Topics</th>                        
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.cats.map((row,index) => (

                        <tr key={row.id}>




                            <th scope="row">
                                 {index + 1}                                   
                            </th>
                            
                            <td>{row.category}</td>
                            

                            <td>{props.refcats.map(ris=>(ris.id === parseInt(row.mainref) ? ris.category: null))}</td>                                
                                
                                                     

                            <td>

                                <Button color="danger" size="sm" type="button" data-id={row.id}
                                    onClick={props.subcatgorydeletebutton}
                                >
                                    <i className="fa fa-trash" data-id={row.id} aria-hidden="true"></i>
                                </Button>
                                {/* <Button color="info" size="sm" type="button"
                                    data-username={row.username}
                                    data-id={row._id}
                                    data-email={row.email}
                                    onClick={props.subcategoryeditmodel}
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

export default Subcategoriestable
