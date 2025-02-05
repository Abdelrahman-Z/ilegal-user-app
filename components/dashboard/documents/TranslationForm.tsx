import { Button, Input } from "@nextui-org/react";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DecoupledEditor } from "ckeditor5";

const schema = yup.object({
  translations: yup.array().of(
    yup.object({
      token: yup.string().required(),
      value: yup.string().required()
    })
  )
});

type FormValues = yup.InferType<typeof schema>;

interface TranslationFormProps {
  editorInstance: DecoupledEditor | null;
}

export const TranslationForm = ({ editorInstance }: TranslationFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      translations: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "translations",
  });

  useEffect(() => {
    if (editorInstance) {
      const content = editorInstance?.getData();
      const tokenMatches = content?.match(/{{(.*?)}}/g);
      if (tokenMatches) {
        const uniqueTokens = [...new Set(tokenMatches.map(t => t.replace(/{{|}}/g, "")))];
        const initialTranslations = uniqueTokens.map(token => ({
          token,
          value: "",
        }));
        reset({ translations: initialTranslations });
      } else {
        reset({ translations: [] });
      }
    }
  }, [editorInstance, reset]);

  const translate = handleSubmit((data) => {
    if (editorInstance) {
      let content = editorInstance.getData();
      data.translations?.forEach(({ token, value }) => {
        if (value?.trim()) {
          const placeholder = new RegExp(`{{${token}}}`, "g");
          content = content.replace(placeholder, value);
        }
      });
      editorInstance.setData(content);
      reset({ translations: data.translations?.map(t => ({ ...t, value: "" })) ?? [] });
    }
  });

  if (fields.length === 0) return null;

  return (
    <div className="w-1/3">
      <form id="createTemplateForm" className="flex flex-col m-5" onSubmit={translate}>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Translate Tokens
        </label>
        <div className="items-end flex flex-col">
          {fields.map((field, index) => (
            <div key={field.id} className="gap-2 w-full">
              <label>{field.token}:</label>
              <Input
                type="text"
                {...register(`translations.${index}.value`, {
                  required: "This field is required",
                })}
                placeholder={`Replace ${field.token}`}
                isInvalid={!!errors.translations?.[index]?.value}
                errorMessage={errors.translations?.[index]?.value?.message}
              />
            </div>
          ))}
          <Button
            type="submit"
            className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow mt-4"
          >
            Translate
          </Button>
        </div>
      </form>
    </div>
  );
}; 