import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useQuery } from '@tanstack/react-query';
import { getData, noPictureLandscape } from '../utils';
import { CircularProgress } from '@mui/material';
import { img_500 } from '../utils';
import Carousel from './Carousel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

export default function DetailModal({open, setOpen, id, media_type}) {  
  const handleClose = () => setOpen(false);
  console.log(id, media_type);

  const urlDetails = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${import.meta.env.VITE_API_KEY}`;
  const urlVideos = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}`;
  
  const {data, isLoading, isError, error} = useQuery({queryKey:["details", urlDetails],queryFn:getData})
  const {data:dataVideos, isLoading:isLoadingVideos, isError:isErrorVideos, error:errorVideos} = useQuery({queryKey:["videos", urlVideos],queryFn:getData})

  if(isLoading || isLoadingVideos) return <CircularProgress/>
  if(isError || isErrorVideos) return <p>error fetching {error.message || errorVideos.message}</p>
  // console.log(data);
  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <img src={data.backdrop_path ? img_500+data.backdrop_path : noPictureLandscape} alt={data?.title || data?.name} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span><b>{data?.title || data?.name} {data?.release_date || data?.first_air_date}</b></span>
            <span><i>{data?.tagline}</i></span>
            <span>{data?.overview}</span>
          </Typography>
        <Carousel id={id} media_type={media_type}/>
        </Box>
      </Modal>
    </div>
  );
}