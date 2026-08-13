"use client";

import { useState, useMemo, useEffect } from "react";

export default function usePagination(data, defaultPageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const effectivePageSize = pageSize === -1 ? data.length || 1 : pageSize;
  const totalPages = Math.max(1, Math.ceil(data.length / effectivePageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [data.length, effectivePageSize, totalPages, currentPage]);

  const activePage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(
    () => data.slice((activePage - 1) * effectivePageSize, activePage * effectivePageSize),
    [data, activePage, effectivePageSize],
  );

  const startIndex = data.length === 0 ? 0 : (activePage - 1) * effectivePageSize + 1;
  const endIndex = Math.min(activePage * effectivePageSize, data.length);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return {
    paginatedData,
    currentPage: activePage,
    totalPages,
    pageSize,
    totalItems: data.length,
    startIndex,
    endIndex,
    setPage: goToPage,
    setPageSize: (size) => {
      setPageSize(size);
      setCurrentPage(1);
    },
  };
}