import React, { Component } from 'react';
import Minus from 'react-icons/lib/fa/angle-down';
import Plus from 'react-icons/lib/fa/angle-up';
import FaClose from 'react-icons/lib/fa/close';
import FaEdit from 'react-icons/lib/fa/edit';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import randomString from 'randomstring';
import serializeForm from 'form-serialize';
import {POST,COMMENT,DOWNVOTE,UPVOTE,ADDCOMMENT,GetDateTimeString} from '../utils/constants';
import { bindCategories, getPostById,bindComments,voteUpdate,updatePostComment,addComment,deleteComment} from '../actions';
import Comment from './Comment';

import '../styles/post.css'

class Post extends Component{

  constructor(match){
    super();
  }

  state = {
    showModal : false,
    editType : '',
    editComment : null
  }

  postEdit = (e,originalObject,editType) => {
    e.preventDefault();
    const newValues = serializeForm(e.target,{hash: true});
    let merged = {...originalObject,...newValues};
    if(editType === ADDCOMMENT){
      merged.timestamp = Date.now();
      merged.id = randomString.generate(12);
      this.props.addComment(merged);
    }else
      this.props.editPostComment(editType,merged);
  }
  

  setupPost = (postId) => {
    this.props.getPost(postId);
    this.props.getComments(postId);
  }

  openModal = (editType,editComment = null) => {
    this.setState({comment: editComment});
    this.setState({editType:editType,showModal : true});
  }
  closeModal = () => {this.setState({showModal : false})}

  render(){

    let {id,title,body,author,category,timestamp,voteScore,commentCount} = this.props.post;
    let {comments} = this.props;
    let updateVote = this.props.updateVote;
    let postEdit = this.postEdit;
    let deleteComment = this.props.deleteComment;
    let {editType,showModal,comment} = this.state;
   
    if(!id)
      return (<div>Something bad happened</div>)

    return (
      <div>
        <div className="post-container">
          <div className="post-header">{title}</div>
          <div classNmae="post-meta">Posted by {author} on {GetDateTimeString(timestamp)}</div>
          <div className="post-body">
            {body}
          </div>
          <div>Category:{category}</div>
          <div className="post-details">
            
            <div>Vote Score:
              <button className="vote-button" onClick={(e) => updateVote(POST,DOWNVOTE,id)}>
                <Minus/>
              </button>
              <div className="vote-score">{voteScore}</div>
              <button className="vote-button" onClick={(e) => updateVote(POST,UPVOTE,id)}>
                <Plus/>
              </button>
            </div>
          </div>
          <div><button className="edit-button" onClick={(e) => this.openModal(POST)}><FaEdit/>Edit Post</button></div>
        </div>
        <div className="comments-container">
          {comments.length > 0 && comments.map((comment) =>
            <Comment openModal={this.openModal} deleteComment={deleteComment} updateVote={updateVote} data={comment}/>
          )}
          <div><button className="add-button" onClick={(e)=> this.openModal(ADDCOMMENT,{})}>Add Comment</button></div>
        </div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={showModal}
          onRequestClose={this.closeModal}
          contentLabel='Modal'
          ariaHideApp={false}
        >
          <div className="modal-container">
           
            <h2 className="modal-header"> {editType===POST ? 'Edit Post' : editType === COMMENT ?'Edit Comment' : "Add Comment"} <a className="modal-close" onClick={(e) => {this.closeModal(); return false;}}><FaClose/></a></h2>
         
              <form onSubmit={(e) => {postEdit(e,editType===POST? this.props.post : comment,editType); this.closeModal();}} className="update-content-form">
                
                { editType=== POST && (
                  <div className="update-details">
                    <div className="modal-input modal-row"><div>Subject:</div><div><input type="text" name="title" required defaultValue={title} placeholder="Title"/></div></div>
                    <div className="modal-input modal-row"><div>Content:</div><div><textarea required className="modal-body-textarea" name="body" defaultValue={body} placeholder="Body"></textarea></div></div>
                    <div className="modal-input modal-row"><div>Author:</div><div>{author}</div></div>
                    <div className="modal-input modal-row"><div>Category:</div><div>{category}</div></div>
                  </div>)}
                  {editType === COMMENT && (
                    <div className="update-details">
                      <div className="modal-input modal-row"><div>Comment:</div><textarea className="modal-body-textarea" name="body" defaultValue={comment.body} placeholder="Body"></textarea></div>
                    </div>
                  )}

                  {editType === ADDCOMMENT && (
                    <div className="add-comment">
                      <div className="modal-input modal-row"><div>Comment:</div><textarea className="modal-body-textarea" name="body" placeholder="Comment"></textarea></div>
                      <div className="modal-input modal-row"><div>Author</div><input type="text" name="author" placeholder="Author"/></div>
                      <input type="hidden" name="parentId" value={id}/>
                    </div>
                  )}

                  
                <div className="modal-row"><button className="modal-button" >Update</button></div>
                              
            </form>
          
          </div>
        </Modal>
      </div>
    )
  }
}



function mapStateToProps ({ categories, posts,post,comments}) {
  
    return {
        categories,
        post,
        comments,
        posts
    }
  };
  
  function mapDispatchToProps (dispatch) {
    return {
      getCategories: () => dispatch(bindCategories()),
      getPost: (id) => dispatch(getPostById(id)),
      getComments: (parentId) => dispatch(bindComments(parentId)),
      updateVote: (elementType,voteType,commentId) => dispatch(voteUpdate(elementType,voteType,commentId)),
      editPostComment: (editType,newContent) => dispatch(updatePostComment(editType,newContent)),
      addComment : (newComment) => dispatch(addComment(newComment)),
      deleteComment : (comment) => dispatch(deleteComment(comment)),
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
  

// export default Post;