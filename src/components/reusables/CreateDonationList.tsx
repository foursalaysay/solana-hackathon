"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
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
import { CalendarIcon } from "lucide-react"
import { format } from "util"

const DonationSchema = z.object({
  address: z.string().min(2, {
    message: "Input address.",
  }),
  donationDate : z.date({
    required_error: "Date is required.",
  }),
  totalParticipants : z.number(),
  bountyAmount : z.string()
})

export function CreateDonationList() {
  const form = useForm<z.infer<typeof DonationSchema>>({
    resolver: zodResolver(DonationSchema),
    defaultValues: {
      address: "",
      donationDate : new Date(),
      totalParticipants : 0,
      bountyAmount : ""
    },
  })

  function onSubmit(data: z.infer<typeof DonationSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
                <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
        {/* THIS IS FOR THE DATE */}
        <FormField
        control={form.control}
        name="donationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date : Date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="totalParticipants"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Total Participants Required</FormLabel>
                <FormControl>
                    <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
         <FormField
            control={form.control}
            name="bountyAmount"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Bounty Amount</FormLabel>
                <FormControl>
                    <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit">Create Donation Listing</Button>
      </form>
    </Form>
  )
}
