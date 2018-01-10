import { ADD_CATEGORY, SET_CATEGORIES} from '../actions/types';


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

export default categories;