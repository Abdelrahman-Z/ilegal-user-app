import { AllPermissions } from "@/components/dashboard/permissions/allPermissions";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("permissions");
  return <div className="bg-white shadow-md rounded-lg p-6 mx-auto overflow-auto flex-grow flex flex-col">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-semibold text-gray-800">{t("name")}</h2>
    <div></div>
  </div>
  <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>
  <div className="flex flex-col items-center flex-1">
    <AllPermissions/>
  </div>
</div>;
}
