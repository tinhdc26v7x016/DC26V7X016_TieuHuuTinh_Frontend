import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/contactBook.vue";
import Login from "@/views/Login.vue";

const routes = [
    {
    path: "/login",
    name: "login",
    component: Login,
    },
    
    {
        path: "/",
        name: "contactbook",
        component: ContactBook,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

    {
        path: "/contacts/:id",
        name: "contact.edit",
        component: () => import("@/views/ContactEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/contacts/add",
        name: "contact.add",
        component: () => import("@/views/ContactAdd.vue"),
        props: true
    },

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to,from,next)=>{

    const token=localStorage.getItem("token");

    if(to.name!="login" && !token){

        next("/login");

    }else{

        next();

    }

});


export default router;