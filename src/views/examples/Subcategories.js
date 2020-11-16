import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { useRouteMatch } from "react-router-dom";
import { CategoryContext } from './contexts/CategoryContext';
import { ToastContainer} from 'react-toastify';
import {
    Card,
    CardHeader,
    Container,
    Row
  } from "reactstrap";
  import Header from "components/Headers/Header.js";
import Subcategoriestable from "./tables/Subcategoriestable";
import Subcategorymodel from "./models/Subcategorymodel";

function Subcategories() {
    const catmanager = useContext(CategoryContext);   
    let trys = useRouteMatch("/admin/categories/:token");

    // const vals = catmanager.categories.map(val=>{
    //     catmanager.subcategories.filter(val1=>{
    //         val1.ref
    //     })
    // });
    // console.log(vals);
    


    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
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
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">{trys.params.token}</h3>
                            </CardHeader>  
                                                      
                            <Subcategoriestable cats={catmanager.subcategories} refcats = {catmanager.categories}
                            addsubcategorymodel={catmanager.addsubcategorymodel}
                            subcatgorydeletebutton = {catmanager.subcatgorydeletebutton}
                            
                            
                            />
                        </Card>
                    </div>
                </Row>
                <Subcategorymodel 
                addsubcategorymodel={catmanager.addsubcategorymodel}
                subcatmodel={catmanager.subcatmodel}
                refcats = {catmanager.categories}
                subcathandleSubmit = {catmanager.subcathandleSubmit}
                rhandleChange = {catmanager.rhandleChange}
                

                />
            </Container>
        </>
    )
}

export default Subcategories
