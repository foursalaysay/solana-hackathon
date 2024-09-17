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

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const {id, publicKey, name, gender, address, age, contactEmail, contactNumber, sampleDisease } = data;

    // Update the donation with a new participant
    const updatedDonation = await prisma.participant.update({
      where: { id }, // Assuming the `id` exists in the database
      data: {
        publicKey : publicKey,
        name,
        address,
        gender,
        age, // Ensure age is stored as a number
        contactEmail,
        contactNumber,
        sampleDisease,
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