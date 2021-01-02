import React, {useState,createContext, useEffect} from 'react';
import axios from 'axios';
export const UsersContext = createContext();
export const QueryContext = createContext();
export const PaginationContext = createContext();
export const UserslengthContext = createContext();


const UsersProvider = ({children})=> {
    const [users, setUsers] = useState([])
    const [q, setQ] = useState('');
    const [currentpage, setCurrentpage] = useState(1);
    const [totalpages, setTotalpages] = useState(1);
    
    
    
    
    

    useEffect(() => {
           
        const url = "https://app.kiranvoleti.com/ui/getuserlist/";
        const config = {
            headers: {
                'Content-Type': 'application/json',                
                'Accept': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
                
            }
        };
       
        axios.get(url,config)
        .then(res=>{            
            setUsers(res.data.users);
            // setCurrentpage(prevCurrentpage => prevCurrentpage+1)
            setTotalpages(res.data.total);      
            console.log(res.data.users)
               

                    
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    ,[])


    // Get Current Posts
  
    // const postsperpage = 5;
    // const indexoflastpost = currentpage * postsperpage;
    // const indexoffirstpost = indexoflastpost - postsperpage;
    // const currentposts = users.slice(indexoffirstpost,indexoflastpost);

    function search(rows) {
        return rows.filter(
            (row) =>
            
                // row.first_name.toLowerCase().indexOf(q) > -1 ||
            row.email.toLowerCase().indexOf(q) > -1

         
            
        )
    }

    function sorting(forsort){
        // return forsort.sort((a,b) => b['id'] - a['id'])
        return forsort.sort((a,b) => (
            -1 * a['name'].localeCompare(b['name'])
        ))
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