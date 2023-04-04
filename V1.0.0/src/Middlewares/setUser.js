const setUser = async (req,res,next) => {
    const userId = req.body.userId;
    if(userId){
        req.user = Users.findById(userId);
    }
    next();
}


