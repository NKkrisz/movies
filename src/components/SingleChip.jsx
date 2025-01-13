import { Chip } from '@mui/material'
import React from 'react'
import DoneIcon from "@mui/icons-material/Done"
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked"
import { useState } from 'react'

const SingleChip = ({id, name, selectedGenres, setSelectedGenres}) => {
  const [selected, setSelected] = useState(false)
  const handleClick = () => {
    // console.log(selected, id);
    setSelected(!selected)
    if(selectedGenres.indexOf(id) == -1){
        setSelectedGenres(prev => [...prev,id])
    } else {
        setSelectedGenres(prev => prev.filter(item => item != id))
    }

  }
    return (
    <Chip icon={selected ? <DoneIcon/> : <RadioButtonUnchecked/>} label={name} clickable onClick={handleClick}/>
  )
}

export default SingleChip
