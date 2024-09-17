import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../../helpers/server-helper";
import prisma from "../../../../../prisma";

export const GET = async (req: NextRequest) => {
  await ConnectToDatabase();

  try {
    // Access query parameters from req.nextUrl
    const publicKey = req.nextUrl.searchParams.get("publicKey");

    // Validate the publicKey
    if (!publicKey) {
      return NextResponse.json({ message: 'Public Key is required' }, { status: 400 });
    }

    // Fetch donations and participant
    const donations = await prisma.donation.findMany();

    return NextResponse.json({ donations }, { status: 200 });

  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const { donationId, participantId, publicKey, name, address, age, contactEmail, contactNumber, sampleDiseases } = data;

    // Update the donation with a new participant
    const updatedDonation = await prisma.donation.update({
      where: {
        id: donationId, // The ID of the donation you want to update
      },
      data: {
        participants: {
          create: [
            {
              id: participantId,
              publicKey: publicKey,
              name: name,
              address: address,
              age: age,
              contactEmail: contactEmail,
              contactNumber: contactNumber,
              sampleDisease: sampleDiseases
            },
          ],
        },
      },
    });

    // Return the updated donation as JSON
    return NextResponse.json(updatedDonation, {
      status: 200,
    });
  } catch (error) {
    // Log the error for debugging
    console.error('Error updating donation:', error);

    // Return an error response
    return NextResponse.json({ error: 'Internal Server Error' }, {
      status: 500,
    });
  }
};



// export const POST = async (req: Request) => {
//   try {
//     const data = await req.json();

//     const {
//       publicKey,
//       donationId,
//     } = data;

//     // Validate required fields
//     if (!publicKey || !donationId) {
//       console.log('di mao ang id.tsx')
//       return NextResponse.json({
//         message: "Invalid Data",
//       }, { status: 422 });
//     }

//     // Connect to the database
//     await ConnectToDatabase();

//     // Update the donation to add the participant
//     const donationSave = await prisma.donation.update({
//       where: { id: donationId },
//       data: {
//         participants: {
//           connect: { publicKey }, // Connect the participant by publicKey
//         },
//       },
//     });

//     // Update the participant to include the donationId
//     const participantUpdate = await prisma.participant.update({
//       where: { publicKey },
//       data: {
//         donations: {
//           connect: { id: donationId }, // Connect the donation by its ID
//         },
//       },
//     });

//     return NextResponse.json({ donation: donationSave, participant: participantUpdate }, { status: 200 });

//   } catch (error) {
//     console.error('Error in POST handler:', error);
//     return NextResponse.json({
//       message: "Server Error"
//     }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// };
