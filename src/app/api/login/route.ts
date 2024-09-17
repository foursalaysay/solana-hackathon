

import { NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../helpers/server-helper";
import prisma from "../../../../prisma";


export const POST = async (req: Request) => {
    await ConnectToDatabase();
  
    try {
      const { publicKey } = await req.json(); // Ensure that the request contains valid JSON
  
      // Check if a participant with the same publicKey exists
      const existingParticipant = await prisma.participant.findUnique({
        where: { publicKey },
      });
  
      if (existingParticipant) {
        // If a participant exists, return a 409 Conflict status
        return NextResponse.json(
          { message: 'Participant with this publicKey already exists.' },
          { status: 409 }
        );
      }
  
      // Create a new participant if no existing one is found
      const participant = await prisma.participant.create({
        data: {
          publicKey,
        },
      });
  
      return NextResponse.json(
        { message: 'Participant added successfully', participant },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error saving participant:', error);
  
      // Return an error message with a 500 status
      return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };

  
export const GET = async (req : Request) => {

    try{
        await ConnectToDatabase();

        const url = new URL(req.url);
        const publicKey = url.searchParams.get("publicKey");

        if (!publicKey) {
            return NextResponse.json({
                message: "Invalid or missing publicKey"
            }, { status: 422 });
        }

        const participant = await prisma.participant.findUnique({
            where: {
                publicKey: publicKey,
            },
        });

        return NextResponse.json({participant}, {status: 200})

    }catch (error) {
        console.log(error)
    
        return NextResponse.json({
            message : "Server Error : GET METHOD"
        }, {status : 500})
    }
}