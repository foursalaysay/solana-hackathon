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
                bountyAmount : bountyAmount,
                status : "Upcoming"
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

export const GET = async () => {
    await ConnectToDatabase();
    try {
        const donations = await prisma.donation.findMany();
        console.log('naay sulod')
        return NextResponse.json(donations, { status: 200 });
    } catch (error) {
        console.error('Error fetching donations:', error);
        return NextResponse.json({ message: 'Error fetching donations' }, { status: 500 });
    }
};


