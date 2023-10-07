"use client"
import { SafeListing, SafeReservation, SafeUser } from "@/@types";
import { categories } from "@/components/category/categories";
import Container from "@/components/container";
import ListingHead from "@/components/listings/listing-head";
import ListingInfo from "@/components/listings/listing-info";
import ListingReservation from "@/components/listings/listing-reservation";
import { useLoginModal } from "@/hooks/use-login-modal";
import axios from "axios";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


interface ListingClientProps {
    currentUser: SafeUser | null;
    listing: SafeListing & {
        user : SafeUser
    };
    reservations? : SafeReservation[]
}

const ListingClient: FC<ListingClientProps> = ({ currentUser, listing, reservations = []
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();

    const initalDate = {
        startDate: new Date(),
        endDate: new Date(),
        key : 'selection'
    }

    const [dateRange, setDateRange] = useState<Range>(initalDate)
    const [loading, setLoading] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState(listing.price)

   const disabledDates = useMemo(() => {
     let dates: Date[] = [];

     reservations.forEach((reservation: any) => {
       const range = eachDayOfInterval({
         start: new Date(reservation.startDate),
         end: new Date(reservation.endDate),
       });

       dates = [...dates, ...range];
     });

     return dates;
   }, [reservations]);

    const category = useMemo(() => {
        return categories.find((item) => item.label = listing.category)
    }, [listing]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            )

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price)
            } else {
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange, listing])
    

     const onCreateReservation = useCallback(() => {
       if (!currentUser) {
         return loginModal.onOpen();
       }
       setLoading(true);

       axios
         .post("/api/reservations", {
           totalPrice,
           startDate: dateRange.startDate,
           endDate: dateRange.endDate,
           listingId: listing?.id,
         })
         .then(() => {
           toast.success("Listing reserved!");
           setDateRange(initalDate);
           router.push("/trips");
         })
         .catch(() => {
           toast.error("Something went wrong.");
         })
         .finally(() => {
           setLoading(false);
         });
     }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);


    return (
      <Container>
        <div
          className="
          max-w-screen-lg 
          mx-auto
        "
        >
          <div className="flex flex-col gap-6">
            <ListingHead
              title={listing.title}
              imageSrc={listing.imageSrc}
              locationValue={listing.locationValue}
              id={listing.id}
              currentUser={currentUser}
            />

            <div
              className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
            >
              <ListingInfo
                user={listing.user}
                category={category}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
              />
              <div
                className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
              >
                <ListingReservation
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={loading}
                  disabledDates={disabledDates}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
}
 
export default ListingClient;