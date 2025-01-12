import { Loader2Icon } from 'lucide-react'

import TransactionForm, {
  ApiFormValues,
} from '@/features/transactions/components/transaction-form'
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction'
import { useGetTransaction } from '@/features/transactions/api/use-get-transaction'
import { useEditTransaction } from '@/features/transactions/api/use-edit-transaction'
import { useDeleteTransaction } from '@/features/transactions/api/use-delete-transaction'

import { useGetCategories } from '@/features/categories/api/use-get-categories'
import { useCreateCategory } from '@/features/categories/api/use-create-category'

import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useCreateAccount } from '@/features/accounts/api/use-create-account'

import { useConfirm } from '@/hooks/use-confirm'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

export default function EditTransactionSheet() {
  const { isOpen, onClose, id } = useOpenTransaction()

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this transaction.'
  )

  const transactionQuery = useGetTransaction(id)
  const editMutation = useEditTransaction(id)
  const deleteMutation = useDeleteTransaction(id)

  const categoriesQuery = useGetCategories()
  const categoryMutation = useCreateCategory()
  const onCreateCategory = (name: string) =>
    categoryMutation.mutate({
      name,
    })
  const categoryOptions = (categoriesQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }))

  const accountsQuery = useGetAccounts()
  const accountMutation = useCreateAccount()
  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    })
  const accountOptions = (accountsQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }))

  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending ||
    transactionQuery.isLoading ||
    categoryMutation.isPending ||
    accountMutation.isPending
  const isLoading =
    transactionQuery.isLoading ||
    categoriesQuery.isLoading ||
    accountsQuery.isLoading

  const onSubmit = (values: ApiFormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => onClose(),
    })
  }

  const defaultValues = transactionQuery.data
    ? {
        ...transactionQuery.data,
        amount: transactionQuery.data.amount.toString(),
        date: transactionQuery.data.date
          ? new Date(transactionQuery.data.date)
          : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes,
      }
    : {
        accountId: '',
        categoryId: '',
        amount: '',
        date: new Date(),
        payee: '',
        notes: '',
      }

  const onDelete = async () => {
    const ok = await confirm()

    if (ok)
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose()
        },
      })
  }

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className='space-y-4'>
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Loader2Icon className='size-4 text-muted-foreground animate-spin' />
            </div>
          ) : (
            <TransactionForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
