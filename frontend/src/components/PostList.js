import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {GetDateTimeString} from './../utils/constants';
import FaMinusCircle from 'react-icons/lib/fa/minus-circle';
import FaSort from 'react-icons/lib/fa/sort';
import FaSortDesc from 'react-icons/lib/fa/sort-desc';
import FaSortAsc from 'react-icons/lib/fa/sort-asc';

class PostList extends Component{
  state = {
    sortType : null,
    asc : false,
    sortString : false
  }

  sort(event,type, isString = false){
    event.preventDefault();
    let {sortType,asc} = this.state;
    if(sortType === type){
      asc = !asc;
    }else{
      sortType = type;
      asc = false;
    }

    this.setState({sortType : sortType, asc: asc,sortString : isString});

  }

  sortRender(type){
    
    let {sortType,asc} = this.state;
    if(sortType === type){
      return asc ? <FaSortAsc/> : <FaSortDesc/>;
    }else{
      return <FaSort/>;
    }
  }

  render(){

    const {posts,setupPost,deletePost} = this.props;
    const {sortType,asc,sortString} = this.state;
    const visualPosts = posts.slice(0);
    if(sortType){
      visualPosts.sort((p1,p2) => sortString ? p2[sortType].localeCompare(p1[sortType]) :  p1[sortType] < p2[sortType] ? -1 : 1);
      if(!asc){
        visualPosts.reverse();
      }
    }
    
    return (     
       <div>
           <div>
            <div className="post-column-names">
              <div className="text"><a onClick={(e) => this.sort(e,'title',true)}>Title{this.sortRender('title')}</a></div>
              <div className="text"><a onClick={(e) => this.sort(e,'timestamp')}>Timestamp{this.sortRender('timestamp')}</a></div>
              <div className="count"><a onClick={(e) => this.sort(e,'voteScore')}>Rating{this.sortRender('voteScore')}</a></div>
              <div className="count"><a onClick={(e) => this.sort(e,'commentCount')}>Comments{this.sortRender('commentCount')}</a></div>
              <div></div>
            </div>
            {
              visualPosts.map((post) => 
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