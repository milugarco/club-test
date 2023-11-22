import { useMemo, useState, useEffect } from 'react'
import Table from '@/components/ui/Table'
import { useNavigate } from 'react-router-dom'
import Input from '@/components/ui/Input'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import { data10 } from '../interface/data'

import type {
    ColumnDef,
    FilterFn,
    ColumnFiltersState
} from '@tanstack/react-table'
import type { InputHTMLAttributes } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import Select from '@/components/ui/Select'
import Pagination from '@/components/ui/Pagination'

interface DebouncedInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'onChange' | 'size' | 'prefix'
    > {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
}

const { Tr, Th, Td, THead, TBody, Sorter } = Table

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: DebouncedInputProps) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <div className="flex justify-end items-center">
            <div className="flex items-center mb-4 h-full justify-center">
                <span className="mr-2">
                    <HiOutlineSearch className="mt-3 text-2xl" />
                </span>
                <Input
                    {...props}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank
    })
    return itemRank.passed
}

export const ListEvents = () => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    type Option = {
        value: number
        label: string
    }


    type Person = {
        name: string
        status: string
        date: string
        id?: number
        profit?: number
    }

    const { Tr, Th, Td, THead, TBody } = Table

    const tableData = (): Person[] => {
        const arr = []
        for (let i = 0; i < 100; i++) {
            arr.push({
                name: '',
                status: '',
                date: '',
                id: 0,
                ticket: ''
            })
        }
        return arr
    }

    const totalData = tableData().length

    const columns = useMemo<ColumnDef<Person>[]>(
        () => [
            { header: 'Evento', accessorKey: 'name' },
            { header: 'Status', accessorKey: 'status' },
            { header: 'Data do evento', accessorKey: 'date' },
            { header: 'Ingresso', accessorKey: 'ticket' }
        ],
        []
    )

    const [data] = useState(() => data10)

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }

    const navigate = useNavigate() 

    const handleClick = (row: any) => {
        const eventUrl = `/dashboard/event/my-events/event/`
 
        navigate(eventUrl)
    }

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter
        },
        state: {
            columnFilters,
            globalFilter
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugHeaders: true,
        debugColumns: false
    })

    const pageSizeOption = [
        { value: 10, label: '10 / página' },
        { value: 20, label: '20 / página' },
        { value: 30, label: '30 / página' },
        { value: 40, label: '40 / página' },
        { value: 50, label: '50 / página' }
    ]

    return (
        <>
            <h5 className="text-xl mt-4 ml-4">Meus eventos</h5>
            <DebouncedInput
                value={globalFilter ?? ''}
                className="p-2 font-lg shadow border border-block mt-4 mr-4"
                placeholder="Pesquisar..."
                onChange={(value) => setGlobalFilter(String(value))}
            />
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr
                            key={headerGroup.id}
                            className={`dark:bg-purple-800/20 bg-purple-100/20`}
                        >
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                    onClick:
                                                        header.column.getToggleSortingHandler()
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                }
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
    {table.getRowModel().rows.map((row) => {
        return (
            <Tr
                key={row.id}
                className="cursor-pointer"
                onClick={() => handleClick(row)}
            >
                {row.getVisibleCells().map((cell) => {
                    let cellContent = flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                    );

                    if (cell.column.id === 'ticket') {
                        const textColor = row.original.color;
                        cellContent = (
                            <span style={{ color: textColor }}>
                                {cellContent}
                            </span>
                        );
                    } else if (cell.column.id === 'status') {
                        if (row.original.status === 'Aberto') {
                            cellContent = (
                                <span className="text-green-500">
                                    {cellContent}
                                </span>
                            );
                        } else if (row.original.status === 'Encerrado') {
                            cellContent = (
                                <span className="text-yellow-500">
                                    {cellContent}
                                </span>
                            );
                        } else if (row.original.status === 'Cancelado') {
                            cellContent = (
                                <span className="text-red-500">
                                    {cellContent}
                                </span>
                            );
                        }
                    }

                    return <Td key={cell.id}>{cellContent}</Td>;
                })}
            </Tr>
        );
    })}
</TBody>
            </Table>
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={totalData}
                    onChange={onPaginationChange}
                />
            </div>
        </>
    )
}
