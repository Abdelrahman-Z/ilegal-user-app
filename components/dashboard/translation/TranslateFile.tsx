import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslateFileMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";

// Update schema to allow PDF, .txt, and Word documents
const schema = yup.object({
  file: yup.mixed<File>().required("File is required"),
  original_lang: yup
    .string()
    .oneOf(["en", "ar"] as const, "Invalid original language selection")
    .required("Original language is required"),
  target_lang: yup
    .string()
    .oneOf(["en", "ar"] as const, "Invalid target language selection")
    .required("Target language is required"),
});

type FileTranslationFormValues = yup.InferType<typeof schema>;

export const TranslateFile = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  // const [streamedResponse, setStreamedResponse] = useState<string>("");

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<FileTranslationFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      original_lang: "en",
      target_lang: "ar",
    },
  });

  const [translate, { data, isLoading, error }] = useTranslateFileMutation();

  const onSubmit = handleSubmit(async (data) => {
    // @ts-expect-error  -> error from the YUP resolver
    const file = data.file?.[0];
    try {
      const formData = new FormData();
      formData.append("file", file as File);
      formData.append("original_lang", data.original_lang);
      formData.append("target_lang", data.target_lang);

      const response = await translate(formData).unwrap();
      console.log(response)
      onClose();
      reset();
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <>
      <Button onClick={onOpen} color="primary">
        Open File Translation Form
      </Button>

      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h4>Translate File</h4>
              </ModalHeader>
              <ModalBody>
                <form
                  id="translationForm"
                  onSubmit={onSubmit}
                  className="flex flex-col gap-5"
                >
                  {/* File Upload */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      File Upload
                    </label>
                    <Input
                      type="file"
                      accept=".pdf" // Accept only specified file types
                      {...register("file")}
                      className={`mt-1 block w-full ${
                        errors.file ? "border-red-500" : ""
                      }`}
                    />
                    {errors.file && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.file.message}
                      </p>
                    )}
                  </div>

                  {/* Original Language Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Original Language
                    </label>
                    <Select
                      label="Select Original Language"
                      placeholder="Choose the original language"
                      defaultSelectedKeys={["en"]}
                      onSelectionChange={(value) =>
                        setValue(
                          "original_lang",
                          value.currentKey as "en" | "ar"
                        )
                      }
                    >
                      <SelectItem key="en" value="ar">
                        English
                      </SelectItem>
                      <SelectItem key="ar" value="ar">
                        Arabic
                      </SelectItem>
                    </Select>
                    {errors.original_lang && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.original_lang.message}
                      </p>
                    )}
                  </div>

                  {/* Target Language Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Target Language
                    </label>
                    <Select
                      label="Select Target Language"
                      placeholder="Choose the target language"
                      defaultSelectedKeys={["ar"]}
                      onSelectionChange={(value) =>
                        setValue("target_lang", value.currentKey as "en" | "ar")
                      }
                    >
                      <SelectItem key="en" value="en">
                        English
                      </SelectItem>
                      <SelectItem key="ar" value="ar">
                        Arabic
                      </SelectItem>
                    </Select>
                    {errors.target_lang && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.target_lang.message}
                      </p>
                    )}
                  </div>
                </form>
              </ModalBody>
              {error && isFetchBaseQueryError(error) && (
                <div className="mt-4">
                  <p className="text-red-500 text-sm">
                    {error.data &&
                    typeof error.data === "object" &&
                    "message" in error.data
                      ? (error.data as { message: string }).message
                      : "An error occurred. Please try again."}
                  </p>
                </div>
              )}
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    reset();
                  }}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  form="translationForm"
                  isLoading={isLoading}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {data && (
        <div
          className="mt-5 whitespace-pre-wrap"
          dir={data.target_lang === "ar" ? "rtl" : "ltr"}
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></div>
      )}
    </>
  );
};
