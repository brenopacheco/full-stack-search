import { Navigate, useParams } from "react-router";
import { Alert } from "../../shared/Alert";
import { Spinner } from "../../shared/Spinner";
import { JsonBlock } from "../../shared/JsonBlock";
import { useLocation } from "./hooks";
import { LocationType } from "./types";

export default function Location(props: { type: LocationType }) {
  const { id } = useParams<{ id: string }>();
  const query = useLocation(props.type, id);

  const notFound = !query.isError && !query.isFetching && !query.data;

  if (!id || !location) return <Navigate to={"/404"} />;

  return (
    <div className="row d-flex pt-5">
      <h2 className="pb-3 px-0">
        <b>{capitalize(props.type)}:</b> {id}
      </h2>
      {query.isError && <Alert message="Something went wrong..." />}
      {query.isLoading && <Spinner message="Looking for city..." />}
      {query.data && <JsonBlock obj={query.data} />}
      {notFound && <Alert message="Not found!" />}
    </div>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
