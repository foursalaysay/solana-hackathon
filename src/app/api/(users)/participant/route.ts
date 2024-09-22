
import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../../helpers/server-helper";
import prisma from "../../../../../prisma";


export async function POST(req: NextRequest) {
  try {
    // Parse the incoming JSON request body
    const data = await req.json();
    const { userType } = data; // Extract userType from the request body

    // Ensure userType is provided (optional validation)
    if (!userType) {
      return NextResponse.json({ error: 'userType is required' }, { status: 400 });
    }

    // Create a new Participant with only the userType field
    const newParticipant = await prisma.participant.create({
      data: {
        userType,
      },
    });

    // Return the newly created participant in the response
    return NextResponse.json({
      message: 'Participant created successfully',
      participant: newParticipant,
    });
  } catch (error) {
    console.error('Error creating participant:', error);
    // Return a 500 error if something goes wrong
    return NextResponse.json(
      { error: 'Failed to create participant' },
      { status: 500 }
    );
  }
}