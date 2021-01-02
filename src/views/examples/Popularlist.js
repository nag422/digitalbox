import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
// reactstrap components
import {

  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Spinner,
  CardFooter,
  Pagination
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import Popularlisttable from "./tables/Popularlisttable";
import PaginationComponent from "react-reactstrap-pagination";
// import { UsersContext, QueryContext, PaginationContext } from './contexts/UserContext';

const Popularlist = (props) => {
  
  const [currentpage, setCurrentpage] = useState(0);
  const [totalpages, setTotalpages] = useState(0);
  const [isalert,setIsalert] = useState(false);
  const [toollist,setToollist] = useState([])
  
  useEffect(() => {
    if(window.localStorage.getItem('userrole') !== "superuser"){
      props.history.push('/admin/categories/manage')
    }
    fetchtools();
    
  }, []);

  const paginate = async (e) => {   
    
    const url="https://app.kiranvoleti.com/ui/admin/popularlist/";
    let form_data = new FormData();
    form_data.append('page', e);
    form_data.append('perpage', 20);
    form_data.append('isactive', '');
    setCurrentpage(e)
    const config = {
      headers: {
          'content-type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
      }
    }
    await axios.post(url, form_data, config)
    .then(res=>{            
      var resptags = res.data.tools.map(val => (
        { ...val, ischecked: false }
      ))
      setToollist(resptags);      
                         
        
        setIsalert(false)                       
        
    })
    .catch(err=>
      {        
        setIsalert(false)
      })
    
    
  }

  
  const fetchtools = async () => {
    const url="https://app.kiranvoleti.com/ui/admin/popularlist/";
    let form_data = new FormData();
    form_data.append('page', currentpage);
    form_data.append('perpage', 20);
    form_data.append('isactive', '');
    const config = {
      headers: {
          'content-type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
      }
    }
    await axios.post(url, form_data, config)
    .then(res=>{            
      var resptags = res.data.tools.map(val => (
        { ...val, ischecked: false }
    ))
        setToollist(resptags);       
        setTotalpages(res.data.collectioncounttools)                 
        setIsalert(false)
        
    })
    .catch(err=>{
        console.log(err)
        setIsalert(false)
    })
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
                <h3 className="mb-0">Poular Tools List</h3>
              </CardHeader>
                      

              <Popularlisttable 
              
              fetchtags = {fetchtools}

              tools={toollist} 
              
              totalpages={totalpages}

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


export default Popularlist;
