"use client"
import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5'

function Search({setProducts}:any) {

  const [search , setSearch]=useState("")



  const handleSearch =async(value:string)=>{
setSearch(value)
const res =await fetch(`/api/products/search?q=${encodeURIComponent(value)}`)
const data=await res.json()
setProducts(data)

  }

//search 
  return (
    <>
    <div className='p-10 relative'>
        <input
        value={search}
        onChange={(e)=>handleSearch(e.target.value)}
        className='border border-gray-300 absolute left-9 rounded-md px-2 py-1'
        placeholder='جستجو'
        /> <IoSearch className='absolute left-11 top-12'/>
    </div>
   
</>
  )
}

export default Search