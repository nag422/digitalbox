import React, { useContext } from "react";
// reactstrap components
import {
    Button,
    Media,
    Table,
    Spinner
} from "reactstrap";

import { CategoryContext } from '../contexts/CategoryContext';
import { TopicsContext } from '../contexts/TopicsContext';
import NumericLabel from 'react-pretty-numbers';
import Moment from 'react-moment';

function Videoarticletable(props) {

    const catmanager = useContext(CategoryContext);
    const topicmanager = useContext(TopicsContext);   

    // const subcatfilter = (valid) =>{
    //     const subcatfiltered = 
    //     return subcatfiltered
    // }
    
    




    return (
        <div>


            <Table className="align-items-center table-flush" responsive>

                <thead className="thead-light">
                    <tr>
                        <th>
                            <div className="custom-control custom-checkbox mb-3">
                                <input
                                    className="custom-control-input"
                                    id="videoparent"
                                    type="checkbox"
                                    checked={topicmanager.stateallchecked}
                                    onChange={topicmanager.handleAllCheckedVideos}
                                />
                                <label className="custom-control-label" htmlFor="videoparent">
                                    #
                                </label>
                            </div>
                        </th>
                        <th scope="col">URL</th>
                        <th scope="col">Views</th>
                        <th scope="col">Image</th>
                        <th scope="col">Category</th>
                        <th scope="col">Type</th>
                        <th scope="col">is_Active</th>
                        <th scope="col">cat</th>
                        <th scope="col">s.cat</th>
                        <th scope="col">Review</th>
                        <th scope="col">pubdate</th>
                        <th scope="col">lastmodifieddate</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {topicmanager.allvideos.map((row, index) => (

                        <tr key={index} className={row.id}>


                            <th scope="row">


                                <div className="custom-control custom-checkbox mb-3">
                                    <input
                                        className="custom-control-input"
                                        id={row.id}
                                        type="checkbox"
                                        name="childbox"
                                        onChange={topicmanager.handleCheckchangeVideos}
                                        checked={row.ischecked}

                                    />

                                    <label className="custom-control-label" htmlFor={row.id}>
                                        {index + 1}
                                    </label>
                                </div>



                            </th>
                            <td><a  href={row.URL} rel="noopener noreferrer" target="_blank"><div style={{width:'200px',wordWrap: 'break-word',whiteSpace:"pre-wrap"}}>{row.title}</div></a></td>
                            <td><NumericLabel>{row.views}</NumericLabel></td>
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
                            <td>{row.typeofsubmit}</td>
                                                          

                            <td id={row._id}>
                            <label className="custom-toggle">
                            {row.isactive ? 
                            
                            <input id={row._id} onChange={topicmanager.videostatuschange} defaultChecked type="checkbox" />
                            
                            : null}
                            
                            {!row.isactive ?
                            <input id={row._id} onChange={topicmanager.videostatuschange} type="checkbox" />
                            :null
                            
                            }
                            <span className="custom-toggle-slider rounded-circle" />
                            </label>
                            </td>
                                


                            


                            {/* <td>{row.isactive ? "Active" : "Deactivate"}</td> */}
                            
                           <td>
                               {catmanager.subcategories.map(val=>parseInt(val.id)===parseInt(row.subcategory)? val.category:null)}
                           </td>
                           <td>
                           {catmanager.supsubcategories.map(val=>parseInt(val.id)===parseInt(row.supersubcat)? val.category:null)}
                           </td>

                            <td>{row.isreview ? 'Reviewed' : 'Not Reviewed'}</td>
                            <td><Moment date={row.videopublishedat} /></td>
                            <td><Moment date={row.lastmodified} /></td>




                            {/* <td>{props.refcats.map(ris => (parseInt(ris.id) === parseInt(row.refrence) ? ris.category : null))}</td>
                            <td>{props.masterefcat.map(ris => (parseInt(ris.id) === parseInt(row.masterrefrence) ? ris.category : null))}</td> */}



                            <td>

                               
                                <Button color="info" size="sm" type="button"                                   
                                   
                                    onClick={props.togglevideomodel}
                                    data-id={row.id}
                                    data-mainref={row.subcategory}
                                    data-superref={row.supersubcat}
                                >
                                    Edit
                                </Button>
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

export default Videoarticletable
