import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
};

function Pagination({ currentPage, totalPages }: Props) {
  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-30">

      {/* Previous */}

      <Link
        href={`/?page=${Math.max(currentPage - 1, 1)}`}
        className={`px-2 py-2 border rounded-lg ${
          currentPage === 1
            ? "pointer-events-none opacity-40"
            : "hover:bg-gray-100"
        }`}
      >
       Prev
      </Link>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={`/?page=${page}`}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border transition ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}

      <Link
        href={`/?page=${Math.min(currentPage + 1, totalPages)}`}
        className={`px-2 py-2 border rounded-lg ${
          currentPage === totalPages
            ? "pointer-events-none opacity-40"
            : "hover:bg-gray-100"
        }`}
      >
        Next
      </Link>
    </div>
  );
}

export default Pagination;