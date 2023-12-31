import prismaClient from "../libs/db";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { authorId, listingId, userId } = params;
    const query: any = {}
    if (listingId) query.listingId = listingId;
    if (userId) query.userId = userId;
    if (authorId) query.listing = { userId: authorId };

    const reservations = await prismaClient.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
        updatedAt: reservation.listing.updatedAt.toISOString(),
      }
    }))
  } catch (err: any) {
    throw new Error(err);
  }
}