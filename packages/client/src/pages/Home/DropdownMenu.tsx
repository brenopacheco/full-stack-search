import React from "react";
import { Link } from "react-router";

const DropdownMenu = (props: { children: React.ReactNode[] }) => {
  if (!props.children.some(Boolean)) return null;

  return (
    <div className="search-dropdown-menu dropdown-menu w-100 show p-3 mt-2">
      {props.children}
    </div>
  );
};

export type DropdownMenuGroupProps = {
  title: string;
  onEmpty: string;
  items: Array<{
    path: string;
    name: string;
  }>;
};

const DropdownMenuGroup = ({
  title,
  onEmpty,
  items,
}: DropdownMenuGroupProps) => {
  return (
    <div>
      <h2>{title}</h2>
      {items.length === 0 && <p>{onEmpty}</p>}
      {items.map((item, index) => (
        <li key={index}>
          <Link to={item.path} className="dropdown-item">
            <i className="fa fa-building mr-2"></i>
            {item.name}
          </Link>
          <hr className="divider" />
        </li>
      ))}
    </div>
  );
};

DropdownMenu.Group = DropdownMenuGroup;
export default DropdownMenu;
