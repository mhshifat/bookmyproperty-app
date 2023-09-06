import getCurrentUser from '@/app/actions/getCurrentUser';
import { ClientOnly, EmptyState } from '../components';
import getReservations from '../actions/getReservations';
import { SafeReservation } from '../types';
import ReservationsClient from '../components/ReservationsClient';

export default async function ReservationsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return (
    <ClientOnly>
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
        />
    </ClientOnly>
  )
  const reservations = await getReservations({ authorId: currentUser.id });
  if (reservations.length === 0) return (
    <ClientOnly>
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you don't have any reservations on your property"
      />
    </ClientOnly>
  )

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations as unknown as SafeReservation[]}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}