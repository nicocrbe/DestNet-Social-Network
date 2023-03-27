import React, { useEffect, useState } from "react";
import "./Post.css";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Collapse from '@mui/material/Collapse';
import Comment from "../../img/comment.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost, commentPost} from "../../api/PostsRequests";
import {useDispatch, useSelector } from "react-redux";
import CardContent from '@mui/material/CardContent';
import { Button, Typography } from "@mui/material";
import { useRef } from "react";
import { deletePost } from "../../actions/PostsAction";
import ShareModal from "../ShareModal/ShareModal";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [isEdit, setIsEdit] = useState(false)
  const [modalOpened,setModalOpened] = useState(false)
  const [expandedComments,setExpandedComments] = useState(false)
  const [comments,setComments] = useState(data?.comments)
  const [comment,setComment] = useState("")
  const commentRef = useRef()
  const dispatch = useDispatch()

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };

  const handleExpandComments = () => {
    setExpandedComments(!expandedComments)
  }

  const handleCommentChange = (e) => {
    e.preventDefault()
    setComment(e.target.value)
  }

  const handleSubmitComment = async() => {
    const finalComment = `${user?.username}: ${comment}`
    const newComments = await commentPost(finalComment, data?._id)
    setComments(newComments.data)
    setComment("")

    commentRef.current.scrollIntoView({behavior: "smooth"})
  }

  const handleEditPost = () => {
    setModalOpened(true)
    setIsEdit(true)
  }

  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img 
          src={Comment} 
          alt="" 
          style={{cursor: "pointer"}}
          onClick={handleExpandComments}/>
        {user?._id === data?.userId ? (
              <>
                <div onClick={handleEditPost} style={{cursor: "pointer"}}>
                  <ModeEditOutlineOutlinedIcon />
                </div>
                <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} isEdit={isEdit} post={data?._id} setIsEdit={setIsEdit} />
                <div onClick={()=> dispatch(deletePost(data?._id))} style={{cursor: "pointer"}}>
                  <DeleteOutlinedIcon />
                </div>
              </>
          ) : "" }  
      </div>
      <Collapse in={expandedComments} timeout="auto" unmountOnExit>
        <CardContent>
          {comments?.map((comment, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
                <strong>{`${comment.split(":")[0]}:`}</strong>
                {comment.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentRef} />
          {user?.username ? (
          <>
          <input className="commentInput"
            type="textarea"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Leave a comment"
            required
            />
          <button
            style={{margin: "10px"}}
            className="button ps-button"
            onClick={handleSubmitComment}
            >
            Comment
          </button>
          </>
          ) : ""}
          
        </CardContent>
      </Collapse>
    </div>
  );
};

export default Post;
