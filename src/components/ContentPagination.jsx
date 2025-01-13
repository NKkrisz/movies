import * as React from 'react';
import Pagination from '@mui/material/Pagination';

export default function ContentPagination({page, setPage, numberOfPages=10}) {
  const handleClick = (event,p) => {
    // console.log("oldal - ", p);
    setPage(p)
  }
    return (
      <Pagination count={numberOfPages} shape="rounded" page={page} onChange={handleClick}/>
  );
}