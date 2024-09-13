import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  borderRadiusTop: "20px",
  "& thead": {
    "& tr": {
      "& th": {
        paddingTop: "10px",
        paddingBottom: "10px",
        border: "1px solid #000",
        color: "#2F2E40CC",
        fontWeight: "bold",
        fontSize: "16px",
        textTransform: "uppercase",
      },
    },
  },
  "& tbody": {
    "& tr": {
      "& td": {
        paddingLeft: "10px",
        border: "1px solid #000",
        fontWeight: "400",
        fontSize: "15px",
      },
    },
  },
}));

const RatesTable = () => {
  return (
    <StyledTable
      sx={{ overflow: "auto" }}
      className=""
      id="content"
      style={{ border: "1px solid #000", marginBottom:"50px" }}
    >
      <TableHead >
        <TableRow sx={{ width: "100%" }} >
          <TableCell
            align="center"
            colSpan={1}
            rowSpan={2}
            sx={{ width: "20%", border: "1px solid #222A45" }}
            className="a"
          >
            Транспорт
          </TableCell>
          <TableCell
            align="center"
            colSpan={1}
            rowSpan={2}
            sx={{ border: "1px solid #000", width: "20%" }}
            className="b"
          >
            Грузоподъемность
          </TableCell>
          <TableCell
            align="center"
            colSpan={1}
            rowSpan={2}
            sx={{ border: "1px solid #000", width: "20%" }}
            className="b"
          >
            Длинна кузова
          </TableCell>
          <TableCell
            align="center"
            colSpan={2}
            sx={{ width: "40%", border: "1px solid #000" }}
            className="c"
          >
            Стоимость без НДС,руб
          </TableCell>
          <TableRow>
            <TableCell align="center">За 1 час (мин2ч)</TableCell>
            <TableCell align="center">За 1км</TableCell>
          </TableRow>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align="center">Небольшой фургон</TableCell>
          <TableCell align="center">400 кг</TableCell>
          <TableCell align="center">160 x 120 x 120 см,макс.</TableCell>
          <TableCell align="center">5 500€</TableCell>
          <TableCell align="center">65€</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="center">Фургон среднего размера</TableCell>
          <TableCell align="center">800 кг</TableCell>
          <TableCell align="center">320 x 130 x 160 см,макс. </TableCell>
          <TableCell align="center">5 500€</TableCell>
          <TableCell align="center">65€</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="center">Большой фургон</TableCell>
          <TableCell align="center">1200 кг</TableCell>
          <TableCell align="center">420 x 210 x 210 см,макс.</TableCell>
          <TableCell align="center">5 500€</TableCell>
          <TableCell align="center">65€</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="center">Подъемная рампа</TableCell>
          <TableCell align="center">800 кг</TableCell>
          <TableCell align="center">420 x 210 x 210 см,макс.</TableCell>
          <TableCell align="center">5 500€</TableCell>
          <TableCell align="center">65€</TableCell>
        </TableRow>
      </TableBody>
    </StyledTable>
  );
};

export default RatesTable;
