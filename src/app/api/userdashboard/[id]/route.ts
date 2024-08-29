import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../../helpers/server-helper";
import prisma from "../../../../../prisma";
import { usePublicKey } from "@/components/context/PublicKeyContext";

export const GET = async (publicKey : string) => {

  try {

    await ConnectToDatabase();
    
    
    const donations = await prisma.donation.findMany();
    const participant = await prisma.participant.findFirst({
      where: { publicKey: publicKey },
    });

    return NextResponse.json({ donations, participant  }, { status: 200 });

    
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};



