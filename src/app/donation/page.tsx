'use server'

import DonationListCard, { DLCProps } from '@/components/reusables/DonationListCard';
import React from 'react'
import { useState, useEffect } from 'react';
import prisma from '../../../prisma';


async function getAllDonation(){
  const data = await prisma.donation.findMany();
  return data;
}

const Donation = async () => {

  const donations = await getAllDonation();

  return (  
    <div>
        <DonationListCard donations={donations}/>  ``
    </div>
  )
}

export default Donation