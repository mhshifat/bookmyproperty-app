"use client";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "../Navbar/Categories";
import { Container } from "..";
import ListingHead from "../ListingHead";
import ListingInfo from "../ListingInfo";
import { useLoginModal } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "../ListingReservation";
import { Range } from "react-date-range";

interface ListingDetailsProps {
  listing: SafeListing & { user: SafeUser };
  currentUser?: SafeUser | null;
  reservations?: SafeReservation[];
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  type: 'selection',
}

export default function ListingDetails({ listing, currentUser, reservations = [] }:ListingDetailsProps) {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    setIsLoading(true);
    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing.id,
    })
    .then(() => {
      toast.success("Listing reserved!");
      setDateRange(initialDateRange);
      router.refresh();
    })
    .catch(err => {
      toast.error('Something went wrong!');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [currentUser, dateRange?.endDate, dateRange?.startDate, listing.id, loginModal, router, totalPrice]);
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach(reservation => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    })
    return dates;
  }, [reservations])
  const category = useMemo(() => {
    return categories.find(cat => cat.label === listing.category);
  }, [listing.category])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange?.endDate, dateRange?.startDate, listing.price]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value: Range) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}