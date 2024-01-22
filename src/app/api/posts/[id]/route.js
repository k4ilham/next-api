//import next request and response
import { NextResponse } from "next/server";

//import prisma client
import prisma from "../../../../../prisma/client";

export async function GET(request, { params }) {
  //get params id
  const id = parseInt(params.id);

  //get detail post
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (!post) {
    //return response JSON
    return NextResponse.json(
      {
        sucess: true,
        message: "Detail Data Post Not Found!",
        data: null,
      },
      {
        status: 404,
      }
    );
  }

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: "Detail Data Post",
      data: post,
    },
    {
      status: 200,
    }
  );
}

export async function PATCH(request, { params }) {
  //get params id
  const id = parseInt(params.id);

  //get request data
  const { title, content } = await request.json();

  //update data
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title: title,
      content: content,
      updatedAt: new Date(),
    },
  });

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: "Data Post Updated!",
      data: post,
    },
    {
      status: 200,
    }
  );
}

export async function DELETE(request, { params }) {
  //get params id
  const id = parseInt(params.id);

  //delete data
  await prisma.post.delete({
    where: {
      id,
    },
  });

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: "Data Post Deleted!",
    },
    {
      status: 200,
    }
  );
}