import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations";
import { ClientOnly, EmptyState } from "../components";
import TripsClient from "../components/TripsClient";
import { SafeReservation } from "../types";

export default async function TripsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return (
    <ClientOnly>
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
        />
    </ClientOnly>
  )
  const reservations = await getReservations({ userId: currentUser.id });
  if (reservations.length === 0) return (
    <ClientOnly>
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't reserved any trips"
      />
    </ClientOnly>
  )
  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations as unknown as SafeReservation[]}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}