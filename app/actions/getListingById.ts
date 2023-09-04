import prismaClient from "../libs/db";

interface IParams {
  listingId?: string;
}

export default async function getListingId({ listingId }:IParams) {
  try {
    const listing = await prismaClient.listing.findUnique({ where: { id: listingId }, include: { user: true } });
    if (!listing) return null;
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      }
    };
  } catch (err: any) {
    throw new Error(err);
  }
}