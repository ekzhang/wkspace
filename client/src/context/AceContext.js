import { createContext } from 'react';

const AceContext = createContext({
  theme: 'dawn',
  keyboardHandler: '',
});

export default AceContext;
