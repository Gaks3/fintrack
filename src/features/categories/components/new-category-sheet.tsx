import CategoryForm, {
  FormValues,
} from '@/features/categories/components/category-form'
import { useNewCategory } from '@/features/categories/hooks/use-new-category'
import { useCreateCategory } from '@/features/categories/api/use-create-category'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

export default function NewCategorySheet() {
  const { isOpen, onClose } = useNewCategory()

  const mutation = useCreateCategory()

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => onClose(),
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your transactions.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          defaultValues={{ name: '' }}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  )
}
