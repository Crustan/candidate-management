interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({value, onChange}: SearchInputProps) {
  return (
    <input
      aria-label="Search candidates"
      type="search"
      placeholder="Search candidates..."
      value={value}
      onChange={onChange}
    />
  );
}
