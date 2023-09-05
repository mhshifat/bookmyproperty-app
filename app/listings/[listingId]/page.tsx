import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingId from "@/app/actions/getListingById"
import getReservations from "@/app/actions/getReservations";
import { ClientOnly, EmptyState } from "@/app/components";
import ListingDetails from "@/app/components/ListingDetails";
import { SafeReservation } from "@/app/types";

interface IParams {
  listingId?: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingId(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  
  if (!listing) return (
    <ClientOnly>
      <EmptyState />
    </ClientOnly>
  )
  return (
    <ClientOnly>
      <ListingDetails
        listing={listing}
        currentUser={currentUser}
        reservations={reservations as unknown as SafeReservation[] | undefined}
      />
    </ClientOnly>
  )
}