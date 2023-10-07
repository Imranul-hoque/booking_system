"use client"

import { useSearchModal } from "@/hooks/use-search-modal";
import Modal from "./modal";

import qs from "query-string";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import CountrySelect, { CountrySelectValue } from "../country-select";
import Heading from '@/components/ui/header'
import { Button } from "../ui/button";
import Calender from '@/components/calender'
import Counter from "../counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}


const SearchModal = () => {

    const router = useRouter();
    const searchModal = useSearchModal();
    const params = useSearchParams();

    const [step, setStep] = useState(STEPS.LOCATION);

    const [location, setLocation] = useState<CountrySelectValue>();
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });

    const Map = useMemo(
      () =>
        dynamic(() => import("../map"), {
          ssr: false,
        }),
      [location]
    );

    const onBack = useCallback(() => {
      setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
      setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
      if (step !== STEPS.INFO) {
        return onNext();
      }

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
      };

      if (dateRange.startDate) {
        updatedQuery.startDate = formatISO(dateRange.startDate);
      }

      if (dateRange.endDate) {
        updatedQuery.endDate = formatISO(dateRange.endDate);
      }

      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true }
      );

      setStep(STEPS.LOCATION);
      searchModal.onClose();
      router.push(url);
    }, [
      step,
      searchModal,
      location,
      router,
      guestCount,
      roomCount,
      dateRange,
      onNext,
      bathroomCount,
      params,
    ]);

    const actionLabel = useMemo(() => {
      if (step === STEPS.INFO) {
        return "Search";
      }

      return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
      if (step === STEPS.LOCATION) {
        return undefined;
      }

      return "Back";
    }, [step]);

     let bodyContent = (
       <div className="flex flex-col gap-8">
         <Heading
           title="Where do you wanna go?"
           description="Find the perfect location!"
         />
         <CountrySelect
           value={location}
           onChange={(value) => setLocation(value as CountrySelectValue)}
         />
         <hr />
         <Map center={location?.latlng} />
       </div>
    );

    if (step === STEPS.DATE) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="When do you plan to go?"
            description="Make sure everyone is free!"
          />
          <Calender
            onChange={(value) => setDateRange(value.selection)}
            value={dateRange}
          />
        </div>
      );
    }

     if (step === STEPS.INFO) {
       bodyContent = (
         <div className="flex flex-col gap-8">
           <Heading
             title="More information"
             description="Find your perfect place!"
           />
           <Counter
             onChange={(value) => setGuestCount(value)}
             value={guestCount}
             title="Guests"
             subtitle="How many guests are coming?"
           />
           <hr />
           <Counter
             onChange={(value) => setRoomCount(value)}
             value={roomCount}
             title="Rooms"
             subtitle="How many rooms do you need?"
           />
           <hr />
           <Counter
             onChange={(value) => {
               setBathroomCount(value);
             }}
             value={bathroomCount}
             title="Bathrooms"
             subtitle="How many bahtrooms do you need?"
           />
         </div>
       );
     }
    
    const footer = (
      <div className="flex items-center gap-x-3">
        {secondaryActionLabel && (
          <Button onClick={onBack} className="w-full bg-rose-500 hover:bg-rose-500/50">
            {secondaryActionLabel}
          </Button>
        )}
        <Button onClick={onSubmit} className="w-full bg-rose-500 hover:bg-rose-500/50">
          {actionLabel}
        </Button>
      </div>
    );

    return ( 
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            body={bodyContent}
            footer={footer}
        />
     );
}
 
export default SearchModal;