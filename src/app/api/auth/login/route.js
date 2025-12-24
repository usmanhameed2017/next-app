import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import { NextResponse } from "next/server";

export async function POST(request)
{
    const { username, password } = await request.json();
    if(username !== "usman@123") return NextResponse.json(new ApiError(400, "Invalid username"), { status:400 });
    if(password !== "GrayHat@123") return NextResponse.json(new ApiError(400, "Incorrect password"), { status:400 });
    
    const response = NextResponse.json(new ApiResponse(202, null, "Login successful"), { status:202 });
    response.cookies.set("accessToken", "123");
    return response;
}