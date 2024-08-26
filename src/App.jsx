import { useEffect, useState,lazy, Suspense } from 'react'
import './App.css'
const PostBlog= lazy(()=> import("./components/PostBlog"))
const EditPost= lazy(()=> import("./components/EditPost"))
import axios from 'axios'
import { BlogList } from './components/BlogList'
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import Signin from './components/Signin'
import Home from './components/Home'
import { Signup } from './components/Signup'
import { AuthCheck } from './components/AuthCheck'
import { RecoilRoot } from 'recoil'


function App() {
const [post,setPost]=useState([])

useEffect(() => {
  fetchPosts()
}, [])




const fetchPosts = async () => {
  try {
    const response = await axios.get("https://daily-blogger-c4jx.onrender.com/posts")
    setPost(response.data)
  } catch (error) {
    console.error(error)
  }
}



  return (
    <div className='bg-[#e5ecf3] min-h-screen'>
    <>
    <BrowserRouter>
    <AppBar post={post} setPost={setPost} fetchPosts={fetchPosts} />
    </BrowserRouter>
    </>
    </div>
  )
}

function AppBar({post,setPost,fetchPosts}){

  return (
    <>
    <div>
    <RecoilRoot>
    <Routes>
    {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Signin />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/SignUp' element={<Signup />}/>
        <Route path="/PostBlog" element={<AuthCheck> <Suspense fallback={"loading..."}><PostBlog post={post} setPost={setPost} fetchPosts={fetchPosts}/></Suspense> </AuthCheck>} />
        <Route path='/BlogList' element={<AuthCheck><BlogList post={post} fetchPosts={fetchPosts} /> </AuthCheck>} />
        <Route path='/edit/:id' element={<AuthCheck><Suspense fallback={"loading..."}><EditPost post={post} fetchPosts={fetchPosts} /></Suspense> </AuthCheck>} />
      </Routes>
      </RecoilRoot>  
      </div>
    </>
  )
}

export default App
