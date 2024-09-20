import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function Information() {
  return (
    <div className='flex flex-col gap-2 w-1/2'>
        <h1>What&apos;s the Process?</h1>
         <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
            Yes. Its animated by default, but you can disable it if you prefer.
            </AccordionContent>
        </AccordionItem>
    </Accordion>
    </div>
  )
}
