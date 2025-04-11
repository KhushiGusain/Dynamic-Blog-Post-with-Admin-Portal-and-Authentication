import connectDb from "@/config/db";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

//get all the blogs
export async function GET(){
    await connectDb();
    const blogs = await Blog.find().sort({createdAt: -1});
    return NextResponse.json(blogs);
}

//post a new blog
export async function POST(req){
    await connectDb();
    try{
      const body = await req.json();
      const blog = await Blog.create(body);
      return NextResponse.json(blog, {status: 200});
    }
    catch(err){
      console.log("Blog Creation error:", err);
      return NextResponse.json({err: "blog creation failed", message: err.message})
    }
}
