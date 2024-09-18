import * as React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Colors } from "../../styles/theme";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// calendar elements section //
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // Import Russian locale

const CustomGridTable = () => {
  

  return (
    <Box
      sx={{
        border: "1px solid black",
        height: "auto",
        borderBottom: "none",
        margin: "auto",
      }}
    >
      {/* grid header section */}
      <Grid
        container
        sx={{
          borderBottom: "1px solid #000",
          textAlign: "center",
          bgcolor: Colors.blue_light_ultra,
        }}
      >
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
            KOD
          </Typography>
        </Grid>
        <Grid
          item
          xs={3.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Typography sx={{ fontWeight: "bold",}}>Filial Name</Typography> */}
          {/* choose filila name  */}
         
        </Grid>
        <Grid item xs={3} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            sx={{ fontWeight: "bold", borderBottom: "1px solid #000" }}
          >
       
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>Plan</Typography>
        </Grid>
        <Grid item xs={3} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            sx={{ fontWeight: "bold", borderBottom: "1px solid #000" }}
          >
            {/* Fact Calendar */}
            <Box sx={{width:"100%",height:"100%",bgcolor:"transparent"}}>
            
            </Box>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>Fact</Typography>
        </Grid>
        <Grid item xs={2} sx={{alignContent:"center" }}>
          <Typography sx={{ fontWeight: "bold" }}>Result</Typography>
        </Grid>
      </Grid>
      {/* <== gird rows ==> */}
      {/* 30 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            30
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Процентные доходы по счетам в других банках
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 40 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            40
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Процентные доходы по ценным бумагам для купли и продажи
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 80 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            80
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Процентные доходы по кредитам к получению
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 90 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            90
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Процентные доходы по кредитам, находящимся В процессе судебного
            разбирательства
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 110 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            110
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Другие процентные доходы
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 120 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            120
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Процентные доходы по сделкам РЕПО с ценными бумагами
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 140 */}
      <Grid
        container
        sx={{
          borderBottom: "1px solid #000",
          bgcolor: Colors.blue_light_ultra,
        }}
      >
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            140
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            Всего Процентных доходов
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 160 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            160
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Процентные расходы по депозитам
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 170 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            170
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Процентные расходы по счетам к оплате в ЦБРУ
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 180 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            180
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Процентные расходы по счетам к оплате в другие банки
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 200 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            200
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Процентные расходы по кредитам к оплате
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 210 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            210
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Процентные расходы по выпущенным ценным бумагам
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 230 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            230
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Другие процентные расходы
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 240 */}
      <Grid
        container
        sx={{
          borderBottom: "1px solid #000",
          bgcolor: Colors.blue_light_ultra,
        }}
      >
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            240
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            Всего Процентных расходов
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 250 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            250
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            Чистый Процентный доход
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 260 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            260
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Минус: Оценка возможных убытков Кредиты
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 290 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            290
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Комиссионные доходы
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 300 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            300
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Прибыль в иностранной валюте
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 330 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            330
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Прибыль и дивиденды от инвестиций
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 340 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            340
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Другие беспроцентные доходы
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 350 */}
      <Grid
        container
        sx={{
          borderBottom: "1px solid #000",
          bgcolor: Colors.blue_light_ultra,
        }}
      >
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            350
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            Всего беспроцентных доходов
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 380 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            380
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Комиссионные расходы
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 390 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            390
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Убытки в иностранной валюте
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 410 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            410
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Убыток от инвестиций в зависимые хозяйственные общества
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 430 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            430
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Другие беспроцентные расходы
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 440 */}
      <Grid
        container
        sx={{
          borderBottom: "1px solid #000",
          bgcolor: Colors.blue_light_ultra,
        }}
      >
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            440
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            Всего беспроцентных расходов
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 450 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            450
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            Чистый доход до понесения операционных расходов
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 470 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            470
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Заработная плата и другие расходы на сотрудников
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 480 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            480
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Аренда и содержание
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 490 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            490
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Командировочные и транспортные расходы
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 500 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            500
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Административные расходы
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 510 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            510
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Репрезентация и благотворительность
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 520 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            520
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Расходы на износ
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 530 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            530
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Страхование, налоги и другие расходы
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 550 */}
      <Grid
        container
        sx={{
          borderBottom: "1px solid #000",
          bgcolor: Colors.blue_light_ultra,
        }}
      >
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            550
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            Всего операционных расходов
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 560 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            560
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            Чистый доход без учета подоходного налога
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 570 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            570
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            Минус: Оценка подоходного налога
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 580 */}
      <Grid
        container
        sx={{
          borderBottom: "1px solid #000",
          bgcolor: Colors.blue_light_ultra,
        }}
      >
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            580
          </Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            Чистая прибыль (убыток) на отчетный период
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: "5px",
              height: "auto",
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            1
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomGridTable;
