import prismaClient from "../libs/db";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  category?: string;
  locationValue?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId, bathroomCount, category, endDate, guestCount, locationValue, roomCount, startDate } = params;
    let query: any = {}
    if (userId) query.userId = userId;
    if (category) query.category = category;
    if (roomCount) query.roomCount = { gte: +roomCount };
    if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };
    if (guestCount) query.guestCount = { gte: +guestCount };
    if (locationValue) query.locationValue = locationValue;
    if (startDate && endDate) query.NOT = {
      reservations: {
        some: {
          OR: [
            {
              endDate: { gte: startDate },
              startDate: { lte: startDate },
            },
            {
              startDate: { lte: endDate },
              endDate: { gte: endDate },
            },
          ]
        }
      }
    };
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