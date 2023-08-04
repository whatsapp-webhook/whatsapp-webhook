import ContactFactory from "@/lib/repositories/contacts/ContactFactory";
import { ContactColumnName } from "@/lib/repositories/contacts/ContactRepository";
import { Suspense } from "react";
import ContactsClient from "./pageClient";

export default async function Contacts() {
    const contactRepository = ContactFactory.getInstance()
    let filters = new Map<ContactColumnName, unknown>([
        ["in_chat", true],
    ])
    const contacts = await contactRepository.getContacts(undefined, { column : 'profile_name', options: { ascending: true } })
    return (
        <ContactsClient contacts={ contacts }/>
    )
}