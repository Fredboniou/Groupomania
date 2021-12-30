import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login.vue"
import Signup from "@/views/Signup.vue"
import NotFound from "@/views/NotFound.vue"
import Post from "@/views/Post.vue"
import NewPost from "@/views/NewPost.vue"
import CreateProfile from "@/views/CreateProfile.vue"
import Profile from "@/views/Profile.vue"
import Comments from "@/views/Comments.vue"

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
    component: Login
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/posts",
    name: "Post",
    component: Post
  },
  {
    path: "/newpost",
    name: "NewPost",
    component: NewPost
  },
  {
    path: "/createprofile",
    name: "CreateProfile",
    component: CreateProfile
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile
  },
  {
    path: "/post/:id",
    name: "Comments",
    component: Comments
  },
  {
    path: "/*",
    name: "NotFound",
    component: NotFound
  },
]

const router = new VueRouter({
  routes
})

export default router
