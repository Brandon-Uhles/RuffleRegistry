import {Table, TableHead, TableBody, TableRow, TableCell, IconButton, Collapse, Box,  LinearProgress, Pagination,} from "@mui/material";
import {useState, ReactNode} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export interface Column<T> {
    field: keyof T;
    headerName: string;
}

export type CollapsibleRenderer<T> = (row: T) => ReactNode;

export interface BaseTableProps<T> {
    columns: Column<T>[];
    rows: T[];
    loading?: boolean;

    collapsibleRenderer?: CollapsibleRenderer<T>;

    page: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export default function BaseTable<T>({
    columns, 
    rows, 
    loading = false, 
    collapsibleRenderer, 
    page, 
    pageSize, 
    onPageChange,
}: BaseTableProps<T>) {
    return (
        <Box sx={{width: "100%"}}>
            {loading && <LinearProgress/>}

            <Table>
                <TableHead>
                    <TableRow>
                        {collapsibleRenderer && <TableCell/>}
                        {columns.map((col) => (
                            <TableCell key={String(col.field)}>{col.headerName}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row) => (
                        <CollapsibleRow<T> 
                        key={(row as any).id}
                        row={row}
                        columns={columns}
                        collapsibleRenderer={collapsibleRenderer}
                        />
                    ))}
                </TableBody>
            </Table>

            <Box sx={{ display: "flex", justifyContent: "center", padding: 2}}>
                <Pagination
                    count={Math.ceil(rows.length / pageSize)}
                    page={page}
                    onChange={(_, newPage) => onPageChange(newPage)}
                    />
            </Box>
        </Box>
    )
}


function CollapsibleRow<T>({
    row, 
    columns, 
    collapsibleRenderer
}: {
    row: T;
    columns: Column<T>[];
    collapsibleRenderer?: CollapsibleRenderer<T>;
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow>
                {collapsibleRenderer && (
                    <TableCell>
                        <IconButton size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                )}

                {columns.map((col) => (
                    <TableCell key={String(col.field)}>
                        {String(row[col.field])}
                    </TableCell>
                ))}
            </TableRow>

            {collapsibleRenderer && (
                <TableRow>
                    <TableCell colSpan={columns.length + 1} sx={{p: 0}}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{margin:2}}>
                                {collapsibleRenderer(row)}
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}