import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
    path: "/posts",
    name: "Post",
    component: () => import(/* webpackChunkName: "posts" */ '../views/Post.vue')
  },
  {
    path: "/newpost",
    name: "NewPost",
    component: () => import(/* webpackChunkName: "newpost" */ '../views/NewPost.vue')
  },
  {
    path: "/createprofile",
    name: "CreateProfile",
    component: () => import(/* webpackChunkName: "createprofile" */ '../views/CreateProfile.vue')
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    path: "/post/:id",
    name: "Comments",
    component: () => import(/* webpackChunkName: "comments" */ '../views/Comments.vue')
  },
  {
    path: "/modifpost/:id",
    name: "ModifPost",
    component: () => import(/* webpackChunkName: "modifpost" */ '../views/ModifPost.vue')
  },
  {
    path: "/*",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
