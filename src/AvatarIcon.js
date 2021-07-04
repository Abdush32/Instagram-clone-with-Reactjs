import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import "./avataricon.css"
import mypic from "./mypic.jpeg"
import adipic from "./adipic.jpeg"
import bab from "./bab.jpeg"
import golu from "./golu.jpeg"
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(0.5),
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
   
  },
}));
const AvatarIcon = () => {
    const classes = useStyles();
    return (
        <div className="avatar_wrap">
        <div className={classes.root} id="avatar_icon">
        <Avatar alt="Remy Sharp" src={mypic}  />
        <Avatar alt="Travis Howard" src={adipic} />
        <Avatar alt="Cindy Baker" src={bab} />
        <Avatar alt="Remy Sharp" src={golu} />
        <Avatar alt="Travis Howard" src="https://cdn.pixabay.com/photo/2021/01/11/21/39/temple-5909803__340.jpg" />
        <Avatar alt="Cindy Baker" src="https://cdn.pixabay.com/photo/2018/03/31/11/37/polar-bear-3277930__340.jpg" />
        <Avatar alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2021/05/13/18/18/fashion-6251535_960_720.jpg" />
        <Avatar alt="Travis Howard" src="https://cdn.pixabay.com/photo/2020/01/21/16/26/yorkshire-terrier-4783327__340.jpg" />
     
 

      </div>
      </div>
    )
}

export default AvatarIcon
