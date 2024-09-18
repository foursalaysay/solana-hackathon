"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import React, { useState } from "react"

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
import { format } from "date-fns"
import { useRouter } from "next/navigation"


const DonationSchema = z.object({
  address: z.string().min(2, {
    message: "Input address.",
  }),
  donationDate : z.date({
    required_error: "Date is required.",
  }),
  totalParticipants : z.string(),
  bountyAmount : z.string()
})

interface closeDialogProps{
  onSuccess : () => void;
}
const CreateDonationList: React.FC<closeDialogProps> = ({ onSuccess }) => {
  const form = useForm<z.infer<typeof DonationSchema>>({
    resolver: zodResolver(DonationSchema),
    defaultValues: {
      address: "",
      donationDate : new Date(),
      totalParticipants : "",
      bountyAmount : ""
    },
  })
  
  const router = useRouter()

async function onSubmit(data: z.infer<typeof DonationSchema>) {

  try {
    const response = await fetch('/api/healthofficer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if(response.ok){
      const result = await response.json();
      console.log(result);
      onSuccess();
      

      toast({
        title: "Submission Successful",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(result, null, 2)}</code>
          </pre>
        ),
      });
    }
  } catch (error) {
    console.error("Error saving donation:", error);
    toast({
      title: "Submission Failed",
      description: "There was an error submitting your data.",
    });
  }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input {...field} />
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
              <FormLabel>Donation Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'MMM dd, yyyy') 
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
                    disabled={(date) =>
                      date < new Date() 
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
                    <Input placeholder="50" {...field} />
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
                    <Input placeholder="$12 USDT" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit" className="w-full bg-redColor text-white hover:bg-white hover:text-black hover:border-1 hover:border-redColor">Create Donation Listing</Button>
      </form>
    </Form>
  )
}


export default CreateDonationList;