import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { ConnectToDatabase } from "../../../../helpers/server-helper";

export const GET = async () => {
  try {
    const donations = await prisma.donation.findMany();
    return NextResponse.json({ success: true, data: donations }, { status: 200 });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
};
