import Rect, { useEffect, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {Button,Input} from "reactstrap"
import instalogo from "./instagramlogo.png"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import InstagramEmbed from 'react-instagram-embed';

import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Post from "./Post";

import {auth, db} from "./firebase"
import { toast } from "react-toastify";
import ImageUpload from "./ImageUpload";
import AvatarIcon from "./AvatarIcon";


function getModalStyle() {
  const top = 50 
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function App() {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openImageUpload, setOpenImageUpload] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);
  const [username,setUsername] = useState("")
  const [email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

//SIGNUP CODE HERE//




const Signup = (event) => {
  event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
   
      .catch(function (error) {
           console.log(error);
           alert(error.message) 
        toast("Something Went Wrong!",{
            type:"error"
        })
            });
            setOpen(false);
}


const Signin = (event) =>{
  event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
   
      .catch(function (error) {
        console.log(error);
        alert(error.message)
        toast("Something Went Wrong!",{
            type:"error"
        })
            });
            setOpenSignin(false);
      
}

  return (
    <div className="App">



    <Modal
    open={open}
    onClose={() => setOpen(false)}>
    <div style={modalStyle} className={classes.paper}>
    <form className="signup_form">
      <center>
      <img src={instalogo}  atlt="Register image"/>
<Input type="text" placeholder="Enter UserName" valeue={email}onChange={(e) => setUsername(e.target.value)} required="required" />
<Input type="email" placeholder="Enter Email" valeue={email}onChange={(e) => setEmail(e.target.value)} required="required" />
<Input type="password" placeholder="Enter password" valeue={password}onChange={(e) => setPassword(e.target.value)} required="required" className="last_input"/>
<Button outline color="danger" type="submit" onClick={Signup}>SignIn</Button>
      </center>
      </form>
    </div>
  </Modal>
  {/*LOGIN HERE*/}
  <Modal
  open={openSignin}
  onClose={() => setOpenSignin(false)}>
  <div style={modalStyle} className={classes.paper}>
  <form className="signup_form">
    <center>
    <img src={instalogo}  atlt="Register image"/>
<Input type="email" placeholder="Enter Email" valeue={email}onChange={(e) => setEmail(e.target.value)} required="required" />
<Input type="password" placeholder="Enter password" valeue={password}onChange={(e) => setPassword(e.target.value)} required="required" className="last_input"/>
<Button outline color="danger" type="submit" onClick={Signin}>SignIn</Button>
    </center>
    </form>
  </div>
</Modal>

  <div className="app_header">
  <img src={instalogo} alt="instalogo" className="app_image" />
  <input type="text" className="inputforsearch" placeholder="Search Here ..." />

   
<div className="icon_flex">

<a href="#">  <HomeIcon /></a>
<a href="#"><SendIcon /></a>
<a href="#"><ExploreIcon /></a>
<a href="#"> <FavoriteBorderIcon  className="heart"/></a>
 
  </div>

  {user ? (
    <button type="submit"  className="logout" onClick={() => auth.signOut()}>LoGout</button>
  ) : (
    <div>
    <button type="submit" className="loginpop" onClick={() => setOpen(true)}>signup</button>/
    <button type="submit"  className="loginpop" onClick={() => setOpenSignin(true)}>sigin</button>
    </div>
  
    
  ) }
  </div>

{/*END NAVNBAR PART */}
{/*AVATAR ICON SLIDE */}

<AvatarIcon  />



{/*AVATAR ICON END*/}



<div className="post_all">
{posts.map(({ id, post }) => (
  <Post
    key={id}
    username={post.username}
    caption={post.caption}
    imageUrl={post.imageUrl}
    postId={id}
    user={user}
  />
))}
{user?.displayName ? (
  <ImageUpload username={user.displayName} />
) : (
  <h2>Sorry Need to login first to upload</h2>
)}
</div>

<InstagramEmbed
  url='https://www.instagram.com/p/COQioR5DYwN/?utm_source=ig_web_copy_link'
  clientAccessToken='123|456'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/>
 
    </div>
  );
}

export default App;
