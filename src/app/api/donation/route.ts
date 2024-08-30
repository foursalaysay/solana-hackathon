import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export const GET = async () => {
  
  try {
    const donations = await prisma.donation.findMany();

      return NextResponse.json({ donations }, { status: 200 });
  } catch (error) {
    console.error('Error fetching donations:', error);
    
    // Return a server error response
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
};
