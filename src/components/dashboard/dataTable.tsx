"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchEmailList, deleteEmail } from "@/services/fetchEmail";

type Subscriber = {
  email: string;
  subscribedAt?: string;
};

type SubscriberTableProps = {
  subscribers: Subscriber[];
  pagination: {
    currentPage: number;
    limit: number;
    hasNextPage: boolean;
    lastEvaluatedKey: string;
  };
};

export function DataTable({ subscriptPromise }: { subscriptPromise: Promise<SubscriberTableProps> }) {
  const data = use(subscriptPromise);
  const { subscribers, pagination } = data;

  // 테이블에 필요한 상태 관리
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  //페이지네이션에 필요한 상태
  const [currentPage, setCurrentPage] = React.useState(pagination.currentPage);
  const [hasNextPage, setHasNextPage] = React.useState(pagination.hasNextPage);
  const [lastEvaluatedKey, setLastEvaluatedKey] = React.useState<string>(pagination.lastEvaluatedKey);
  const [keyHistory, setKeyHistory] = React.useState<string[]>([]); // 이전 페이지 키 저장용

  // 테이블 데이터 상태
  const [tableData, setTableData] = React.useState(subscribers);

  // 구독자 삭제 핸들러
  const handleDeleteSubscriber = async (email: string) => {
    if (!confirm("정말로 이 구독자를 삭제하시겠습니까?")) return;

    try {
      await deleteEmail(email);
      // 삭제 후 테이블 새로고침
      const refreshedData = await fetchEmailList({ limit: 10 });
      setTableData(refreshedData.subscribers);
      setHasNextPage(refreshedData.pagination.hasNextPage);
      setCurrentPage(1);
      setLastEvaluatedKey(refreshedData.pagination.lastEvaluatedKey);
      setKeyHistory([]);
    } catch (error) {
      console.error("구독자 삭제 실패:", error);
      alert("구독자 삭제 중 오류가 발생했습니다.");
    }
  };

  // 다음 페이지 핸들러
  const handleNextPage = async () => {
    try {
      const data = await fetchEmailList({
        limit: 10,
        lastEvaluatedKey,
      });

      setTableData(data.subscribers);
      setHasNextPage(data.pagination.hasNextPage);
      setCurrentPage(prev => prev + 1);
      setKeyHistory(prev => [...prev, lastEvaluatedKey]); // 현재 키를 히스토리에 저장
      setLastEvaluatedKey(data.pagination.lastEvaluatedKey);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 이전 페이지 핸들러
  const handlePrevPage = async () => {
    try {
      if (currentPage === 2) {
        // 첫 페이지로 돌아가는 경우
        const data = await fetchEmailList({ limit: 10 });
        setTableData(data.subscribers);
        setHasNextPage(data.pagination.hasNextPage);
        setCurrentPage(1);
        setLastEvaluatedKey(data.pagination.lastEvaluatedKey);
        setKeyHistory([]); // 히스토리 초기화
      } else {
        // 이전 페이지로 이동
        const previousKey = keyHistory[keyHistory.length - 1];
        const data = await fetchEmailList({
          limit: 10,
          lastEvaluatedKey: previousKey,
        });

        setTableData(data.subscribers);
        setHasNextPage(true); // 이전으로 가는 경우 항상 다음 페이지 존재
        setCurrentPage(prev => prev - 1);
        setLastEvaluatedKey(data.pagination.lastEvaluatedKey);
        setKeyHistory(prev => prev.slice(0, -1)); // 사용한 키는 히스토리에서 제거
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns: ColumnDef<Subscriber>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            이메일
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "subscribedAt",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            구독 일자
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const subscribedAt = row.getValue("subscribedAt");
        if (!subscribedAt) return "-";
        return new Date(subscribedAt as string).toLocaleDateString("ko-KR");
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const subscriber = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">메뉴 열기</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>작업</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(subscriber.email)}>
                이메일 복사
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDeleteSubscriber(subscriber.email)}
                className="text-red-600 focus:text-red-600">
                구독자 삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="이메일로 검색..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={event => table.getColumn("email")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              컬럼 <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  구독자가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length}개 선택됨 (총 {table.getFilteredRowModel().rows.length}개)
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
            이전
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={!hasNextPage}>
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
