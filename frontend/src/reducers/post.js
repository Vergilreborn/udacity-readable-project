import { GET_POST,ADD_COMMENT,UPDATE_POST,DELETE_COMMENT,DELETE_POST} from '../actions/types';

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
    case DELETE_POST:
      return {};
    default:
      return state;
  }
}


export default post;