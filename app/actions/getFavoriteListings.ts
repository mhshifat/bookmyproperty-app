import getCurrentUser from '@/app/actions/getCurrentUser';
import prismaClient from '../libs/db';

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];
    const favorites = await prismaClient?.listing.findMany({
      where: {
        id: {
          in: [...(currentUser?.favoriteIds || [])]
        }
      }
    })

    return favorites?.map(item => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }))
  } catch (err: any) {
    throw new Error(err);
  }
}