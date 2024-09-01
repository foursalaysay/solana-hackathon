import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../../helpers/server-helper";
import prisma from "../../../../../prisma";


export const GET = async ({ params }: { params: { id: string } }) => {

  try {

    const { id } = params;
    await ConnectToDatabase();
    
    const donations = await prisma.donation.findMany();
    const participant = await prisma.participant.findFirst({
      where: { publicKey: id },
    });

    return NextResponse.json({ donations, participant}, { status: 200 });

    
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async () => {
  try {
    
    await ConnectToDatabase();
    
  } catch (error) {
    
  }
}



