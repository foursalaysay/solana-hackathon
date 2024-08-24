'use server'

import DonationListCard, { DLCProps } from '@/components/reusables/DonationListCard';
import React from 'react'
import { useState, useEffect } from 'react';
import prisma from '../../../prisma';

const getAllDonations = async () => {
  const res = await fetch('/api/donation');

  if (!res.ok) {
    throw new Error('Failed to fetch donations');
  }

  const data = await res.json(); // Await the JSON parsing
  return data;
}

const Donation = async () => {

 
  const donations = await getAllDonations();

  return (  
    <div>
        <DonationListCard donations={donations}/>  ``
    </div>
  )
}

export default Donation