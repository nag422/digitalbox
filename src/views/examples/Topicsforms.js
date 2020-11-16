import React, { useState, useContext } from 'react';
import classnames from "classnames";
import Header from "components/Headers/Header.js";
// import "./Topicforms.css"
import PropTypes from 'prop-types';
// reactstrap components
import {
    Card,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Row,
    CardHeader,
    Container,
    FormGroup,
    Form,
    Input,
    Col,
    Label,
    Button,
    InputGroup,
    CustomInput,
    Spinner, Pagination
} from "reactstrap";
import ReactPaginate from 'react-paginate';
import PaginationComponent from "react-reactstrap-pagination";
import { ToastContainer } from 'react-toastify';
import { CategoryContext } from './contexts/CategoryContext';
import { TopicsContext } from './contexts/TopicsContext';
import Articletable from './tables/Articletable';
import Articlevideotable from './tables/Articlevideotable';
import Toolsvideotable from './tables/Toolsvideotable';
import Videoarticletable from './tables/Videoarticletable';
import Articlevideomodel from './models/Articlevideomodel';
import Videoarticlemodel from './models/Videoarticlemodel';
import ToolsModel from './models/ToolsModel';

function Topicsforms(props) {

    // form state
    const initialFormData = Object.freeze({
        tabs: 1

    });
    const catmanager = useContext(CategoryContext);
    const topicmanager = useContext(TopicsContext);

    const [formchangedata, updateFormchangedata] = useState(initialFormData);
    const [tabs, setTabs] = useState(formchangedata.tabs)





    const toggleNavs = (e, state, index) => {
        e.preventDefault();
        setTabs(index)
        topicmanager.setFetchcategory('')
        topicmanager.setArticlevideoisactive('')
        topicmanager.setArticlevideoisview('')
        topicmanager.setArticlevideosearch('')
        topicmanager.setArticlevideoauthor('')
        topicmanager.setArticlevideochannel('')

    };
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
                    <div className="col-md">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Topics</h3>
                            </CardHeader>
                            <div className="nav-wrapper">
                                <Nav
                                    className="nav-fill flex-column flex-md-row"
                                    id="tabs-icons-text"
                                    pills
                                    role="tablist"
                                >
                                    <NavItem>
                                        <NavLink
                                            aria-selected={tabs === 1}
                                            className={classnames("mb-sm-3 mb-md-0", {
                                                active: tabs === 1
                                            })}
                                            onClick={e => toggleNavs(e, "tabs", 1)}
                                            href="#pablo"
                                            role="tab"
                                        >
                                            <i className="ni ni-cloud-upload-96 mr-2" />
                Feed and Links Dumping
              </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            aria-selected={tabs === 2}
                                            className={classnames("mb-sm-3 mb-md-0", {
                                                active: tabs === 2
                                            })}
                                            onClick={e => toggleNavs(e, "tabs", 2)}
                                            href="#pablo"
                                            role="tab"
                                        >
                                            <i className="ni ni-books mr-2" />
                                            {'Source Table'}
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            aria-selected={tabs === 3}
                                            className={classnames("mb-sm-3 mb-md-0", {
                                                active: tabs === 3
                                            })}
                                            onClick={e => toggleNavs(e, "tabs", 3)}
                                            href="#pablo"
                                            role="tab"
                                        >
                                            <i className="ni ni-book-bookmark mr-2" />
                                            {'Fetched Articles table'}
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            aria-selected={tabs === 4}
                                            className={classnames("mb-sm-3 mb-md-0", {
                                                active: tabs === 4
                                            })}
                                            onClick={e => toggleNavs(e, "tabs", 4)}
                                            href="#pablo"
                                            role="tab"
                                        >
                                            <i className="ni ni-button-play mr-2" />
                                            {'Fetched Video table'}
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            aria-selected={tabs === 5}
                                            className={classnames("mb-sm-3 mb-md-0", {
                                                active: tabs === 5
                                            })}
                                            onClick={e => toggleNavs(e, "tabs", 5)}
                                            href="#pablo"
                                            role="tab"
                                        >
                                            <i className="ni ni-settings mr-2" />
                                            {'Fetched Tool table'}
                                        </NavLink>
                                    </NavItem>

                                </Nav>
                            </div>
                            <Card className="shadow">
                                <CardBody>
                                    <TabContent activeTab={"tabs" + tabs}>
                                        <TabPane tabId="tabs1">

                                            <Form onSubmit={topicmanager.handleSubmit}>
                                                <Row>
                                                    <Col md="12">
                                                        <FormGroup className="mb-3">
                                                            <Label for="superref">Select Topic</Label>
                                                            <Input type="select" name="superref" id="superref"
                                                                onChange={topicmanager.rhandleChange}
                                                            >
                                                                <option>Select Option</option>
                                                                <option value="feeds">Feeds (text data)</option>
                                                                <option value="googlenewsfeeds">Googlenewsfeeds (text data)</option>
                                                                <option value="links">Links (text data)</option>
                                                                <option value="channel">Channel (video data)</option>
                                                                <option value="username">Channel Username (video data)</option>
                                                                <option value="keyword">Keyword (video data)</option>
                                                                <option value="video">Video (video data)</option>
                                                                <option value="tools">Tools</option>


                                                            </Input>
                                                        </FormGroup>

                                                        <FormGroup className="mb-3">
                                                            <Label for="iptype">Select Input Type</Label>
                                                            <Input type="select" name="iptype" id="iptype"
                                                                onChange={topicmanager.rhandleChange}
                                                            >
                                                                <option value="multiple">Multiple</option>
                                                                <option value="csv">Csv File</option>

                                                            </Input>
                                                        </FormGroup>
                                                        {topicmanager.feedform.iptype === 'multiple' ?
                                                            <FormGroup>
                                                                <Input
                                                                    id="iptextarea"
                                                                    name="iptextarea"
                                                                    placeholder="Enter Links By Enter"
                                                                    rows="3"
                                                                    type="textarea"
                                                                    onChange={topicmanager.rhandleChange}
                                                                />
                                                            </FormGroup>
                                                            :
                                                            <FormGroup className="mb-3">
                                                                <Label for="multirefiles">Upload csv file</Label>
                                                                <InputGroup className="input-group-alternative">
                                                                    <CustomInput type="file" id="multirefiles" name="multirefiles"
                                                                        onChange={topicmanager.onFileChange} label="Yo, pick a CSV file" />
                                                                </InputGroup>
                                                            </FormGroup>
                                                        }
                                                    </Col>
                                                </Row>
                                                <Button color="primary" type="submit" disabled={topicmanager.isspinner}>
                                                    {topicmanager.isspinner ? <Spinner size="sm" color="secondary" className="mr-1" /> : null}
                                                    {topicmanager.isspinner ? 'Processing..' : 'Submit'}
                                                </Button>

                                            </Form>


                                        </TabPane>
                                        <TabPane tabId="tabs2">
                                            <Row>
                                                <Col md="6">

                                                    <Button outline color="primary" size="sm" onClick={topicmanager.getallfeedstable} >Refresh</Button>

                                                    {topicmanager.feedform.typeofsubmit === "feeds" ||

                                                        topicmanager.feedform.typeofsubmit === "googlenewsfeeds" ?

                                                        <Button outline color="info" size="sm" onClick={topicmanager.sendforFetch} >Crawl Now (Extract)</Button>
                                                        :
                                                        null
                                                    }
                                                    {topicmanager.feedform.typeofsubmit === "channel" ?

                                                    <Button outline color="danger" size="sm" onClick={topicmanager.sendchannelfetch} >Fetch Video Channels</Button>
                                                    
                                                    :
                                                    null
                                                    }
                                                    {/* <Button color="secondary" onClick={topicmanager.delpin} >Delete</Button> */}


                                            fetched: {topicmanager.howmanyfetch}
                                                    <FormGroup className="mt-3">
                                                        {/* <Label for="typeofsubmit">Select type</Label> */}
                                                        <Input type="select" name="typeofsubmit" bsSize="sm" id="typeofsubmit"
                                                            onChange={topicmanager.rhandleChange}
                                                        >
                                                            <option>Select Option</option>
                                                            <option value="">---------Parent---------</option>
                                                            <option value="feeds">Feeds (text data)</option>
                                                            <option value="googlenewsfeeds">Googlenewsfeeds (text data)</option>
                                                            <option value="links">Links (text data)</option>
                                                            <option value="channel">Channel ID(video data)</option>
                                                            <option value="username">Channel name(video data)</option>
                                                            <option value="video">Video (video data)</option>
                                                            <option value="">---------Children---------</option>

                                                            <option value="genfromgooglefeeds">Gen from Googlefeeds (text data (child))</option>
                                                            <option value="genfromfeeds">Gen from feeds (text data (child))</option>
                                                            <option value="genfromchannel">Gen from channels (video data (child))</option>
                                                            <option value="links">Links (text data (child))</option>
                                                            <option value="video">Video (video data (child))</option>



                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <hr />
                                                {/* <Col md='6'>
                                                    <h4 className="text-center">Fetching to Tables</h4>
                                                    <FormGroup className="m-3"> */}
                                                        {/* <Label for="fetchcategory">Select type</Label>
                                                        <Input type="select" name="fetchcategory" id="fetchcategory"
                                                            onChange={topicmanager.rhandleChange}
                                                        >
                                                            <option>Select Option</option>
                                                            {catmanager.categories.map(val => (
                                                                <option key={val.id} value={val.id}>{val.category}</option>

                                                            ))}


                                                        </Input> */}
                                                        {/* {topicmanager.feedform.typeofsubmit === "video" ?
                                                            <Button outline color="info" size="sm" onClick={topicmanager.sendforvideoFetch} >Youtube Fetch</Button>
                                                            : <Button outline size="sm" color="info" onClick={topicmanager.sendforFetchtable} >Fetch to Tables</Button>
                                                        } */}
                                                    {/* </FormGroup>
                                                </Col> */}
                                            </Row>
                                            {topicmanager.isspinner ?
                                                <Spinner size="md" color="info" /> : null}
                                            <Articletable />

                                            <Row>
                                                <Col md="6">
                                                    total results: {topicmanager.paginationcount}
                                                    {/* <FormGroup>
                                                        <Input placeholder="Type Page number [0-10]" name="page" id="page" onChange={topicmanager.rhandleChange} />
                                                    </FormGroup> */}
                                                </Col>
                                                <Col md="6" className="mt-1">
                                                    <Pagination aria-label="Page navigation example">

                                                        <PaginationComponent
                                                            totalItems={topicmanager.paginationcount}
                                                            pageSize={50}
                                                            onSelect={topicmanager.handlePageClick}
                                                            maxPaginationNumbers={5}
                                                            defaultActivePage={1}
                                                            firstPageText={'<'}
                                                            previousPageText={'<<'}
                                                            nextPageText={'>>'}
                                                            lastPageText={'>'}
                                                        />
                                                    </Pagination>
                                                </Col>
                                            </Row>




                                        </TabPane>
                                        <TabPane tabId="tabs3">

                                            <Row>
                                                <Col md="12">
                                                <FormGroup>
                                                            <Button outline color="primary" size="sm" onClick={topicmanager.getallarticles} >Refresh</Button>
                                                            <Button outline color="warning" size="sm" onClick={topicmanager.bulkdeleter} >Delete</Button>
                                                            <Button outline color="info" size="sm" id="Articles" onClick={topicmanager.reviewupdate} >Change Review</Button>
                                                            <Button outline color="success" size="sm" id="Articles" onClick={topicmanager.statusupdate} >Change Status</Button>

                                                        </FormGroup>
                                                    <Form inline>
                                                       

                                                        <FormGroup className="m-1">

                                                            <Label for="isactive">state: {topicmanager.articlevideoisactive}</Label>
                                                            <Input bsSize="sm" type="select" name="isactive" id="isactive"
                                                                onChange={topicmanager.statetoggle}
                                                            >
                                                                <option value="">Select Option</option>
                                                                <option value={true}>Active</option>
                                                                <option value={false}>Deactivated</option>



                                                            </Input>

                                                        </FormGroup>
                                                        <FormGroup className="m-1">

                                                            <Label for="isreview"> Review: </Label>
                                                            <Input bsSize="sm" type="select" name="isreview" id="isreview"
                                                                onChange={topicmanager.viewtoggle}
                                                            >
                                                                <option value="">Select Option</option>
                                                                <option value={true}>Marked as Reviewed</option>
                                                                <option value={false}>Not Reviewed</option>



                                                            </Input>

                                                        </FormGroup>
                                                        <FormGroup className="m-1">
                                                            <Label for="channelid">website: </Label>
                                                            <Input bsSize="sm" onChange={topicmanager.sitequery} placeholder="Enter website term" id="channelid" name="channelid" />
                                                        </FormGroup>
                                                        <FormGroup className="m-1">
                                                            <Label for="authorquery">author: </Label>
                                                            <Input bsSize="sm" onChange={topicmanager.authorquery} placeholder="Enter authorquery" id="authorquery" name="authorquery" />
                                                        </FormGroup>
                                                        <FormGroup className="m-1">
                                                        <Label for="q">search query: </Label>
                                                            <Input bsSize="sm" onChange={topicmanager.searchquery} placeholder="Enter Query" id="q" name="q" />
                                                        </FormGroup>
                                                    </Form>

                                                </Col>
                                                <Col md="4">
                                                    Fetched Results: {topicmanager.totalresults} of Total {topicmanager.collectioncountarticle}
                                                </Col>
                                            </Row>


                                            <Articlevideotable articlemodel={topicmanager.articlemodel} togglemodel={topicmanager.togglemodel} />
                                            <Row>
                                                <Col md="6">
                                                    total Pages: {Math.ceil(topicmanager.totalresults / 50)}

                                                </Col>
                                                <Col md="6" className="mt-1">


                                                    <Pagination aria-label="Page navigation example">

                                                        {/* <PaginationComponent
                                                            size="sm"
                                                            totalItems={Math.ceil(topicmanager.totalresults / 20)}
                                                            pageSize={5}
                                                            onSelect={topicmanager.handlePageClickarticle}
                                                            /> */}
                                                        <PaginationComponent
                                                            totalItems={topicmanager.totalresults}
                                                            pageSize={50}
                                                            onSelect={topicmanager.handlePageClickarticle}
                                                            maxPaginationNumbers={5}
                                                            defaultActivePage={1}
                                                            firstPageText={'<'}
                                                            previousPageText={'<<'}
                                                            nextPageText={'>>'}
                                                            lastPageText={'>'}
                                                        />

                                                    </Pagination>


                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="tabs4">

                                            <Row>
                                                <Col md="12">  
                                                <FormGroup>
                                                            <Button outline color="primary" size="sm" onClick={topicmanager.getallvideos} >Refresh</Button>
                                                            <Button outline color="warning" size="sm" onClick={topicmanager.bulkdeletervideos} >Delete</Button>
                                                            <Button outline color="info" size="sm" id="Videos" onClick={topicmanager.reviewupdate} >Change Review</Button>
                                                            <Button outline color="success" size="sm" id="Videos" onClick={topicmanager.statusupdate} >Change Status</Button>

                                                        </FormGroup>     
                                                <Form inline>
                                                                                                   

                                                        <FormGroup className="m-1">

                                                            <Label for="isactive">state: {topicmanager.articlevideoisactive}</Label>
                                                            <Input bsSize="sm" type="select" name="isactive" id="isactive"
                                                                onChange={topicmanager.statetoggle}
                                                            >
                                                                <option value="">Select Option</option>
                                                                <option value={true}>Active</option>
                                                                <option value={false}>Deactivated</option>



                                                            </Input>

                                                        </FormGroup>
                                                        <FormGroup className="m-1">

                                                            <Label for="isreview"> Review: </Label>
                                                            <Input bsSize="sm" type="select" name="isreview" id="isreview"
                                                                onChange={topicmanager.viewtoggle}
                                                            >
                                                                <option value="">Select Option</option>
                                                                <option value={true}>Marked as Reviewed</option>
                                                                <option value={false}>Not Reviewed</option>



                                                            </Input>

                                                        </FormGroup>
                                                        <FormGroup className="m-1">
                                                            <Label for="channelid">channelid: </Label>
                                                            <Input bsSize="sm" onChange={topicmanager.sitequery} placeholder="Enter Channelid" id="channelid" name="channelid" />
                                                        </FormGroup>
                                                        <FormGroup className="m-1">
                                                        <Label for="channelid">search query: </Label>
                                                            <Input bsSize="sm" onChange={topicmanager.searchquery} placeholder="Enter Query" id="q" name="q" />
                                                        </FormGroup>
                                                    </Form>

                                                </Col>
                                                <Col md="4">
                                                    Fetched Results: {topicmanager.paginationcount} of Total {topicmanager.collectioncountarticle}
                                                </Col>
                                            </Row>


                                            <Videoarticletable videomodel={topicmanager.videomodel} togglevideomodel={topicmanager.togglevideomodel} />
                                            <Row>
                                                <Col md="6">
                                                    total Pages: {Math.ceil(topicmanager.paginationcount / 50)}

                                                </Col>
                                                <Col md="6" className="mt-1">
                                                    <Pagination aria-label="Page navigation example">

                                                        <PaginationComponent
                                                            totalItems={topicmanager.paginationcount}
                                                            pageSize={50}
                                                            onSelect={topicmanager.handlePageClickvideo}
                                                            maxPaginationNumbers={5}
                                                            defaultActivePage={1}
                                                            firstPageText={'<'}
                                                            previousPageText={'<<'}
                                                            nextPageText={'>>'}
                                                            lastPageText={'>'}
                                                        />


                                                    </Pagination>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        {/* Tools */}
                                        <TabPane tabId="tabs5">

                                            <Row>
                                                <Col md="12">  
                                                <FormGroup>
                                                    
                                                            <Button outline color="primary" size="sm" onClick={topicmanager.getalltools} >Refresh</Button>
                                                            <Button outline color="warning" size="sm" onClick={topicmanager.bulkdeletertools} >Delete</Button>
                                                            <Button outline color="info" size="sm" id="Tools" onClick={topicmanager.reviewupdate} >Change Review</Button>
                                                            <Button outline color="success" size="sm" id="Tools" onClick={topicmanager.statusupdate} >Change Status</Button>

                                                        </FormGroup>     
                                                <Form inline>
                                                                                                   

                                                        <FormGroup className="m-1">

                                                            <Label for="isactive">state: {topicmanager.articlevideoisactive}</Label>
                                                            <Input bsSize="sm" type="select" name="isactive" id="isactive"
                                                                onChange={topicmanager.statetoggle}
                                                            >
                                                                <option value="">Select Option</option>
                                                                <option value={true}>Active</option>
                                                                <option value={false}>Deactivated</option>



                                                            </Input>

                                                        </FormGroup>
                                                        <FormGroup className="m-1">

                                                            <Label for="isreview"> Review: </Label>
                                                            <Input bsSize="sm" type="select" name="isreview" id="isreview"
                                                                onChange={topicmanager.viewtoggle}
                                                            >
                                                                <option value="">Select Option</option>
                                                                <option value={true}>Marked as Reviewed</option>
                                                                <option value={false}>Not Reviewed</option>



                                                            </Input>

                                                        </FormGroup>
                                                        <FormGroup className="m-1">
                                                            <Label for="channelid">website: </Label>
                                                            <Input bsSize="sm" onChange={topicmanager.sitequery} placeholder="Enter website term" id="channelid" name="channelid" />
                                                        </FormGroup>
                                                        <FormGroup className="m-1">
                                                            <Label for="authorquery">author: </Label>
                                                            <Input bsSize="sm" onChange={topicmanager.authorquery} placeholder="Enter authorquery" id="authorquery" name="authorquery" />
                                                        </FormGroup>
                                                        <FormGroup className="m-1">
                                                        <Label for="q">search query: </Label>
                                                            <Input bsSize="sm" onChange={topicmanager.searchquery} placeholder="Enter Query" id="q" name="q" />
                                                        </FormGroup>
                                                    </Form>

                                                </Col>
                                                <Col md="4">
                                                    Fetched Results: {topicmanager.paginationcount} of Total {topicmanager.collectioncounttools}
                                                </Col>
                                            </Row>


                                            <Toolsvideotable toolmodel={topicmanager.toolmodel} toggletoolmodel={topicmanager.toggletoolmodel} />
                                            <Row>
                                                <Col md="6">
                                                    total Pages: {Math.ceil(topicmanager.paginationcount / 50)}

                                                </Col>
                                                <Col md="6" className="mt-1">
                                                    <Pagination aria-label="Page navigation example">

                                                        <PaginationComponent
                                                            totalItems={topicmanager.paginationcount}
                                                            pageSize={50}
                                                            onSelect={topicmanager.handlePageClicktools}
                                                            maxPaginationNumbers={5}
                                                            defaultActivePage={1}
                                                            firstPageText={'<'}
                                                            previousPageText={'<<'}
                                                            nextPageText={'>>'}
                                                            lastPageText={'>'}
                                                        />


                                                    </Pagination>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        {/* End Tools */}
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Card>
                    </div>
                </Row>
                <Articlevideomodel
                    catmanager={catmanager}
                    topicmanager={topicmanager}
                    superrefsarticle={8}

                />
                <Videoarticlemodel
                    catmanager={catmanager}
                    topicmanager={topicmanager}
                    superrefsarticle={9}

                />
                 <ToolsModel
                    catmanager={catmanager}
                    topicmanager={topicmanager}
                    superrefsarticle={10}

                />




            </Container>


        </>
    )
}

PaginationComponent.propTypes = {
    // Total number of items
    totalItems: PropTypes.number.isRequired,
    // Number of items displayed each page
    pageSize: PropTypes.number.isRequired,
    // Function to receive the event when a page is selected
    onSelect: PropTypes.func.isRequired,
    // Number of pages being displayed, by default 5
    maxPaginationNumbers: PropTypes.number,
    // Page where the pagination starts, by default 1
    defaultActivePage: PropTypes.number,
    // Change text of "First" button
    firstPageText: PropTypes.string,
    // Change text of "Previous" button
    previousPageText: PropTypes.string,
    // Change text of "Next" button
    nextPageText: PropTypes.string,
    // Change text of "Last" button
    lastPageText: PropTypes.string,
    // Changes the size of the component. Values: "sm" and "lg". Without the prop the size is normal.
    size: PropTypes.string
}
export default Topicsforms
