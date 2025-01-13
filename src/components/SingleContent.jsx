import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { img_300, imgUnavailable } from '../utils';
import { CardActionArea } from '@mui/material';
import DetailModal from './DetailModal';

export default function SingleContent({id, poster_path, title, name, first_air_date, release_date, media_type, vote_average, type}) {
    // console.log(id, poster_path, title);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    // console.log(type);
    
  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea onClick={() => setOpen(true)}>
      <CardMedia
        sx={{ height: 400 }}
        image={poster_path ? img_300 + poster_path : imgUnavailable}
        title={title || name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title || name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <span>{media_type}</span><span>{first_air_date || release_date}</span>
        </Typography>
        <span style={{position:"absolute", top:0, right:0, width:"2rem", height:"2rem", textAlign:"center", color:"white", background:"gray", borderRadius:"50%", padding:"5px"}}>{vote_average.toFixed(1)}</span>
      </CardContent>
      </CardActionArea>
      {open && <DetailModal open={open} setOpen={setOpen} id={id} media_type={media_type || type}/>}
    </Card>
  );
}