import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useEffect } from "react";
import LightHeader from "../../components/LightHeader/LightHeader";
import { Colors } from "../../styles/theme";
import FormControl from "@mui/material/FormControl";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";

// branch section //
const top128Filials = [
  { title: "Республика", id: 1 },
  { title: "Тошкент ш", id: 2 },
  { title: "Андижон", id: 3 },
  { title: "Бухоро", id: 4 },
  { title: "Фарғона", id: 5 },
  { title: "Жиззах", id: 6 },
  { title: "Наманган", id: 7 },
  { title: "Навоий", id: 8 },
  { title: "Қашқадарё", id: 9 },
  { title: "Самарқанд", id: 10 },
  { title: "Сирдарё", id: 11 },
  { title: "Сурхондарё", id: 12 },
  { title: "Тошкент вил", id: 13 },
  { title: "Хоразм", id: 14 },
  { title: "Қорақалпоғистон рес", id: 15 },
  { title: "Миробод", id: 16 },
];

// filials section //
const setSelectedSecondMap = {
  // NBU//
  1: [{ title: "Республика" }],
  // Тошкент шаҳри //
  2: [
    { title: "Головной офис" },
    { title: "Абусахий БХО" },
    { title: "Атлас НБУ БХО" },
    { title: "Ғалаба БХО" },
    { title: "Миробод плаза БХО" },
    { title: "Наврўз БХО" },
    { title: "Технопарк БХО" },
    { title: "Хумо БХО" },
    { title: "Шайхонтохур БХО" },
    { title: "Янги сергели БХО" },
    { title: "Академия БХМ" },
    { title: "Бектемир БХМ" },
    { title: "Бош амалиёт БХМ" },
    { title: "Марказий амалиёт БХМ" },
    { title: "Мирзо-Улуғбек БХМ" },
    { title: "Олмазор БХМ" },
    { title: "Саёхат БХМ" },
    { title: "Себзор амалиёт БХМ" },
    { title: "Сергели БХМ" },
    { title: "Учтепа БХM" },
    { title: "Юнусобод БХМ" },
    { title: "Яккасарой БХМ" },
    { title: "Янгиобод БХM" },
    { title: "Яшнобод БХM" },
  ],
  // Андижон вилояти //
  3: [
    { title: "Андижон амалиёт БХМ" },
    { title: "Асака БХM" },
    { title: "Избоскан БХО" },
    { title: "Қурғонтепа БХО" },
    { title: "Мархамат БХМ" },
    { title: "Пахтаобод БХО" },
    { title: "Шахрихон БХО" },
  ],
  // Бухоро вилояти //
  4: [
    { title: "Арк БХО" },
    { title: "Бухоро амалиёт БХМ" },
    { title: "Бухоро шаҳар БХО" },
    { title: "Вобкент БХО" },
    { title: "Ғиждувон БХМ" },
    { title: "Когон БХM" },
    { title: "Қоракўл БХМ" },
    { title: "Қоровулбозор БХО" },
    { title: "Нақшбанд БХО" },
    { title: "Ромитан БХМ" },
    { title: "Шофиркон БХО" },
  ],
  // Фарғона вилояти //
  5: [
    { title: "Бешариқ БХМ" },
    { title: "Бувайда БХО" },
    { title: "Қува БХМ" },
    { title: "Қувасой БХО" },
    { title: "Қуқон БХМ" },
    { title: "Риштон БХМ" },
    { title: "Фарғона амалиёт БХМ" },
    { title: "Марғилон БХО" },
  ],
  // Жиззах  вилояти //
  6: [
    { title: "Джизак амалиёт БХМ" },
    { title: "Индустриал БХМ" },
    { title: "Мирзачуль БХМ" },
    { title: "Пахтакор БХО" },
  ],
  // Наманган  вилояти //
  7: [
    { title: "Косонсой БХО" },
    { title: "Наманган амалиёт БХМ" },
    { title: "Турақўрғон БХО" },
    { title: "Уйчи БХМ" },
    { title: "Учқурғон БХМ" },
    { title: "Чортоқ БХМ" },
    { title: "Чуст БХО" },
  ],
  // Навоий  вилояти //
  8: [
    { title: "Зарафшон БХМ" },
    { title: "Қизилтепа БХМ" },
    { title: "Маликрабод БХМ" },
    { title: "Навоий амалиёт БХМ" },
    { title: "Нурота БХО" },
    { title: "Учқудуқ БХМ" },
  ],
  // Қашқадарё  вилояти //
  9: [
    { title: "Ғузор БХО" },
    { title: "Қарши амалиёт БХМ" },
    { title: "Муборак БХО" },
    { title: "Шаҳрисабз БХМ" },
    { title: "Янгинишон БХО" },
  ],
  // Самарқанд  вилояти //
  10: [
    { title: "Булунғур БХО" },
    { title: "Джамбай БХМ" },
    { title: "Зармитан БХО" },
    { title: "Каттақўрғон БХО" },
    { title: "Қорасув БХО" },
    { title: "Нуробод БХО" },
    { title: "Пайариқ БХО" },
    { title: "Пастдаргом БХМ" },
    { title: "Регистан БХМ" },
    { title: "Самарканд амалиёт БХМ" },
    { title: "Ургут БХМ" },
  ],
  // Сирдарё  вилояти //
  11: [{ title: "Гулистан амалиёт БХМ" }, { title: "Оқолтин БХО" }],
  // Сурхондарё  вилояти //
  12: [
    { title: "Денов БХМ" },
    { title: "Қумқўрғон БХМ" },
    { title: "Термиз амалиёт БХМ" },
    { title: "Жарқўрғон БХО" },
    { title: "Шеробод БХО" },
  ],
  // Тошкент  вилояти //
  13: [
    { title: "Ангрен БХM" },
    { title: "Бекабад БХМ" },
    { title: "Газалкент БХО" },
    { title: "Нурафшон амалиёт БХМ" },
    { title: "Олмалиқ БХО" },
    { title: "Тошкент шахар БХО" },
    { title: "Чирчиқ БХО" },
    { title: "Янгийул БХМ" },
  ],
  // Хоразм  вилояти //
  14: [
    { title: "Гурлан БХО" },
    { title: "Карвон БХО" },
    { title: "Хазорасп БХМ" },
    { title: "Хива БХО" },
    { title: "Хонқа БХМ" },
    { title: "Хоразм амалиёт БХМ" },
    { title: "Шовот БХМ" },
    { title: "Янгиариқ БХО" },
    { title: "Кушкупир БХМ" },
  ],
  // Қорақалпоғистон республикаси //
  15: [
    { title: "Кўнғирот БХМ" },
    { title: "Манғит БХО" },
    { title: "Нукус амалиёт БХМ" },
    { title: "Тўрткўл БХM" },
    { title: "Хўжайли БХО" },
    { title: "Чимбой БХО" },
  ],
  16: [{ title: "Миробод" }],
};
// month names //
const monthsList = [
  { name: "January", id: 1 },
  { name: "February", id: 2 },
  { name: "March", id: 3 },
  { name: "April", id: 4 },
  { name: "May", id: 5 },
  { name: "June", id: 6 },
  { name: "July", id: 7 },
  { name: "August", id: 8 },
  { name: "September", id: 9 },
  { name: "October", id: 10 },
  { name: "November", id: 11 },
  { name: "December", id: 12 },
];


const AnalizeYearDashboard = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [openRows, setOpenRows] = useState({});
  const [selectedFirstYear, setSelectedFirstYear] = useState(2023); // Default first year
  const [selectedSecondtYear, setSelectedSecondYear] = useState(null); // Default first year
  const [selectedMonths, setSelectedMonths] = useState([]); 

  // select first year code // 
  const handleFirstYearChange = (event) => {
    setSelectedFirstYear(event.target.value);
  };

  // select second year code //
  const handleSecondYearChange = (event) => {
    setSelectedSecondYear(event.target.value)
  }

  // select month code //
  const handleMonthToggle = (month) => {
    setSelectedMonths((prev) =>
      prev.includes(month)
        ? prev.filter((m) => m !== month)
        : [...prev, month]
    );
  };

  const toggleRowOpen = (id) => {
    setOpenRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  function Row({ filial }) {
    const isOpen = openRows[filial.id] || false;
    const subRegions = setSelectedSecondMap[filial.id] || [];

    const handleCheckboxChange = (title) => {
      setCheckedItems((prev) =>
        prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
      );
    };

    return (
      <>
        <TableRow>
          <TableCell sx={{ padding: 0 }}>
            <Checkbox
              onChange={() => handleCheckboxChange(filial.title)}
              checked={checkedItems.includes(filial.title)}
            />
          </TableCell>
          <TableCell sx={{ padding: 0 }}>
            <IconButton size="small" onClick={() => toggleRowOpen(filial.id)}>
              {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell sx={{ padding: 0 }}>{filial.title}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 0, padding: 0 }}>
                <Table size="small" aria-label="subregions" sx={{ margin: 0 }}>
                  <TableBody>
                    {subRegions.map((subRegion, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ padding: 0 }}>
                          <Checkbox
                            onChange={() => handleCheckboxChange(subRegion.title)}
                            checked={checkedItems.includes(subRegion.title)}
                          />
                        </TableCell>
                        <TableCell sx={{ padding: 0 }}>{subRegion.title}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

  const sendCheckedItemsToBackend = () => {
    console.log("Checked items to send:", checkedItems);
    // Send the `checkedItems` to the backend here using fetch or axios
  };

  Row.propTypes = {
    filial: PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  };

  return (
    <Container
      maxWidth={false} // This allows the container to expand beyond the default breakpoints
      disableGutters
      sx={{
        px: "10px",
        bgcolor: Colors.gray_back,
        width: "100%", // Ensure the container takes up 100% of the viewport width
        maxWidth: "100vw", // Ensure the container doesn't exceed the viewport width
        "@media (min-width: 1920px)": {
          maxWidth: "100%", // For extra-large screens, allow full width
        },
      }}
    >
      {/* <==== LIGHT HEADER SECTION ====> */}
      <LightHeader />
      {/* <==== TABLE SECTION ====> */}
      <Grid
        container
        // spacing={0.5}
        sx={{ height: "auto", marginTop: "5px", gap: "5px" }}
        alignItems="stretch"
      >
        {/* <=== LEFT SIDE FILTER SECTION ====> */}
        <Grid
          item
          xs={3.95}
          sm={3.95}
          sx={{
            height: "1000px",
            bgcolor: Colors.white,
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          <Box sx={{ width: "100%", height: "40px" }}>
            {/* <==== REFRESH BUTTON FOR GET DATA FROM BACKEND ====> */}
            <Button
              variant="contained"
              onClick={sendCheckedItemsToBackend}
              sx={{
                width: "100%",
                fontWeight: "bold",
                color: "white",
                bgcolor: Colors.nbu,
                "&:hover": {
                  bgcolor: Colors.nbu, // Set hover background color to be the same as default
                },
              }}
            >
              REFRESH
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "3px",
              height: "95%",
            }}
          >
            {/* <==== LEFT SIDE FILTER ====> */}
            <Box
              sx={{
                width: "50%",
                display: "block",
                height: "100%",
                color: Colors.white,
              }}
            >
            <TableContainer component={Paper} sx={{ padding: 0 }}>
              <Table aria-label="collapsible table" sx={{ margin: 0 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ padding:0 }}>XUDUD</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {top128Filials.map((filial) => (
                    <Row key={filial.id} filial={filial} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Box>

            {/* <==== RIGHT SIDE YEAR FILTER ====> */}
            <Box
              sx={{
                width: "50%",
                display: "block",
                height: "100%",
                color: Colors.white,
              }}
            >
            {/* <==== FIRST YEAR SELECTOR ====> */}
              <FormControl fullWidth sx={{ marginBottom: 1,marginTop:1 }}>
                <InputLabel>Year</InputLabel>
                <Select value={selectedFirstYear} onChange={handleFirstYearChange} label="Year">
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2025}>2025</MenuItem>
                </Select>
              </FormControl>
               {/* <==== SECOND YEAR SELECTOR ====> */}
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Year</InputLabel>
                <Select value={selectedSecondtYear} onChange={handleSecondYearChange} label="Year">
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2025}>2025</MenuItem>
                </Select>
              </FormControl>
              {/* <===== MONTH PICKER =====> */}
              <List sx={{ padding: 0 }}>
                  {monthsList.map((month) => (
                    <ListItem 
                      key={month.id} 
                      button 
                      onClick={() => handleMonthToggle(month.name)} 
                      sx={{ padding: '2px 0', margin: 0, minHeight: '30px' }}
                    >
                      <ListItemIcon sx={{ minWidth: '30px' }}>
                        <Checkbox checked={selectedMonths.includes(month.name)} />
                      </ListItemIcon>
                      <ListItemText sx={{ color: "black", margin: 0 }} primary={month.name} />
                    </ListItem>
                  ))}
              </List>

            </Box>
          </Box>
        </Grid>
        {/* <=== RIGHT SIDE TABLE SECTION ====> */}
        <Grid
          item
          xs={8}
          sm={8}
          sx={{
            height: "1000px",
            bgcolor: Colors.white,
            borderRadius: "5px",
            padding: "5px",
          }}
        >
     
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalizeYearDashboard;
