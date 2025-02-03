"use client";

import { CreateDocument } from "@/components/dashboard/documents/AddDocument";
import { MyDocuments } from "@/components/dashboard/documents/MyDocuments";
import { Pending } from "@/components/dashboard/documents/Pending";
import { Approved } from "@/components/dashboard/documents/Approved";
import { Tab, Tabs } from "@nextui-org/react";
import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations("document");
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto flex-grow h-fit min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{t("name")}</h2>
        <div className="flex gap-4">
          <CreateDocument />
        </div>
      </div>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
      {/* Documents List */}
      <div className="flex flex-col items-center flex-1">
        <Tabs
          color="primary"
          defaultSelectedKey={"myDocuments"}
          aria-label="Dashboard Tabs"
        >
          {/* My Documents */}
          <Tab className="w-full flex-1" key="myDocuments" title="My Documents">
            <MyDocuments />
          </Tab>

          {/* Approved Documents*/}
          <Tab className="w-full flex-1" key="Approved" title="Approved">
            <Approved />
          </Tab>

          {/* Pending Documents*/}
          <Tab className="w-full flex-1" key="pinding" title="Pending">
            <Pending />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

// "use client";

// import { Button } from "@nextui-org/react";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// const  = [
//   { id: 1, name: "Document 1", type: "Approved" },
//   { id: 2, name: "Document 2", type: "Approved" },
//   { id: 3, name: "Document 3", type: "Pending" },
//   { id: 4, name: "Document 4", type: "Pending" },
//   { id: 5, name: "Document 5", type: "Approved" },
//   { id: 6, name: "Document 6", type: "Pending" },
// ];

// export default function DocumentList() {
//   const { locale } = useParams();
//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 mx-auto flex-grow">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-800">Documents</h2>
//         <div className="flex gap-4">
//           <Button className="bg-gradient-to-r from-deepRed to-brightRed text-white py-2 px-4 rounded-lg shadow">
//             My Docmuents
//           </Button>
//           <Button className="bg-gradient-to-r from-deepRed to-brightRed text-white py-2 px-4 rounded-lg shadow">
//             Upload new Document
//           </Button>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>

//       {/* Template List */}
//       <div className="space-y-4">
//         {templates.map((template) => (
//           <div
//             key={template.id}
//             className="flex items-center justify-between bg-gradient-to-r from-deepBlue to-lightBlue text-white py-3 px-4 rounded-lg shadow-md"
//           >
//             {/* Template Info */}
//             <div className="flex items-center gap-4">
//               <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-blue-600 font-bold">
//                 {template.name.charAt(0)}
//               </div>
//               <div>
//                 <p className="text-lg font-medium">{template.name}</p>
//                 <p className="text-sm font-light">{template.type}</p>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex gap-4 items-center">
//               <Link
//                 href={`/${locale}/dashboard/documents/${template.id}`}
//                 className="underline text-white"
//               >
//                 Edit
//               </Link>
//               <Link
//                 href={`#`}
//                 className="underline text-white"
//               >
//                 Remove
//               </Link>
//               {template.type === "Pending" && (
//                 <span className="bg-brightRed text-white px-3 py-1 rounded">{template.type}</span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
