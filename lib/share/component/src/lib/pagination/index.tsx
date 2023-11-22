import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

interface PaginationProps {
  currentPage: number;
  postsPerPage: number;
  totalPosts: number;
  paginate: (number: number) => void;
}

export const Pagination = ({
  currentPage,
  postsPerPage,
  totalPosts,
  paginate,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const goToFirstPage = () => {
    paginate(1);
  };

  const goToLastPage = () => {
    paginate(pageNumbers.length);
  };

  return (
    <ul className="flex flex-row w-full items-center justify-center space-x-2 ">
      <li key="first">
        <a
          href="!#"
          onClick={(evt) => {
            evt.preventDefault();
            goToFirstPage();
          }}
        >
          <GoChevronLeft />
        </a>
      </li>
      {pageNumbers.map((number) => (
        <li>
          <a
            href="!#"
            onClick={(evt) => {
              evt.preventDefault();
              paginate(number);
            }}
            className={`${
              currentPage === number
                ? 'bg-[#106FA4] text-white'
                : 'bg-white text-[#737373]'
            } px-4 py-2 rounded-lg`}
          >
            {number}
          </a>
        </li>
      ))}
      <li key="last">
        <a
          href="!#"
          onClick={(evt) => {
            evt.preventDefault();
            goToLastPage();
          }}
        >
          <GoChevronRight />
        </a>
      </li>
    </ul>
  );
};
