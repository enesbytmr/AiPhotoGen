import React from 'react'
import Header from '@/components/shared/Header'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm'
import { auth } from '@clerk/nextjs';
import {getUserById} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";
const AddTransformationTypePage = async ( {params: {type}}: SearchParamProps) => {
    const { userId } = auth();
    const trasnformations = transformationTypes[type]
    if(!userId) redirect("/sign-in")
    const user = await getUserById(userId)



  return (
    <>
      <Header title={trasnformations.title} subtitle={trasnformations.subTitle} />
        <section className={"mt-10"}>
            <TransformationForm
                action={"Add"}
                userId={user._id}
                type={trasnformations.type as TransformationTypeKey}
                creditBalance={user.creditBalance}
            />
        </section>


    </>
  )
}

export default AddTransformationTypePage
