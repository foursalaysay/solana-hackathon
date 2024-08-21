import { PrismaClient } from '@prisma/client';
import { donationTypes } from '../types';

const prisma = new PrismaClient();



export async function saveDonation(input: donationTypes) {
    try {
      const donation = await prisma.donation.create({
        data: {
          address: input.address,
          donationDate: input.donationDate,
          totalParticipants: input.totalParticipants,
          bountyAmount: input.bountyAmount
        },
      });
      return donation;
    } catch (error) {
      console.error("Error saving donation:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }