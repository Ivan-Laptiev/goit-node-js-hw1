const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

  const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
   try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts= JSON.parse(data);  
    return contacts;
    } catch(error) {
    console.log(error.message);
    }   
  }
    
  async function getContactById(contactId) {
    try{
    const contacts= await listContacts();
    const contactWithId = contacts.find(({id})=> id === contactId);
    if(!contactWithId) {
      return null;
    }
    return contactWithId;    
    } catch (error){
      console.log(error.message);
    }
  }
    
  async function removeContact(contactId) {
    try {
    const contacts= await listContacts();
    const removedContactId = contacts.findIndex((item)=> item.id === contactId);
    if (removedContactId === -1) {
      return null;
    }
    const uppdatedContacts = contacts.filter(({id})=> id !== contactId );
    await fs.writeFile(contactsPath, JSON.stringify(uppdatedContacts));
    return contacts[removedContactId];
    } catch (error){
      console.error(error);
    }
  } 
  
  async function addContact(name, email, phone) {
   try {   
    const newContact = { id: uuidv4(), name, email, phone};
    const contacts = await listContacts();
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
    return newContact; 
   } catch (error){
    console.log(error);
   }
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };