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

const Userlisttable = (props) => {
    const [swalert, setSwlert] = useState("");
    const [exampleModal, setExampleModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    // const [isalert, setIsalert] = useState(false);
    const [alertmsgcolor, setAlertmsgcolor] = useState("info");
    const [alertmsg, setAlertmsg] = useState("");
    const [userstate, setUserstate] = useState([]);




    // form state
    const initialFormData = Object.freeze({
        username: "",
        email: "",
        password: "",
        password1: "",
        phone: "",
        capability: "",
        datacategory:""
    });

    const initialeditingform = Object.freeze({
        username: "",
        email: "",
        phone: "",
        datacategory:"",
        _id: "",
        capability: "",
    });

    const [formchangedata, updateFormchangedata] = React.useState(initialFormData);
    const [editingform, updateEditingform] = React.useState(initialeditingform);

    const handleChange = (e) => {

        updateFormchangedata({
            ...formchangedata,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()

        });
    };


    const rhandleChange = (e) => {

        updateFormchangedata({
            ...formchangedata,
            // Trimming any whitespace
            [e.target.name]: e.target.id.trim()

        });
    };

    const ehandleChange = (e) => {

        updateEditingform({
            ...editingform,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()

        });
    };
    const optionhandleChange = (e) => {

        var options = e.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
              if (options[i].selected) {
                value.push(options[i].value);
              }
            }

        updateEditingform({
            ...editingform,
            // Trimming any whitespace
            [e.target.name]: value

        });
    };

    

    const ehandleSubmit = (e) => {
        e.preventDefault();
        
        let form_data = new FormData();        

        form_data.append('email', editingform.email);        
        form_data.append('id', editingform._id);
        form_data.append('phone', editingform.phone);
        form_data.append('datacategory', editingform.datacategory);
        
        let url = 'https://app.kiranvoleti.com/admin/edituser';
        // console.log(editingform)
        // return
        
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {
                setEditModal(false)
                props.fetchusers()              
                

            })
            .catch(err =>{
                setEditModal(false)
                console.log(err)
            }
            )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // let form_data = new FormData();
        if (formchangedata.password === formchangedata.password1 && formchangedata.password.length < 5) {
            props.setIsalert(!props.isalert)
            setAlertmsg("plase check your password");
            setAlertmsgcolor('danger');

        }
        let form_data = new FormData();
        form_data.append('username', formchangedata.email);
        form_data.append('pwd', formchangedata.password);
        form_data.append('email', formchangedata.email);
        form_data.append('userrole', formchangedata.capability);
        form_data.append('phonenumber', formchangedata.phone);
        console.log(formchangedata)
        
        let url = 'https://app.kiranvoleti.com/saveuser';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                // 'X-CSRFToken': this.getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config)
            .then(res => {
                
                toggleModal()
                props.fetchusers()

            })
            .catch(err =>{
                toggleModal()
                console.log(err)
            }
                
            )
        // Object.entries(formData).map(entry => { 
        //     // let key = entry[0]; 
        //     // let value = entry[1]; 
        //     return console.log(entry); 
        // }); 

        // toggleModal("exampleModal")
        // ... submit to API or something
    };
    // form state
    const statuschange = (e)=>{
        
        
        let form_data = new FormData();
        form_data.append('user_id', e.target.id);
        form_data.append('is_active', e.target.checked);
        
        let url = 'https://app.kiranvoleti.com/getuserupdate';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {
                
                tosttrigger("Successfully Status Changed !","success");

            })
            .catch(err =>
                tosttrigger("Something Went Wrong !","error")
                
            )    

    }

    const adminstatus = (e)=>{
        
        
        let form_data = new FormData();
        form_data.append('user_id', e.target.id);
        form_data.append('capability', e.target.value);
        console.log(e.target.id,e.target.value)
        
        let url = 'https://app.kiranvoleti.com/getuserupdateadmin';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {
                
                tosttrigger("Successfully Status Changed !","success");
                props.fetchusers()

            })
            .catch(err =>
                tosttrigger("Something Went Wrong !","error")
                
            )    

    }
    // Subscribe change

    const subscribestatechange = (e)=>{
        
        
        let form_data = new FormData();
        form_data.append('user_id', e.target.id);
        form_data.append('capability', e.target.value);
        console.log(e.target.id,e.target.value)
        
        let url = 'https://app.kiranvoleti.com/updatesubscribestatus';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {
                
                tosttrigger("Successfully Status Changed !","success");
                props.fetchusers()

            })
            .catch(err =>
                tosttrigger("Something Went Wrong !","error")
                
            )    

    }

    // Subscribe change end
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
      }
    const toggleModal = () => {
        setExampleModal(!exampleModal);
        props.setIsalert(false)
    };
    const toggleeditModal = async (e) => {
        
        const initialeditingform = {
            username: e.target.dataset.username,
            email: e.target.dataset.email,
            _id: e.target.dataset.id

        };
        await updateEditingform(initialeditingform)
        setEditModal(!editModal);
        props.setIsalert(false)
        console.log(editingform)
    };

    // Checkbox
    const handleAllChecked = (event) => {
        
        var allelm = document.querySelectorAll("input[name=childbox]");
        if (event.target.checked) {
            allelm.forEach(elm => {
                elm.setAttribute("checked", event.target.checked)
            })

        }
        else {
            allelm.forEach(elm => {
                elm.removeAttribute("checked")
            })

        }

    }

    const handlechange = (event) => {
        let userstateaction = userstate;
        function ischeckf(val) {
            if (val._id === event.target.id) {
                return val !== event.target.id;
            }
        }
        if (event.target.checked) {
            let nowobj = [{ _id: event.target.id, isChecked: event.target.checked }]
            setUserstate([...userstateaction, ...nowobj]);
        } else {
            let nowobj = userstateaction.filter(ischeckf)
            setUserstate([...nowobj]);
        }
        
    }
    // end checkbox

    
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

            {swalert}
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
                        className="float-right"
                        color="primary"
                        type="button"
                        onClick={() => toggleModal("exampleModal")}
                    >
                        Add User<i className="fa fa-user-plus ml-2" area-hidden="true"></i>
                    </Button>
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
                                    onChange={handleAllChecked}
                                />
                                <label className="custom-control-label" htmlFor="parentbox">

                                </label>
                            </div>
                        </th>

                        {/* <th scope="col">Name</th> */}
                        <th scope="col">Email</th>
                        <th scope="col">Subscribed</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Status</th>
                        <th scope="col">Capability</th>
                        <th scope="col">Permission</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map(row => (

                        <tr key={row._id}>




                            <th scope="row">
                                <Media className="align-items-center">
                                    <a
                                        className="avatar rounded-circle mr-3"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <img
                                            alt="..."
                                            src={require("assets/img/theme/user.jpg")}
                                        />
                                    </a>
                                    <Media>
                                        <div className="custom-control custom-checkbox mb-3">
                                            <input
                                                className="custom-control-input"
                                                id={row._id}
                                                type="checkbox"
                                                name="childbox"
                                                onChange={handlechange}

                                            />
                                            <label className="custom-control-label" htmlFor={row._id}>

                                            </label>
                                        </div>

                                    </Media>
                                </Media>
                            </th>
                            
                            <td>{row.email}</td>
                            <td>{row.is_subscribed ? 'Subscribed':'Not Subscribed'}
                            
                            <select className="ml-2" id={row.email} name="subscribestate" onChange={subscribestatechange}>
                                    <option value="y">--is_subscribed--</option>
                                    <option value="y">Subscribe</option>
                                    <option value="n">Unsubscribe</option>
                                </select>
                            </td>
                            {
                                row.userinfo.length > 0 ? row.userinfo.map((val) => (

                                    <td key={val.id}>{val.phonenumber}</td>
                                    


                                )) : <td key={row.email}>----</td>}


                    
                                
                                <td id={row._id}>
                                <label className="custom-toggle">
                                {row.is_active ? 
                                
                                <input id={row._id} onChange={statuschange} defaultChecked type="checkbox" />
                                
                                : 
                                
                                
                                <input id={row._id} onChange={statuschange} type="checkbox" />
                                
                                
                                }
                                <span className="custom-toggle-slider rounded-circle" />
                              </label>
                                </td>
                                <td>
                                {row.is_superuser ? "Admin" : row.is_staff ? "Staff": "User"}
                                <select className="ml-2" id={row._id} name="capability" onChange={adminstatus}>
                                    <option value="u">--Role--</option>
                                    <option value="u">User</option>
                                    <option value="s">Staff</option>
                                    <option value="a">Admin</option>
                                </select>
                                
                            </td>
                                
                                {
                                row.userinfo.length > 0 ? row.userinfo.map((val) => (
                                    
                                    <td key={row.email}>{val.datacategory}</td>                                   
                                    


                                )) : <td key={row.id}>----</td>}

                            


                           
                            

                            <td>

                                <Button data-id={row._id} color="danger" size="sm" type="button"
                                    onClick={props.deleteUserind}
                                >
                                    <i data-id={row._id} className="fa fa-trash" aria-hidden="true"></i>
                                </Button>
                                <Button color="info" size="sm" type="button"
                                    data-username={row.username}
                                    data-id={row.id}
                                    data-email={row.email}                                
                                    onClick={toggleeditModal}
                                >
                                    <i className="fas fa-pen"                                    
                                    data-username={row.username}
                                    data-id={row.id}
                                    data-email={row.email}
                                    aria-hidden="true"></i>
                                </Button>

                            </td>
                        </tr>

                    )
                    )}

                </tbody>
            </Table>
            



            {/* Modal For adding */}
            <Modal
                className="modal-dialog-centered"
                isOpen={exampleModal}
                toggle={() => toggleModal("exampleModal")}
            >
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Add New User
            </h5>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => toggleModal("exampleModal")}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    {props.isalert ?
                        <Alert color={alertmsgcolor}>
                            {alertmsg}
                            <Spinner size="sm" color="light" />
                        </Alert> : null
                    }

                    <Form role="form" onSubmit={handleSubmit}>
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-user" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input onChange={handleChange} placeholder="Username" id="username" name="username" type="text" />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-email-83" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input onChange={handleChange} placeholder="Email" id="email" name="email" type="email" />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fa fa-phone" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input onChange={handleChange} placeholder="Phone" id="phone" name="phone" type="text" />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-lock-circle-open" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input onChange={handleChange} placeholder="Password" id="password" name="password" type="password" />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-lock-circle-open" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input onChange={handleChange} placeholder="Confirm Password" id="password1" name="password1" type="password" />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fa fa-bars" />
                                    </InputGroupText>
                                </InputGroupAddon>                                
                                <Input onChange={handleChange}  
                                        id="capability" name="capability" type="select">
                                        <option>Select Option</option>                                        
                                        <option value="u">User</option>
                                        <option value="s">Staff</option>
                                        <option value="a">Admin</option>

                                </Input>
                            </InputGroup>
                        </FormGroup>
                        <div className="modal-footer">
                            <Button
                                color="secondary"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => toggleModal("exampleModal")}
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



            {/* Modal for editing */}
            <Modal
                className="modal-dialog-centered"
                isOpen={editModal}
                toggle={toggleeditModal}
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
                        onClick={toggleeditModal}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    {props.isalert ?
                        <Alert color={alertmsgcolor}>
                            {alertmsg}
                            <Spinner size="sm" color="light" />
                        </Alert> : null
                    }

                    <Form role="form" onSubmit={ehandleSubmit}>
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-user" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input onChange={ehandleChange}
                                    value={editingform.username}
                                    placeholder="Username" id="username" name="username"
                                    type="text" />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-email-83" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input onChange={ehandleChange}
                                    value={editingform.email}
                                    placeholder="Email" id="email" name="email" type="email" />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fa fa-phone" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                
                                <Input onChange={ehandleChange}
                                    value={editingform.phone}
                                    placeholder="Phone" id="phone" name="phone" type="text" />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fa fa-bars" />
                                    </InputGroupText>
                                </InputGroupAddon>                                
                                <Input onChange={optionhandleChange} multiple 
                                     id="datacategory" name="datacategory" type="select">
                                        {/* <option>Select Option</option> */}
                                        <option value="all">All</option>
                                        <option value="articles">Articles</option>
                                        <option value="videos">Videos</option>
                                        <option value="tools">Tools</option>

                                </Input>
                            </InputGroup>
                        </FormGroup>
                        


                        <div className="modal-footer">
                            <Button
                                color="secondary"
                                data-dismiss="modal"
                                type="button"
                                onClick={toggleeditModal}
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
export default Userlisttable
