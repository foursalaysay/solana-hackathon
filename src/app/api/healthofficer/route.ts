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
        return NextResponse.json({donation}, {status: 201})
    } catch (error) {
        console.log(error)

        return NextResponse.json({
            message : "Server Error"
        }, {status : 500})
    }finally{
        await prisma.$disconnect();
    }
}