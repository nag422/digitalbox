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

function Articlevideotable(props) {

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
                                    id="articleparent"
                                    type="checkbox"  
                                    name = "articles" 
                                    checked={topicmanager.stateallchecked}
                                    onChange={topicmanager.handleAllCheckedArticles}
                                />
                                <label className="custom-control-label" htmlFor="articleparent">
                                    #
                                </label>
                            </div>
                        </th>
                        <th scope="col">URL</th>
                        <th scope="col">Image</th>
                        <th scope="col">Category</th>
                        <th scope="col">Type</th>
                        <th scope="col">is_Active</th>
                        <th scope="col">cat</th>
                        <th scope="col">s.cat</th>
                        <th scope="col">review</th>
                        <th scope="col">pubdate</th>
                        <th scope="col">lastmodifieddate</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {topicmanager.allarticles.map((row, index) => (

                        <tr key={index} className={row.id}>


                            <th scope="row">


                                <div className="custom-control custom-checkbox mb-3">
                                    <input
                                        className="custom-control-input"
                                        id={row.id}
                                        type="checkbox"
                                        name="childbox"
                                        data-url={row.feedlist}
                                        onChange={topicmanager.handleCheckchangeArticles}
                                        checked={row.ischecked}
                                        
                                        

                                    />

                                    <label className="custom-control-label" htmlFor={row.id}>
                                        {index + 1}
                                    </label>
                                </div>



                            </th>
                            <td><a  href={row.URL} rel="noopener noreferrer" target="_blank"><div style={{width:'200px',wordWrap: 'break-word',whiteSpace:"pre-wrap"}}>{row.title}</div></a></td>
                            <td>

                            <Media className="align-items-center">
                  <a
                    className=" mr-3"
                    href={row.URL}
                    
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
                            {row.isactive.toString() === "true" ?

                            <><input id={row._id} onChange={topicmanager.articlestatuschange} defaultChecked type="checkbox" />
                            <span className="custom-toggle-slider rounded-circle" /></>
                            
                            : null}
                            {row.isactive.toString() === "false" ?
                            <><input id={row._id} onChange={topicmanager.articlestatuschange} type="checkbox" />
                            <span className="custom-toggle-slider rounded-circle" /></>
                            :null
                            }

                            </label>
                            
                            </td>
                                


                            


                            {/* <td>{row.isactive ? "Active" : "Deactivate"}</td> */}
                            
                           <td>
                               {catmanager.subcategories.map(val=>parseInt(val.id)===parseInt(row.subcategory)? val.category:null)}
                           </td>
                           <td>
                           {catmanager.supsubcategories.map(val=>parseInt(val.id)===parseInt(row.supersubcat)? val.category:null)}
                           </td>

                            <td>{row.isreview ? 'Reviewed' : "Not Reviewed"}</td>
                            <td>{row.videopublishedat}</td>
                            <td>{row.lastmodified}</td>




                            {/* <td>{props.refcats.map(ris => (parseInt(ris.id) === parseInt(row.refrence) ? ris.category : null))}</td>
                            <td>{props.masterefcat.map(ris => (parseInt(ris.id) === parseInt(row.masterrefrence) ? ris.category : null))}</td> */}



                            <td>

                               
                                <Button color="info" size="sm" type="button"                                   
                                   
                                    onClick={props.togglemodel}
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

export default Articlevideotable
