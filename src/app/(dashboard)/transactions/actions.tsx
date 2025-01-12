'use client'

import { EditIcon, MoreHorizontalIcon, TrashIcon } from 'lucide-react'

import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction'
import { useDeleteTransaction } from '@/features/transactions/api/use-delete-transaction'

import { useConfirm } from '@/hooks/use-confirm'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Props = {
  id: string
}

export function Actions({ id }: Props) {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this transaction.'
  )

  const deleteMutation = useDeleteTransaction(id)
  const { onOpen } = useOpenTransaction()

  const handleDelete = async () => {
    const ok = await confirm()

    if (ok) deleteMutation.mutate()
  }

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className='size-8 p-0'>
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <EditIcon className='size-4 mr-2' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
            className='text-destructive focus:text-destructive hover:text-destructive'
          >
            <TrashIcon className='size-4 mr-2' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}