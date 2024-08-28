import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../helpers/server-helper";
import prisma from "../../../../prisma";



export const POST = async (req : Request) => {
  try {
      const { name, address, gender, age, contactEmail, contactNumber, sampleDisease } = await req.json();

      if(!name || !address || !gender || !age || !contactEmail || !contactNumber || !sampleDisease ){
          return NextResponse.json({
              message : "Invalid Data"
          }, {status : 422})
      }

    await ConnectToDatabase();

    const participant = await prisma.participant.create({
        data : {
            name : name,
            publicKey : publicKey,
            address : address,
            gender : gender,
            age : age,
            contactEmail : contactEmail,
            contactNumber : contactNumber,
            sampleDisease : sampleDisease
        }
    });
    return NextResponse.json({participant}, {status: 200})
  } catch (error) {
    console.log(error)

    return NextResponse.json({
        message : "Server Error"
    }, {status : 500})
}finally{
    await prisma.$disconnect();
}
}



