import jwt from 'jsonwebtoken';
const { ACCESS_TOKEN_SECRET:secret, ACCESS_TOKEN_EXPIRY:expiry } = process.env;

// Generate access token
export const generateAccessToken = (payload) => {
    if(!payload) return null;
    try 
    {
        const accessToken = jwt.sign({
            _id: payload?._id,
            username: payload?.username
        }, secret, { expiresIn: expiry });
        return accessToken;
    }
    catch(error) 
    {
        console.log(`Failed to generate access token ${error.message}`);
        return null;
    }
};

// Verify access token
export const verifyAccessToken = (accessToken) => {
    if(!accessToken) return null;
    try 
    {
        return jwt.verify(accessToken, secret);
    }
    catch(error) 
    {
        console.log(`Failed to verify access token ${error.message}`);
        return false;
    }
};