let sessionID;
let sessionName;


exports.setSessionData = (session, ID)=>{
    sessionName = session;
    sessionID = ID;
    console.log('Session data stored in sessionHandler class in config : ' + sessionName)
}

exports.getSessionName = ()=>{
    console.log('returning sessionName : ' + sessionName);
    return sessionName;
    
}

exports.getSessionID = ()=>{
    return sessionID;
}