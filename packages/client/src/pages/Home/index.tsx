import { useState } from "react";
import { useLocations } from "./hooks";
import { SearchInput } from "./SearchInput";
import { cityToItem, countryToItem, hotelToItem } from "./utils";
import { Alert } from "../../components/Alert";
import { Spinner } from "../../components/Spinner";
import DropdownMenu from "./DropdownMenu";

export default function Home() {
  const [search, setSearch] = useState("");
  const query = useLocations(search);

  const showResults = !!query.data && !query.isFetching && search.length > 0;

  return (
    <div className="row height d-flex justify-content-center pt-5">
      <div className="col-md-6">
        <div className="dropdown">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search accommodation..."
          />
          {query.isError && <Alert message="Something went wrong..." />}
          <DropdownMenu>
            {query.isFetching && <Spinner message="Loading..." />}
            {showResults && (
              <>
                <DropdownMenu.Group
                  title="Hotels"
                  onEmpty="No hotels matched"
                  items={hotelToItem(query.data.hotels)}
                />
                <DropdownMenu.Group
                  title="Countries"
                  onEmpty="No country matched"
                  items={countryToItem(query.data.countries)}
                />
                <DropdownMenu.Group
                  title="Cities"
                  onEmpty="No city matched"
                  items={cityToItem(query.data.cities)}
                />
              </>
            )}
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
