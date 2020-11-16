import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { CategoryContext } from './contexts/CategoryContext';
import {

    Card,
    CardHeader,
    Container,
    Row
  } from "reactstrap";
import Header from "components/Headers/Header.js";
import Supsubcategoriestable from "./tables/Supsubcategoriestable";
import Supsubcategorymodel from "./models/Supsubcategorymodel";
import { ToastContainer} from 'react-toastify';

function Supsubcategories() {
    const catmanager = useContext(CategoryContext);   
    console.log(catmanager.supsubcategories);


    return (
        <>
            <Header />
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
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Super-Sub Categories</h3>
                            </CardHeader>  
                                                      
                            <Supsubcategoriestable cats={catmanager.supsubcategories} 
                            refcats = {catmanager.subcategories}
                            masterefcat = {catmanager.categories}
                            addsupsubcategorymodel = {catmanager.addsupsubcategorymodel}
                            supsubcatgorydeletebutton = {catmanager.supsubcatgorydeletebutton}
                             />
                        </Card>
                    </div>
                </Row>
                <Supsubcategorymodel 
                refcats = {catmanager.subcategories}
                masterefcat = {catmanager.categories}
                rhandleChange = {catmanager.rhandleChange}
                addsupsubcategorymodel = {catmanager.addsupsubcategorymodel}
                supsubcatmodel = {catmanager.supsubcatmodel}
                formchangedata = {catmanager.formchangedata}
                supsubcathandleSubmit = {catmanager.supsubcathandleSubmit}
                isspinner={catmanager.isspinner}
                

                />
            </Container>
        </>
    )
}

export default Supsubcategories
