"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Input } from "@/components/ui/input"
import { DiseaseHistory } from "./DiseaseHistory"
import { diseases } from "@/lib/constants/Diseases"

import { skills } from "./data"
import { MeMultiSelect } from "./MeMultiSelect"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from 'sonner'
import { useWallet } from "@solana/wallet-adapter-react"

const FormSchema = z.object({
    id : z.string(),
    publicKey : z.string(),
    name : z.string().min(5, {
        message : "Name is required"
    }),
    address : z.string({
        message : "Address is required"
    }),
    gender : z.string(),
    age : z.string(),
    contactEmail : z.string(),
    contactNumber : z.string(),
    sampleDisease : z.string(),
    diseaseHistory :z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          category: z.string().optional(),
        })
      )
      .optional(),
})



export function UserForm() {

  const [selectId, setSelectId] = useState("")
  const { publicKey } = useWallet();
  const router = useRouter();
  
  
  console.log(publicKey)
  useEffect(() => {
    async function getUserId(){
      try {
        const res = await fetch(`/api/userdashboard?publicKey=${publicKey}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await res.json()
        const userId  = data?.id;
        setSelectId(userId);
      } catch (error) {
        toast.error('Id not Fetched!')
      }
        
    }
   getUserId()
  },[publicKey])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
    id: selectId,
    name : "",
    address : "",
    gender : "",
    age : "",
    contactEmail : "",
    contactNumber : "",
    sampleDisease : ""
    },
})



async function onSubmit(data: z.infer<typeof FormSchema>) {

  try {
    const response = await fetch(`/api/userdashboard?publicKey=${publicKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });


    if(response.ok){
      const result = await response.json();
     toast.success("Completed Profile!", {
      position : 'top-center'
     })
     router.push(`/userdashboard/${publicKey}`)
    }
  } catch (error) {
    console.error("Error saving donation:", error);
   toast.error('Profile not completed!')
  }
  }

 

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
                <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
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
         <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
                <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
         <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Type</FormLabel>
                <Select
                  onValueChange={(value: string) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sex" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
        control={form.control}
        name="sampleDisease"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Diease History</FormLabel>
            <FormControl>
                <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
          
            {/* <FormField
                control={form.control}
                name="diseaseHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Skills</FormLabel>
                    <FormControl>
                      <MeMultiSelect
                        options={skills}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Select the skills you that you have.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
           {/* <FormField
                control={form.control}
                name="diseaseHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Disease History</FormLabel>
                    <FormControl>
                      <DiseaseHistory
                        options={diseases}
                        onChange={field.onChange}
                        placeholder="Search diseases..."
                      />
                    </FormControl>
                    <FormDescription>
                      Select the diseases you have encountered.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
         <FormField
        control={form.control}
        name="contactEmail"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Contact Email</FormLabel>
            <FormControl>
                <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
         <FormField
        control={form.control}
        name="contactNumber"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Contact Number</FormLabel>
            <FormControl>
                <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
        <Button type="submit" className="w-full bg-redColor text-white hover:bg-white hover:text-redColor hover:border-2 hover:border-redColor" 
        >Submit</Button>
    </form>
    </Form>
)
}
