
import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class Header extends React.Component {
 
  render() {
    
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
              {this.props.userscount >= 0 ?
              <>
              <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Users
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.userscount}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                     
                    </CardBody>
                  </Card>
                </Col>

                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Articles
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.articlescount}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                     
                    </CardBody>
                  </Card>
                </Col>


                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Videos
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.videoscount}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                     
                    </CardBody>
                  </Card>
                </Col>

                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Tools
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.toolscount}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                     
                    </CardBody>
                  </Card>
                </Col>



                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mt-1 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Yesterday Articles
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.yesterdayarticles}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                     
                    </CardBody>
                  </Card>
                </Col>



                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mt-1 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Yesterday Videos
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.yesterdayvideos}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                     
                    </CardBody>
                  </Card>
                </Col>

                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mt-1 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Yesterday Tools
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.yesterdaytools}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                     
                    </CardBody>
                  </Card>
                </Col>
                
                </>
                :
                null
              }
               </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
