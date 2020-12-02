import Layout from '../views/Layout.vue'
import Product from "../views/Product"

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: "/",
                name: "Product",
                component: Product,
                meta: {
                    isLogin: true
                }
            },
            {
                path: "/params",
                name: "Params",
                component: () => import("../views/Params"),
                meta: {
                    isLogin: true
                }
            },
            {
                path: "/content",
                name: "Content",
                component: () => import("../views/Content"),
                meta: {
                    isLogin: true
                }
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue")
    },
    {
        path: "/ucenter",
        name: "UCenter",
        component: () => import("../views/UCenter.vue"),
        meta: {
            isLogin: true
        }
    }
]

export default routes