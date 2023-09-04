import prismaClient from "../libs/db";

export default async function getListings() {
  try {
    const listings = await prismaClient.listing.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return listings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (err: any) {
    throw new Error(err);
  }
}