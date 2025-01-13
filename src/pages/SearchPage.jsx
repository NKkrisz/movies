import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import Content from '../components/Content';

const SearchPage = () => {
  const [type, setType] = useState("movie")
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    // console.log("Input value changed:", inputValue);
  }, [inputValue]);
  const urlSearch = `https://api.themoviedb.org/3/search/${type}?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&query=${inputValue}`;
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
          <label htmlFor="search"><b>Currently searching: {type}</b></label>
          <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} name='search' type="text"/>
          <Stack direction="row">
              <Button onClick={()=>{setType("movie")}}>Search Movies</Button>
              <Button onClick={()=>{setType("tv")}}>Search Series</Button>
          </Stack>
      </div>
      <Content URL={urlSearch} type={type}/>
    </div>
  )
}

export default SearchPage
