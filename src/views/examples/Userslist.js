import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
// reactstrap components
import {

  Card,
  CardHeader,
  Container,
  Row,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Spinner,
  CardFooter,
  Button,
  Pagination
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import Userlisttable from "./tables/Userlisttable";
import PaginationComponent from "react-reactstrap-pagination";
import Paginationtable from "./tables/Paginationtable";
import { ToastContainer, toast } from 'react-toastify';
import { UsersContext, QueryContext, PaginationContext } from './contexts/UserContext';
import { Redirect } from 'react-router-dom'
const Userslist = (props) => {
  const [users, setUsers] = useContext(UsersContext);
  const [q, setQ] = useContext(QueryContext);
  const {currentpage, setCurrentpage, totalpages,setTotalpages} = useContext(PaginationContext); 
  const [isalert,setIsalert] = useState(false)
  
  // useEffect(() => {
  //   if(window.localStorage.getItem('usertype') !== "superuser"){
  //     props.history.push('/admin/categories/manage')
  //   }
    
  // }, [])
  const paginate = async (e) => {   
    
    const url="https://app.kiranvoleti.com/ui/getuserlist/";
    const body = JSON.stringify({
      'page':e,
    })
   
    setCurrentpage(e)
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Accept':'application/json',
          'X-CSRFToken': getCookie('csrftoken')
      }
    }
    await axios.get(url, body, config)
    .then(res=>{            
        setUsers(res.data.users); 
        setIsalert(false)                       
        
    })
    .catch(err=>{
        console.log(err)
        setIsalert(false)
    })
    
    
  }
  const fetchusers = async () => {
    const url="https://app.kiranvoleti.com/ui/getuserlist/";
    
    const form_data = new FormData();
    form_data.append('page',currentpage)

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      }
    }
    await axios.get(url, form_data, config)
    .then(res=>{            
        setUsers(res.data.users);                        
        setIsalert(false)
    })
    .catch(err=>{
        console.log(err)
        setIsalert(false)
    })
}

const fetchfromdatabase = async (e) => {
  const url="https://app.kiranvoleti.com/ui/getuserlistsearch/";
  console.log(e.target.value)
  let form_data = new FormData();
  form_data.append('searchterm',e.target.value.toLowerCase())
  const config = {
    headers: {
        'content-type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
        // 'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA5Mjc2Nzg1LCJqdGkiOiIwZjM0YzYxZDczZWI0NzMxODlhMjUxYjA0MWQ5YmUwYSIsInVzZXJfaWQiOjF9.FAp0NBCBufFmJ8Prr0ZBRz0aCZQHlLp4aUVcCLer9oE'
    }
  }
  await axios.post(url, form_data, config)
  .then(res=>{            
      setUsers(res.data.users); 
      setIsalert(false); 
                            
      
  })
  .catch(err=>{
      console.log(err)
  })
}



const deleteUser = async (e) => {        
  // Deleter



   let form_data = new FormData();
   var list = []
   var allelm = document.querySelectorAll("input[name=childbox]");

   await allelm.forEach(elm => {
       if (elm.checked) {
           list.push(elm.id)           
       }
   })
  

   form_data.append('deletelist', list);
   form_data.append('tablename', 'backend_useraccount');
   let url = 'https://app.kiranvoleti.com/ui/bulkdeltereactusers/';
   // let url = 'https://jsonplaceholder.typicode.com/todos';
   const config = {
       headers: {
           'content-type': 'application/json',
           'X-CSRFToken': getCookie('csrftoken')
       }
   }

   axios.post(url, form_data, config)
       .then(res => {

           tosttrigger(res.data.msg, "success");
           fetchusers()
           console.log('deleted')

       })
       .catch(err =>
           tosttrigger("Something Went Wrong !", "error")

       )
}
const deleteUserind = async (e) => {        
  // Deleter



   let form_data = new FormData();
   var list = []
   list.push(e.target.dataset.id)      
 
  

   form_data.append('deletelist', list);
   form_data.append('tablename', 'backend_useraccount');
   let url = 'https://app.kiranvoleti.com/ui/bulkdeltereactusers/';
   // let url = 'https://jsonplaceholder.typicode.com/todos';
   const config = {
       headers: {
           'content-type': 'application/json',
           'X-CSRFToken': getCookie('csrftoken')
       }
   }

   axios.post(url, form_data, config)
       .then(res => {

           tosttrigger(res.data.msg, "success");
           fetchusers()

       })
       .catch(err =>
           tosttrigger("Something Went Wrong !", "error")

       )
}
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




 
  
  
  return (
   
    <>

      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Users</h3>
              </CardHeader>
              <Form>
                <Row>
                  <Col md="4 m-2">
                    <FormGroup>
                    <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-zoom-split-in" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input value= {q} onChange={e => setQ((e.target.value).toLowerCase())} placeholder="Filter" type="text" />
                </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="4 m-2">
                    <FormGroup>
                    <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-zoom-split-in" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search from Database" onChange={fetchfromdatabase} type="text" />
                </InputGroup>
                    </FormGroup>
                  </Col>                  
                </Row>
              </Form>              

              <Userlisttable 
              isalert = {isalert}
              setIsalert = {setIsalert}
              fetchusers = {fetchusers} 
              deleteUserind = {deleteUserind} deleteUser = {deleteUser} users={users} totalpages={totalpages} />
              
              <Col md="6" className="mt-1">
                  <Pagination aria-label="Page navigation example">
                  
                      <PaginationComponent
                          totalItems={totalpages}
                          pageSize={5}
                          onSelect={paginate}
                          maxPaginationNumbers={5}
                          defaultActivePage={1}
                          firstPageText={'<'}
                          previousPageText={'<<'}
                          nextPageText={'>>'}
                          lastPageText={'>'}
                      />


                  </Pagination>
              </Col>

              {isalert ? <Spinner color="primary" />

              :


             null
              
              
              }
              <CardFooter className="py-4">
                                    
                      
                      
                </CardFooter>
              
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}


export default Userslist;
