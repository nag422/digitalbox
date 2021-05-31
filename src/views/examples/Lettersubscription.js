import React, { useState, useEffect, useRef, useCallback } from "react";
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
    CardHeader,
    Card,
    Label,
    Alert,
    Container,
    CustomInput,
    Pagination
} from "reactstrap";
import PaginationComponent from "react-reactstrap-pagination";
import Header from "components/Headers/Header.js";
import SweetAlert from 'react-bootstrap-sweetalert';
import { ToastContainer, toast } from 'react-toastify';


const Lettersubscription = () => {
    const [title, setTitle] = useState("");
    const [scrolling, setScrolling] = useState(true);    
    const [bannerlink, setBannerlink] = useState("");
    const [subject, setSubject] = useState("");
    const [datatype, setDatatype] = useState("articles");

    const [articletext, setArticletext] = useState("");
    const [videotext, setVideotext] = useState("");
    const [tooltext, setTooltext] = useState("");
    
    const [pagenumber, setPagenumber] = useState(1);
    const [totalcount, setTotalcount] = useState(1);
    const [subvideos, setSubvideos] = useState([]);
    const [multirefiles, setMultirefiles] = useState([]);
    const [list, setList] = useState([]);
    const [videolist, setVideolist] = useState([]);
    const [toollist, setToollist] = useState([]);   




    const [hasmore,setHasmore] = useState(false);
    const [stateallchecked, setStateallchecked] = useState(false);
    
    const observer =useRef();
    
    const lastElmRef = useCallback( node => {
        
        // if(scrolling) return
        
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                  
                // setPagenumber(prevPagenumber => prevPagenumber + 1)           
                handlePageClickvideo(pagenumber);
            }
            
        })
        if (node) observer.current.observe(node)
    },[])

    useEffect(() => {

        
        let form_data = new FormData();

        form_data.append('per_page', 5);
        form_data.append('start_from', 1);
        form_data.append('datatype', datatype);
        // form_data.append('phone', editingform.phone);
        // form_data.append('datacategory', editingform.datacategory);

        let url = 'https://app.kiranvoleti.com/daily/';
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

                var respvideos = res.data.dailyvideos.map(val => (
                    { ...val, ischecked: false }
                ))
                setSubvideos(respvideos)
                setTotalcount(res.data.totalcount)
                setScrolling(false)



            })
            .catch(err => {

                console.log(err)
            }
            )

            

            


    }, [])


    

    


    const refreshdata = () => {
        let form_data = new FormData();

        form_data.append('per_page', 15);
        form_data.append('start_from', 1);
        form_data.append('datatype', datatype);
        // form_data.append('phone', editingform.phone);
        // form_data.append('datacategory', editingform.datacategory);

        let url = 'https://app.kiranvoleti.com/daily/';
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

                var respvideos = res.data.dailyvideos.map(val => (
                    { ...val, ischecked: false }
                ))
                setSubvideos(respvideos)



            })
            .catch(err => {

                console.log(err)
            }
            )
    }


    // const handleChange = (e) => {


    //     [e.target.name] = e.target.value.trim()


    // };

    const onFileChange = (e) => {
        setMultirefiles(e.target.files[0])
    }


    

    const handlePageClickvideo = async (e) => {
        const pagevalue = document.getElementById('refvaluepagination').value;
        let form_data = new FormData();
        setPagenumber(prevPagenumber => prevPagenumber + 1)
        form_data.append('per_page',5);
        form_data.append('start_from', parseInt(pagevalue)+1);
        form_data.append('datatype', datatype);
        setStateallchecked(false);    
        
        
        



        // Before Ui Elements


        // Before Ui Elements
        // Backend Submission

        let url = "https://app.kiranvoleti.com/daily/";
        // let url = 'http://localhost:8099/fetchfeeds';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        

        
        
        await axios.post(url, form_data, config)
            .then(res => {
                
                // setFeedreadylist(res.data.feeds)     
                
                // tosttrigger(res.data.msg, 'success')
                // setHasmore(res.data.dailyvideos > 0)
                
                if (res.data.dailyvideos.length <=0 ){
                    return alert('No More Data')
                }
                var respvideos = res.data.dailyvideos.map(val => (
                    { ...val, ischecked: false }
                ))
                
                setSubvideos(prevSubvideos => {
                    return [...new Set([...prevSubvideos,...respvideos])]
                });
                
                
                tosttrigger('Fetched Successfully', 'success')
                // setCategories(prevCategories => [...prevCategories, { id: res.data.indexkey, category: formchangedata.category }])

            })
            .catch(err =>{
                
                tosttrigger(err, 'error')
                }

            )

    };

   

    const handleAllChecked = (event) => {

        var respvideos = subvideos.map(val => (
            { ...val, ischecked: event.target.checked }
        ))
        setSubvideos(respvideos)
        setStateallchecked(event.target.checked)



    }
    const assignids = (e) => {

        var allelm = document.querySelectorAll("input[name=childbox]");
        if (datatype.toString() === "articles") {
            allelm.forEach(elm => {
                if (elm.checked) {

                    let retrnindex = list.indexOf((elm.id).toString());
                    if (retrnindex <= 0) {
                        list.push(elm.id)
                    }
                }

            })
            setList(list);
        }
        if (datatype.toString() === "videos") {
            allelm.forEach(elm => {
                if (elm.checked) {

                    let retrnindex = videolist.indexOf((elm.id).toString());
                    if (retrnindex <= 0) {
                        videolist.push(elm.id)
                    }
                }

            })
            setVideolist(videolist);
        }
        if (datatype.toString() === "tools") {
            allelm.forEach(elm => {
                if (elm.checked) {

                    let retrnindex = toollist.indexOf((elm.id).toString());
                    if (retrnindex <= 0) {
                        toollist.push(elm.id)
                    }
                }

            })
            setToollist(toollist);
        }



        tosttrigger('Added to List', 'success')

    }
    const deassignids = async (e) => {
        var tempraylist = []
        var outputlist = []
        var allelm = document.querySelectorAll("input[name=childbox]");
        await allelm.forEach(elm => {
            if (elm.checked) {
                tempraylist.push(elm.id)

            }
        })
        outputlist = list.filter(n => !tempraylist.includes(n))


        tosttrigger('Removed from List', 'success')
        return setList(outputlist);

    }

    const handleCheckchange = (e) => {
        let valid = e.target.id;
        let valchecked = e.target.checked;
        var someavideosupdated = subvideos.filter((val, key) => {

            return [...subvideos, parseInt(val.id) === parseInt(valid) ? val.ischecked = valchecked : val.ischecked]


        });

        setSubvideos(someavideosupdated);

    }

    const handleSubscribe = async (e) => {

        let form_data = new FormData();

        form_data.append('list', list);
        form_data.append('videolist', videolist);
        form_data.append('toollist', toollist);
        form_data.append('title', title);
        form_data.append('subject', subject);
        form_data.append('datatype', datatype);
        form_data.append('bannerlink', bannerlink);

        form_data.append('articletext', articletext);
        form_data.append('videotext', videotext);
        form_data.append('tooltext', tooltext);

        // for (const key of Object.keys(multirefiles)) {
        //     form_data.append('uploadfile', multirefiles[key])
        // }
        form_data.append('uploadfile', multirefiles)

        

        // Before Ui Elements


        // Before Ui Elements
        // Backend Submission

        let url = "https://app.kiranvoleti.com/dailysubscribe/";
        // let url = 'http://localhost:8099/fetchfeeds';
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config)
            .then(res => {
                // setFeedreadylist(res.data.feeds)     

                // tosttrigger(res.data.msg, 'success')
                
                tosttrigger('Fetched Successfully', 'success')
                // setCategories(prevCategories => [...prevCategories, { id: res.data.indexkey, category: formchangedata.category }])

            })
            .catch(err =>
                tosttrigger(err, 'error')


            )

    };


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

    // end checkbox


    function tosttrigger(msg, status) {
        if (status === "success") {

            toast.success(msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } else {
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

    function items() {
        return (subvideos.map((row, index) => {

         if(subvideos.length === index+1){
            return <tr ref={lastElmRef} key={index} className={row.id}>
        

            <th scope="row">


                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id={row.id}
                        type="checkbox"
                        name="childbox"
                        onChange={handleCheckchange}
                        checked={row.ischecked}

                    />

                    <label className="custom-control-label" htmlFor={row.id}>
                        {index + 1}
                    </label>
                </div>



            </th>
            <td><a href={row.URL} rel="noopener noreferrer" target="_blank"><div style={{ width: '200px', wordWrap: 'break-word', whiteSpace: "pre-wrap" }}>{row.title}</div></a></td>
            <td>

                <Media className="align-items-center">
                    <a
                        className=" mr-3"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                    >
                        <img
                            alt="..."
                            height="auto"
                            width="150px"
                            src={row.image}
                        />
                    </a>

                </Media>

            </td>
            <td>{row.category}</td>

            <td>{row.videopublishedat}</td>
            <td>{row.lastmodified}</td>


        </tr>

         }  
         else{
            return <tr key={index} className={row.id}>
        

            <th scope="row">


                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id={row.id}
                        type="checkbox"
                        name="childbox"
                        onChange={handleCheckchange}
                        checked={row.ischecked}

                    />

                    <label className="custom-control-label" htmlFor={row.id}>
                        {index + 1}
                    </label>
                </div>



            </th>
            <td><a href={row.URL} rel="noopener noreferrer" target="_blank"><div style={{ width: '200px', wordWrap: 'break-word', whiteSpace: "pre-wrap" }}>{row.title}</div></a></td>
            <td>

                <Media className="align-items-center">
                    <a
                        className=" mr-3"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                    >
                        <img
                            alt="..."
                            height="auto"
                            width="150px"
                            src={row.image}
                        />
                    </a>

                </Media>

            </td>
            <td>{row.category}</td>

            <td>{row.videopublishedat}</td>
            <td>{row.lastmodified}</td>


        </tr>
         }                 
        


        }))}


    return (

        <>
            <Header />
            <Container className="mt--7" fluid>

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
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">Subscription Alert</h3>
                    </CardHeader>
                    <input type="hidden" id ="refvaluepagination" value={pagenumber} />

                    <Row>
                        <Col md="10" className="m-3">
                            <FormGroup className="mb-3">
                                <Label for="subject">Subject</Label>
                                <Input type="text" name="subject" id="subject"
                                    onChange={(e) => setSubject(e.target.value)}
                                />

                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Label for="title">Text</Label>
                                <Input type="textarea" name="title" id="title"
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                            </FormGroup>
                            {/* Fortext news */}
                            <FormGroup className="mb-3">
                                <Label for="articletext">Articletext</Label>
                                <Input type="textarea" name="articletext" id="articletext"
                                    onChange={(e) => setArticletext(e.target.value)}
                                />

                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Label for="videotext">Videotext</Label>
                                <Input type="textarea" name="videotext" id="videotext"
                                    onChange={(e) => setVideotext(e.target.value)}
                                />

                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Label for="tooltext">Toolstext</Label>
                                <Input type="textarea" name="tooltext" id="tooltext"
                                    onChange={(e) => setTooltext(e.target.value)}
                                />

                            </FormGroup>
                            {/* Fortext news */}
                            <FormGroup className="mb-3">
                                <Label for="multirefiles">Upload Banner</Label>
                                <InputGroup className="input-group-alternative">
                                    <CustomInput type="file" id="multirefiles" name="multirefiles"
                                        onChange={onFileChange} label="Yo, pick a files!" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Label for="bannerlink">Banner URL</Label>
                                <Input type="text" name="bannerlink" id="bannerlink"
                                    onChange={(e) => setBannerlink(e.target.value)}
                                />

                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Label for="datatype">Category Filter</Label>
                                <Input type="select" name="datatype" id="datatype"
                                    onChange={(e) => setDatatype(e.target.value)}>
                                    <option className="form-controle" value="articles">Articles</option>
                                    <option className="form-controle" value="videos">Videos</option>
                                    <option className="form-controle" value="tools">Tools</option>
                                </Input>

                            </FormGroup>


                            <FormGroup className="mb-3">
                                <Button onClick={assignids}>Assign</Button>
                                <Button onClick={handleSubscribe}>Send Mail</Button>
                                <Button onClick={deassignids}>Deassign</Button>
                                <Button onClick={refreshdata}>Refresh</Button>
                            </FormGroup>
                        </Col>




                    </Row>


                    <Table  className="align-items-center table-flush" responsive>

                        <thead className="thead-light">
                            <tr>
                                <th>
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input
                                            className="custom-control-input"
                                            id="parentbox"
                                            type="checkbox"
                                            // checked = {stateallchecked}
                                            onChange={handleAllChecked}
                                        />
                                        <label className="custom-control-label" htmlFor="parentbox">
                                            #
                                </label>
                                    </div>
                                </th>
                                <th scope="col">URL</th>
                                <th scope="col">Image</th>
                                <th scope="col">Type</th>
                                <th scope="col">pubdate</th>
                                <th scope="col">lastmodified</th>
                            </tr>
                        </thead>
                        <tbody>
                            <>
                            {items()}
                            </>
                        </tbody>
                    </Table>
                    {/* <Row>

                        <Col md="6" className="mt-1">
                            <Pagination aria-label="Page navigation example">

                                <PaginationComponent
                                    totalItems={totalcount}
                                    pageSize={5}
                                    onSelect={handlePageClickvideo}
                                    maxPaginationNumbers={5}
                                    defaultActivePage={1}
                                    firstPageText={'<'}
                                    previousPageText={'<<'}
                                    nextPageText={'>>'}
                                    lastPageText={'>'}
                                />


                            </Pagination>
                        </Col>
                    </Row> */}

                </Card>

            </Container>

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
export default Lettersubscription
