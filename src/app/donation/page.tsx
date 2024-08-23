'use client'

import DonationListCard, { DLCProps } from '@/components/reusables/DonationListCard';
import React from 'react'
import { useState, useEffect } from 'react';

const Donation = () => {

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
          setDonations(data);
         
        } catch (error: any) {
          console.error('Failed to fetch donations:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchDonations();
    }, []);

  return (
    <div>
         <DonationListCard donations={donations}/>
    </div>
  )
}

export default Donation