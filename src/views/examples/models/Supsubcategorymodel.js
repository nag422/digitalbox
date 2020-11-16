import React from 'react'
// reactstrap components
import {
    Button,
    Label,
    Modal,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Spinner,
    Alert
} from "reactstrap";

function Supsubcategorymodel(props) {

    return (
        <>

            {/* Modal For adding */}
            <Modal
                className="modal-dialog-centered"
                isOpen={props.supsubcatmodel}
                toggle={props.addsupsubcategorymodel}
            >
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Add New Sup Sub Category
            </h5>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={props.addsupsubcategorymodel}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    {props.isalert ?
                        <Alert color={props.alertmsgcolor}>
                            {props.alertmsg}

                        </Alert> : null
                    }

                    <Form role="form" onSubmit={props.supsubcathandleSubmit}>
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-list" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input onChange={props.rhandleChange} placeholder="Sub Category" id="category" name="category" type="text" />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Label for="exampleSelect">Select Topic</Label>
                            <Input type="select" name="superref" id="superref" onChange={props.rhandleChange}>
                                <option>Select Option</option>
                                {props.masterefcat.map((val,index) =>(
                                    <option key={index} value={val.id}>{val.category}</option>
                                ))}                            
                            </Input>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Label for="exampleSelect">Select Sub Category</Label>
                            <Input type="select" name="mainref" id="mainref" onChange={props.rhandleChange}>
                                <option>Select Option</option>
                                {props.refcats.map((val,index) =>(  
                                    parseInt(val.mainref) === parseInt(props.formchangedata.superref) ?                                  
                                    <option key={index} value={val.id}>{val.category}({props.formchangedata.superref})</option>:null
                                ))}                            
                            </Input>
                        </FormGroup>
                       
                        
                        <div className="modal-footer">
                            <Button
                                color="secondary"
                                data-dismiss="modal"
                                type="button"
                                onClick={props.addsupsubcategorymodel}
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

export default Supsubcategorymodel
