import { DLCProps } from "@/components/reusables/DonationListCard";
import prisma from ".";

export const getAllDonations = async () => {
    const donations = await prisma.donation.findMany()
    return donations;
}


export const createDonation = async ({address, donationDate, totalParticipants, bountyAmount}: DLCProps) => {
    const donation = await prisma.donation.create({
        data : {
            address,
            donationDate,
            totalParticipants,
            bountyAmount
        }
    })
    return donation;
}