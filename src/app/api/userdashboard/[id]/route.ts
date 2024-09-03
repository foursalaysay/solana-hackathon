import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../../helpers/server-helper";
import prisma from "../../../../../prisma";
import { usePublicKey } from "@/components/context/PublicKeyContext";


export const GET = async (req :Request , { params }: { params: { id: string } }) => {
  await ConnectToDatabase();
  try {
    const { id } = params;
   
    
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


export const POST = async (req : Request) => {
  try {

    const data = await req.json();

    const { donationId, participantId, publicKey, name, address, age, contactEmail, contactNumber, sampleDiseases} = data;

    const updatedDonation = await prisma.donation.update({
      where: {
        id: donationId, // The ID of the donation you want to update
      },
      data: {
        participants: {
          create: [
            {
              id : participantId,
              publicKey: publicKey,
              name: name,
              address: address,
              age : age,
              contactEmail : contactEmail,
              contactNumber : contactNumber,
              sampleDisease : sampleDiseases
            },
          ],
        },
      },
    });

    return NextResponse.json(updatedDonation, {
      status : 200
    })
  } catch (error) {
    console.log(error)
  }
}






