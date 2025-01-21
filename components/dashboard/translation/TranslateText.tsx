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
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslateMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";


const schema = yup.object({
  htmlStrings: yup.string().required("Text is required"),
  original_lang: yup
    .string()
    .oneOf(["en", "ar"] as const, "Invalid original language selection")
    .required("Original language is required"),
  target_lang: yup
    .string()
    .oneOf(["en", "ar"] as const, "Invalid target language selection")
    .required("Target language is required"),
});

type TranslationFormValues = yup.InferType<typeof schema>;

export const Static = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  // const [streamedResponse, setStreamedResponse] = useState<string>(""); // Array to store streamed key-value pairs

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<TranslationFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      htmlStrings: "",
      original_lang: "en",
      target_lang: "ar",
    },
  });

  // RTK Query mutation hook for translation
  const [translate, { data, error, isLoading }] = useTranslateMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await translate(data).unwrap();
      console.log(response);
      // console.log("Translated Text:", response); // Log the plain text response
      // setStreamedResponse(response);

      // let wordIndex = 0;
      // const words = response.split(" ");
      // console.log(words)
      // // Simulate a streaming effect
      // const streamSummary = () => {
      //   console.log(words.at(-1))
      //   if (wordIndex < words.length) {
      //     setStreamedResponse((prev) => prev + " " + words[wordIndex]);
      //     wordIndex++;
      //     setTimeout(streamSummary, 100); // Adjust delay as needed
      //   }
      // };

      // streamSummary();
      onClose();
      reset();
    } catch (error) {
      console.error("Translation Error:", error);
    }
  });

  return (
    <>
      <Button onClick={onOpen} color="primary">
        Open Translation Form
      </Button>

      {/* Modal */}
      <Modal scrollBehavior="inside" isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h4>Translate Text</h4>
              </ModalHeader>
              <ModalBody>
                <form
                  id="translationForm"
                  onSubmit={onSubmit}
                  className="flex flex-col gap-5"
                >
                  {/* Textarea for text */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Text
                    </label>
                    <Textarea
                      {...register("htmlStrings")}
                      placeholder="Type or paste your text here..."
                      //   className="mt-1 block w-full px-3 py-2 border rounded-md"
                      rows={10}
                    />
                    {errors.htmlStrings && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.htmlStrings.message}
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
                      <SelectItem key="en" value="en">
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
