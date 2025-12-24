export const getAccessToken = (request) => {
    if(!request) return null;
    try 
    {
        const accessToken = request.cookies.get("accessToken")?.value || request.headers.get("authorization")?.split(" ")?.[1];
        return accessToken;
    } 
    catch(error) 
    {
        return null;
    }
};