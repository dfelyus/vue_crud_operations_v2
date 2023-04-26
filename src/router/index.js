import {createRouter, createWebHistory} from "vue-router";
import Home from "../pages/Home.vue";
import Welcome from "../pages/Welcome.vue";
import Add from "../components/Add.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";

import DefaultLayout from "../components/DefaultLayout.vue";


const routes = [
    {
        path:"/",
        component:DefaultLayout,
        children:[
            {
                path:"/home",
                name:"Home",
                component:Home,
            },
            {
                path:"/",
                name:"Welcome",
                component:Welcome,
            },
            {
                path:"/add_book",
                name:"Add",
                component:Add,
            }
        ],
    },
    {
        path:"/register",
        name:"Register",
        component:Register,
    },
    {
        path:"/login",
        name:"Login",
        component:Login,
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes,
    //linkActiveClass:'btn btn-danger'
})

export default router;

