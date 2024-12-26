"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";

const templates = [
  { id: 1, name: "Template 1", type: "Secondary" },
  { id: 2, name: "Template 2", type: "Secondary" },
  { id: 3, name: "Template 3", type: "Secondary" },
  { id: 4, name: "Template 4", type: "Secondary" },
  { id: 5, name: "Template 5", type: "Secondary" },
  { id: 6, name: "Tenant Name", type: "Secondary" },
];
export default function Page() {
  const { locale } = useParams();
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto flex-grow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Templates</h2>
        <div className="flex gap-4">
          <Button className="bg-gradient-to-r from-deepRed to-brightRed  text-white py-2 px-4 rounded-lg shadow">
            My Templates
          </Button>
          <Button className="bg-gradient-to-r from-deepRed to-brightRed text-white py-2 px-4 rounded-lg shadow">
            Upload new Template
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>

      {/* Template List */}
      <div className="space-y-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="flex items-center justify-between bg-gradient-to-r from-deepBlue to-lightBlue text-white py-3 px-4 rounded-lg shadow-md"
          >
            {/* Template Info */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-blue-600 font-bold">
                {template.name.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-medium">{template.name}</p>
                <p className="text-sm font-light">{template.type}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 items-center">
              <Link
                href={`/${locale}/dashboard/templates/${template.id}`}
                className=" underline text-white "
              >
                Edit
              </Link>
              <Link
                href={`/${locale}/dashboard/templates/${template.id}`}
                className=" underline text-white "
              >
                Remove
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
