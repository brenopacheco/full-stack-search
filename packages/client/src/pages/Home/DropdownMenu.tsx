import React from "react";

export type DropdownMenuProps = {
  menu: Array<{
    title: string;
    onEmpty: string;
    items: Array<{
      path: string;
      name: string;
    }>;
  }>;
};

export const DropdownMenu = (props: DropdownMenuProps) => {
  return (
    <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
      {props.menu.map((group, index) => (
        <React.Fragment key={index}>
          <h2>{group.title}</h2>
          {group.items.length === 0 && <p>{group.onEmpty}</p>}
          {group.items.map((item, index) => (
            <li key={index}>
              <a href={item.path} className="dropdown-item">
                <i className="fa fa-building mr-2"></i>
                {item.name}
              </a>
              <hr className="divider" />
            </li>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
