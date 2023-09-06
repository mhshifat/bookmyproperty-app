"use client";
import { SafeListing, SafeUser } from "@/app/types";
import { Container, Heading, ListingCard } from "..";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

export default function PropertiesClient({ listings, currentUser }: PropertiesClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const onCancel = useCallback((id: string) => {
    setDeletingId(id);
    axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Listing deleted');
        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setDeletingId('');
      })
  }, [router]);

  return (
    <Container>
      <Heading
        title='Properties'
        subtitle="List of places you have listed!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
          />
        ))}
      </div>
    </Container>
  )
}