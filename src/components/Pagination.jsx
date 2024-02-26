import { useEffect } from "react";
import { Pagination } from "react-bootstrap";
let items;

export default function PaginationComponent({ page, setPage, numOfPages }) {
    useEffect(() => {
        items = [];
        for (let number = 1; number <= numOfPages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    onClick={() => setPage(Number(number))}
                >
                    {number}
                </Pagination.Item>
            );
        }
    }, [numOfPages]);
    return (
        <Pagination size='sm' className='mx-auto my-4'>
            {items}
        </Pagination>
    );
}
