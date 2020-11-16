import React, {useState,createContext, useEffect} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
export const UsersContext = createContext();
export const QueryContext = createContext();
export const PaginationContext = createContext();
export const UserslengthContext = createContext();


const UsersProvider = ({children})=> {
    const [users, setUsers] = useState([])
    const [q, setQ] = useState('');
    const [currentpage, setCurrentpage] = useState(1);
    const [totalpages, setTotalpages] = useState(1);
    
    
    
    const url = "https://app.kiranvoleti.com/getuserlist";
    

    useEffect(() => {
        const fetchusers = async () => {     
                   

       
        await axios.get(url)
        .then(res=>{            
            setUsers(res.data.users);
            // setCurrentpage(prevCurrentpage => prevCurrentpage+1)
            setTotalpages(res.data.total);           
                    
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
    fetchusers()
    },[])


    // Get Current Posts
  
    // const postsperpage = 5;
    // const indexoflastpost = currentpage * postsperpage;
    // const indexoffirstpost = indexoflastpost - postsperpage;
    // const currentposts = users.slice(indexoffirstpost,indexoflastpost);

    function search(rows) {
        return rows.filter(
            (row) =>
            row.username.toLowerCase().indexOf(q) > -1 ||
            row.email.toLowerCase().indexOf(q) > -1
        )
    }

    function sorting(forsort){
        // return forsort.sort((a,b) => b['id'] - a['id'])
        return forsort.sort((a,b) => (
            -1 * a['name'].localeCompare(b['name'])
        ))
    }



    return (
        
        <UsersContext.Provider value={[search(users),setUsers]}>        
        <QueryContext.Provider value={[q,setQ]}>
        <PaginationContext.Provider value={{currentpage, setCurrentpage, totalpages,setTotalpages}}>
        
          
            {children}
        
        </PaginationContext.Provider>
        </QueryContext.Provider>
        
        </UsersContext.Provider>
    )
}


export default UsersProvider