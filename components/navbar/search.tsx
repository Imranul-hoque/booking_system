"use client"

import useCountries from "@/hooks/use-countries";
import { useSearchModal } from "@/hooks/use-search-modal";
import { differenceInDays } from "date-fns";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const Search = () => {

    const searchModal = useSearchModal()
    const params = useSearchParams();
    const { getByValue } = useCountries();

    const locationValue = params?.get("locationValue");
    const startDate = params?.get("startDate");
    const endDate = params?.get("endDate");
    const guestCount = params?.get("guestCount");

    const locationLabel = useMemo(() => {
      if (locationValue) {
        return getByValue(locationValue as string)?.label;
      }

      return "Anywhere";
    }, [locationValue, getByValue]);

    const durationLabel = useMemo(() => {
      if (startDate && endDate) {
        const start = new Date(startDate as string);
        const end = new Date(endDate as string);
        let diff = differenceInDays(end, start);

        if (diff === 0) {
          diff = 1;
        }

        return `${diff} Days`;
      }

      return "Any Week";
    }, [startDate, endDate]);

    const guestLabel = useMemo(() => {
      if (guestCount) {
        return `${guestCount} Guests`;
      }

      return "Add Guests";
    }, [guestCount]);

    return (
      <div
        className="
            w-[80%] md:w-auto px-4 py-2 rounded-full 
            border
            border-gray-100
            transition-all 
            hover:shadow-md
            shadow-sm
            cursor-pointer
            "
      >
        <div className="flex justify-between items-center gap-x-3">
          <div className="font-semibold">{locationLabel}</div>
          <div
            onClick={searchModal.onOpen}
            className="font-semibold border-x-[1px] px-2"
          >
            {durationLabel}
          </div>
          <div className="hidden md:block text-neutral-400">{guestLabel}</div>
          <div className="flex items-center justify-center text-center bg-rose-500 p-2 rounded-full">
            <SearchIcon className="h-4 w-4 text-white " />
          </div>
        </div>
      </div>
    );
}
 
export default Search;