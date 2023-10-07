import EmptyState from "@/components/empty-state"
import ClientOnly from "@/components/ui/client-only";

import { getUserSession } from "@/actions/current-user";
import getFavoriteListings from "@/actions/getFavoriteListings";

import FavoritesClient from "./favorites-client";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getUserSession();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
