import { useDebounceCallback } from "usehooks-ts";
import { useState } from "react";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const SearchInput = (props: SearchInputProps) => {
  const [search, setSearch] = useState(props.value);
  const debounceChange = useDebounceCallback(props.onChange, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceChange(e.target.value);
  };

  const onClear = () => {
    setSearch("");
    props.onChange("");
  };

  return (
    <div className="form">
      <i className="fa fa-search"></i>
      <input
        type="text"
        className="form-control form-input"
        placeholder={props.placeholder}
        onChange={onChange}
        value={search}
      />
      {search.length > 0 && (
        <span>
          <button className="btn p-1 px-2" onClick={onClear}>
            <i className="fa fa-close"></i>
          </button>
        </span>
      )}
    </div>
  );
};
