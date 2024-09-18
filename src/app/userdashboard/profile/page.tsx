import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserProfile() {
  // Placeholder data (replace with actual data in a real application)
  const user = {
    publicKey: "0x1234...5678",
    name: "John Doe",
    address: "123 Blockchain Street, Crypto City",
    gender: "Male",
    age: "30",
    contactEmail: "john.doe@example.com",
    contactNumber: "+1 (555) 123-4567",
    sampleDisease: "None"
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/placeholder.svg?height=80&width=80" alt={user.name || "User"} />
          <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl">{user.name || "Anonymous User"}</CardTitle>
          <p className="text-sm text-muted-foreground">Public Key: {user.publicKey}</p>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Address", value: user.address },
            { label: "Gender", value: user.gender },
            { label: "Age", value: user.age },
            { label: "Email", value: user.contactEmail },
            { label: "Phone", value: user.contactNumber },
            { label: "Sample Disease", value: user.sampleDisease }
          ].map((item) => (
            item.value && (
              <div key={item.label} className="flex flex-col space-y-1">
                <dt className="text-sm font-medium text-muted-foreground">{item.label}</dt>
                <dd className="text-base">{item.value}</dd>
              </div>
            )
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}