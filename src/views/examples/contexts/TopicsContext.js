import React, { useState, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const TopicsContext = createContext();

const TopicsProvider = ({ children }) => {
    const [isspinner, setIsspinner] = useState(false)
    // form state
    const Topicsform = Object.freeze({
        category: "",
        iptype: "multiple",
        iptextarea: "",
        id: "",
        urlid: "",
        mainref: "",
        superref: "",
        typeofsubmit: "googlenewsfeeds",
        multirefiles: "",
        perpage: 50,
        page: 1,
        start_from: 0
    });

    const [feedform, updateFeedform] = useState(Topicsform);
    const [feedreadylist, setFeedreadylist] = useState([]);
    const [topicstate, setTopicstate] = useState([]);
    const [fetchcategory, setFetchcategory] = useState('');
    const [howmanyfetch, setHowmanyfetch] = useState(0);
    // 
    const [articlevideoperpage, setArticlevideoperpage] = useState(50);
    const [articlevideopage, setArticlevideopage] = useState(1);
    const [articlevideosearch, setArticlevideosearch] = useState('');
    const [articlevideoauthor, setArticlevideoauthor] = useState('');    
    const [articlevideostatus, setArticlevideostatus] = useState('checked');
    const [articlevideoisactive, setArticlevideoisactive] = useState('');
    const [articlevideoisview, setArticlevideoisview] = useState('');
    const [articlevideochannel, setArticlevideochannel] = useState('');        
    const [totalresults, setTotalresults] = useState(0);
    const [allarticles, setAllarticles] = useState([]);
    const [articlemodel, setArticlemodel] = useState(false)
    const [videomodel, setVideomodel] = useState(false)
    const [toolmodel, setToolmodel] = useState(false)
    const [collectioncountarticle, setCollectioncountarticle] = useState(0)
    const [paginationcount, setPaginationcount] = useState(0)
    const [allvideos, setAllvideos] = useState([]);
    
    const [tools, setTools] = useState([]);
    const [collectioncounttools, setCollectioncounttools] = useState(0);
    const [totaltool, setTotaltool] = useState(0);
    const [stateallchecked, setStateallchecked] = useState(false);
    const [dynotoollink,setDynotoollink] = useState('');
    const [dynotooltext,setDynotooltext] = useState('');



    // Handle Change Section

    const rhandleChange = (e) => {

        updateFeedform({
            ...feedform,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()

        });
    };

    const onFileChange = (e) => {

        updateFeedform({
            ...feedform,
            // Trimming any whitespace
            [e.target.name]: e.target.files

        });
    }


    // End Handle Change Section

    // Handle Toggle
    const togglemodel = (e) => {
        updateFeedform({
            ...feedform,
            // Trimming any whitespace
            mainref: e.target.dataset.mainref,
            superref: e.target.dataset.superref,
            urlid: e.target.dataset.id,

        });

        setArticlemodel(!articlemodel)

    }

    const togglevideomodel = (e) => {
        updateFeedform({
            ...feedform,
            // Trimming any whitespace
            mainref: e.target.dataset.mainref,
            superref: e.target.dataset.superref,
            urlid: e.target.dataset.id,

        });

        setVideomodel(!videomodel)

    }
    const toggletoolmodel = (e) => {
        updateFeedform({
            ...feedform,
            // Trimming any whitespace
            mainref: e.target.dataset.mainref,
            superref: e.target.dataset.superref,
            urlid: e.target.dataset.id,

        });
        console.log('toolmodel')

        setToolmodel(!toolmodel)

    }

    // End Handle Toggle

    // State Toggle
    const statetoggle = (e) => {
        setArticlevideoisactive(e.target.value.trim())
    }
    const viewtoggle = (e) => {
        setArticlevideoisview(e.target.value.trim())
    }
    const searchquery = (e) => {
        setArticlevideosearch(e.target.value.trim())
    }
    const authorquery = (e) => {
        setArticlevideoauthor(e.target.value.trim())
    }
    
    const sitequery = (e) => {
        setArticlevideochannel(e.target.value.trim())
    }
    

    // End State Toggle
    // Deleting Purpose
const deletefeeditem = (e) => {
    let delsid = e.target.dataset.id

    tosttrigger("Deleting plz Wait", 'success')    
    let list = []
    list.push(e.target.dataset.id)

    let form_data = new FormData();
    form_data.append('deletelist', e.target.dataset.id);
    form_data.append('tablename', 'feedentryboard');

    let url = "https://app.kiranvoleti.com/bulkdeltereact";
    
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
                setFeedreadylist(feedreadylist.filter(i => parseInt(i.id) !== parseInt(list[0])))
            }
        })
        .catch(err =>
            console.log(err)          

        )
    

    
    }


    // Handle Submit Section

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                console.log(`${loaded} kb of ${total} kb | ${percent}`)
            }
        }

        let form_data = new FormData();

        form_data.append('category', feedform.superref);
        form_data.append('datatype', feedform.iptype);
        form_data.append('feed', feedform.iptextarea);


        if (feedform.multirefiles) {
            for (const key of Object.keys(feedform.multirefiles)) {
                form_data.append('uploadfile', feedform.multirefiles[key])

            }

        }

        // Before Ui Elements
        setIsspinner(!isspinner);
        tosttrigger('Sit back .. Process is initiating..', 'success')
        // Before Ui Elements
        // Backend Submission

        let url = "https://app.kiranvoleti.com/feedsummary";
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config, options)
            .then(res => {
                // setFeedreadylist(res.data.feeds)     
                
                setIsspinner(false);
                tosttrigger(res.data.msg, 'success')
                setIsspinner(false);
                // setCategories(prevCategories => [...prevCategories, { id: res.data.indexkey, category: formchangedata.category }])

            })
            .catch(err =>
                {setIsspinner(false)
                tosttrigger(err, 'error')}


            )


    }
    // End Hndle Submit Section



    // Get All Feed Tables
    const handlePageClick = async (e) => {


        let form_data = new FormData();

        form_data.append('perpage', feedform.perpage);
        form_data.append('page', e);
        form_data.append('typeofsubmit', feedform.typeofsubmit);

        // form_data.append('start_from', feedform.start_from);


        // Before Ui Elements
        setIsspinner(!isspinner);
        tosttrigger('Sit back .. Process is initiating..', 'success')
        // Before Ui Elements
        // Backend Submission

        let url = "https://app.kiranvoleti.com/getfeedlist";
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        await axios.post(url, form_data, config)
            .then(res => {
                setFeedreadylist(res.data.feeds)
                setPaginationcount(res.data.total)
                // tosttrigger(res.data.msg, 'success')
                setIsspinner(false);
                // setCategories(prevCategories => [...prevCategories, { id: res.data.indexkey, category: formchangedata.category }])

            })
            .catch(err =>
                tosttrigger(err, 'error')


            )

    };


    const getallfeedstable = (e) => {
        e.preventDefault();


        let form_data = new FormData();

        form_data.append('perpage', feedform.perpage);
        form_data.append('page', parseInt(feedform.page));
        form_data.append('typeofsubmit', feedform.typeofsubmit);

        // form_data.append('start_from', feedform.start_from);


        // Before Ui Elements
        setIsspinner(!isspinner);
        tosttrigger('Sit back .. Process is initiating..', 'success')
        // Before Ui Elements
        // Backend Submission

        let url = "https://app.kiranvoleti.com/getfeedlist";
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config)
            .then(res => {


                var respfeeds = res.data.feeds.map(val => (
                    { ...val, ischecked: false }
                ))
                

                setFeedreadylist(respfeeds)

                setPaginationcount(res.data.total)
                // tosttrigger(res.data.msg, 'success')
                setIsspinner(false);
                // setCategories(prevCategories => [...prevCategories, { id: res.data.indexkey, category: formchangedata.category }])

            })
            .catch(err =>
                tosttrigger(err, 'error')


            )



    }



    // End Get All Feed Tables


    // Fetch All Section

    const [spin, setSpin] = useState([])

    const delpin = (e) => {
        const someval = spin.filter(i => parseInt(i.id) !== parseInt(130))
        setSpin(someval)

    }

    const sendforFetch = async (e) => {
        e.preventDefault();
        var list = []
        var allelm = document.querySelectorAll("input[name=childbox]");

        allelm.forEach(elm => {
            if (elm.checked) {
                let nowobj = { id: elm.id, ispin: true }
                list.push(nowobj)

                triggerfeedsfetch(elm.id)

            }
        })
        setSpin(list)

        tosttrigger('Process initiated', 'success')
        setSpin([])


    }

    // list fetch

    const sendchannelfetch = async (e) => {
        e.preventDefault();
        var list = []
        
        var allelm = document.querySelectorAll("input[name=childbox]");

        await allelm.forEach(elm => {
            if (elm.checked) {
                list.push(elm.id)

            }
        })
        
        let form_data = new FormData();

        form_data.append('category', feedform.typeofsubmit);
        form_data.append('index', 1);
        form_data.append('urlid', list);
        console.log(feedform.typeofsubmit)
        
        // Before Ui Elements
        setIsspinner(!isspinner);

        // Before Ui Elements
        // Backend Submission

        let url = "https://app.kiranvoleti.com/fetchvideochannels";
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
                setIsspinner(false);

                setHowmanyfetch(prevHowmany => parseInt(prevHowmany) + parseInt(res.data.successdatalength))
                tosttrigger('Fetched Successfully', 'success')
                // setCategories(prevCategories => [...prevCategories, { id: res.data.indexkey, category: formchangedata.category }])

            })
            .catch(err =>
                tosttrigger(err, 'error')


            )
        


    }

    // End List fetch
    const sendforFetchtable = async (e) => {
        e.preventDefault();
        var list = []
        var allelm = document.querySelectorAll("input[name=childbox]");

        await allelm.forEach(elm => {
            if (elm.checked) {
                let nowobj = { id: elm.id, ispin: true }

                reactfetch(elm.id)
                list.push(nowobj)

            }
        })
        setSpin(list)



        await tosttrigger('Success Process is Done', 'success')
        setSpin([])


    }
    const triggerfeedsfetch = (valid) => {

        let form_data = new FormData();

        form_data.append('category', feedform.typeofsubmit);
        form_data.append('index', 1);
        form_data.append('urlid', valid);

        // Before Ui Elements
        setIsspinner(!isspinner);

        // Before Ui Elements
        // Backend Submission

        let url = "https://app.kiranvoleti.com/fetchfeeds";
        // let url = 'http://localhost:8099/fetchfeeds';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config)
            .then(res => {
                // setFeedreadylist(res.data.feeds)     

                // tosttrigger(res.data.msg, 'success')
                setIsspinner(false);

                setHowmanyfetch(prevHowmany => parseInt(prevHowmany) + parseInt(res.data.successdatalength))
                tosttrigger('Fetched Successfully', 'success')
                // setCategories(prevCategories => [...prevCategories, { id: res.data.indexkey, category: formchangedata.category }])

            })
            .catch(err =>
                tosttrigger(err, 'error')


            )



    }


    // End Fetch All Section
    // React fetch to tables
    const reactfetch = (valid) => {

        let form_data = new FormData();

        form_data.append('fetchcategory', fetchcategory);
        form_data.append('id', valid);

        // Before Ui Elements
        setIsspinner(!isspinner);

        // Before Ui Elements
        // Backend Submission

        let url = "https://app.kiranvoleti.com/reactfetcher";
        // let url = 'http://localhost:8099/fetchfeeds';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {

                setIsspinner(false);
                setHowmanyfetch(res.data.successdatalength)
                tosttrigger('Fetched Successfully', 'success')


            })
            .catch(err =>
                tosttrigger(err, 'error')


            )



    }


    // End Fetch to tables

    // Get All Articles
    const handlePageClickarticle = async (e) => {
        
        let form_data = new FormData();

        form_data.append('perpage', articlevideoperpage);
        form_data.append('page', e);
        form_data.append('channel', articlevideochannel);
        form_data.append('isreview', articlevideoisview);
        form_data.append('search', articlevideosearch);
        form_data.append('status', articlevideostatus);
        form_data.append('isactive', articlevideoisactive);
        form_data.append('author', articlevideoauthor);

        // Before Ui Elements
        setIsspinner(!isspinner);
        
        var allelm = document.querySelectorAll("input[name=childbox]");
        
        allelm.forEach(elm => {
            elm.removeAttribute("checked")
        })

        // Before Ui Elements
        // Backend Submission

        let url = "https://app.kiranvoleti.com/getarticlelist";
        // let url = 'http://localhost:8099/fetchfeeds';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config)
            .then(res => {
                // setFeedreadylist(res.data.feeds)     

                // tosttrigger(res.data.msg, 'success')
                setTotalresults(res.data.total)
                setCollectioncountarticle(res.data.collectioncountarticle)
                var resparticles = res.data.articles.map(val => (
                    { ...val, ischecked: false }
                ))
                setAllarticles(resparticles);
                setStateallchecked(false)
                setIsspinner(false);
                tosttrigger('Fetched Successfully', 'success')
                // setCategories(prevCategories => [...prevCategories, { id: res.data.indexkey, category: formchangedata.category }])

            })
            .catch(err =>
                tosttrigger(err, 'error')


            )

    };
    const getallarticles = (e) => {

        let form_data = new FormData();

        form_data.append('perpage', articlevideoperpage);
        form_data.append('page', articlevideopage);
        form_data.append('search', articlevideosearch);
        form_data.append('channel', articlevideochannel);
        form_data.append('isreview', articlevideoisview);
        form_data.append('status', articlevideostatus);
        form_data.append('isactive', articlevideoisactive);
        form_data.append('author', articlevideoauthor);
        

        // Before Ui Elements
        setIsspinner(!isspinner);

        // Before Ui Elements
        // Backend Submission

        let url = "https://app.kiranvoleti.com/getarticlelist";
        // let url = 'http://localhost:8099/fetchfeeds';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config)
            .then(res => {
                // setFeedreadylist(res.data.feeds)     
                
                // tosttrigger(res.data.msg, 'success')
                setTotalresults(res.data.total)
                setCollectioncountarticle(res.data.collectioncountarticle)
                var resparticles = res.data.articles.map(val => (
                    { ...val, ischecked: false }
                ))
                setAllarticles(resparticles)
                
                setIsspinner(false);
                tosttrigger('Fetched Successfully', 'success')
                // setCategories(prevCategories => [...prevCategories, { id: res.data.indexkey, category: formchangedata.category }])

            })
            .catch(err =>
                tosttrigger(err, 'error')


            )


    }
    // End All Articles
    // All Videos

    const handlePageClickvideo = (e) => {

        let form_data = new FormData();

        form_data.append('perpage', articlevideoperpage);
        form_data.append('page', e);
        form_data.append('channel', articlevideochannel);
        form_data.append('isreview', articlevideoisview);
        form_data.append('search', articlevideosearch);
        form_data.append('status', articlevideostatus);
        form_data.append('isactive', articlevideoisactive);

        // Before Ui Elements
        setIsspinner(!isspinner);
               

        // Before Ui Elements
        // Backend Submission

        let url = "https://app.kiranvoleti.com/getvideolist";
        // let url = 'http://localhost:8099/fetchfeeds';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config)
            .then(res => {
                // setFeedreadylist(res.data.feeds)     
                setStateallchecked(false)
                // tosttrigger(res.data.msg, 'success')
                setAllvideos(res.data.videos)
                setCollectioncountarticle(res.data.collectioncountvideos)
                setPaginationcount(res.data.total)
                setIsspinner(false);
                tosttrigger('Fetched Successfully', 'success')
                // setCategories(prevCategories => [...prevCategories, { id: res.data.indexkey, category: formchangedata.category }])

            })
            .catch(err =>
                tosttrigger(err, 'error')


            )


    }
    const getallvideos = (e) => {

        let form_data = new FormData();

        form_data.append('perpage', articlevideoperpage);
        form_data.append('page', articlevideopage);
        form_data.append('search', articlevideosearch);
        form_data.append('channel', articlevideochannel);
        form_data.append('isreview', articlevideoisview);
        form_data.append('status', articlevideostatus);
        form_data.append('isactive', articlevideoisactive);

        // Before Ui Elements
        setIsspinner(!isspinner);

        // Before Ui Elements
        // Backend Submission

        let url = "https://app.kiranvoleti.com/getvideolist";
        // let url = 'http://localhost:8099/fetchfeeds';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config)
            .then(res => {
                // setFeedreadylist(res.data.feeds)     

                // tosttrigger(res.data.msg, 'success')
                var respvideos = res.data.videos.map(val => (
                    { ...val, ischecked: false }
                ))
                setAllvideos(respvideos)
                setCollectioncountarticle(res.data.collectioncountvideos)
                setPaginationcount(res.data.total)
                setIsspinner(false);
                tosttrigger('Fetched Successfully', 'success')
                // setCategories(prevCategories => [...prevCategories, { id: res.data.indexkey, category: formchangedata.category }])

            })
            .catch(err =>
                tosttrigger(err, 'error')


            )


    }

    // End All Videos

    // All Tools

    const getalltools = (e) => {

        let form_data = new FormData();

        form_data.append('perpage', articlevideoperpage);
        form_data.append('page', articlevideopage);
        form_data.append('search', articlevideosearch);
        form_data.append('channel', articlevideochannel);
        form_data.append('isreview', articlevideoisview);
        form_data.append('status', articlevideostatus);
        form_data.append('isactive', articlevideoisactive);
        form_data.append('author', articlevideoauthor);

        // Before Ui Elements
        setIsspinner(!isspinner);

        // Before Ui Elements
        // Backend Submission

        let url = "https://app.kiranvoleti.com/gettoollist";
        // let url = 'http://localhost:8099/fetchfeeds';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config)
            .then(res => {
                // setFeedreadylist(res.data.feeds)     

                // tosttrigger(res.data.msg, 'success')
                
                var resptools = res.data.tools.map(val => (
                    { ...val, ischecked: false }
                ))
                setTools(resptools)               
                setCollectioncounttools(res.data.collectioncounttools)
                setPaginationcount(res.data.total)
                setIsspinner(false);
                tosttrigger('Fetched Successfully', 'success')
                // setCategories(prevCategories => [...prevCategories, { id: res.data.indexkey, category: formchangedata.category }])

            })
            .catch(err =>
                tosttrigger(err, 'error')


            )


    }

    const handlePageClicktools = (e) => {

        let form_data = new FormData();

        form_data.append('perpage', articlevideoperpage);
        form_data.append('page', e);
        form_data.append('search', articlevideosearch);
        form_data.append('channel', articlevideochannel);
        form_data.append('isreview', articlevideoisview);
        form_data.append('status', articlevideostatus);
        form_data.append('isactive', articlevideoisactive);
        form_data.append('author', articlevideoauthor);

        setStateallchecked(false)        

        // Before Ui Elements
        // Backend Submission

        let url = "https://app.kiranvoleti.com/gettoollist";
        // let url = 'http://localhost:8099/fetchfeeds';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.post(url, form_data, config)
            .then(res => {
                // setFeedreadylist(res.data.feeds)     

                // tosttrigger(res.data.msg, 'success')
                var resptools = res.data.tools.map(val => (
                    { ...val, ischecked: false }
                ))
                setTools(resptools)     
                setCollectioncounttools(res.data.collectioncounttools)
                setPaginationcount(res.data.total)
                setIsspinner(false);
                tosttrigger('Fetched Successfully', 'success')
                // setCategories(prevCategories => [...prevCategories, { id: res.data.indexkey, category: formchangedata.category }])

            })
            .catch(err =>
                tosttrigger(err, 'error')


            )


    }

    // End Tools
    // Handle All Checks
    const handleAllCheckedArticles = (event) => {
        // alert(event.target.id)
        
        setStateallchecked(event.target.checked)
        var resparticles = allarticles.map(val => (
            { ...val, ischecked: event.target.checked }
        ))
        setAllarticles(resparticles)
        
    }
    const handleCheckchangeArticles = (e) => {
        let valid = e.target.id;
        let valchecked = e.target.checked;
        var somearticlesupdated = allarticles.filter((val, key) => {

            return [...allarticles, parseInt(val.id) === parseInt(valid) ? val.ischecked = valchecked : val.ischecked]


        });

        setAllarticles(somearticlesupdated);

    }
    // Videos

    const handleAllCheckedVideos = (event) => {
        // alert(event.target.id)
        
        setStateallchecked(event.target.checked)
        var respvideos = allvideos.map(val => (
            { ...val, ischecked: event.target.checked }
        ))
        setAllvideos(respvideos)
        
    }
    const handleCheckchangeVideos = (e) => {
        let valid = e.target.id;
        let valchecked = e.target.checked;
        var somearticlesupdated = allvideos.filter((val, key) => {

            return [...allvideos, parseInt(val.id) === parseInt(valid) ? val.ischecked = valchecked : val.ischecked]


        });

        setAllvideos(somearticlesupdated);

    }

    const handleAllCheckedTools = (event) => {
        // alert(event.target.id)
        
        setStateallchecked(event.target.checked)
        var resptools = tools.map(val => (
            { ...val, ischecked: event.target.checked }
        ))
        setTools(resptools)
        
    }
    
    const handleCheckchangeTools = (e) => {
        let valid = e.target.id;
        let valchecked = e.target.checked;
        var somevideosupdated = tools.filter((val, key) => {

            return [...tools, parseInt(val.id) === parseInt(valid) ? val.ischecked = valchecked : val.ischecked]


        });

        setTools(somevideosupdated);

    }

    const handleCheckchangeSource = (e) => {
        let valid = e.target.id;
        let valchecked = e.target.checked;
        var somefeedsupdated = feedreadylist.filter((val, key) => {

            return [...feedreadylist, parseInt(val.id) === parseInt(valid) ? val.ischecked = valchecked : val.ischecked]


        });

        setFeedreadylist(somefeedsupdated);

    }
    const handleAllCheckedSource = (event) => {
        // alert(event.target.id)
        
        setStateallchecked(event.target.checked)
        var respfeeds = feedreadylist.map(val => (
            { ...val, ischecked: event.target.checked }
        ))
        setFeedreadylist(respfeeds)
        
    }


    
    const dynolinktextupdater = (e) => {
        let valid = e.target.id;
        
        var somevideosupdated = tools.filter((val, key) => {

            return [...tools, parseInt(val.id) === parseInt(valid) ? (val.title = dynotooltext,val.URL=dynotoollink) : val.ischecked]


        });

        let form_data = new FormData();
        form_data.append('id', valid);
        form_data.append('tablename', 'Tools');
        form_data.append('statereview', 'toolupdate');
        form_data.append('URL', dynotoollink);
        form_data.append('title', dynotooltext);

        let url = 'https://app.kiranvoleti.com/bulkreviewupdater';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {

                tosttrigger(res.data.message, "success");
                

            })
            .catch(err =>
                tosttrigger(err, "error")

            )

        setTools(somevideosupdated);

    }

    // End Videos
    const handleAllChecked = (event) => {
        alert(event.target.id)
        setTopicstate([]);
        if (event.target.name === "videos"){
            var respvideos = allvideos.map(val => (
                { ...val, ischecked: event.target.checked }
            ))
            setAllvideos(respvideos)
            

        }
        else if (event.target.name === "articles"){
            var resparticles = allarticles.map(val => (
                { ...val, ischecked: event.target.checked }
            ))
            setAllarticles(resparticles)
            

        }
        else if (event.target.name === "tools"){
            var resptools = tools.map(val => (
                { ...val, ischecked: event.target.checked }
            ))
            setTools(resptools)
            

        }
        else{
            alert('feeds');
        }
        


    }


    const handlechange = (event) => 
    {
        // let categorytateaction = topicstate;
        // function ischeckf(val) {
        //     if (parseInt(val.id) === parseInt(event.target.id)) {
        //         return parseInt(val) !== parseInt(event.target.id);
        //     }
        // }
        // if (event.target.checked) {

        //     let nowobj = [{ id: parseInt(event.target.id), isChecked: event.target.checked }]
        //     setTopicstate([...categorytateaction, ...nowobj]);
        // } else {

        //     let nowobj = categorytateaction.filter(ischeckf)
        //     setTopicstate([...nowobj]);
        // }
        if (event.target.checked){
            
            event.target.setAttribute("checked", true)          
        }else{
            event.target.removeAttribute("checked")  
        }


    }


    // End Handle All Checks


    // Status Changer

    const topicstatuschange = (e) => {


        let form_data = new FormData();
        form_data.append('id', e.target.id);
        form_data.append('is_active', e.target.checked);

        let url = 'https://app.kiranvoleti.com/statechanger';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {

                tosttrigger(res.data.message, "success");
                

            })
            .catch(err =>
                tosttrigger(err, "error")

            )

    }

    // Status Changer

    // Dynamic status changer
    const articlestatuschange = (e) => {

        let form_data = new FormData();
        form_data.append('id', e.target.id);
        form_data.append('isactive', e.target.checked);
        form_data.append('action', 'updateactive');
        let url = 'https://app.kiranvoleti.com/articleUpdate';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {

                tosttrigger(res.data.message, "success");
                // getallarticles(e)

            })
            .catch(err =>
                tosttrigger(err, "error")

            )

    }
    const videostatuschange = (e) => {

        let form_data = new FormData();
        form_data.append('id', e.target.id);
        form_data.append('isactive', e.target.checked);
        form_data.append('action', 'videoactive');
        let url = 'https://app.kiranvoleti.com/articleUpdate';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {

                tosttrigger(res.data.message, "success");

            })
            .catch(err =>
                tosttrigger(err, "error")

            )

    }

    const toolstatuschange = (e) => {

        let form_data = new FormData();
        form_data.append('id', e.target.id);
        form_data.append('isactive', e.target.checked);
        form_data.append('action', 'toolactive');
        // console.log(e.target.id,e.target.checked)
        // return
        let url = 'https://app.kiranvoleti.com/articleUpdate';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {

                tosttrigger(res.data.message, "success");
                

            })
            .catch(err =>
                tosttrigger(err, "error")

            )

    }
    // End Dynamci status changer

    // Bulk Review updater

    const reviewupdate = async (e) => {
        let form_data = new FormData();
        var list = []
        var allelm = document.querySelectorAll("input[name=childbox]");
        var tablename = e.target.id;
        await allelm.forEach(elm => {
            if (elm.checked) {
                list.push(elm.id)
            }
        })
       
        form_data.append('deletelist', list);
        form_data.append('tablename', tablename);
        form_data.append('statereview', 'review');
        form_data.append('channel', articlevideochannel);
        form_data.append('isreview', articlevideoisview);
        

        let url = 'https://app.kiranvoleti.com/bulkreviewupdater';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
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
                    if (tablename === "Videos"){
                        var someavideosupdated = allvideos.filter((val,key) =>{
                            return [...allvideos,val.isreview=articlevideoisview]                           
                           });
                           
                           setAllvideos(someavideosupdated);   
                           tosttrigger('Review Changed', 'success')
                    }
                    else{
                        var somearticlesupdated = allarticles.filter((val,key) =>{
                            return [...allarticles,val.isreview=articlevideoisview]                           
                           });
                           
                           setAllarticles(somearticlesupdated);   
                           tosttrigger('Review Changed', 'success')
                    }
                    
                }
            })
            .catch(err =>
                console.log(err)          
    
            )
        
    
        
        }
    

    // End Bulk Review Updater

    // Status Changer

    const statusupdate = async (e) => {

        let form_data = new FormData();
        var list = []
        var allelm = document.querySelectorAll("input[name=childbox]");
        var tablename = e.target.id
        

        await allelm.forEach(elm => {
            if (elm.checked) {
                list.push(parseInt(elm.id))
            }
        })
       
        form_data.append('deletelist', list);
        form_data.append('tablename', tablename);
        form_data.append('statereview', 'state');
        form_data.append('is_active', articlevideoisactive);
        

        let url = 'https://app.kiranvoleti.com/bulkreviewupdater';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }    
        
       
        await axios.post(url, form_data, config)
            .then(res => {
                  
                tosttrigger(res.data.message, 'success')
                    if (tablename === "Videos"){
                        var someavideosupdated = allvideos.filter((val,key) =>{
                            return [...allvideos, list.includes(val.id) ? val.isactive=articlevideoisactive:val]
                           
                           });
                        
                        setAllvideos(someavideosupdated)

                        
                    }
                    else if (tablename === "Articles"){
                        
                        var somearticlesupdated = allarticles.filter((val,key) =>{
                         return [...allarticles, list.includes(val.id) ? val.isactive=articlevideoisactive:val]
                        
                        });
                        
                        setAllarticles(somearticlesupdated);                      
                        
                        
                    }
                    else {
                        var sometoolsupdated = tools.filter((val,key) =>{
                            return [...tools, list.includes(val.id) ? val.isactive=articlevideoisactive:val]
                           
                           });
                           
                           setTools(sometoolsupdated);  
                           

                    }


                }
            )
            .catch(err =>
                console.log(err)          
    
            )
        
    
        
        }

    // End Status Changer

    // Edit form

    const articlevideohandlesubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('id', feedform.urlid);
        form_data.append('mainref', feedform.mainref);
        form_data.append('supersubcat', feedform.superref);
        form_data.append('action', 'updatearticle');


        let url = 'https://app.kiranvoleti.com/articleUpdate';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {

                tosttrigger("Successfully Status Changed !", "success");
                setArticlemodel(false);

            })
            .catch(err =>
                tosttrigger(err, "error")

            )

    }

    const Videoarticlehandlesubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('id', feedform.urlid);
        form_data.append('mainref', feedform.mainref);
        form_data.append('supersubcat', feedform.superref);
        form_data.append('action', 'updatevideo');


        let url = 'https://app.kiranvoleti.com/articleUpdate';

        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {

                tosttrigger(res.data.message, "success");
                setVideomodel(false);

            })
            .catch(err =>
                tosttrigger(err, "error")

            )

    }

    const toolhandlesubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('id', feedform.urlid);
        form_data.append('mainref', feedform.mainref);
        form_data.append('supersubcat', feedform.superref);
        form_data.append('action', 'updatetool');


        let url = 'https://app.kiranvoleti.com/articleUpdate';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {

                tosttrigger("Successfully Status Changed !", "success");
                setArticlemodel(false);

            })
            .catch(err =>
                tosttrigger(err, "error")

            )

    }


    // End Edit form

    // Deleter
    const bulkdeleter = async (e) => {


        let form_data = new FormData();
        var list = []
        var allelm = document.querySelectorAll("input[name=childbox]");

        await allelm.forEach(elm => {
            if (elm.checked) {
                list.push(elm.id)
            }
        })
        
         
        
        form_data.append('deletelist', list);
        form_data.append('tablename', 'Articles');
        let url = 'https://app.kiranvoleti.com/bulkdeltereact';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {

                tosttrigger(res.data.msg, "success");
                var somearticlesupdated = allarticles.filter((val,key) =>(
                    ! list.includes(val.id.toString()))
                    );
                   
                   setAllarticles(somearticlesupdated);  
                
                

            })
            .catch(err =>
                tosttrigger("Something Went Wrong !", "error")

            )

    }
    const bulkdeletervideos = async (e) => {


        let form_data = new FormData();
        var list = []
        var allelm = document.querySelectorAll("input[name=childbox]");

        await allelm.forEach(elm => {
            if (elm.checked) {
                list.push(elm.id)
            }
        })

        form_data.append('deletelist', list);
        form_data.append('tablename', 'Videos');
        let url = 'https://app.kiranvoleti.com/bulkdeltereact';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {

                var somevideosupdated = allvideos.filter((val,key) =>(
                    ! list.includes(val.id.toString()))
                    );
                   
                   setAllvideos(somevideosupdated);  
                tosttrigger(res.data.msg, "success");

            })
            .catch(err =>
                tosttrigger("Something Went Wrong !", "error")

            )

    }

    // End Deleter

    // Tools Deleter

    const bulkdeletertools = async (e) => {


        let form_data = new FormData();
        var list = []
        var allelm = document.querySelectorAll("input[name=childbox]");

        await allelm.forEach(elm => {
            if (elm.checked) {
                list.push(elm.id)
            }
        })

        form_data.append('deletelist', list);
        form_data.append('tablename', 'Tools');
        let url = 'https://app.kiranvoleti.com/bulkdeltereact';
        // let url = 'https://jsonplaceholder.typicode.com/todos';
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        axios.post(url, form_data, config)
            .then(res => {

                var sometoolsupdated = tools.filter((val,key) =>(
                    ! list.includes(val.id.toString()))
                    );
                   
                   setTools(sometoolsupdated);  
                tosttrigger(res.data.msg, "success");

            })
            .catch(err =>
                tosttrigger("Something Went Wrong !", "error")

            )

    }

    // End BulkDeleter


    // ui Elements
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

    // End Ui Elements



    return (
        <TopicsContext.Provider value={{
            handleSubmit, rhandleChange, onFileChange, feedform, isspinner,
            feedreadylist, getallfeedstable, handlechange, handleAllChecked,

            sendforFetch, spin, delpin, topicstatuschange, howmanyfetch, fetchcategory,

            sendforFetchtable, sendchannelfetch,

            allarticles, totalresults, articlevideostatus, articlevideosearch, togglemodel,
            articlemodel, statetoggle,viewtoggle, articlevideoisactive, collectioncountarticle,
            articlevideopage, articlevideoperpage, getallarticles, bulkdeleter,
            articlevideohandlesubmit, articlestatuschange,
            searchquery, paginationcount, handlePageClick, handlePageClickarticle,
            handlePageClickvideo,deletefeeditem,sitequery,authorquery,setFetchcategory,
            setArticlevideoisactive,setArticlevideoisview,setArticlevideosearch,setArticlevideoauthor,
            setArticlevideochannel,        






            allvideos, videomodel, getallvideos, bulkdeletervideos,
            togglevideomodel, Videoarticlehandlesubmit, videostatuschange,
            reviewupdate,statusupdate,

            getalltools,tools,collectioncounttools,totaltool,bulkdeletertools,
            toolmodel, setToolmodel ,toggletoolmodel,toolhandlesubmit, handlePageClicktools,

            handleAllCheckedArticles,handleCheckchangeArticles,stateallchecked,setStateallchecked,
            handleAllCheckedVideos,handleCheckchangeVideos,handleAllCheckedTools,handleAllCheckedSource,
            handleCheckchangeTools,handleCheckchangeSource,setDynotoollink,setDynotooltext,dynolinktextupdater,toolstatuschange
            

        }}>


            {children}

        </TopicsContext.Provider>
    )
}



export default TopicsProvider