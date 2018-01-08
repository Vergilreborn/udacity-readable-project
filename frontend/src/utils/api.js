const key = 'theMagicalEncodedToken';
const auth_header = { headers: { 'Authorization': key }};
const fetchUrl = 'http://localhost:3001';

// GET calls
export function fetchPosts(path){
  let category = path ? `/${path}` : '';
  console.log('fetch',path);
  return fetch(`${fetchUrl}${category}/posts`,auth_header)
          .then((res) => res.json());
}

export function fetchCategories(){
  return fetch(`${fetchUrl}/categories`,auth_header)
          .then((res) => res.json())
          .then(({categories}) => categories);
}

export function fetchPost(postId){
  return fetch(`${fetchUrl}/posts/${postId}`,auth_header)
          .then((res)=> res.json());
}

export function fetchComments(postId){
  return fetch(`${fetchUrl}/posts/${postId}/comments`,auth_header)
          .then((res)=> res.json());
}

// POST calls
export function postPost(body){
  return fetch(`${fetchUrl}/posts`,{
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Authorization' : key,
               'Content-Type' : 'application/json'}
  }).then((res) => res.json());
}

export function postComment(body){
  return fetch(`${fetchUrl}/comments`,{
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Authorization' : key,
               'Content-Type' : 'application/json'}
  }).then((res) => res.json());
}

export function putCommentVote(option,commentId){
  return fetch(`${fetchUrl}/comments/${commentId}`,{
    method: 'POST',
    body: JSON.stringify({option}),
    headers: { 'Authorization' : key,
                'Content-Type' : 'application/json'}
  }).then((res) => res.json());
}


export function putPostVote(option,postId){
  return fetch(`${fetchUrl}/posts/${postId}`,{
    method: 'POST',
    body: JSON.stringify({option}),
    headers: { 'Authorization' : key,
                'Content-Type' : 'application/json'}
  }).then((res) => res.json());
  
}

//PUT calls
export function putPost(id,option){
  return fetch(`${fetchUrl}/posts/${id}`,{
    method: 'PUT',
    body: JSON.stringify(option),
    headers: { 'Authorization' : key,
                'Content-Type' : 'application/json'}
  }).then((res) => res.json());
}

export function putComment(id,option){
  return fetch(`${fetchUrl}/comments/${id}`,{
    method: 'PUT',
    body: JSON.stringify(option),
    headers: { 'Authorization' : key,
                'Content-Type' : 'application/json'}
  }).then((res) => res.json());
}

//DELETE calls
export function deletePost(postId){
  return fetch(`${fetchUrl}/posts/${postId}`,{
      method: 'DELETE',
      headers: { 'Authorization' : key}
  }).then((res) => res.json());
}

export function deleteComment(commentId){
  return fetch(`${fetchUrl}/comments/${commentId}`,{
      method: 'DELETE',
      headers: { 'Authorization' : key}
  }).then((res) => res.json());
}