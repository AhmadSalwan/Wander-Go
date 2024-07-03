import { useState,useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Auth/Login'
import Transaction from './transaction'
import React,{Fragment} from 'react'
import './App.css'

function App() {
  return(
  <Fragment>
      <div className='w-screen h-screen relative select-none'>
        {/* <div className="absolute top-0 z-30 font-Inter w-full">
          <nav className='flex justify-between items-center text-xl text-white font-semibold mx-20 py-5'>
            <a href="#" className="cursor-pointer">TAILORED EXPERIENCES</a>
            <a href="#" className="cursor-pointer">DESTINATIONS</a>
            <a href="#" className="cursor-pointer">PRIVATE RENTAL</a>
            <a href="#" className="cursor-pointer">ABOUT US</a>
            <a href="#" className="cursor-pointer">BLOG & PRESS</a>
            <a href="#" className="cursor-pointer">CONTACT US</a>
          </nav>
        </div> */}
       <img className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover' style={{ maxWidth: '100vw', maxHeight: '100vh' }} src='/image/airplaneimage.jpg' alt='Landing Page'
/>

        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <div className="font-Inter font-semibold flex absolute w-full z-30 top-1/3 left-1/4">
          <div className="mb-8 flex-col justify-center text-center w-full">
            <h1 className="text-8xl font-Inter font-black leading-tight text-white">WONDER GO</h1>
            <h1 className="text-6xl font-Inter font-black leading-tight text-white">Hallmark of Airport</h1>
          </div>
        </div>
      </div>
      <div className="m-10">
        <div className="flex justify-between items-center">
          <div className="ml-3">
            <span className="font-Jost italic text-4xl">Best Location</span>
            <h1 className="font-Abhaya text-8xl font-bold">Sulawesi Tourism</h1>
          </div>
          <p className="mr-3 font-Inter italic text-2xl text-slate-600">Extraordinary natural beauty, enjoy the rich <br/> culture, and experience the friendliness of the <br/> local people.</p>
        </div>
        <img className="w-full mx-3 h-fit mt-2 object-cover" src="/image/gambar.png" alt="Sulawesi Tourism"/>
      </div>
    </Fragment>
  )
}

export default App
