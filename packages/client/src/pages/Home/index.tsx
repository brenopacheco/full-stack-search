import { useSearchParams } from "react-router";
import { useLocations } from "./hooks";
import { SearchInput } from "./SearchInput";
import { Alert } from "../../components/Alert";
import { Spinner } from "../../components/Spinner";
import DropdownMenu from "./DropdownMenu";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useLocations(searchParams.get("search"));

  const search = searchParams.get("search") ?? "";
  const onSearch = (search: string) => setSearchParams({search})

  return (
    <div className="row height d-flex justify-content-center pt-5">
      <div className="col-md-6">
        <div className="dropdown">
          <SearchInput
            value={search}
            onChange={onSearch}
            placeholder="Search accommodation..."
          />

          {query.isError && <Alert message="Something went wrong..." />}

          <DropdownMenu show={search.length > 0}>
            {query.isFetching && <Spinner message="Loading..." />}

            <DropdownMenu.Group title="Hotels" onEmpty="No hotels matched">
              {query.data?.hotels.map((hotel) => (
                <DropdownMenu.GroupItem
                  key={hotel._id}
                  path={`/hotel/${hotel._id}`}
                  name={hotel.hotel_name}
                />
              ))}
            </DropdownMenu.Group>

            <DropdownMenu.Group title="Countries" onEmpty="No country matched">
              {query.data?.countries.map((country) => (
                <DropdownMenu.GroupItem
                  key={country._id}
                  path={`/country/${country._id}`}
                  name={country.country}
                />
              ))}
            </DropdownMenu.Group>

            <DropdownMenu.Group title="Cities" onEmpty="No city matched">
              {query.data?.cities.map((city) => (
                <DropdownMenu.GroupItem
                  key={city._id}
                  path={`/city/${city._id}`}
                  name={city.name}
                />
              ))}
            </DropdownMenu.Group>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
