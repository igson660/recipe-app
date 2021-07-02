import { useContext } from 'react';
import { SearchBarContext } from '../contexts/searchBarContext';

export default function useSearchBar() {
  const value = useContext(SearchBarContext);
  return value;
}
