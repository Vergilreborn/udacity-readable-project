import React, {Component} from 'react';
import Minus from 'react-icons/lib/fa/angle-down';
import Plus from 'react-icons/lib/fa/angle-up';
import FaClose from 'react-icons/lib/fa/close';
import FaEdit from 'react-icons/lib/fa/edit';
import {COMMENT,DOWNVOTE,UPVOTE,GetDateTimeString} from '../utils/constants';

class Comment extends Component{
  render()
  {
    let comment = this.props.data;
    let deleteComment = this.props.deleteComment;
    let updateVote = this.props.updateVote;
    let openModal = this.props.openModal;
    
    return (
    <div className="comment" key={comment.id}>
    <div><b>{comment.author}</b> on {GetDateTimeString(comment.timestamp)}</div>
    <div className="comment-body">{comment.body}</div>
    <div>Score: 
      <button className="vote-button" onClick={(e)=> updateVote(COMMENT,DOWNVOTE,comment.id)}>
        <Minus/>
      </button>
      <div className="vote-score">{comment.voteScore}</div> 
      <button className="vote-button" onClick={(e)=> updateVote(COMMENT,UPVOTE,comment.id)}>
        <Plus/>
      </button>
    </div>
    <button className="edit-button" onClick={(e)=> openModal(COMMENT,comment)}><FaEdit/>Edit</button>
    <button className="remove-button" onClick={(e) => deleteComment(comment.id)}><FaClose/>Remove</button>
  </div>
  )}
}

export default Comment;