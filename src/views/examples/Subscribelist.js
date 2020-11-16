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
import Tagstable from "./tables/Tagstable";
import PaginationComponent from "react-reactstrap-pagination";
import Paginationtable from "./tables/Paginationtable";
import { ToastContainer, toast } from 'react-toastify';
// import { UsersContext, QueryContext, PaginationContext } from './contexts/UserContext';
import { Redirect } from 'react-router-dom'
const Subscribelist = (props) => {
  const [subscribers, setSubscribers] = useState([]);
  const [tags, setTags] = useState([]);
  const [q, setQ] = useState('');  
  const [currentpage, setCurrentpage] = useState(0);
  const [totalpages, setTotalpages] = useState(0);
  const [isalert,setIsalert] = useState(false);
  const [stateallchecked, setStateallchecked] = useState(false);
  const [taglist,setTaglist] = useState('')
  
  useEffect(() => {
    // if(window.localStorage.getItem('usertype') !== "superuser"){
    //   props.history.push('/admin/categories/manage')
    // }
    fetchtags();
    
  }, []);

  const paginate = async (e) => {   
    
    const url="https://app.kiranvoleti.com/tagslist";
    let form_data = new FormData();
    form_data.append('page', e);
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
    const url="https://app.kiranvoleti.com/tagslist";
    let form_data = new FormData();
    form_data.append('page', currentpage);
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
const fetchfromdatabase = async (e) => {
  const url="https://app.kiranvoleti.com/getsubscriberssearch";
  
  let form_data = new FormData();
  form_data.append('searchterm',e.target.value.toLowerCase())
  const config = {
    headers: {
        'content-type': 'application/json'
        // 'X-CSRFToken': getCookie('csrftoken')
    }
  }
  await axios.post(url, form_data, config)
  .then(res=>{            
    setSubscribers(res.data.users); 
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
   form_data.append('tablename', 'keytags');
   let url = 'https://app.kiranvoleti.com/bulkdeltereact';
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
const deleteUserind = async (e) => {        
  // Deleter



   let form_data = new FormData();
   var list = []
   list.push(e.target.dataset.id)      
 
  

   form_data.append('deletelist', list);
   form_data.append('tablename', 'lunchbox_subscriptions');
   let url = 'https://app.kiranvoleti.com/bulkdeltereactusers';
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
                <h3 className="mb-0">Tags List</h3>
              </CardHeader>
              <Form>
                <Row>
                 
                  <Col md="10 m-2">
                    <FormGroup>
                    <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-tag" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input onChange={(e) => setTaglist(e.target.value)} placeholder="tags by enter" name="taglist" id="taglist" type="textarea" />
                </InputGroup>
                  <Button color="primary" onClick={handlesubmit} outline type="button">Submit</Button>
                    </FormGroup>
                  </Col>                  
                </Row>
              </Form>              

              <Tagstable 
              
              fetchtags = {fetchtags} 
              deleteUserind = {deleteUserind} deleteUser = {deleteUser} 
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


export default Subscribelist;
