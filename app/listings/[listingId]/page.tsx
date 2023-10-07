import { getUserSession } from "@/actions/current-user";
import getListingById from "@/actions/getListingById";
import getReservations from "@/actions/getReservations";
import EmptyState from "@/components/empty-state";
import ClientOnly from "@/components/ui/client-only";
import ListingClient from "./listing-client";



const ListingId = async ({ params } : { params : { listingId? : string } }) => {

  const currentUser = await getUserSession()
  const listing = await getListingById(params)
  const reservation = await getReservations(params)

  if (!listing) {
    return (
      <EmptyState  />
    )
  }

  return ( 
    <ClientOnly>
      <ListingClient
        currentUser={currentUser}
        listing={listing}
        reservations = {reservation}
      />
     </ClientOnly>
   );
}
 
export default ListingId;