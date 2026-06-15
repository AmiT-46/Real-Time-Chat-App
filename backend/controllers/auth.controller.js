
const signup = async (req, res) => {
    try{
        const { fullName, userName, password, confirmPassword } = req.body;
        
        res.status(200).json({
            message : "signup route hit successfully",
            fullName,
            userName,
            password,
            confirmPassword
        })
    } catch(error){
        console.log("error in signup controller", error.message);
        res.status(500).json({error : "Internal Server Error"})
    }
}

const signin = async (req, res) => {

    const { userName, password } = req.body;

    try{
        res.status(200).json({
            message : "signin route hit successfully",
            userName,
            password,
        })
    }catch(error){
        console.log("error in signin controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

const logout = async (req, res) => {
    try{
        res.status(200).json({
            message : "logout route hit successfully"
        })
    }catch(error){
        console.log("error in logout controller", error.message);
        res.status(500).status({error : "Internal Server Error"})
    }
}


module.exports = {
    signup,
    signin,
    logout
}