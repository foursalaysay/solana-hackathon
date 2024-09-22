

import { NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../helpers/server-helper";
import prisma from "../../../../prisma";

export const POST = async (req: Request) => {
  try {
    await ConnectToDatabase(); // Include this only if Prisma doesn't handle the connection
    
    const { publicKey, userId } = await req.json(); // Ensure that the request contains valid JSON
    
    // Check if a participant with the same publicKey exists
    const existingParticipant = await prisma.participant.findUnique({
      where: { publicKey },
    });

    // If the participant doesn't exist, update the participant
    if (!existingParticipant) {
      const participant = await prisma.participant.update({
        where: { id : userId }, // Assuming `id` is the identifier for the participant
        data: { publicKey }, // Update the publicKey field (add more fields if needed)
      });

      return NextResponse.json(
        { message: 'Participant updated successfully', participant },
        { status: 200 }
      );
    }

    // Create a new participant if no existing one is found
    const newParticipant = await prisma.participant.create({
      data: { publicKey },
    });

    return NextResponse.json(
      { message: 'New participant created successfully', newParticipant },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving participant:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Always disconnect Prisma to prevent connection leaks
  }
};
  
export const GET = async (req : Request) => {

    try{
        await ConnectToDatabase();

        const url = new URL(req.url);
        const userId = url.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({
                message: "Invalid or missing publicKey"
            }, { status: 422 });
        }

        const participant = await prisma.participant.findUnique({
            where: {
              id : userId
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