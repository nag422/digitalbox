import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
// reactstrap components
import {
    Button,
    Media,
    Table,
    Modal,
    Row,
    Col,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Spinner,
    Alert
} from "reactstrap";
import SweetAlert from 'react-bootstrap-sweetalert';
import { ToastContainer, toast } from 'react-toastify';

const Tagstable = (props) => {
  

   
    

    
   

    
    function tosttrigger(msg,status){
        if(status === "success"){

            toast.success(msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            }else{
                toast.error(msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

}
        
    }
    // function hideSwalert() {
    //     setSwlert("");
    // }
    

    return (

        <>

            
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* Button trigger modal */}
            <Row className="mr-2 mb-1">
                <Col md="12" >
                   
                    <Button
                        size="sm"
                        className="float-right mr-1"
                        color="danger"
                        type="button"
                        onClick={props.deleteUser}
                    >
                        Delete<i className="fa fa-user-plus ml-2" area-hidden="true"></i>
                    </Button>
                </Col>

            </Row>
            Total Records: {props.totalpages}
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

                                </label>
                            </div>
                        </th>

                        {/* <th scope="col">Name</th> */}
                        <th scope="col">Tag</th>    
                    </tr>
                </thead>
                <tbody>
                    {props.tags.map(row => (

                        <tr key={row._id}>




                            <th scope="row">
                              
                                    <Media>
                                        <div className="custom-control custom-checkbox mb-3">
                                            <input
                                                className="custom-control-input"
                                                id={row.id}
                                                type="checkbox"
                                                name="childbox"
                                                onChange={props.handleCheckchange}
                                                checked={row.ischecked}

                                            />
                                            <label className="custom-control-label" htmlFor={row.id}>

                                            </label>
                                        </div>

                                    </Media>
                                
                            </th>
                            
                            <td>{row.tag}</td>

                            

                           
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
export default Tagstable
