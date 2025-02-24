import React from "react";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useCreateQuestionMutation,
  useGetQuestionsQuery,
} from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { useTranslations } from "next-intl";


// Validation schema using Yup
const schema = yup.object().shape({
  key: yup.string().required("Key is required"),
  value: yup.string().required("Value is required"),
  public: yup.boolean(),
});

export const AddQuestion = () => {
  const t = useTranslations("summarization");
  const [page, setPage] = React.useState(1); // Track the current page
  const rowsPerPage = 10; // Number of rows per page

  // Fetch data using RTK Query
  const { data, isFetching } = useGetQuestionsQuery({
    page,
    limit: rowsPerPage,
  });

  const totalPages = React.useMemo(() => {
    return data?.metadata?.totalPages || 0; // Calculate total pages from metadata
  }, [data?.metadata]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Redux Toolkit Query mutation
  const [createQuestion, { isLoading, error }] = useCreateQuestionMutation();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const isPublic = watch("public", false);

  // Submit handler
  const onSubmit = handleSubmit(async (data) => {
    try {
      await createQuestion({
        key: data.key,
        value: data.value,
        public: data.public || false,
      }).unwrap(); // Make API call and handle errors
      onClose(); // Close modal on success
      reset(); // Reset form
    } catch (error) {
      console.error("Error creating question:", error);
    }
  });
  return (
    <div className="flex-1">
      <Button onClick={onOpen} color="primary">
        {t("addQuestion.addQuestion")}
      </Button>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <form id="questionForm" onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                <h4>{t("addQuestion.title")}</h4>
              </ModalHeader>
              <ModalBody>
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
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                  {t("addQuestion.key")}
                  </label>
                  <Input
                    type="text"
                    {...register("key")}
                    className={`mt-1 block w-full rounded-md text-black`}
                    color={errors.key ? "danger" : "default"}
                  />
                  {errors.key && (
                    <p style={{ color: "red" }}>{errors.key.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                  {t("addQuestion.value")}
                  </label>
                  <Textarea
                    placeholder={t("addQuestion.text")}
                    fullWidth
                    rows={5}
                    {...register("value")}
                  />
                  {errors.value && (
                    <p style={{ color: "red" }}>{errors.value.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <Checkbox
                    isSelected={isPublic}
                    onValueChange={(checked) => setValue("public", checked)}
                  >
                    {t("addQuestion.public")}
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    reset();
                  }}
                >
                  {t("addQuestion.close")}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  form="questionForm"
                  isLoading={isLoading}
                >
                  {t("addQuestion.submit")}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
      <div className="mt-4">
        <Table
          aria-label="Paginated Table with RTK Query"
          bottomContent={
            totalPages > 0 ? (
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={totalPages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            ) : null
          }
        >
          <TableHeader>
            <TableColumn key="key">{t("addQuestion.key")}</TableColumn>
            <TableColumn key="value">{t("addQuestion.value")}</TableColumn>
            <TableColumn key="public">{t("addQuestion.public")}</TableColumn>
          </TableHeader>
          <TableBody
            items={data?.data ?? []} // Render rows using fetched data
            loadingContent={<Spinner />}
            loadingState={isFetching ? "loading" : "idle"}
          >
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.key}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{item.public ? "Yes" : "No"}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
