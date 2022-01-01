const SessionData = (input) => {
  if (input === null || input === undefined) return null;
  return { 
    user_id: input.user_id, 
    username: input.username, 
    avatar_hash: input.avatar_hash
  }
};
  
export default SessionData;