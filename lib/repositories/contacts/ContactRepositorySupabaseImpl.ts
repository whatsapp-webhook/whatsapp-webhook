import { DBTables } from "@/lib/enums/Tables";
import { createClient } from "@/utils/supabase-server";
import { Contact } from "../../../types/contact";
import { ContactColumnName, ContactRepository } from "./ContactRepository";

export class ContactRepositorySupabaseImpl implements ContactRepository {
    private client;
    constructor() {
        this.client = createClient();
    }
    async getContacts(
        filters?: Map<ContactColumnName, unknown>,
        order?: {
            column: ContactColumnName,
            options?: { ascending?: boolean; nullsFirst?: boolean; foreignTable?: undefined }
        },
    ): Promise<Contact[]> {
        let query = this.client
            .from(DBTables.Contacts)
            .select('*')
        if (filters) {
            for (const [key, value] of filters) {
                query = query.eq(key, value)
            }
        }
        if (order) {
            query = query.order(order.column, order.options)
        }
        const result = await query
        if (result.error) throw result.error
        return result.data;
    }
}