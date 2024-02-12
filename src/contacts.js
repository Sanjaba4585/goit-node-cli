const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, {
    encoding: "utf-8",
  });

  return JSON.parse(data);
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await writeContacts(contacts, null, 2);
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
