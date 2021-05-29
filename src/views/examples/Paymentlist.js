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
import PaginationComponent from "react-reactstrap-pagination";
import Paymentlisttable from "./tables/Paymentlisttable";
import { ToastContainer, toast } from 'react-toastify';
// import { UsersContext, QueryContext, PaginationContext } from './contexts/UserContext';
import { Redirect } from 'react-router-dom'
const Paymentlist = (props) => {
  const [subscribers, setSubscribers] = useState([]);
  const [tags, setTags] = useState([]);
  const [q, setQ] = useState('');  
  const [currentpage, setCurrentpage] = useState(0);
  const [totalpages, setTotalpages] = useState(0);
  const [isalert,setIsalert] = useState(false);
  const [stateallchecked, setStateallchecked] = useState(false);
  const [taglist,setTaglist] = useState('')
  const [sortby,setSortby] = useState(true)
  
  useEffect(() => {
    // if(window.localStorage.getItem('usertype') !== "superuser"){
    //   props.history.push('/admin/categories/manage')
    // }
    fetchtags();
    
  }, []);

  const paginate = async (e) => {   
    
    const url="https://app.kiranvoleti.com/ui/admin/paymentlist/";
    let form_data = new FormData();
    form_data.append('page', e);
    form_data.append('sort', sortby);
    setCurrentpage(e)
    const config = {
      headers: {
          'content-type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
      }
    }
    await axios.post(url, form_data, config)
    .then(res=>{            
      var resptags = res.data.tags.map(val => (
        { ...val, ischecked: false }
      ))
        setTags(resptags);      
                         
        
        setIsalert(false)                       
        
    })
    .catch(err=>
      {        
        setIsalert(false)
      })
    
    
  }

  
  const fetchtags = async () => {
    const url="https://app.kiranvoleti.com/ui/admin/paymentlist/";
    let form_data = new FormData();
    form_data.append('page', currentpage);
    form_data.append('sort', sortby);
    form_data.append('searchterm','')
    const config = {
      headers: {
          'content-type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
      }
    }
    await axios.post(url, form_data, config)
    .then(res=>{            
      var resptags = res.data.tags.map(val => (
        { ...val, ischecked: false }
    ))
        setTags(resptags);       
        setTotalpages(res.data.total)                 
        setIsalert(false)
        
    })
    .catch(err=>{
        console.log(err)
        setIsalert(false)
    })
}

const handleCheckchange = (e) => {
  let valid = e.target.id;
  let valchecked = e.target.checked;
  console.log(valid, valchecked);
  var somesubsupdated = tags.filter((val, key) => {

      return [...tags, (val.id).toString() === valid.toString() ? val.ischecked = valchecked : val.ischecked]


  });

  setTags(somesubsupdated);

}

const handleAllChecked = (event) => {

  var respvideos = tags.map(val => (
      { ...val, ischecked: event.target.checked }
  ))
  setTags(respvideos)  
  setStateallchecked(event.target.checked)



}
// Handle Submit Section

const handlesubmit = (e) => {
  e.preventDefault();  

  let form_data = new FormData();

  
  form_data.append('feed', taglist);


  

  // Before Ui Elements
  
  tosttrigger('Sit back .. Process is initiating..', 'success')
  // Before Ui Elements
  // Backend Submission

  let url = "https://app.kiranvoleti.com/tagscreate";
  // let url = 'https://jsonplaceholder.typicode.com/todos';
  const config = {
      headers: {
          'content-type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
      }
  }
  axios.post(url, form_data, config)
      .then(res => {
          console.log(res.data)
          tosttrigger("success", 'success')
          fetchtags();

      })
      .catch(err =>
          {
            
          tosttrigger(err, 'error')}


      )


}
// End Hndle Submit Section


const deletepayment = async (e) => {        
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
   form_data.append('tablename', 'payments');

   let url = 'https://app.kiranvoleti.com/ui/admin/bulkdeltereact/';

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
           fetchtags();
           

       })
       .catch(err =>
           tosttrigger("Something Went Wrong !", "error")

       )
}



  const subscriptionalert = async (e) => {        
    // Subscriptionalert 
  
  
     let form_data = new FormData();
     var list = []
     var allelm = document.querySelectorAll("input[name=childbox]");
  
     await allelm.forEach(elm => {
         if (elm.checked) {
             list.push(elm.id)           
         }
     })
    
  
     form_data.append('deletelist', list);
     form_data.append('tablename', 'payments');
     let url = 'https://app.kiranvoleti.com/ui/admin/subscriptionalert/';
     // let url = 'https://jsonplaceholder.typicode.com/todos';
     const config = {
         headers: {
             'content-type': 'application/json',
             'X-CSRFToken': getCookie('csrftoken')
         }
     }
  
     axios.post(url, form_data, config)
         .then(res => {
  
             tosttrigger(res.data.resonse, "success");
             
             
  
         })
         .catch(err =>
             tosttrigger("Something Went Wrong !", "error")
  
         )
  }

  const sortbydate = async (e) => {        
    // sortbydate
  
  
    setSortby(!sortby)
    const url="https://app.kiranvoleti.com/ui/admin/paymentlist/";
    let form_data = new FormData();
    form_data.append('page', currentpage);
    form_data.append('sort', sortby);
    form_data.append('searchterm','');
    
    
    const config = {
      headers: {
          'content-type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
      }
    }
    await axios.post(url, form_data, config)
    .then(res=>{            
      var resptags = res.data.tags.map(val => (
        { ...val, ischecked: false }
    ))
        setTags(resptags);       
        setTotalpages(res.data.total)                 
        setIsalert(false)
        
    })
    .catch(err=>{
        console.log(err)
        setIsalert(false)
    })
  }




  const fetchfromdatabase = async (e) => {
    
    const url="https://app.kiranvoleti.com/ui/admin/paymentlist/";
    console.log(e.target.value)
    let form_data = new FormData();
    form_data.append('page', '0');
    form_data.append('sort', sortby);
    form_data.append('searchterm',e.target.value.toLowerCase())
    const config = {
      headers: {
          'content-type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
      }
    }
    await axios.post(url, form_data, config)
    .then(res=>{            
      var resptags = res.data.tags.map(val => (
        { ...val, ischecked: false }
    ))
        setTags(resptags);       
        setTotalpages(res.data.total)                 
        setIsalert(false)
        
    })
    .catch(err=>{
        console.log(err)
        setIsalert(false)
    })
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
                <h3 className="mb-0">Payment List</h3>
              </CardHeader>

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
                          

              <Paymentlisttable 
              
              fetchtags = {fetchtags} 
              deletepayment = {deletepayment} 
              sortbydate = {sortbydate} 
              subscriptionalert = {subscriptionalert}               
              tags={tags} totalpages={totalpages}
              handleCheckchange = {handleCheckchange}
              handleAllChecked = {handleAllChecked}
               />
              
              <Col md="6" className="mt-1">
                  <Pagination aria-label="Page navigation example">
                  
                      <PaginationComponent
                          totalItems={totalpages}
                          pageSize={50}
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


export default Paymentlist;
