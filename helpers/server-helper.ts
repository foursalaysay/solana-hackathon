import prisma from "../prisma"

export const ConnectToDatabase = async () => {
    try {
        await prisma.$connect();
    } catch (error) {
        console.log(error);
        throw new Error("Unable to Connect!")
    }
}