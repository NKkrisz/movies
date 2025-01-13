import { useQuery } from '@tanstack/react-query';
import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { getData, img_300, noPicture } from '../utils';
import { CircularProgress } from '@mui/material';


export default function Carousel({id,media_type}) {

    // console.log(id, media_type);
    
    const urlCredits=`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}`;

    const{data,isError,isLoading,error}=useQuery({queryKey:['credits',urlCredits],queryFn:getData})

    if (isLoading) {
        return <CircularProgress />;
      }
      if (isError) {
        return <div>Error:{error.message}</div>;
      }

      // console.log(data.cast);

      const items=data.cast.map(obj=>(
        <div className='carouselContainer'>
          <img className='carouselImg' src={obj.profile_path?img_300+obj.profile_path:noPicture} alt={obj?.name} />
          <b className='carouselName'>{obj.name}</b>
        </div>
      ))
      // console.log(items);


    const responsive={
        0:{items:3},
        512:{items:5},
        1024:{items:7}
    }

  return (
    <div>
      <AliceCarousel
      disableButtonsControls
      mouseTracking

      infinite
      disableDotsControls
      responsive={responsive}
      items={items}
      />
    </div>
  )
}