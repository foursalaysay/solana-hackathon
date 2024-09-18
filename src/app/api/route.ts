
import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../helpers/server-helper"; 
import prisma from "../../../prisma";

export async function POST(req: NextRequest) {
    try {
      const data = await req.json(); // Parse the incoming JSON data
      const { userType } = data; // Only save userType
  
      // Create a new Participant in the database with only the userType field
      const newParticipant = await prisma.participant.create({
        data: {
          userType : userType,
        },
      });
  
      return NextResponse.json({ message: 'Participant created successfully', participant: newParticipant });
    } catch (error) {
      console.error('Error creating participant:', error);
      return NextResponse.json({ error: 'Failed to create participant' }, { status: 500 });
    }
  }