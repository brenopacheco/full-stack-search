import { useState } from "react";
import { useLocations } from "./hooks";
import { SearchInput } from "./SearchInput";
import { DropdownMenu } from "./DropdownMenu";
import { cityToItem, countryToItem, hotelToItem } from "./utils";
import { Alert } from "../../components/Alert";
import { Spinner } from "../../components/Spinner";

export default function Home() {
  const [search, setSearch] = useState("");
  const query = useLocations(search);

  return (
    <div className="row height d-flex justify-content-center pt-5">
      <div className="col-md-6">
        <div className="dropdown">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search accommodation..."
          />
          {query.isLoading && <Spinner message="Loading..." />}
          {query.isError && <Alert message="Something went wrong..." />}
          {query.data && (
            <DropdownMenu
              menu={[
                {
                  title: "Hotels",
                  onEmpty: "No hotels matched",
                  items: hotelToItem(query.data.hotels),
                },
                {
                  title: "Countries",
                  onEmpty: "No country matched",
                  items: countryToItem(query.data.countries),
                },
                {
                  title: "Cities",
                  onEmpty: "No city matched",
                  items: cityToItem(query.data.cities),
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
