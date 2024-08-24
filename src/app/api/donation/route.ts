import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../helpers/server-helper";
import prisma from "../../../../prisma";

export const GET = async () => {
  try {

    await ConnectToDatabase();
    
    const donations = await prisma.donation.findMany();
    return NextResponse.json({ donations }, { status: 200 });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};


// export const GET = async (req: Request) => {
//   try {
//     await ConnectToDatabase();

//     // Retrieve all donations from the database   
//     const donations = await prisma.donation.findMany();

//     return NextResponse.json({ donations }, { status: 200 });

//   } catch (error) {
//     console.error('Error fetching donations:', error);
//     return NextResponse.json({ message: 'Server Error' }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// };

