"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { buffetTable } from "@/types/supabase_db.types";
import { Delete, Edit } from "@mui/icons-material";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable({
  data,
  header,
}: {
  data: any;
  header: string[];
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header?.map((h) => (
              <TableCell key={h} align="center">
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data === null ? (
            <TableRow>
              <TableCell colSpan={header.length} align="center">
                ...Loading
              </TableCell>
            </TableRow>
          ): data?.length > 0 ? (
            data?.map((row: any, id: number) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {row.map((item: any, idx: number) => (
                  <TableCell align="center" key={idx}>
                    {item}
                  </TableCell>
                ))}
                {/* <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.table_no}</TableCell>
              <TableCell align="center">{row.max_customer}</TableCell>
              <TableCell align="center">{Boolean(row.is_used) ?'Available':'Used'}</TableCell>
              <TableCell align="center"><Delete/><Edit/></TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={header.length} align="center">
                No Data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
