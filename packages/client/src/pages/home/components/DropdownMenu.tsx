import React from "react";
import { Link } from "react-router";

const DropdownMenu = (props: {
  show: boolean;
  children: React.ReactNode[] | React.ReactNode;
}) => {
  return (
    <div
      className={`search-dropdown-menu 
      dropdown-menu w-100 p-3 mt-2
      ${props.show ? "show" : ""}`}
      data-testid="dropdown-menu"
    >
      {props.children}
    </div>
  );
};

const DropdownMenuGroup = (props: {
  title: string;
  onEmpty: string;
  children: React.ReactNode[] | React.ReactNode;
}) => {
  const items = React.Children.toArray(props.children);

  return (
    <section>
      <h2>{props.title}</h2>
      {items.length === 0 && <p>{props.onEmpty}</p>}
      {props.children}
    </section>
  );
};

export interface DropdownMenuGroupItem {
  path: string;
  name: string;
}

const DropdownMenuGroupItem = (props: DropdownMenuGroupItem) => {
  return (
    <li>
      <Link to={props.path} className="dropdown-item">
        <i className="fa fa-building mr-2"></i>
        {props.name}
      </Link>
      <hr className="divider" />
    </li>
  );
};

DropdownMenu.Group = DropdownMenuGroup;
DropdownMenu.GroupItem = DropdownMenuGroupItem;
export default DropdownMenu;
