import Container from "@/components/container";
import { IListingsParams } from "@/actions/getListings";
import getListings from "@/actions/getListings";
import { getUserSession } from "@/actions/current-user";
import EmptyState from "@/components/empty-state";
import ListingCard from "@/components/listings/listing-card";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getUserSession();

  if (listings.length === 0) {
    return (

        <EmptyState showReset />
    );
  }

  return (
 
      <Container>
        <div
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>

  );
};

export default Home;
