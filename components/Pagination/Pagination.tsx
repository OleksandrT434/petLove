"use client";

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Pagination.module.css";

type Props = {
  totalPages: number;
};

export default function Pagination({ totalPages }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isMobile, setIsMobile] = useState(false);

    const currentPage = Number(searchParams.get("page")) ?? 1;

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handlePageChange = ({selected}: {selected: number}) => {
        const newPage = new URLSearchParams(searchParams);

        newPage.set("page", String(selected + 1));
        router.push(`/news?${newPage.toString()}`);
    };

    const handleFirstPage = () => {
        const newPage = new URLSearchParams(searchParams);
        newPage.set("page", "1");
        router.push(`/news?${newPage.toString()}`);
    };

    const handleLastPage = () => {
        const newPage = new URLSearchParams(searchParams);
        newPage.set("page", String(totalPages));
        router.push(`/news?${newPage.toString()}`);
    };

    return (
        <div className={styles.paginationWrapper}>
            <button
                onClick={handleFirstPage}
                disabled={currentPage === 1}
                className={`${styles.endButton} ${currentPage === 1 ? styles.disabled : ""}`}
                aria-label="First page"
            >
                ≪
            </button>

            <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageChange}
            previousLabel="<"
            pageCount={totalPages}
            forcePage={currentPage - 1}
            containerClassName={styles.pagination}
            pageClassName={styles.page}
            previousClassName={styles.page}
            nextClassName={styles.page}
            breakClassName={styles.break}
            activeClassName={styles.selected}
            disabledClassName={styles.disabled}
            marginPagesDisplayed={0}
            pageRangeDisplayed={isMobile ? 1 : 3}
            />

            <button
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
                className={`${styles.endButton} ${currentPage === totalPages ? styles.disabled : ""}`}
                aria-label="last page"
            >
                ≫
            </button>
        </div>
            );
}
