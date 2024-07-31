'use client'
 
import { useToast } from "@/components/ui/use-toast"
import { useFormStatus } from 'react-dom'

 
export function Status() {
  const { pending, data } = useFormStatus()
  const {toast} = useToast()
 
  return (
        <div>  
          {pending && <p>Creating Notification...</p>}
          {data && '${data?.get("notification")?.id} Created!</p>'}

        </div>
      )
}