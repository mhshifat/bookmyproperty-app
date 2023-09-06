"use client";
import { useSearchModal } from "@/app/hooks";
import Modal from ".";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../CountrySelect";
import qs from 'query-string';
import { formatISO } from "date-fns";
import { Counter, Heading } from "..";
import Calendar from "../Calendar";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export default function SearchModal() {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [range, setRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });
  const Map = useMemo(() => dynamic(() => import("../Map"), { ssr: false }), [location])
  const onBack = useCallback(() => {
    setStep(step => step - 1);
  }, []);
  const onNext = useCallback(() => {
    setStep(step => step + 1);
  }, []);
  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) return onNext();
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }
    if (range?.startDate) {
      updatedQuery.startDate = formatISO(range.startDate);
    }
    if (range?.endDate) {
      updatedQuery.endDate = formatISO(range.endDate);
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,

    }, { skipNull: true });
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [bathroomCount, guestCount, location?.value, onNext, params, range?.endDate, range?.startDate, roomCount, router, searchModal, step]);
  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return "Search";
    return "Next";
  }, [step])
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined;
    return "Back";
  }, [step])

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={(
        <>
          {step === STEPS.LOCATION && (
            <div className="flex flex-col gap-8">
              <Heading
                title="Where do you wanna go?"
                subtitle="Find the perfect location!"
              />

              <CountrySelect
                value={location}
                onChange={(value) => setLocation(value)}
              />
              <hr />
              <Map center={location?.latlng} />
            </div>
          )}
          {step === STEPS.DATE && (
            <div className="flex flex-col gap-8">
              <Heading
                title="When do you plan to go?"
                subtitle="Make sure everyone is free!"
              />

              <Calendar
                value={range}
                onChange={(value) => setRange(value.selection)}
              />
            </div>
          )}
          {step === STEPS.INFO && (
            <div className="flex flex-col gap-8">
              <Heading
                title="More information?"
                subtitle="Find your perfect place!"
              />

              <Counter
                title="Guests"
                subtitle="How many guests are coming?"
                value={guestCount}
                onChange={(value) => setGuestCount(value)}
              />
              <Counter
                title="Rooms"
                subtitle="How many rooms do you need?"
                value={roomCount}
                onChange={(value) => setRoomCount(value)}
              />
              <Counter
                title="Bathrooms"
                subtitle="How many bathrooms do you need?"
                value={bathroomCount}
                onChange={(value) => setBathroomCount(value)}
              />
            </div>
          )}
        </>
      )}
    />
  )
}