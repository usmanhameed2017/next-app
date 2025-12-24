import { connectDB } from "@/database/connection";
import Product from "@/models/products";
import ApiResponse from "@/utils/ApiResponse";
import { NextResponse } from "next/server";

export async function GET(request) 
{
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const query = search
        ? { name: { $regex: search, $options: "i" } }
        : {};

    const products = await Product.paginate(query, {
        page,
        limit,
        lean: true,
        sort: { _id: -1 }
    });

    return NextResponse.json(new ApiResponse(200, products, "Products fetched"), { status:200 });
}