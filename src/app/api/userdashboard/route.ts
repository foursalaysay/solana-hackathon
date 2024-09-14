import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../helpers/server-helper";
import prisma from "../../../../prisma";
import { ConnectionContext } from "@solana/wallet-adapter-react";



// Handle GET request
export async function GET(req: NextRequest) {
  await ConnectToDatabase();

  try {
    const publicKey = req.nextUrl.searchParams.get('publicKey');
    
    if (!publicKey) {
      return NextResponse.json({ message: 'Public Key is required' }, { status: 400 });
    }

    const donations = await prisma.donation.findMany();
    return NextResponse.json({ donations }, { status: 200 });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}



// export const GET = async (request: NextRequest) => {
  
//   try {

//     await ConnectToDatabase();
//         const participant = await prisma.participant.findFirst({
//             where : {
//                 publicKey : id
//             }
//         })
//     return NextResponse.json({ participant }, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching donations:', error);
//     return NextResponse.json({ message: 'Server Error' }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// };


export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    console.log('Request Data:', data); // Debug incoming data

    const { publicKey, donationId } = data;

    // Validate required fields
    if (!publicKey) {
      console.log('Missing Public Key');
      return NextResponse.json({
        message: "Invalid Data: Missing publicKey",
      }, { status: 422 });
    }

    if (!donationId) {
      console.log('Missing Donation ID');
      return NextResponse.json({
        message: "Invalid Data: Missing donationId",
      }, { status: 422 });
    }

    // Connect to the database
    await ConnectToDatabase();

    // Update the donation to add the participant
    const donationSave = await prisma.donation.update({
      where: { id: donationId },
      data: {
        participants: {
          connect: { publicKey },
        },
      },
    });

    // Update the participant to include the donationId
    const participantUpdate = await prisma.participant.update({
      where: { publicKey },
      data: {
        donations: {
          connect: { id: donationId },
        },
      },
    });

    return NextResponse.json({ donation: donationSave, participant: participantUpdate }, { status: 200 });

  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({
      message: "Server Error"
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
