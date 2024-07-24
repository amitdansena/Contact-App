import {AiOutlineClose} from "react-icons/ai";
import {createPortal} from "react-dom"

const Model = ({onClose,isOpen,children}) => {
  return createPortal(
    <>
        {isOpen && (
            <div  className="grid place-items-center backdrop-blur h-screen w-screen absolute top-0 z-40">
            <div className = "m-auto relative z-50 min-h-[200px] min-w-[80%] bg-white p-4">
            <div className = "flex justify-end">
                <AiOutlineClose onClick = {onClose}  className = "self-end text-2xl"/>
            </div>
            {children}
        </div>
            </div>
            )}
    </>
  ,document.getElementById("model-root"))
}

export default Model
