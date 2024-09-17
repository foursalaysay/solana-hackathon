import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../helpers/server-helper";
import prisma from "../../../../prisma";

// Handle GET request
export async function GET(req: NextRequest) {
  await ConnectToDatabase();

  try {
    const publicKey = req.nextUrl.searchParams.get('publicKey');
    
    if (!publicKey) {
      return NextResponse.json({ message: 'Public Key is required' }, { status: 400 });
    }

    const getId = await prisma.participant.findUnique({
      where: {
        publicKey: publicKey, // Replace 'someIdVariable' with your actual ID variable or value
      },
      select: {
        id: true, // Only select the 'id' field if that's all you need
      },
    });

    const donations = await prisma.donation.findMany();
    return NextResponse.json({ donations, getId}, { status: 200 });
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

// export const POST = async (req: Request) => {
//   try {
//     const data = await req.json();
//     console.log('Request Data:', data); // Debug incoming data

//     const { publicKey, donationId } = data;

//     // Connect to the database
//     await ConnectToDatabase();

//     // Ensure the donationId and publicKey are not undefined
//     if (!donationId || !publicKey) {
//       return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
//     }

//     // Update the donation to add the participant
//     let donationSave;
//     try {
//       donationSave = await prisma.donation.update({
//         where: { id: donationId }, // Ensure id matches your schema
//         data: {
//           participants: {
//             connect: { publicKey : publicKey }, // Ensure this relationship exists
//           },
//         },
//       });
//     } catch (error) {
//       console.error('Error updating donation:', error);
//       return NextResponse.json({ message: "Error updating donation" }, { status: 500 });
//     }

//     // Update the participant to include the donationId
//     let participantUpdate;
//     try {
//       participantUpdate = await prisma.participant.update({
//         where: { publicKey }, // Ensure publicKey exists in the participant schema
//         data: {
//           donations: {
//             connect: { id: donationId }, // Ensure this relationship exists
//           },
//         },
//       });
//     } catch (error) {
//       console.error('Error updating participant:', error);
//       return NextResponse.json({ message: "Error updating participant" }, { status: 500 });
//     }

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


export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const { donationId, participantId, publicKey, name, address, age, contactEmail, contactNumber, sampleDisease } = data;

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
              sampleDisease: sampleDisease
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