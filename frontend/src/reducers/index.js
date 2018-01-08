import {combineReducers} from 'redux';
import { ADD_CATEGORY, ADD_POST,SET_CATEGORIES, SET_POSTS, GET_POST,GET_COMMENTS,ADD_COMMENT,UPDATE_COMMENT,UPDATE_POST,DELETE_POST,DELETE_COMMENT} from '../actions';

function categories(state = [], action){
  switch(action.type){
    case ADD_CATEGORY : 
      const {category} = action;
      return [
        ...state,
        category
      ];
    case SET_CATEGORIES : 
      const {categories} = action;
      return categories;
    default:
        return state;
  }
}

function comments(state = [], action){
  
  const {comments} = action;
  const{comment} = action;

  switch(action.type){
    case GET_COMMENTS:
      return comments
    case ADD_COMMENT:
      return [...state,
            comment]
    case UPDATE_COMMENT:
      let elementIndex = state.findIndex(c => c.id === comment.id);
      let newState = [...state];
      newState[elementIndex] = comment;
      return newState;
    case DELETE_COMMENT:
      return [...state.filter(c => c.id !== comment.id)];
    default:
      return state;
  }
}

function posts(state = [], action){
    const {post} = action;
    const {posts} = action;
    
    let {comment} = action;

    let elementIndex;
    let newState;
    switch(action.type){
      case ADD_POST : 
        return [
          ...state,
          post];
      case DELETE_COMMENT:
        elementIndex = state.findIndex(p => p.id === comment.parentId );
        let updateStateDel = [...state];
        updateStateDel[elementIndex].commentCount--;
        return updateStateDel;
      case ADD_COMMENT:
        elementIndex = state.findIndex(p => p.id === comment.parentId );
        let updateState = [...state];
        updateState[elementIndex].commentCount++;
      return updateState;
      case SET_POSTS :
        return posts;
      case UPDATE_POST:
        elementIndex = state.findIndex(p => p.id === post.id);
        newState = [...state];
        newState[elementIndex] = post;
        return newState;
      case DELETE_POST:
        newState = [...state];
        newState = newState.filter(p => p.id !== post);
        console.log(newState);
        return newState;
      default:
          return state;
    }
}

function post(state = {}, action){
  const {post} = action;
  let updatedPost;
  switch(action.type){
    case  ADD_COMMENT:
      updatedPost = {...state};
      updatedPost.commentCount++;
      return updatedPost;
    case  DELETE_COMMENT:
      updatedPost = {...state};
      updatedPost.commentCount--;
      return updatedPost;
    case GET_POST :
      return post;
    case UPDATE_POST: 
      return post;
    default:
      return state;
  }
}

  export default combineReducers({
    categories,
    posts,
    post,
    comments
  });