import BaseTable from "../../components/table";
import type {Column} from "../../components/table";


interface Product {
    id: string;
    sku: string;
    name: string;
    category: string;
    status: string;
    description?: string;
    photoUrl?: string;
}

export default function ProductTable({
    products,
    page,
    setPage,
    loading
}: {
    products: Product[];
    page: number;
    setPage: (page:number) => void;
    loading: boolean;
}) {
    const columns = [
        {field: "sku", headerName: "SKU"},
        {field: "name", headerName: "Name"},
        {field: "category", headerName: "Category"},
        {field: "status", headerName: "Status"},
    ] satisfies Column<Product>[];

    return(
        <BaseTable<Product>
            columns={columns}
            rows={products}
            page={page}
            pageSize={20}
            onPageChange={setPage}
            loading={loading}
            collapsibleRenderer={(row) => (
                <div>
                    <p>{row.description}</p>
                    {row.photoUrl && (
                        <img src={row.photoUrl} style={{width: 150}}/>
                    )}
                </div>
            )}
        />
    )
}