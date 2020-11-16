import React from 'react'
// reactstrap components
import {
    Button,
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


function Categorymodel(props) {

    return (
        <>

            {/* Modal For adding */}
            <Modal
                className="modal-dialog-centered"
                isOpen={props.catmodel}
                toggle={props.addcatmodeltrigger}
            >
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Add New Category
            </h5>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={props.addcatmodeltrigger}
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

                    <Form role="form" onSubmit={props.handleSubmit}>
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
                        <div className="modal-footer">
                            <Button
                                color="secondary"
                                data-dismiss="modal"
                                type="button"
                                onClick={props.addcatmodeltrigger}
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



            {/* Modal for editing */}
            <Modal
                className="modal-dialog-centered"
                isOpen={props.updatecatmodel}
                toggle={props.toggleeditModal}
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
                        onClick={props.toggleeditModal}
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

                    <Form role="form" onSubmit={props.updatehandlesubmit}>
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
                                onClick={props.toggleeditModal}
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



        </>
    )
}

export default Categorymodel
