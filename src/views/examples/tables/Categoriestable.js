import React from "react";
// reactstrap components
import {
    Button,
    Table,
    Row,
    Col
} from "reactstrap";



function Categoriestable(props) {
    








    return (
        <div>
                <Row className="mr-2 mb-1">
                <Col md="12" >
                    <Button
                        size="sm"
                        className="float-right"
                        color="primary"
                        type="button"
                        onClick={props.addcatmodeltrigger}
                    >
                        Add Category<i className="fa fa-user-plus ml-2" area-hidden="true"></i>
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
                            <div className="custom-control custom-checkbox mb-3">
                                <input
                                    className="custom-control-input"
                                    id="parentbox"
                                    type="checkbox"
                                    onChange={props.handleAllChecked}
                                />
                                <label className="custom-control-label" htmlFor="parentbox">
                                    #
                                </label>
                            </div>
                        </th>

                        <th scope="col">Category</th>                        
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.cats.map((row,index) => (

                        <tr key={index}>

                            <th scope="row">
                                
                                    
                                        <div className="custom-control custom-checkbox mb-3">
                                            <input
                                                className="custom-control-input"
                                                id={row.id}
                                                type="checkbox"
                                                name="childbox"
                                                onChange={props.handlechange}

                                            />
                                            
                                            <label className="custom-control-label" htmlFor={row.id}>
                                            {index + 1}
                                            </label>
                                        </div>
                                        

                                   
                            </th>
                            
                            <td>{row.category}</td>
                                                      

                            <td>

                                <Button color="danger" size="sm" type="button"
                                id={row.category} onClick={props.deleteThisGoal}
                                >
                                    <i id={row.category} className="fa fa-trash" aria-hidden="true"></i>
                                </Button>
                                
                                <Button color="info" size="sm" type="button"
                                    data-category={row.category}
                                    data-id={row.id}                                    
                                    onClick={props.toggleeditModal}
                                >
                                    <i 
                                    data-category={row.category}
                                    data-id={row.id}
                                    className="fas fa-pen" aria-hidden="true"></i>
                                </Button>

                            </td>
                        </tr>



                    )
                    )}

                </tbody>
            </Table>
           
                     


            
        </div>
    )
}

export default Categoriestable
