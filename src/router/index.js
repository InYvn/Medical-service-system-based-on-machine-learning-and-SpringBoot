import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Manager',
        component: () => import('../views/Manager.vue'),
        redirect: '/home',  // 重定向到主页
        children: [
            {path: "home", name: "Home", component: () => import('../views/manager/Home')},
            {path: "user", name: "User", component: () => import('../views/manager/User')},
            {path: "office", name: "Office", component: () => import('../views/manager/Office')},
            {path: "doctor", name: "Doctor", component: () => import('../views/manager/Doctor')},
            {path: "medicine", name: "Medicine", component: () => import('../views/manager/Medicine')},
            {path: "jdmedicine", name: "Jdmedicine", component: () => import('../views/manager/Jdmedicine')},
            {path: "vwmedicine", name: "Vwmedicine", component: () => import('../views/manager/Vwmedicine')},
            {path: "vwjdmedicine", name: "Vwjdmedicine", component: () => import('../views/manager/Vwjdmedicine')},
            {path: "vwreservation", name: "Vwreservation", component: () => import('../views/manager/Vwreservation')},
            {path: "403", name: "Auth", component: () => import('../views/manager/Auth')}
        ]
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '*',
        name: '404',
        component: () => import('../views/404.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    // to 是到达的路由信息
    // from 是开源的路由信息
    // next 是帮助我们跳转路由的函数
    // let adminPaths = []
    let adminPaths = ['/user']

    let user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== '管理员' && adminPaths.includes(to.path)) {
        // 如果当前登录的用户不是管理员，然后当前的到达的路径是管理员才有权限访问的路径，那这个时候我就让用户去到一个没有权限的页面，不让他访问实际的页面
        next('/403')
    } else {
        next()
    }
})

export default router
