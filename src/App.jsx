import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";

import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import {db} from "./config/firebase.js";
import {collection, onSnapshot} from "firebase/firestore"
import ContactCard from "./components/ContactCard"
import AddAndUpdateContact from "./components/AddAndUpdateContact.jsx"
import useDisclosure from "./hooks/useDisclosure"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ContactNotFound from "./components/ContactNotFound.jsx";

const App = () => {

  const [contacts,setContacts] = useState([]);

  const {onClose,onOpen,open} = useDisclosure();

  useEffect(() => {
    const getContacts= async ()=>{
      try{
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc)=> {
            return{
            id: doc.id,
            ...doc.data(),
          };
          });
          setContacts(contactLists);
          return contactLists;
        })
        
      }
      catch(error){
        console.log(error);
      }
    };

    getContacts();}
  ,[]);

  const filterContacts =(e)=>{
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc)=> {
            return{
            id: doc.id,
            ...doc.data(),
          };
          });

          const filteredContacts = contactLists.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()));
          setContacts(filteredContacts);
          return filteredContacts;
        })
  }


  return (
    <>
    <div className="mx-auto max-w-[370px] px-4">
      <Navbar/>
      <div className="flex gap-2">
      <div className = "flex relative items-center flex-grow">
        <FiSearch className="text-white ml-1 text-3xl absolute "/>
        <input onChange ={filterContacts} type = "text" 
        className = "h-10 flex-grow border bg-transparent border-white rounded-md text-white pl-9"/>
      </div>
      {/* <FaPlusCircle onClick= {onOpen} className="text-4xl text-white cursor-pointer"/> */}
      <AiFillPlusCircle onClick= {onOpen} className="cursor-pointer text-5xl text-white" />
      </div>

      <div className="mt-4 gap-3 flex flex-col">
        {contacts.length<=0 ? <ContactNotFound/>:contacts.map((contact) => (
          <ContactCard key = {contact.id} contact = {contact} />
        ))}
      </div>
    </div>
    <AddAndUpdateContact 
      onClose = {onClose} open = {open}
    />
    <ToastContainer  position="bottom-center"/>
    </>
  )
}
export default App
