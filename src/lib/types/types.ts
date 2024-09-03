


export interface Donation extends Participant{
    donationId: string;
    address: string;
    donationDate: Date;
    totalParticipants: string;
    bountyAmount: string;
    participants : Participant[];
}

export interface DonationListCardProps {
    donations: Donation[];
  }

export interface Participant {
    participantId : string;
    name : string;
    participantAddress : string;
    age : string,
    contactEmail : string,
    contactNumber : string,
    gender : string,
    publicKey: string;
    sampleDiseases : string,
}
