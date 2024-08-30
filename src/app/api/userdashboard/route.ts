import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../helpers/server-helper";
import prisma from "../../../../prisma";
import { ConnectionContext } from "@solana/wallet-adapter-react";



export const POST = async (req : Request) => {
  try {
      const {publicKey, name, address, gender, age, contactEmail, contactNumber, sampleDisease } = await req.json();

      if(!publicKey || !name || !address || !gender || !age || !contactEmail || !contactNumber || !sampleDisease ){
          return NextResponse.json({
              message : "Invalid Data"
          }, {status : 422})
      }

    await ConnectToDatabase();

    const participant = await prisma.participant.update({
        where : {
            publicKey : publicKey
        },
        data : {
            name : name,
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


// export const GET = async (request: NextRequest) => {
  
//   try {

//     await ConnectToDatabase();
//         const participant = await prisma.participant.findFirst({
//             where : {
//                 publicKey : id
//             }
//         })
//     return NextResponse.json({ participant }, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching donations:', error);
//     return NextResponse.json({ message: 'Server Error' }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// };


