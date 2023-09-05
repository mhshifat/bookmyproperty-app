"use client";
import { Range } from "react-date-range";
import Calendar from "../Calendar";
import { Button } from "..";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

export default function ListingReservation({ dateRange, disabled, disabledDates, onChangeDate, onSubmit, price, totalPrice }:ListingReservationProps) {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          $ {price}
        </div>
        <div className="font-light text-neutral-600">
          night
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.range1)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} onClick={onSubmit}>Reserve</Button>
      </div>
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>
          Total
        </div>
        <div>
          $ {totalPrice}
        </div>
      </div>
    </div>
  )
}