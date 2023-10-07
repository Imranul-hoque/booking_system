import EmptyState from "@/components/empty-state";
import ClientOnly from "@/components/ui/client-only";

import { getUserSession } from "@/actions/current-user";
import getListings from "@/actions/getListings";

import PropertiesClient from "./properties-client";

const PropertiesPage = async () => {
  const currentUser = await getUserSession();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
