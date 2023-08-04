import { ContactRepository } from "./ContactRepository";
import { ContactRepositorySupabaseImpl } from "./ContactRepositorySupabaseImpl";

export default class ContactFactory {
    private static _instance: ContactRepository;
    public static getInstance(): ContactRepository {
        if (!ContactFactory._instance) {
            ContactFactory._instance = new ContactRepositorySupabaseImpl()
        }
        return ContactFactory._instance
    }
}
