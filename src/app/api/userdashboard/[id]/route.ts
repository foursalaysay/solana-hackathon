import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../../helpers/server-helper";
import prisma from "../../../../../prisma";

export const GET = async ({ params }: { params: { id: string } }) => {
  try {

    await ConnectToDatabase();
    const { id } = params;
    
    const donations = await prisma.donation.findMany();
    const participant = await prisma.participant.findUnique({
      where: { id: id },
    });

    return NextResponse.json({ donations, participant  }, { status: 200 });

    
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};



