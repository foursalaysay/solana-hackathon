
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

const [donations, setDonations ] = useState<DLCProps[]>([]);
  const [loading, setLoading] = useState(true);
  // GETTING ALL BLOOD DONATIONS PRESENT
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('/api/healthofficer', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', // Optional, specify if needed
          },
        });

        if (!response.ok) {
          // Log detailed error information
          const errorText = await response.text();
          console.error('Fetch error:', errorText);
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setDonations(data.donations);
       
      } catch (error: any) {
        console.error('Failed to fetch donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

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
