"use client";

import ReactPaginate from "react-paginate";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  totalPages: number;
};

export default function Pagination({ totalPages }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) ?? 1;
    const handlePageChange = ({selected}: {selected: number}) => {
        const newPage = new URLSearchParams(searchParams);

        newPage.set("page", String(selected + 1));
        router.push(`/news?${newPage.toString()}`);
    };

    return (
        <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageChange}
        previousLabel="<"
        pageCount={totalPages}
        forcePage={currentPage - 1}
        />
            );
}
