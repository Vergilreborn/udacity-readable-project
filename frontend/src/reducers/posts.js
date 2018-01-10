import { ADD_POST, SET_POSTS, ADD_COMMENT,UPDATE_POST,DELETE_POST,DELETE_COMMENT} from '../actions/types';

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

export default posts;