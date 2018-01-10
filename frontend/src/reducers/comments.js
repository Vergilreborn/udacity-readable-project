import { GET_COMMENTS,ADD_COMMENT,UPDATE_COMMENT,DELETE_COMMENT} from '../actions/types';


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

export default comments;