import axios from "axios";
import { backendUrl } from "../constants";
import { showSuccess, showError } from '../utils/toasterMessage';


// Create instance
const client = axios.create({
    baseURL: `${backendUrl}/api/v1`,
    withCredentials: true,
});

// Request interceptor
client.interceptors.request.use(async (request) => {
    return request;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor
client.interceptors.response.use((response) => {
    const { data, message, statusCode, success } = response.data;
    const headers = response.headers;
    return { data, message, statusCode, success, headers };    
}, (error) => {
    const data = error?.response?.data || null;
    const success = data?.success || false;
    const message = data?.message || error.message || "An unknown error occur";
    const statusCode = error?.response?.status || null;
    const stack = error?.stack || null;  
    return Promise.reject({ data, message, success, statusCode, stack });
});

// Blue Print For API Request Service Providers
class ApiRequest
{
    // Get request
    async get({ url, enableSuccessMessage = false, enableErrorMessage = true }) 
    {
        try 
        {
            const response = await client.get(url);
            if(enableSuccessMessage) showSuccess(response.message);
            return response;
        } 
        catch(error) 
        {
            if(enableErrorMessage) showError(error.message);
            throw error;
        }
    };

    // Post request
    async post({ url, payload, fileAttachment = false, enableSuccessMessage = true, enableErrorMessage = true })
    {
        try 
        {
            let options = {};
            if(fileAttachment) options = { headers: { "Content-Type": "multipart/form-data" } };
            const response = await client.post(url, payload, options);
            if(enableSuccessMessage) showSuccess(response.message);
            return response;
        } 
        catch(error) 
        {
            if(enableErrorMessage) showError(error.message);
            throw error;
        }
    }; 
    
    // Put request
    async put({ url, payload, fileAttachment = false, enableSuccessMessage = true, enableErrorMessage = true }) 
    {
        try 
        {
            let options = {};
            if(fileAttachment) options = { headers: { "Content-Type": "multipart/form-data" } };
            const response = await client.put(url, payload, options);
            if(enableSuccessMessage) showSuccess(response.message);
            return response;
        } 
        catch(error) 
        {
            if(enableErrorMessage) showError(error.message);
            throw error;
        }
    };
    
    // Patch request
    async patch({ url, payload, fileAttachment = false, enableSuccessMessage = true, enableErrorMessage = true }) 
    {
        try 
        {
            let options = {};
            if(fileAttachment) options = { headers: { "Content-Type": "multipart/form-data" } };
            const response = await client.patch(url, payload, options);
            if(enableSuccessMessage) showSuccess(response.message);
            return response;
        } 
        catch(error) 
        {
            if(enableErrorMessage) showError(error.message);
            throw error;
        }
    };
    
    // Delete request
    async delete({ url, enableSuccessMessage = true, enableErrorMessage = true })
    {
        try 
        {
            const response = await client.delete(url);
            if(enableSuccessMessage) showSuccess(response.message);
            return response;
        } 
        catch(error) 
        {
            if(enableErrorMessage) showError(error.message);
            throw error;
        }
    };
}

// Instance
const api = new ApiRequest();

export default api;