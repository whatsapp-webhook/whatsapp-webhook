import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReactNode, useState } from "react"
import { CountryDropdown, countryFormType } from "./CountryDropdown"
import { useForm } from "react-hook-form"
import * as z from "zod"

const FormSchema = z.object({
    name: z.string(),
    wa_number: z.string(),
    country: countryFormType
})

export function AddContactDialog({ children }: { children: ReactNode }) {
    const [name, setName] = useState<string>('')
    const [number, setNumber] = useState<string>('')
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            wa_number: "",
            country: undefined,
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log('data', data)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Contact</DialogTitle>
                    <DialogDescription>
                        Enter mobile number and name of the contact
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-row gap-2">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <CountryDropdown {...field} />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="wa_number"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Whatsapp Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Add</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
