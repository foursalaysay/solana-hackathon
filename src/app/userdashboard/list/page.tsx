"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react"

// Mock data for blood donations
const mockData = {
  upcoming: [
    { id: 1, title: "Community Blood Drive", date: "2023-06-15", time: "10:00 AM - 2:00 PM", location: "City Hall" },
    { id: 2, title: "University Donation Event", date: "2023-06-20", time: "9:00 AM - 3:00 PM", location: "Student Center" },
  ],
  ongoing: [
    { id: 3, title: "Hospital Blood Drive", date: "2023-06-10", time: "8:00 AM - 5:00 PM", location: "General Hospital" },
  ],
  done: [
    { id: 4, title: "Red Cross Blood Drive", date: "2023-05-25", time: "11:00 AM - 4:00 PM", location: "Community Center" },
    { id: 5, title: "Corporate Donation Day", date: "2023-05-15", time: "9:00 AM - 1:00 PM", location: "Tech Park" },
  ],
}

type DonationEvent = {
  id: number
  title: string
  date: string
  time: string
  location: string
}

const DonationCard = ({ event }: { event: DonationEvent }) => (
  <Card className="mb-4">
    <CardContent className="flex items-center p-4">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <ClockIcon className="w-4 h-4 mr-2" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPinIcon className="w-4 h-4 mr-2" />
          <span>{event.location}</span>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function BloodDonationTabs() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="w-full mx-auto p-4">
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="done">Done</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <div className="mt-4">
            {mockData.upcoming.map((event) => (
              <DonationCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="ongoing">
          <div className="mt-4">
            {mockData.ongoing.map((event) => (
              <DonationCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="done">
          <div className="mt-4">
            {mockData.done.map((event) => (
              <DonationCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}