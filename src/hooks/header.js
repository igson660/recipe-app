import { useContext } from 'react';
import { HeaderContext } from '../contexts/headerContext';

export default function useHeader() {
  const value = useContext(HeaderContext);
  return value;
}
