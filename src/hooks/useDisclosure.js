import  { useState } from 'react'

const useDisclosure = () => {

    const [open,setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  }

  const onClose = () => {
    setOpen(false);
  }

  return {onClose,onOpen,open}
}

export default useDisclosure;
