import { Fragment, Ref, SyntheticEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../Button';
import type { FormDataProps, FormSchema } from './types/Formtypes';
import { ALIGNMENT } from '../../../../Shared/Constants';
import RenderField from './RenderFields';

function AddHorizontalTitle({
  isLine,
  title,
}: {
  isLine: boolean | undefined;
  title: string | undefined;
}) {
  if (isLine && !title) {
    return <hr className="mt-4 hr_line" />;
  }
  if (isLine && title) {
    return (
      <div className="col-12">
        <div className="text-center title_hr">
          <h2 className="h4 mb-0">{title}</h2>
        </div>
      </div>
    );
  }
  if (title) {
    return <h2 className="h2 mt-2 hr_title">{title}</h2>;
  }
  return null;
}

interface CustomFormProps {
  submitText?: string;
  preSubmitElement?: JSX.Element;
  onSubmit?: (
    data: Record<string, unknown>,
    event: SyntheticEvent,
    reset: () => void
  ) => void;
  id: string;
  defaultValues?: Record<string, unknown>;
  formData: Record<string, FormDataProps>;
  handleStateDataChange?: (name: string, value: unknown, type: string) => void;
  secondaryBtnText?: string;
  handleSecondaryButtonClick?: () => void;
  secondaryButtonType?: 'submit' | 'button';
  className?: string;
  isShowSubmit?: boolean;
  isShowSecondaryBtn?: boolean;
  isDisabledSubmit?: boolean;
  submitBtnClassName?: string;
  alignFormActionBtns?: string;
  secondaryBtnClassName?: string;
  postSubmitElement?: JSX.Element;
}

function CustomForm({
  submitText = 'Submit',
  preSubmitElement,
  onSubmit = () => {},
  id = 'hook-form',
  defaultValues = {},
  formData = {},
  handleStateDataChange = () => {},
  secondaryBtnText = '',
  handleSecondaryButtonClick,
  secondaryButtonType = 'button',
  className = '',
  isShowSubmit = true,
  isShowSecondaryBtn = false,
  isDisabledSubmit = false,
  submitBtnClassName = 'btn-md w-100',
  alignFormActionBtns = ALIGNMENT.CENTER,
  secondaryBtnClassName = 'btn-md text-captialize w-100 text-[20px] font-urw-geometric-light capitalize',
  postSubmitElement,
}: CustomFormProps) {
  const [isResetForm, setIsResetForm] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    control,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: { ...defaultValues } });

  const handleInputChange = (name: string, value: unknown) => {
    setValue(name, value);
    // onChangeValues(name, value);
  };

  useEffect(() => {
    if (Object.keys(defaultValues).length && isResetForm) {
      reset({ ...defaultValues });
    }
  }, [defaultValues, isResetForm, reset]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name && type) {
        handleStateDataChange(name, value[name], type);
      }
    });
    return () => subscription.unsubscribe();
  }, [handleStateDataChange, watch]);

  const handleRegister = (key: string) => {
    const { schema } = formData[key];

    if (typeof schema === 'function') {
      const [password, oldPassword] = watch(['password', 'oldPassword']);
      const schemaFunction = schema as (
        password: string,
        oldPassword: string
      ) => FormSchema;

      const schemaResult = schemaFunction(
        oldPassword as string,
        password as string
      );

      return register(key, schemaResult as FormDataProps);
    }

    return register(key, schema as FormDataProps);
  };

  const getAlignmentForFormActionBtn = () => {
    switch (alignFormActionBtns) {
      case ALIGNMENT.LEFT:
        return 'flex btn_groups gap-2 mt-4 mb-3 justify-center items-center w-full';
      case ALIGNMENT.RIGHT:
        return 'flex btn_groups gap-2 mt-4 mb-3 justify-end items-center';
      default:
        return 'flex btn_groups gap-2 pt-[12px] mb-3 justify-center items-center';
    }
  };

  const handleSubmitClick = (
    data: Record<string, unknown>,
    event: SyntheticEvent,
    resetFn: () => void
  ) => {
    onSubmit(data, event, resetFn);
    setIsResetForm(false);
  };
  return (
    <form
      id={id}
      className={className}
      // onSubmit={handleSubmit(onSubmit)}
    >
      {Object.keys(formData).map((key) => {
        return (
          <Fragment key={key}>
            <AddHorizontalTitle
              isLine={formData[key]?.addHorizontalLine}
              title={formData[key]?.addHorizontalTitle}
            />
            <RenderField
              id={key}
              field={formData[key]}
              handleRegister={
                handleRegister as unknown as () => Ref<HTMLInputElement>
              }
              handleInputChange={handleInputChange}
              value={getValues()?.[key]}
              errors={errors}
              control={control}
            />
          </Fragment>
        );
      })}
      {preSubmitElement}
      <div className={getAlignmentForFormActionBtn()}>
        {isShowSecondaryBtn && (
          <Button
            btnType="secondary"
            size="large"
            data-content={secondaryBtnText}
            type={secondaryButtonType}
            onClick={
              secondaryButtonType === 'submit'
                ? handleSubmit(
                    handleSecondaryButtonClick as SubmitHandler<{
                      [x: string]: unknown;
                    }>
                  )
                : handleSecondaryButtonClick
            }
            className={secondaryBtnClassName}
          >
            {secondaryBtnText}
          </Button>
        )}
        {isShowSubmit ? (
          <Button
            btnType="primary"
            size="large"
            onClick={handleSubmit((data, event) =>
              handleSubmitClick(data, event as SyntheticEvent, reset)
            )}
            type="submit"
            className={submitBtnClassName}
            disabled={isDisabledSubmit}
          >
            {submitText}
          </Button>
        ) : null}
      </div>
      {postSubmitElement}
    </form>
  );
}

export default CustomForm;
