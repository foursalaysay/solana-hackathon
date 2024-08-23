import { NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../helpers/server-helper";
import prisma from "../../../../prisma";


export const POST = async (req : Request) => {
    try {
        const { address, donationDate, totalParticipants, bountyAmount } = await req.json();

        if(!address || !donationDate || !totalParticipants || !bountyAmount ){
            return NextResponse.json({
                message : "Invalid Data"
            }, {status : 422})
        }

        await ConnectToDatabase();

        const donation = await prisma.donation.create({
            data : {
                address : address,
                donationDate : donationDate,
                totalParticipants : totalParticipants,
                bountyAmount : bountyAmount
            }
        });
        return NextResponse.json({donation}, {status: 200})
    } catch (error) {
        console.log(error)

        return NextResponse.json({
            message : "Server Error"
        }, {status : 500})
    }finally{
        await prisma.$disconnect();
    }
}


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