import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export const GET = async () => {
    
    try {
        const getDonations = await prisma.donation.findMany();
        return NextResponse.json({getDonations}, {status: 200})
    } catch (error) {
        console.error('Error fetching donations:', error);
    }
}