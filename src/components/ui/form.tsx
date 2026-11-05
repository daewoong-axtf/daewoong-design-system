"use client"

import * as React from "react"
import { CircleAlertIcon } from "lucide-react"
import { Slot } from "radix-ui"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

type FormItemContextValue = {
  id: string
  hasDescription: boolean
  setHasDescription: (value: boolean) => void
}

const FormItemContext = React.createContext<FormItemContextValue>({
  id: "",
  hasDescription: false,
  setHasDescription: () => {},
})

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)
  const { id, hasDescription, setHasDescription } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    hasDescription,
    setHasDescription,
    ...fieldState,
  }
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()
  const [hasDescription, setHasDescription] = React.useState(false)
  const value = React.useMemo(() => ({ id, hasDescription, setHasDescription }), [id, hasDescription])

  return (
    <FormItemContext.Provider value={value}>
      <div data-slot="form-item" className={cn("grid gap-2", className)} {...props} />
    </FormItemContext.Provider>
  )
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  const { formItemId } = useFormField()

  return <Label data-slot="form-label" className={className} htmlFor={formItemId} {...props} />
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot.Root>) {
  const { error, formItemId, formDescriptionId, formMessageId, hasDescription } = useFormField()
  // 지금 보이는 쪽만 잇는다 — 오류가 나면 설명은 숨는다 (design/components/field.md)
  const describedBy = error ? formMessageId : hasDescription ? formDescriptionId : undefined

  return (
    <Slot.Root
      data-slot="form-control"
      id={formItemId}
      aria-describedby={describedBy}
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formDescriptionId, setHasDescription } = useFormField()

  React.useEffect(() => {
    setHasDescription(true)
    return () => setHasDescription(false)
  }, [setHasDescription])

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      hidden={!!error}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function FormMessage({ className, children, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("flex items-start gap-1.5 text-destructive text-sm", className)}
      {...props}
    >
      <CircleAlertIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {body}
    </p>
  )
}

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField }
