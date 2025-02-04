import { Alert } from "../../components/Alert";

export default function NotFound() {
  return (
    <div className="row d-flex justify-content-center pt-5">
      <Alert message="There is nothing to see there..." className="w-50"/>
    </div>
  );
}
