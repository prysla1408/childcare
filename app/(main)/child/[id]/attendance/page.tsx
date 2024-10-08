import { fetcAttendanceByChild, fetcChild } from "@/backend/controller";
import { attendColumns } from "@/components/columns/attendColumns";
import GoBack from "@/components/GoBack";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/ui/datatable";

async function getData(id: string){
  const attendance = await fetcAttendanceByChild(id) ?? [];
  const child = await fetcChild(id) ?? [];
  return { attendance,child };
}

export default async function Home({ params }:{ params: { id: string }}) {
  const {attendance, child }:any = await getData(params?.id);

  return (
    <main className="px-3 md:px-0 min-h-screen bg-primarybg/70 flex flex-col">
      <div className="py-4 md:py-10 md:mx-auto w-full md:max-w-7xl flex flex-col space-y-4 md:space-y-14">
         <PageTitle label="CHILD ATTENDANCE">
           <GoBack />
         </PageTitle>
         <div className="px-10 py-6 flex flex-col space-y-4 bg-white shadow-[0px_0px_8px_#ccc_inset] rounded-xl">
            <div className="px-4 py-2 w-full md:w-fit rounded bg-primary/90 text-primarybg text-[0.65rem] md:text-sm font-bold tracking-widest">{child?.firstName.toUpperCase()} {child?.lastName.toUpperCase()}</div>
            <div>
              <DataTable columns={attendColumns} data={attendance} />
            </div>
         </div>
      </div>
    </main>
  );
}
