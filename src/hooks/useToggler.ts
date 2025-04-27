import { useState } from "react"

const useToggler = () => {
    const [value,setValue] = useState<boolean>(false)

    const toggler = () => setValue((prev) => !prev)

    return {
        value,
        toggler
    }
} 

export default useToggler