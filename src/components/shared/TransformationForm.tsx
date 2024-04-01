"use client"
import React, {useState} from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {aspectRatioOptions, defaultValues, transformationTypes} from "@/constants";
import {CustomField} from "@/components/shared/CustomField";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {AspectRatioKey} from "@/lib/utils";

export const formSchema = z.object({
    title: z.string() ,
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
    theme: z.string().optional(),
})

const TransformationForm = ({action , data = null, userId,type ,creditBalance , config= null} : TransformationFormProps) => {
    const transformationType = transformationTypes[type]

    const [image, setImage] = useState(data)
    const [newTransformation , setNewTransformation] =  useState<Transformations | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isTransforming, setIsTransforming] = useState(false)
    const [transformationConfig, setTransformation] = useState(config)


    const initialValues = data && action === "Update" ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,
    } : defaultValues

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,

    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
    }
    const onSelecetFieldHandler = (value: string, OnChangeField: (value:string) => void) => {
    }

    const onInputChangeHandler = (fielName: string, value: string, type: string, onChange: (value: string) => void) => {}

    const onTranformHandler = () => {}

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {type === 'readme' ? (
                    <CustomField
                        control={form.control}
                        name="title"
                        formLabel="Repository URL"
                        className="w-full"
                        render={({ field }) => <Input {...field} className="input-field" />}
                    />
                ) : (
                    <>
                        <CustomField
                            control={form.control}
                            name="title"
                            formLabel="Image Title"
                            className="w-full"
                            render={({ field }) => <Input {...field} className="input-field" />}
                        />
                        {type === 'fill' && (
                            <CustomField
                                control={form.control}
                                name="aspectRatio"
                                formLabel="Aspect Ratio"
                                className="w-full"
                                render={({ field }) => (
                                    <Select
                                        onValueChange={(value) => onSelecetFieldHandler(value, field.onChange)}
                                    >
                                        <SelectTrigger className="select-field">
                                            <SelectValue placeholder="Select Size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.keys(aspectRatioOptions).map((key) => (
                                                <SelectItem key={key} value={key} className={"select-item"}>
                                                    {aspectRatioOptions[key as AspectRatioKey].label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        )}
                    </>
                )}

                {(type === 'remove' || type === 'recolor') && (
                    <div className={"prompt-field"}>
                        <CustomField
                        control={form.control}
                        name="prompt"
                        formLabel={(type === 'remove') ? "Object to Remove" : "Object to Recolor"}
                        className={"w-full"}
                        render={({ field }) => (
                            <Input
                            value={field.value}
                            className={"input-field"}
                            onChange={(e)=> onInputChangeHandler(
                                'prompt',
                                e.target.value,
                                type,
                                field.onChange
                            )}/>

                        )}
                        />
                        {type === 'recolor' && (
                            <CustomField
                            control={form.control}
                            name="color"
                            formLabel="Replacement Color"
                            className="w-full"
                            render={({ field }) => (
                                <Input
                                value={field.value}
                                className="input-field"
                                onChange={(e) => onInputChangeHandler(
                                    'color',
                                    e.target.value,
                                    'recolor',
                                    field.onChange
                                )}/>
                            )}
                            />
                        )}
                    </div>
                    )
                }
                <div className={"flex flex-col gap-4"}>
                    <Button
                    className={"submit-button capitalize"}
                    disabled={isTransforming || newTransformation === null}
                    onClick={onTranformHandler}
                    type="button">
                        {isTransforming ? "Transforming..." : "Apply Transformation"}
                    </Button>

                    <Button
                    className={"submit-button capitalize"}
                    disabled={isSubmitting}
                    type="submit">{isSubmitting ? "Submitting..." : "Save Image"}
                    </Button></div>


            </form>
        </Form>
    );
}

export default TransformationForm;