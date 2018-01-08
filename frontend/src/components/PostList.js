import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {GetDateTimeString} from './../utils/constants';
import FaMinusCircle from 'react-icons/lib/fa/minus-circle';

class PostList extends Component{
  state = {

  }

  render(){

    const {posts,setupPost,deletePost} = this.props;
   
    return (     
       <div>
           <div>
            <div className="post-column-names">
              <div className="text">Title</div>
              <div className="text">Timestamp</div>
              <div className="count">Rating</div>
              <div className="count">Comments</div>
              <div></div>
            </div>
            {
              posts.map((post) => 
                <div key={post.id} className="post">
                  <div className="text"><NavLink to={`/${post.category}/${post.id}`} onClick={()=>setupPost(post.id)}>{post.title}</NavLink></div>
                  <div className="text">{GetDateTimeString(post.timestamp)}</div>
                  <div className="count">{post.voteScore}</div>
                  <div className="count">{post.commentCount}</div>
                  <div><button className="delete-button" title="Delete Post" onClick={() => deletePost(post.id)}><FaMinusCircle/></button></div>
                </div>
              )
            }
          </div> 
        </div>);
  }
}

export default PostList;