import ApiError from "@/utils/ApiError";
import { getAccessToken } from "@/utils/getAccessToken";
import { NextResponse } from "next/server";
import { verifyAccessToken } from "./utils/accessToken";

export function proxy(request)
{
    // Get pathname
    const pathname = request.nextUrl.pathname;

    // Protected paths
    const protectedRoutes = ["/api/users", "/api/products"];
    const protectedPages = ["/users", "/products"];

    // Protect API Routes
    if(protectedRoutes.some(route => pathname?.startsWith(route)))
    {
        // Get access token and verify
        const accessToken = getAccessToken(request);
        const user = verifyAccessToken(accessToken);
        if(!user) return NextResponse.json(new ApiError(401, "Unauthorized"), { status:401 });       
    }

    // Protect Pages
    if(protectedPages.some(page => pathname?.startsWith(page)))
    {
        // Get access token and verify
        const accessToken = getAccessToken(request);
        const user = verifyAccessToken(accessToken);
        if(!user) return NextResponse.redirect(new URL("/", request.url));       
    }

    // Allow access
    return NextResponse.next();
}

export const config = {
    matcher:[
        "/api/:path*",
        "/users/:path*",
        "/products/:path*"
    ]
};