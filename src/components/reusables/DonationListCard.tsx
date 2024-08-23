
'use client'

import { useState, useEffect } from 'react'
import React from 'react';

export interface DLCProps {
  id: string;
  address: string;
  donationDate: Date;
  totalParticipants: string;
  bountyAmount: string;
}

export interface DonationListCardProps {
  donations: DLCProps[];
}



const DonationListCard: React.FC<DonationListCardProps> = ({ donations }) => (
  <>
    {donations.map((donation) => (
      <div key={donation.id} className="donation-card">
        <h3>Donation ID: {donation.id}</h3>
        <p>Address: {donation.address}</p>
        <p>Donation Date: {donation.donationDate.toDateString()}</p>
        <p>Total Participants: {donation.totalParticipants}</p>
        <p>Bounty Amount: {donation.bountyAmount}</p>
      </div>
    ))}
  </>
);

export default DonationListCard;
