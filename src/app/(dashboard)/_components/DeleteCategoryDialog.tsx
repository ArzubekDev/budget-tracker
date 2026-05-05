'use client'

import { Category } from "@/generated/client";
import { ReactNode } from "react";

interface Props {
    trigger: ReactNode;
    category: Category
}

const DeleteCategoryDialog = ({trigger, category}: Props) => {
  return (
    <div>DeleteCategoryDialog</div>
  )
}

export default DeleteCategoryDialog