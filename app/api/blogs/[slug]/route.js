import connectDb from "@/config/db";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    await connectDb();
    const {slug} = params;
    const blog = await Blog.findOne({slug});
    if(!blog){
        return NextResponse.json({ error: "not found" }, { status: 404 }); // ✅

    }
    return NextResponse.json(blog);
}

export async function PUT(req, {params}){
    await connectDb();
    const {slug} = await params;
    const body = await req.json();
    const updatedBlog = await Blog.findOneAndUpdate({slug}, body, {new: true})
    return NextResponse.json(updatedBlog)
}

export async function DELETE(req, {params}){
    await connectDb();
    const {slug} = await params;
    await Blog.findOneAndDelete({slug})
    return NextResponse.json({message: "Blog deleted successfully!"})
}