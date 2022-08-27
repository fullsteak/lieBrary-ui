import { useState } from "react"

export const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  const [value, setValue] = useState(initialState);

  function toggle() {
    setValue(!value);
  }

  return [value, toggle];
}
