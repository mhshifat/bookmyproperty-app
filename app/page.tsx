import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import { ClientOnly, Container, EmptyState, ListingCard } from "./components";

interface HomeProps {
  searchParams: IListingsParams;
}

export const dynamic = 'force-static';

export default async function HomePage({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings?.length === 0) return (
    <ClientOnly>
      <EmptyState showReset />
    </ClientOnly>
  )
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map(listing => (
            <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}