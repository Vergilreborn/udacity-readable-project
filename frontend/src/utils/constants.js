export const POST = 'post';
export const COMMENT = 'comment';
export const DOWNVOTE = 'downVote';
export const UPVOTE = 'upVote';
export const ADDCOMMENT = 'newComment';
export const DATETIMECONFIG =  {  
  weekday: "long", year: "numeric", month: "short",  
  day: "numeric", hour: "2-digit", minute: "2-digit"  
};  

export const GetDateTimeString = (timeStamp) => (  new Date(timeStamp).toLocaleTimeString("en-us", DATETIMECONFIG));