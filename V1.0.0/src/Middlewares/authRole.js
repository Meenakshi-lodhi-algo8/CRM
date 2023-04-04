const authRole = (role) => {
    return (req,res,next) => {
        if(req.user.role !== role){
            res.status(400).json({message:`You are not permitted to access this page`})
        }
        next();
    }
}

module.exports = { authRole }