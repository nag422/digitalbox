import React, {  useContext } from "react";
import { useRouteMatch } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import { CategoryContext } from './contexts/CategoryContext';
import {

    Card,
    CardHeader,
    Container,
    Row
    
} from "reactstrap";
import Header from "components/Headers/Header.js";
import Categoriestable from "./tables/Categoriestable";
import Categorymodel from "./models/Categorymodel";
function Categories(props) {
    const catmanager = useContext(CategoryContext);
    // const { token } = useParams();
    let trys = useRouteMatch("/admin/categories/:token");
    

    return (
        <>
        
        {catmanager.swalert}
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
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">{trys.params.token}</h3>
                            </CardHeader>

                            

                            <Categoriestable catref={trys.params.token} cats={catmanager.categories}
                            addcatmodeltrigger={catmanager.toggleModal} deleteThisGoal={catmanager.deleteThisGoal}
                            handlechange={catmanager.handlechange} handleAllChecked={catmanager.handleAllChecked}
                            updatecatmodel = {catmanager.updatecatmodel} toggleeditModal = {catmanager.toggleeditModal}
                            
                            
                            />
                        </Card>
                    </div>
                </Row>
                <Categorymodel 
                delete = {catmanager.deleteThisGoal}     
                editingform = {catmanager.editingform}   
                formchangedata = {catmanager.formchangedata} 
                addcatmodeltrigger={catmanager.toggleModal}      
                catmodel = {catmanager.catmodel}
                handleSubmit = {catmanager.handleSubmit}
                isalert ={catmanager.isalert}
                alertmsgcolor = {catmanager.alertmsgcolor}
                alertmsg = {catmanager.alertmsg}
                rhandleChange = {catmanager.rhandleChange}
                isspinner = {catmanager.isspinner}
                updatecatmodel = {catmanager.updatecatmodel}
                toggleeditModal = {catmanager.toggleeditModal}
                updatehandlesubmit = {catmanager.updatehandlesubmit}
                initialeditingform = {catmanager.initialeditingform}

                />
            </Container>
        </>
    )
}

export default Categories
