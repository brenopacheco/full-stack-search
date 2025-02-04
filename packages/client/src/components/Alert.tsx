export interface AlertProps {
  message: string;
  className?: string;
}

export const Alert = (props: AlertProps) => {
  return (
    <div className={`alert alert-danger my-2 ${props.className ?? ""}`} role="alert">
      {props.message}
    </div>
  );
};
