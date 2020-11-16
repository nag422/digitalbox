import React from 'react'
// reactstrap components
import {
    Button,
    Media,
    Table,
    Label,
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

function Videoarticlemodel(props) {

    return (
        <>

            {/* Modal For adding */}
            <Modal
                className="modal-dialog-centered"
                isOpen={props.topicmanager.videomodel}
                toggle={props.topicmanager.togglevideomodel}
            >
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Edit Videos
            </h5>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={props.topicmanager.togglevideomodel}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                   

                    <Form role="form" onSubmit={props.topicmanager.Videoarticlehandlesubmit}>
                        <Input onChange={props.topicmanager.rhandleChange} placeholder="Sub Category" id="urlid" name="urlid" type="hidden" />
                            
                        <FormGroup className="mb-3">
                            <Label for="exampleSelect">Select Topic</Label>
                            <Input type="select" name="mainref" id="mainref" onChange={props.topicmanager.rhandleChange}>
                                <option>Select Option</option>
                                {props.catmanager.subcategories.map((val,index) =>(
                                    parseInt(val.mainref) === parseInt(props.superrefsarticle) ?  
                                    <option key={index} value={val.id}>{val.category}</option>:null
                                ))}                            
                            </Input>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Label for="exampleSelect">Select Sub Category</Label>
                            <Input type="select" name="superref" id="superref" onChange={props.topicmanager.rhandleChange}>
                                <option>Select Option</option>
                                {props.catmanager.supsubcategories.map((val,index) =>(  
                                    parseInt(val.masterrefrence) === parseInt(props.superrefsarticle) ?                                  
                                    <option key={index} value={val.id}>{val.category}({props.superrefsarticle})</option>:null
                                ))}                            
                            </Input>
                        </FormGroup>
                       
                        
                        <div className="modal-footer">
                            <Button
                                color="secondary"
                                data-dismiss="modal"
                                type="button"
                                onClick={props.topicmanager.togglevideomodel}
                            >
                                Close
            </Button>
                            <Button color="primary" type="submit">
                                {props.isspinner ? <Spinner size="sm" color="light" /> : null}Save changes
            </Button>
                        </div>
                    </Form>

                </div>

            </Modal>


           
          
        </>
    )
}

export default Videoarticlemodel
