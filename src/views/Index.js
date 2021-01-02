import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Header2 from "components/Headers/Header2.js";

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      videos:'',
      articles:'',
      users:null,
      yesterdayarticles:'',
      yesterdayvideos:'',
      currentpath:this.props.location.pathname
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };

 

  

  componentDidMount = async (e) => {
 
    const url="https://app.kiranvoleti.com/adminindex";
    let form_data = new FormData();
    form_data.append('page', e);
    const config = {
      headers: {
          'content-type': 'application/json',
          'X-CSRFToken': this.getCookie('csrftoken')
      }
    }
    await axios.get(url,config)
    .then(res=>{            
        
        this.setState({
          articlescount: res.data.articles,
          videoscount: res.data.videos,
          toolscount: res.data.tools,
          yesterdaytools:res.data.yesterdaytools,
          yesterdayarticles:res.data.yesterdayarticles,
          yesterdayvideos:res.data.yesterdayvideos,
          userscount:res.data.users

        });
                          
        
    })
    .catch(err=>{
        console.log(err)
        
    })

  }
  getCookie = (name) => {
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
  
  render() {
    return (
      <>
      
        <Header 
        articlescount = {this.state.articlescount} 
        videoscount= {this.state.videoscount}
        toolscount= {this.state.toolscount}
        yesterdaytools={this.state.yesterdaytools}
        yesterdayarticles={this.state.yesterdayarticles}
        yesterdayvideos={this.state.yesterdayvideos}
        userscount={this.state.userscount}       
        
        />
        

        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  {/* <div className="chart">
                    <Line
                      data={chartExample1[this.state.chartExample1Data]}
                      options={chartExample1.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
          </Container>
      
      </>
    );
  }
}

export default Index;
