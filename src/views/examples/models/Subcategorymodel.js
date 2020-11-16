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


function Subcategorymodel(props) {

    return (
        <>

            {/* Modal For adding */}
            <Modal
                className="modal-dialog-centered"
                isOpen={props.subcatmodel}
                toggle={props.addsubcategorymodel}
            >
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Add New Sub Category
            </h5>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={props.addsubcategorymodel}
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

                    <Form role="form" onSubmit={props.subcathandleSubmit}>
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-list" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input onChange={props.rhandleChange} placeholder="category" id="category" name="category" type="text" />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Label for="exampleSelect">Select Category</Label>
                            <Input type="select" name="mainref" id="mainref" onChange={props.rhandleChange}>
                                <option>Select Option</option>
                                {props.refcats.map((val,index) =>(
                                    <option key={index} value={val.id}>{val.category}</option>
                                ))}                            
                            </Input>
                        </FormGroup>
                        
                        <div className="modal-footer">
                            <Button
                                color="secondary"
                                data-dismiss="modal"
                                type="button"
                                onClick={props.addsubcategorymodel}
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


            {/* Edit SubCategory Model */}
             
             {/* <Modal
                className="modal-dialog-centered"
                isOpen={props.updatesubcatmodel}
                toggle={props.subcategoryeditmodel}
            >
                <div className="modal-header">
                    <h5 className="modal-title" id="editmodal">
                        Edit User
                </h5>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={props.subcategoryeditmodel}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    {props.isalert ?
                        <Alert color={props.alertmsgcolor}>
                            {props.alertmsg}
                            <Spinner size="sm" color="light" />
                        </Alert> : null
                    }

                    <Form role="form" onSubmit={props.updatesubcathandlesubmit}>
                        <FormGroup className="mb-3">
                            
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-list" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input                                     
                                    value={props.formchangedata.category}
                                    onChange={props.rhandleChange}
                                    placeholder="category" id="category" name="category"
                                    type="text" />
                            </InputGroup>
                        </FormGroup>                                             


                        <div className="modal-footer">
                            <Button
                                color="secondary"
                                data-dismiss="modal"
                                type="button"
                                onClick={props.subcategoryeditmodel}
                            >
                                Close
                            </Button>
                            <Button color="primary" type="submit">
                                Save changes
                            </Button>
                        </div>
                    </Form>

                </div>

            </Modal>

 */}

          
        </>
    )
}

export default Subcategorymodel
