import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingId from "@/app/actions/getListingById"
import { ClientOnly, EmptyState } from "@/app/components";
import ListingDetails from "@/app/components/ListingDetails";

interface IParams {
  listingId?: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingId(params);
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
      />
    </ClientOnly>
  )
}