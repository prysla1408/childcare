
"use client"
import { postMedical } from "@/backend/controller";
import { useLayoutEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { SheetClose } from "../ui/sheet";
import { toast } from "../ui/use-toast";

type Props = {
    data?: any;
}
 

function MedicalForm({ data }: Props) {
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement>(null);
  const [helper, setHelper]:any = useState({})
  
  const getData = async () => {
      const resp = await fetch(`/api/helpers?action=child`, { cache: 'no-store'});
      const child = await resp.json()
      if(child) setHelper({ child })
  }

  const action = async (formData: FormData) => {
    const resp = await postMedical(formData);
    if(resp){
       formRef.current?.reset(); 
       toast({
          title: "Record Saved!",
          className:"py-3 px-4 bg-green-100 text-green-800",
       })
    } else {
        toast({
           title: "Submission failed!",
           className:"py-3 px-4 bg-red-100 text-red-800",
        })
    }
  }

  useLayoutEffect(() => {
    getData();
  },[])

  return (
    <form 
        action={ action } 
        className="py-10 w-full min-h-fit grid gap-6 overflow-y-scroll"
        ref={formRef}
    >
        <label htmlFor="" className=" w-full grid gap-1.5">
            <span className="indent-4 font-bold text-base text-primary/80 ">Name of Child</span>
            <select name="childId" defaultValue={data?.childId} className="px-4 py-2 bg-[#FAF6F2] rounded-full text-primary shadow focus:outline-none focus:ring-4 focus:ring-secondary/40 w-full">
             <option>-- Choose Child --</option>
              { helper?.child?.map((row:any) => (
                <option key={row?.id} value={row?.id} selected={data?.childId == row?.id}>{row?.firstName} {row?.lastName} ({row?.reference}) - {row?.nursery?.name}</option>    
              ))}
            </select>
        </label>
       
        <label htmlFor="" className="grid gap-1.5">
            <span className="indent-4 font-bold text-base text-primary/80">Allergies</span>
            <textarea name="allergies" defaultValue={data?.allergies} placeholder="Allergies" rows={4} className="px-4 py-2 bg-[#FAF6F2] rounded-lg text-primary shadow focus:outline-none focus:ring-4 focus:ring-secondary/40"/>
        </label>

        <label htmlFor="" className="grid gap-1.5">
            <span className="indent-4 font-bold text-base text-primary/80">Medications</span>
            <textarea name="medication" defaultValue={data?.medication} placeholder="Medication" rows={4} className="px-4 py-2 bg-[#FAF6F2] rounded-lg text-primary shadow focus:outline-none focus:ring-4 focus:ring-secondary/40"/>
        </label>

        <label htmlFor="" className="grid gap-1.5">
            <span className="indent-4 font-bold text-base text-primary/80">Special Needs</span>
            <textarea name="specialNeeds" defaultValue={data?.specialNeeds} placeholder="Special Needs" rows={4} className="px-4 py-2 bg-[#FAF6F2] rounded-lg text-primary shadow focus:outline-none focus:ring-4 focus:ring-secondary/40"/>
        </label>
        
       
        <input name="id" defaultValue={data?.id} type="hidden" />
        <SheetClose asChild>
        { pending 
          ? <button type="button" disabled className=" px-6 py-2 mx-auto w-3/5 bg-secondary/30 border-b-8 border-primary/20 rounded text-primary font-black text-lg">
                <span>SAVING ...</span>
            </button>  
          : <button type="submit" className="px-6 py-2 mx-auto w-3/5 bg-secondary/60 border-b-8 border-primary/20 rounded text-primary font-black text-lg">
                <span>SAVE</span>
            </button>
        }
        </SheetClose>
    </form>
  )
}

export default MedicalForm