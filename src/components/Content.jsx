import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { CircularProgress } from '@mui/material'
import { getData } from '../utils'
import SingleContent from './SingleContent'
import ContentPagination from './ContentPagination'
import { useState } from 'react'

const Content = ({URL, type}) => {
    const [page, setPage] = useState(1)
    const {isLoading, isError, error, data} = useQuery({queryKey:["trendings", URL+"&page="+page], queryFn:getData})
    
    if(isLoading) {
        <CircularProgress/>
        return
    }

    if(isError) {
        <div>error bruh : {error.message}</div>
    }
    
    // console.log(data);
    
    return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <div style={{display:"flex", justifyContent:"center", flexWrap:"wrap", gap:"15px"}}>
        {data.results.map(obj =>
          <SingleContent key={obj.id} {...obj} type={type}/>
        )}
      </div>
      <ContentPagination page={page} setPage={setPage} numberOfPages={data.total_pages}/>
    </div>
  )
}

export default Content
