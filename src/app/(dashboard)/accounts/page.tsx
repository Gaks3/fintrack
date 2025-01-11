'use client'

import { Loader2Icon, PlusIcon } from 'lucide-react'

import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { useBulkDeleteAccounts } from '@/features/accounts/api/use-bulk-delete-accounts'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Skeleton } from '@/components/ui/skeleton'

import { columns } from './columns'

export default function AccountsPage() {
  const newAccount = useNewAccount()
  const deleteAccounts = useBulkDeleteAccounts()
  const accountsQuery = useGetAccounts()
  const accounts = accountsQuery.data || []

  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending

  if (accountsQuery.isLoading)
    return (
      <div className='max-w-screen-xl mx-auto w-full pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader>
            <Skeleton className='h-8 w-48' />
          </CardHeader>
          <CardContent>
            <div className='h-[500px] w-full flex items-center justify-center'>
              <Loader2Icon className='size-6 text-slate-300 animate-spin' />
            </div>
          </CardContent>
        </Card>
      </div>
    )

  return (
    <div className='max-w-screen-xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>Accounts Page</CardTitle>
          <Button size={'sm'} onClick={newAccount.onOpen}>
            <PlusIcon className='size-4 mr-2' /> Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accounts}
            filterKey='name'
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id)
              deleteAccounts.mutate({ ids })
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  )
}
