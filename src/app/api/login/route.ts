

import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../helpers/server-helper";
import prisma from "../../../../prisma";

export const POST = async (req: Request) => {
  try {

    const { publicKey, userType } = await req.json(); // Extract userId and publicKey from request

    // Check if the participant exists
    const existingParticipant = await prisma.participant.findUnique({
      where: { publicKey }, // Search by publicKey
    });

    // If the participant exists, update it
    if (!existingParticipant) {
      const saveParticipant = await prisma.participant.create({
        data: { 
          publicKey : publicKey,
          userType : userType
         },    // Update the publicKey field
      });

      return NextResponse.json(
        { message: 'Participant updated successfully', participant: saveParticipant },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Participant not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error saving participant:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma
  }
};


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const publicKey = searchParams.get('publicKey');

  // Check if `publicKey` was provided in the query params
  if (!publicKey) {
    return NextResponse.json({ message: 'Public key is required' }, { status: 400 });
  }

  try {
    // Fetch the participant from the database using Prisma and the provided publicKey
    const participant = await prisma.participant.findUnique({
      where: { publicKey },
    });

    // If no participant is found, return a 404 error
    if (!participant) {
      return NextResponse.json({ message: 'Participant not found' }, { status: 404 });
    }

    // Return the participant data as a JSON response
    return NextResponse.json({ message: 'Participant found', participant }, { status: 200 });
  } catch (error) {
    console.error('Error fetching participant:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}