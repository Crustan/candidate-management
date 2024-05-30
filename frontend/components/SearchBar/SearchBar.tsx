import "./SearchBar.module.css";

export function SearchBar({children}: React.PropsWithChildren) {
  return <search>{children}</search>;
}
