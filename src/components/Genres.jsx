import React from 'react'
import { Stack } from '@mui/material'
import Content from './Content'
import { useQuery } from '@tanstack/react-query'
import SingleChip from './SingleChip'
import { getData } from '../utils'
import { CircularProgress } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'

const Genres = ({type, setUrlForGenres}) => {
    const urlGenres=`https://api.themoviedb.org/3/genre/${type}/list?api_key=${import.meta.env.VITE_API_KEY}`
    const {isLoading, isError, error, data} = useQuery({queryKey:["genres", urlGenres], queryFn:getData})

    const [selectedGenres, setSelectedGenres] = useState([])
    // console.log(selectedGenres);

    useEffect(()=>{
      if(!selectedGenres) {
        setUrlForGenres("")
      } else {
        setUrlForGenres(selectedGenres.join(","))
      }
    }, [selectedGenres])

    if(isLoading) {
        <CircularProgress/>
        return
    }

    if(isError) {
        <div>error bruh : {error.message}</div>
    }
    
  return (
    <div>
      <Stack direction="row" spacing={1}>
        {data.genres.map(genre => <SingleChip key={genre.id} id={genre.id} name={genre.name} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}/>)}
      </Stack>
    </div>
  )
}

export default Genres
