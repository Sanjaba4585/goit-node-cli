const contacts = require("./src/contacts");
const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);

    case "get":
      const contact = await contacts.getContactById(id);
      return console.table(contact);

    case "add":
      const addContact = await contacts.addContact(name, email, phone);
      return console.table(addContact);

    case "remove":
      const removeContact = await contacts.removeContact(id);
      return console.table(removeContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
