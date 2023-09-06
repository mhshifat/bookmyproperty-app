import getCurrentUser from '@/app/actions/getCurrentUser';
import { ClientOnly, EmptyState } from '../components';
import getReservations from '../actions/getReservations';
import { SafeListing, SafeReservation } from '../types';
import ReservationsClient from '../components/ReservationsClient';
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoritesClient from '../components/FavoriesClient';

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return (
    <ClientOnly>
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
        />
    </ClientOnly>
  )
  const listings = await getFavoriteListings();
  if (listings && listings.length === 0) return (
    <ClientOnly>
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you don't have any listing that you like"
      />
    </ClientOnly>
  )

  return (
    <ClientOnly>
      <FavoritesClient
        listings={listings as unknown as SafeListing[]}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}