import prismaClient from "../libs/db";

export default async function getListings() {
  try {
    const listings = await prismaClient.listing.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return listings;
  } catch (err: any) {
    throw new Error(err);
  }
}