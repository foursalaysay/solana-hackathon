import { NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../helpers/server-helper";
import prisma from "../../../../prisma";


export const GET = async (req: Request) => { // Use req: Request as the parameter
    try {
      await ConnectToDatabase(); // Ensure your connection function is correct
  
      // Retrieve all donations from the database   
      const donations = await prisma.donation.findMany();
  
      return NextResponse.json({ donations }, { status: 200 });
    } catch (error) {
      console.error('Error fetching donations:', error);
  
      return NextResponse.json({
        message: 'Server Error',
      }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };