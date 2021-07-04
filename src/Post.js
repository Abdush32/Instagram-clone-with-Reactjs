import React, { useEffect, useState } from 'react'
import "./post.css";
import firebase from "firebase"
import {auth, db} from "./firebase"
import SendIcon from '@material-ui/icons/Send';
import {Card, CardImg, CardText, CardBody,CardTitle,} from 'reactstrap';
  import { Avatar, } from '@material-ui/core';
  import ClearAllIcon from '@material-ui/icons/ClearAll';
  import {Button,Input} from "reactstrap"
  import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
  import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
  import TelegramIcon from '@material-ui/icons/Telegram';
  import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';




const Post = ({ postId, username, caption, imageUrl, user}) => {

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            }))
          );
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);
  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  const deletePost = () => {
    db.collection("posts").doc(postId).delete();
  };
    return (
        <div className="post">
        <Card>
        <div className="post_header">
        <Avatar alt="Abdush"  className="post_avatar" src="/static/images/avatar/1.jpg" />

        <CardTitle tag="h5">{username}</CardTitle>
 
        {username === user?.displayName ? (
          <h5 className="post_deletePost" onClick={deletePost} type="submit">
           x
          </h5>
        ) : (
          <div></div>
        )}
        </div>
        <CardImg top width="100%" src={imageUrl} alt="Card image cap" />
        <CardBody>
        
<div className="insta_icons">
        <div className="icons_box">
        <FavoriteBorderIcon />
        <ChatBubbleOutlineIcon />
        <TelegramIcon />
        </div>
        <div className="second_icons">
        <TurnedInNotIcon />
      
        </div>
        </div>
        <center>  <CardText className="caption_text"><strong>Caption:- {username}:</strong>{caption}</CardText></center>

          </CardBody>

<div className="post_comment">

{
  comments.map(({comment}) => (
  
    <p>
  <b>{comment.username}:</b>{comment.text}

    </p>
  ))
}

</div>
{user && (
  <form className="postcomment_box">
  <Input type="text" placeholder="Comment Here..." className="post_input" value={comment} onChange={e => setComment(e.target.value)} />
  <button  type="submit" disabled={!comment} className="post_button"onClick={postComment}>send</button>
  </form>
)}

        
      </Card>
        </div>
    )
}

export default Post
