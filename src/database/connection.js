import { connect } from 'mongoose';

export const connectDB = async () => {
    try 
    {
        const response = await connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
        console.log(`Database connected to ${response.connection.host}`);
    } 
    catch(error) 
    {
        console.log(`Failed to connect with database: ${error.message}`);
        process.exit(1);
    }
};