import prismaClient from "../libs/db";

export interface IListingsParams {
  userId?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId } = params;
    let query: any = {}
    if (userId) query.userId = userId;
    const listings = await prismaClient.listing.findMany({
      where: query,
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