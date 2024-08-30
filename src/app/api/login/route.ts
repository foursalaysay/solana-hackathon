'use server'

import { NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../helpers/server-helper";
import prisma from "../../../../prisma";

export const POST = async (req : Request) => {
    try {
        const { publicKey } = await req.json();
  
        if(!publicKey){
            return NextResponse.json({
                message : "Invalid Data"
            }, {status : 422})
        }
      await ConnectToDatabase();
  
      const participant = await prisma.participant.create({
          data : {
              publicKey : publicKey
          }
      });
      return NextResponse.json({participant}, {status: 200})
    } catch (error) {
      console.log(error)
  
      return NextResponse.json({
          message : "Server Error"
      }, {status : 500})
  }finally{
      await prisma.$disconnect();
  }
  }

  
export const GET = async (req : Request) => {

    try{
        await ConnectToDatabase();

        const { publicKey } = await req.json();

        const participant = await prisma.participant.findUnique({
            where: {
                publicKey: publicKey,
            },
        });

        return NextResponse.json({participant}, {status: 200})

    }catch (error) {
        console.log(error)
    
        return NextResponse.json({
            message : "Server Error"
        }, {status : 500})
    }
}