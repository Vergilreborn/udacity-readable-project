import * as API from '../utils/api';
import {POST} from '../utils/constants';

export const SET_CATEGORIES = 'GET_CATEGORIES';
export const SET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const GET_COMMENTS = 'GET_COMMENTS'

export const ADD_POST = 'ADD_POST';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_COMMENT = 'ADD_COMMENT';

export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const UPDATE_POST ='UPDATE_POST';

export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';

const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
});

const setPosts = posts =>({
  type: SET_POSTS,
  posts
});

const getPost = post => ({
  type: GET_POST,
  post
});

const createPost = (post) =>({
    type:ADD_POST,
    post
});

const getComments = (comments) =>({
    type: GET_COMMENTS,
    comments
});

const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment
})

const updatePost = (post) => ({
  type: UPDATE_POST,
  post
})

const setComment = (comment) => ({
  type: ADD_COMMENT,
  comment
});

const removeComment = (comment) => ({
  type: DELETE_COMMENT,
  comment
});

const removePost = (post) => ({
  type: DELETE_POST,
  post
})

export const addComment = (newComment) => dispatch => (
  API.postComment(newComment).then((comment) => dispatch(setComment(comment)))
);

export const voteUpdate = (voteElement,voteType,id) => dispatch => (
  voteElement === POST? 
    API.putPostVote(voteType,id).then((post) => dispatch(updatePost(post)))  :
    API.putCommentVote(voteType,id).then((comment) => dispatch(updateComment(comment)))
);

export const updatePostComment = (elementType, elementContent) => dispatch => (
  elementType === POST ? 
    API.putPost(elementContent.id,elementContent).then((post)=>dispatch(updatePost(post))):
    API.putComment(elementContent.id,elementContent).then((comment) => dispatch(updateComment(comment)))
);

export const bindCategories = () => dispatch => (
  API.fetchCategories().then(categories => dispatch(setCategories(categories)))
);

export const bindPosts = (category) => dispatch =>(
  API.fetchPosts(category).then(posts => dispatch(setPosts(posts)))
);

export const getPostById = (postId) => dispatch =>(
  API.fetchPost(postId).then(post => dispatch(getPost(post)))
);

export const bindComments = (parentId) => dispatch =>(
  API.fetchComments(parentId).then(comments => dispatch(getComments(comments)))
);

export function addCategory({name,path}){
  return {
    type: ADD_CATEGORY,
    name,
    path
  };
}

export const addPost = (postobj) => dispatch =>(
  API.postPost(postobj).then((newPostObj)=>dispatch(createPost(newPostObj)))
);

export const deletePost = (postobj) => dispatch => (
  API.deletePost(postobj).then((post) => dispatch(removePost(postobj)))
);

export const deleteComment = (commentobj) => dispatch => (
  API.deleteComment(commentobj).then((comment) => dispatch(removeComment(comment)))
);