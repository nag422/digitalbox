import Index from "views/Index.js";
import Userslist from "views/examples/Userslist.js";
import Subscribelist from "views/examples/Subscribelist.js";
import Categories from "views/examples/Categories.js";
import Subcategories from "views/examples/Subcategories.js";
import Supsubcategories from "views/examples/Supsubcategories.js";
import Topicsforms from "views/examples/Topicsforms.js";
import Lettersubscription from "views/examples/Lettersubscription";
// import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    displayproperty: localStorage.getItem('usertype') !== "superuser" ? 'block' : 'block'  
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin"
  // },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-badge text-gray",
    component: Userslist,
    layout: "/admin",
    displayproperty: localStorage.getItem('usertype') !== "superuser" ? 'none' : 'block'  
  },
  
  {
    path: "/categories/topics",
    name: "Main Categories (topics)",
    icon: "ni ni-bullet-list-67 text-red",
    component: Categories,
    layout: "/admin",
    displayproperty: localStorage.getItem('usertype') !== "superuser" ? 'none' : 'block'  
  },
  {
    path: "/categories/subcategories",
    name: "Sub Categories",
    icon: "ni ni-bullet-list-67 text-gray",
    component: Subcategories,
    layout: "/admin",
    displayproperty: localStorage.getItem('usertype') !== "superuser" ? 'none' : 'block'  
  },
  {
    path: "/categories/supersubcategories",
    name: "Supersub Categories",
    icon: "ni ni-bullet-list-67 text-gray",
    component: Supsubcategories,
    layout: "/admin",
    displayproperty: localStorage.getItem('usertype') !== "superuser" ? 'none' : 'block'  
  },
  {
    path: "/categories/manage",
    name: "Topics",
    icon: "ni ni-collection text-gray",
    component: Topicsforms,
    layout: "/admin",
    displayproperty: localStorage.getItem('usertype') === "superuser" ? 'block' : 'block'  
  },
  {
    path: "/categories/daily",
    name: "Subscription",
    icon: "ni ni-send text-gray",
    component: Lettersubscription,
    layout: "/admin",
    displayproperty: localStorage.getItem('usertype') === "superuser" ? 'block' : 'none'  
  },
  {
    path: "/tags",
    name: "Tags",
    icon: "ni ni-tag text-gray",
    component: Subscribelist,
    layout: "/admin",
    displayproperty: localStorage.getItem('usertype') !== "superuser" ? 'block' : 'block'  
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth"
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth"
  // }
];
export default routes;
