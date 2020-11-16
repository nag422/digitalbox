import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';


import { ToastContainer, toast } from 'react-toastify';

export const CategoryContext = createContext();

const CategoryProvider = ({ children, match }) => {
    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const [supsubcategories, setSupsubcategories] = useState([])
    const [swalert, setSwlert] = useState("");
    const [catmodel, setCatmodel] = useState(false);
    const [subcatmodel, setSubcatmodel] = useState(false);   
    const [supsubcatmodel, setSupsubcatmodel] = useState(false);
    const [updatecatmodel, setUpdatecatmodel] = useState(false);
    // const [editModal, setEditModal] = useState(false);
    const [isalert, setIsalert] = useState(false);
    const [isspinner, setIsspinner] = useState(false);
    const [alertmsgcolor, setAlertmsgcolor] = useState("info");
    const [alertmsg, setAlertmsg] = useState("");
    const [categorystate, setCategorystate] = useState([]);
    const [deleteid, setDeleteid] = useState('');

    // form state
    const initialFormData = Object.freeze({
        username: "",
        email: "",
        password: "",
        password1: "",
        phone: "",
        capability: "",
        category: "",
        id: "",
        mainref:"",
        superref:""
    });

    const initialeditingform = Object.freeze({
        username: "",
        email: "",
        password: "",
        password1: "",
        phone: "",
        capability: "",
        category: "",
        id: ""
    });
    const [formchangedata, updateFormchangedata] = React.useState(initialFormData);
    const [editingform, updateEditingform] = React.useState(initialeditingform);

    const rhandleChange = (e) => {

        updateFormchangedata({
            ...formchangedata,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()

        });
    };


    // Checkbox
    const handleAllChecked = (event) => {
        
        var allelm = document.querySelectorAll("input[name=childbox]");
        if (event.target.checked) {
            allelm.forEach(elm => {
                elm.setAttribute("checked", event.target.checked)
            })

        }
        else {
            allelm.forEach(elm => {
                elm.removeAttribute("checked")
            })

        }


    }
    const handlechange = (event) => {
        let categorytateaction = categorystate;
        function ischeckf(val) {
            if (val.id === event.target.id) {
                return val !== event.target.id;
            }
        }
        if (event.target.checked) {
            let nowobj = [{ id: event.target.id, isChecked: event.target.checked }]
            setCategorystate([...categorytateaction, ...nowobj]);
        } else {
            let nowobj = categorytateaction.filter(ischeckf)
            setCategorystate([...nowobj]);
        }
        
    }
    // end checkbox
    const statuschange = () => {

    }

    const toggleeditModal = (e) => {
        setUpdatecatmodel(!updatecatmodel);
        const initialeditingform = Object.freeze({
            category: e.target.dataset.category,
            id: e.target.dataset.id
        });
        updateEditingform(initialeditingform)
        setIsalert(false)
        setIsspinner(false)
    }

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

    const handleSubmit = (e) => {
        e.preventDefault()
        // let form_data = new FormData();
        setIsspinner(!isspinner);
        setIsalert(!isalert)
        setAlertmsg("Submitting Please Wait...");
        setAlertmsgcolor('info');

        let form_data = new FormData();
        form_data.append('category', formchangedata.category);

        let url = "https://app.kiranvoleti.com/addmaincat";
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config)
            .then(res => {
                
                toggleModal();
                tosttrigger(res.data.msg, 'success')
                setIsspinner(!isspinner);
                setCategories(prevCategories => [...prevCategories, { id: res.data.indexkey, category: formchangedata.category }])

            })
            .catch(err =>
                tosttrigger(err, 'error'),
                setIsalert(!isalert),
                setIsspinner(!isspinner),
                // setAlertmsg("plase check your Category"),
                setAlertmsgcolor('info'),

            )

    };

    const updatehandlesubmit = (e) => {
        e.preventDefault()
        

        // let form_data = new FormData();
        setIsspinner(!isspinner);
        if (formchangedata.category === "") {
            setIsalert(!isalert)
            setAlertmsg("Submitting please wait....");
            setAlertmsgcolor('success');
            setIsspinner(!isspinner);
            return
        }
        let form_data = new FormData();
        form_data.append('catdata', formchangedata.category);
        form_data.append('catid', editingform.id);

        let url = "https://app.kiranvoleti.com/main_cat_update/";
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config)
            .then(res => {

                toggleeditModal();
                tosttrigger(res.data.msg, 'success')
                setIsspinner(!isspinner);
                // setCategories(prevCategories => [...prevCategories, { id: res.data.indexkey, category: formchangedata.category }])


            })
            .catch(err =>
                tosttrigger(err, 'error'),
                setIsalert(!isalert),
                setAlertmsg("Submitting please wait...."),
                setIsspinner(!isspinner)


            )

    };
    function hideSwalert() {
        setSwlert("");
    }
    const toggleModal = () => {
        setCatmodel(!catmodel);
        setIsalert(false)
        setIsspinner(false)
    };


    const deleteThisGoal = (e) => {
        let delsid = e.target.id
        setIsspinner(!isspinner);

        let form_data = new FormData();
        form_data.append('category', e.target.id);

        let url = "https://app.kiranvoleti.com/delmaincat";
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config)
            .then(res => {
                
                setSwlert("");
                tosttrigger(res.data.msg, 'success')
                setIsspinner(!isspinner);
                // const teamPlayers = this.state.teamPlayers.filter(i => i.idTeam !== id));
                setCategories(categories.filter(i => i.category !== delsid))


            })
            .catch(err =>
                tosttrigger(err, 'error'),
                setIsalert(!isalert),
                setIsspinner(!isspinner),
                setAlertmsg("plase check your Category"),
                setAlertmsgcolor('danger'),

            )
        setSwlert("");


    }





    const url = "https://app.kiranvoleti.com/addmaincat";

    useEffect(() => {
        const fetchusers = async () => {
            await axios.get(url)
                .then(res => {
                    setCategories(res.data.maincats);
                    setSubcategories(res.data.subcats);
                    setSupsubcategories(res.data.supsubcats);

                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchusers()
    }, [])


// SubCategory Section

// Deleting Purpose
const subcatgorydeletebutton = (e) => {
    let delsid = e.target.dataset.id

    tosttrigger("Deleting plz Wait", 'success')    
    

    let form_data = new FormData();
    form_data.append('catid', e.target.dataset.id);

    let url = "https://app.kiranvoleti.com/sub_cat_delete/";
    
    const config = {
        headers: {
            'content-type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        }
    }
    axios.post(url, form_data, config)
        .then(res => {
            if(res.data.error){
                tosttrigger(res.data.msg, 'error')
            }        
            else{
                tosttrigger(res.data.msg, 'success')
                setSubcategories(subcategories.filter(i => parseInt(i.id) !== parseInt(delsid)))
            }
        })
        .catch(err =>
            console.log(err)          

        )
    setSwlert("");

    
    }

    // Editing purpose(sub category)
    // Editing Purpose(sub category)

    

    

   

    // Adding purpose (Sub Category)

    
    const addsubcategorymodel = () => {
        setSubcatmodel(!subcatmodel);
        setIsalert(false)
        setIsspinner(false)
    };

    const subcathandleSubmit = (e) => {
        e.preventDefault()
        // let form_data = new FormData();
        
        
        setIsspinner(!isspinner);
        setIsalert(!isalert)
        setAlertmsg("Submitting Please Wait...");
        setAlertmsgcolor('info');

        let form_data = new FormData();
        form_data.append('category', formchangedata.category);
        form_data.append('mainref', formchangedata.mainref);

        let url = "https://app.kiranvoleti.com/addsubcat";
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config)
            .then(res => {
                
                addsubcategorymodel();
                tosttrigger(res.data.msg, 'success')
                setIsspinner(!isspinner);
                setSubcategories(prevSubcategories => [...prevSubcategories, { id: res.data.indexkey, category: formchangedata.category, mainref:formchangedata.mainref }])

            })
            .catch(err =>
                tosttrigger(err, 'error'),
                setIsalert(!isalert),
                setIsspinner(!isspinner),
                // setAlertmsg("plase check your Category"),
                setAlertmsgcolor('info'),

            )

    };

    // Sup Sub Category Section
    // Adding Purpose

    const addsupsubcategorymodel = () => {
        setSupsubcatmodel(!supsubcatmodel);
        setIsalert(false)
        setIsspinner(false)
    };

    const supsubcathandleSubmit = (e) => {
        e.preventDefault()
        // let form_data = new FormData();
        
        
        
        setIsspinner(!isspinner);
        setIsalert(!isalert)
        setAlertmsg("Submitting Please Wait...");
        setAlertmsgcolor('info');

        let form_data = new FormData();
        form_data.append('category', formchangedata.category);
        form_data.append('refrence', formchangedata.mainref);
        form_data.append('masterrefrence', formchangedata.superref);

        let url = "https://app.kiranvoleti.com/addsupsubcat";
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config)
            .then(res => {
                
                addsupsubcategorymodel();
                tosttrigger(res.data.msg, 'success')
                setIsspinner(!isspinner);
                setSupsubcategories(prevSupsubcategories => [...prevSupsubcategories, { id: res.data.indexkey, category: formchangedata.category, 
                    masterrefrence:formchangedata.superref,
                    refrence:formchangedata.mainref
                }])

            })
            .catch(err =>
                tosttrigger(err, 'error'),
                setIsalert(!isalert),
                setIsspinner(!isspinner),
                // setAlertmsg("plase check your Category"),
                setAlertmsgcolor('info'),

            )

    };

    // Deleting Purpose
const supsubcatgorydeletebutton = (e) => {
    let delsid = e.target.dataset.id

    tosttrigger("Deleting plz Wait", 'success')  
    
    let form_data = new FormData();
    form_data.append('catid', e.target.dataset.id);

    let url = "https://app.kiranvoleti.com/sup_sub_cat_delete/";
    
    const config = {
        headers: {
            'content-type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        }
    }
    axios.post(url, form_data, config)
        .then(res => {
            if(res.data.error){
                tosttrigger(res.data.msg, 'error')
            }        
            else{
                tosttrigger(res.data.msg, 'success')
                setSupsubcategories(supsubcategories.filter(i => parseInt(i.id) !== parseInt(delsid)))
            }
        })
        .catch(err =>
            console.log(err)          

        )
    setSwlert("");

    
    }




    return (

        <CategoryContext.Provider value={{
            categories, setCategories, subcategories,
            setSubcategories, supsubcategories, setSupsubcategories,
            deleteThisGoal, toggleModal, toggleeditModal, updatecatmodel, formchangedata, initialeditingform, updateFormchangedata,
            editingform, updateEditingform, swalert, catmodel, handleSubmit, isalert,
            alertmsgcolor, alertmsg, rhandleChange, isspinner, handlechange, handleAllChecked, updatehandlesubmit,

            addsubcategorymodel,subcatmodel,subcathandleSubmit,subcatgorydeletebutton,

            addsupsubcategorymodel, supsubcatmodel, supsubcathandleSubmit,supsubcatgorydeletebutton

        }}>

            {children}

        </CategoryContext.Provider>

    )
}


export default CategoryProvider