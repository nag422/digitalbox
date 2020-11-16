import React, { useContext } from "react";

// reactstrap components
import {
    Button,
    Table,
    Spinner
} from "reactstrap";

import { CategoryContext } from '../contexts/CategoryContext';
import { TopicsContext } from '../contexts/TopicsContext';

function Articletable(props) {

    const catmanager = useContext(CategoryContext);
    const topicmanager = useContext(TopicsContext);






    return (
        <div>


            <Table className="align-items-center table-flush" responsive>

                <thead className="thead-light">
                    <tr>
                        <th>
                            <div className="custom-control custom-checkbox mb-3">
                                <input
                                    className="custom-control-input"
                                    id="parentbox"
                                    type="checkbox"
                                    onChange={topicmanager.handleAllChecked}
                                />
                                <label className="custom-control-label" htmlFor="parentbox">
                                    #
                                </label>
                            </div>
                        </th>
                        <th scope="col">Feed Link</th>
                        <th scope="col">Category</th>
                        <th scope="col">Type</th>
                        <th scope="col">is_Active</th>
                        <th scope="col">is_Fetched</th>
                        <th scope="col">parent_id</th>
                        <th scope="col">pubdate</th>
                        <th scope="col">lastmodifieddate</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {topicmanager.feedreadylist.map((row, index) => (

                        <tr key={row.id} className={row.id}>




                            <th scope="row">


                                <div className="custom-control custom-checkbox mb-3">
                                    <input
                                        className="custom-control-input"
                                        id={row.id}
                                        type="checkbox"
                                        name="childbox"
                                        data-url={row.feedlist}
                                        onChange={topicmanager.handlechange}
                                    />

                                    <label className="custom-control-label" htmlFor={row.id}>
                                        {index + 1}
                                    </label>
                                </div>



                            </th>
                            <td><a href={row.feedlist} target="_blank" rel="noopener noreferrer"><div style={{width:'200px',wordWrap: 'break-word',whiteSpace:"pre-wrap"}}>{row.feedlist.substring(0, 60)}</div></a></td>
                            <td>{row.category}</td>                            
                            <td>{row.typeofsubmit}</td>
                                                          

                            <td id={row._id}>
                            <label className="custom-toggle">
                            {row.isactive ? 
                            
                            <input id={row._id} onChange={topicmanager.topicstatuschange} defaultChecked type="checkbox" />
                            
                            : 
                            
                            
                            <input  id={row._id} onChange={topicmanager.topicstatuschange} type="checkbox" />
                            
                            
                            }
                            <span className="custom-toggle-slider rounded-circle" />
                            </label>
                            </td>
                                


                            


                            {/* <td>{row.isactive ? "Active" : "Deactivate"}</td> */}
                            <td>{row.isfetched  ? "Fetched" : "Not Fetched"}</td>                            
                            <td>{row.parent_id ? row.parent_id : "its is parent"}</td>
                            <td>{row.pubdate}</td>
                            <td>{row.lastmodified}</td>




                            {/* <td>{props.refcats.map(ris => (parseInt(ris.id) === parseInt(row.refrence) ? ris.category : null))}</td>
                            <td>{props.masterefcat.map(ris => (parseInt(ris.id) === parseInt(row.masterrefrence) ? ris.category : null))}</td> */}



                            <td>

                                <Button color="danger" size="sm" type="button" data-id={row.id}
                                    onClick={topicmanager.deletefeeditem}
                                >
                                    <i className="fa fa-trash" aria-hidden="true" data-id={row.id}></i>
                                </Button>
                                {/* <Button color="info" size="sm" type="button"
                                    data-username={row.username}
                                    data-id={row._id}
                                    data-email={row.email}
                                    onClick={toggleeditModal}
                                >
                                    <i className="fas fa-pen" aria-hidden="true"></i>
                                </Button> */}
                                {topicmanager.spin.map(spinid => (
                                    parseInt(spinid.id) === parseInt(row.id) ? <Spinner key={row.id} size="sm" color="info" /> : null


                                ))}
                            </td>
                            <td>

                            </td>
                        </tr>



                    )
                    )}

                </tbody>
            </Table>









        </div>
    )
}

export default Articletable
