import React, { Component } from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import '../styles/app.css';
import FaPlusSquareO from 'react-icons/lib/fa/plus-square-o';
import FaAngleDoubleLeft from 'react-icons/lib/fa/angle-double-left'
import FaClose from 'react-icons/lib/fa/close'
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Post from './Post'
import { addCategory,addPost,bindCategories, bindPosts, getPostById,bindComments,voteUpdate,updatePostComment,addComment,deleteComment,deletePost} from '../actions';
import randomString from 'randomstring';
import serializeForm from 'form-serialize';
import PostList from './PostList';
import CategoryList from './CategoryList';

class App extends Component {
  state = {
    postModalOpen : false,
    initialSetupReady: false
  }

  componentDidMount(){
     this.initialSetup();  
  }

  closePostModal = () => { this.setState({postModalOpen:false})}
  openPostModal = () => { this.setState({postModalOpen:true})}

  initialSetup(){
    
    if(!this.state.initialSetupReady){
     this.props.getCategories();
     this.props.getPosts();     
    }
  }

  changeCategory = (path) =>{
    this.props.getPosts(path);
  }

  setupPost = (postId) => {
    this.props.getPost(postId);
    this.props.getComments(postId);
  }

  createPost = (e) =>{
    e.preventDefault();
    const values = serializeForm(e.target,{hash :true});
    values.id = randomString.generate(12);
    values.timestamp = Date.now();
    this.props.addPost(values);
    this.closePostModal();
  }

  updateVote = (elementType,voteType,commentId) =>{
    
    this.props.updateVote(elementType,voteType,commentId);
  }

  render() {

    let {categories,posts} = this.props;
    let {postModalOpen} = this.state;
 
    return (
      <div className="container">
        <div className="nav">
         
         <div><h1 className='header'>Readable Posts</h1></div>
          <div className="add-button-container">
            <Switch>
              <Route path="/:category/:id" render={({history}) =>
                (   <button className="add-button" onClick={() => history.push('/') } ><div className="button-icon"><FaAngleDoubleLeft/></div><div>Return</div></button>)  
              }/>
              <Route path="/" render={({history}) =>
                (   <button className="add-button" onClick={() => this.openPostModal()}><div className="button-icon"><FaPlusSquareO/></div><div>Add Post</div></button>)
              }/>
            </Switch> 
          </div>
        </div>
        <Switch>
          <Route path="/:category/:id" component={Post}/>
          <Route path="/" render={({history}) => (
            <div className="content-body">
            <CategoryList categories={categories} changeCategory={this.changeCategory}/>
            <PostList posts={posts} setupPost={this.setupPost} history={history} deletePost={this.props.deletePost}/>
            </div>
          )}/>
        </Switch>
          <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={postModalOpen}
          onRequestClose={this.closePostModal}
          contentLabel='Modal'
          ariaHideApp={false}>
          <div className="modal-container">
            <h2 className="modal-header">New Post <a className="modal-close" onClick={(e) => {this.closePostModal(); return false;}}><FaClose/></a></h2>
            <form onSubmit={this.createPost}>
              <div className="create-post-details">
                <div className="modal-input modal-row"><div>Title:</div><div><input type="text" name="title" placeholder="Title"/></div></div>
                <div className="modal-input modal-row"><div>Body:</div><div><textarea type="text" className="modal-body-textarea" name="body" placeholder="Body"/></div></div>
                <div className="modal-input modal-row"><div>Author:</div><div><input type="text" name="author" placeholder="Author"/></div></div>
                <div className="modal-input modal-row"><div>Category:</div><div> <select name="category" required>
                        {this.props.categories.map((category) => (
                          <option key={category.path} value={category.path}>{category.name}</option>
                        ))}
                        </select></div></div>
                <div className="modal-row"><button className="modal-button">Create</button></div>
              </div>
            </form>
          </div>
        </Modal>

      </div>
    );
  }
}

function mapStateToProps ({ categories, posts,post,comments}) {

  return {
      categories,
      posts,
      post,
      comments
  }
};

function mapDispatchToProps (dispatch) {
  return {
    addCategory: (category) => dispatch(addCategory(category)),
    addPost: (post) => dispatch(addPost(post)),
    getCategories: () => dispatch(bindCategories()),
    getPosts: (path) => dispatch(bindPosts(path)),
    getPost: (id) => dispatch(getPostById(id)),
    getComments: (parentId) => dispatch(bindComments(parentId)),
    updateVote: (elementType,voteType,commentId) => dispatch(voteUpdate(elementType,voteType,commentId)),
    editPostComment: (editType,newContent) => dispatch(updatePostComment(editType,newContent)),
    addComment : (newComment) => dispatch(addComment(newComment)),
    deleteComment : (comment) => dispatch(deleteComment(comment)),
    deletePost : (post) => dispatch(deletePost(post))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
