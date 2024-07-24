import {Field,Form, Formik,ErrorMessage} from "formik";
import {addDoc, collection,doc,updateDoc} from "firebase/firestore";
import {db} from "../config/firebase"
import Model from "./Model"
import { toast } from 'react-toastify';
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email ").required("Email is Required"),
})

const AddAndUpdateContact = ({open,onClose,isUpdate,contact}) => {

  const addcontact = async(contact) =>{
    try{
      const contactRef = collection(db,"contacts");
      await addDoc(contactRef,contact);
      onClose();
      toast.success("contact added successfully");
    }
    catch(error){
      console.log(error)
    }
  };

  const updateContact = async(contact,id) =>{
    try{
      const contactRef = doc(db,"contacts",id);
      await updateDoc(contactRef,contact);
      onClose();
      toast.success("contact updated successfully");
    }
    catch(error){
      console.log(error)
    }
  };

  return (
    <div>
      <Model isOpen = {open} onClose = {onClose}>
      <Formik 
      validationSchema = {contactSchemaValidation}
      initialValues={
        isUpdate ?
        {
        name: contact.name,
        email: contact.email,
      }
      :{
        name: "",
        email: "",
      }
      }
      onSubmit={(values)=> {
        isUpdate ? updateContact(values,contact.id):
        addcontact(values);
      }}>
        <Form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
        <label htmlFor> Name</label>
          <Field name = "name" className = "border h-10"/>
          <div className="text-red-500 text-xs">
            <ErrorMessage name = "name"/>
          </div>
        </div>

        <div className="flex flex-col gap-1">
        <label htmlFor> Email</label>
          <Field name = "email" className = "border h-10"/>
          <div className="text-red-500 text-xs">
            <ErrorMessage name = "email"/>
          </div>
        </div>

        <button className=" bg-orange-500 px-3 py-1.5 self-end">{isUpdate ? "update": "Add"} Contact</button>

        </Form>
      </Formik>
    </Model>
    </div>
  );
};

export default AddAndUpdateContact
