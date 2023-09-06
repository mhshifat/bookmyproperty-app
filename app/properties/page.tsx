import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings";
import { ClientOnly, EmptyState } from "../components";
import PropertiesClient from "../components/PropertiesClient";
import { SafeListing } from "../types";

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return (
    <ClientOnly>
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
        />
    </ClientOnly>
  )
  const properties = await getListings({ userId: currentUser.id });
  if (properties.length === 0) return (
    <ClientOnly>
      <EmptyState
        title="No properties found"
        subtitle="Looks like you don't have any properties"
      />
    </ClientOnly>
  )
  return (
    <ClientOnly>
      <PropertiesClient
        listings={properties as unknown as SafeListing[]}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}