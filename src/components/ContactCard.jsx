import {deleteDoc,doc} from "firebase/firestore"
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io'
import { RiEditCircleLine } from 'react-icons/ri'
import {db} from "../config/firebase"
import {AddAndUpdateContact} from "./AddAndUpdateContact"
import useDisclosure from "../hooks/useDisclosure.js"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line react/prop-types


const ContactCard = ({contact}) => {

  const {onClose,onOpen,open} = useDisclosure();

  const deleteContact =async(id) =>{
    try{
      await deleteDoc(doc(db,"contacts",id));
      toast.success("contact Deleted Successfully")
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <>
    <div key = {contact.id} className=" bg-yellow-100 flex justify-between items-center p-2 rounded-lg">
            <div className="flex gap-1">
            <HiOutlineUserCircle className=" text-orange-400 text-4xl"/>
            <div className="">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
            </div>
            </div>
            <div className="flex text-3xl">
            <IoMdTrash onClick = {() => deleteContact(contact.id)} className="text-orange-400 cursor-pointer"/>
            <RiEditCircleLine onClick ={onOpen} className="cursor-pointer"/>
            </div>
          </div>
          <AddAndUpdateContact contact ={contact} isUpdate open ={open} onClose ={onClose}/>
          <ToastContainer position="bottom-center"/>
          </>
  )
}

export default ContactCard;
