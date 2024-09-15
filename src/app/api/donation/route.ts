import { NextResponse } from 'next/server';
import prisma from '../../../../prisma';
import { ConnectToDatabase } from '../../../../helpers/server-helper';

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
