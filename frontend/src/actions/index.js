import * as API from '../utils/api';
import {POST} from '../utils/constants';
import * as TYPES from './types';

const setCategories = categories => ({
  type: TYPES.SET_CATEGORIES,
  categories
});

const setPosts = posts =>({
  type: TYPES.SET_POSTS,
  posts
});

const getPost = post => ({
  type: TYPES.GET_POST,
  post
});

const createPost = (post) =>({
    type: TYPES.ADD_POST,
    post
});

const getComments = (comments) =>({
    type: TYPES.GET_COMMENTS,
    comments
});

const updateComment = (comment) => ({
  type: TYPES.UPDATE_COMMENT,
  comment
})

const updatePost = (post) => ({
  type: TYPES.UPDATE_POST,
  post
})

const setComment = (comment) => ({
  type: TYPES.ADD_COMMENT,
  comment
});

const removeComment = (comment) => ({
  type: TYPES.DELETE_COMMENT,
  comment
});

const removePost = (post) => ({
  type: TYPES.DELETE_POST,
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
    type: TYPES.ADD_CATEGORY,
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