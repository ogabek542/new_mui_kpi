import React, { useEffect, useState, useMemo } from "react";
import { Container, Box, Grid, Typography, Button } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Colors } from "../../styles/theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Reorder } from "framer-motion";
// icons // 
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SendIcon from '@mui/icons-material/Send';
import dayjs from "dayjs";
import "dayjs/locale/ru";
// for holidays data //
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { t } from "i18next";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const KpiDailiyWorkTable = () => {
  const [selectDate, setSelectDate] = useState(dayjs());
  const onChangeDate = (newValue) => {
    setSelectDate(newValue);
  };

  const [items, setItems] = useState([
    {
      id: 1,
      title: "Идентификация юридических лиц",
      workingTime: "15 мин",
      startTime: "9:00",
      endTime: "9:15",
      workType: "регулярная",
      workHistory: "да",
      workComment: "-",
    },
    {
      id: 2,
      title: "Оформление договоров",
      workingTime: "30 мин",
      startTime: "9:20",
      endTime: "9:50",
      workType: "разовая",
      workHistory: "нет",
      workComment: "Необходимо уточнить детали уточнить детали уточнить детали",
    },
    {
      id: 3,
      title: "Консультация клиентов",
      workingTime: "45 мин",
      startTime: "10:00",
      endTime: "10:45",
      workType: "регулярная",
      workHistory: "да",
      workComment: "Особые случаи",
    },
  ]);
  

  return (
    <Box sx={{ width: "100%", height: "auto", padding: "5px" }}>
      {/*<==== HEADER SECTION =====> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          ФОТОГРАФИЯ РАБОЧЕГО ДНЯ СОТРУДНИКА
        </Typography>
        {/* Calendar select data */}
        <Box
          sx={{
            width: { xs: "100px", sm: "200px", md: "200px" },
            bgcolor: "white",
            borderRadius: "5px",
            boxShadow:
              "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              value={selectDate}
              onChange={onChangeDate}
              sx={{
                ".MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                    display: "none",
                    border: "none",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                    border: "none",
                  },
                  ".MuiInputAdornment-root .MuiIconButton-root": {
                    color: Colors.blue_nbu,
                  },
                  ".MuiInputBase-input": {
                    fontWeight: 700,
                    fontSize: { xs: "12px", sm: "16px" },
                  },
                },
                height: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      {/* <==== USER INFORMATION DATA =====> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          marginTop: "10px",
          borderRadius: "5px",
          boxShadow:
            "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
        }}
      >
        {/* <===== USER NAME SECTION =====> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: "2px solid #AAAAAE",
            paddingLeft: "5px",
            height: "50px",
          }}
        >
          <Typography sx={{ width: "50%", fontWeight: "bold" }}>
            {t("full_name_user")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "bold", textAlign: "start" }}
          >
            Хайдаров Достон Низомиддинович
          </Typography>
        </Box>
        {/* <===== WORK DAY SECTION =====> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: "2px solid #AAAAAE",
            paddingLeft: "5px",
            height: "50px",
          }}
        >
          <Typography sx={{ width: "50%", fontWeight: "bold" }}>
            {t("working_day")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            02/10/2024
          </Typography>
        </Box>
        {/* <=== GROUP SECTION ====> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: "2px solid #AAAAAE",
            paddingLeft: "5px",
            height: "50px",
          }}
        >
          <Typography sx={{ width: "50%", fontWeight: "bold" }}>
            {t("group_of_worker")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            Группа корпоративного обслуживания
          </Typography>
        </Box>
        {/* <===== DEPAERTMEN SECTION =====> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingLeft: "5px",
            height: "50px",
          }}
        >
          <Typography sx={{ width: "50%", fontWeight: "bold" }}>
            {t("sector_of_worker")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            Обслуживания юр.лиц
          </Typography>
        </Box>
      </Box>

      {/* <==== TABLE HEADER SECTION ====> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          marginTop: "10px",
          position: "relative",
          backgroundColor: "white",
          marginBottom: "20px",
        }}
      >
        <Grid
          container
          sx={{
            height: "100px",
            position: "sticky",
            top: 0,
          }}
        >
          <Grid
            item
            xs={0.3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            }}
          >
            <Typography sx={{}}>№</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            }}
          >
            <Typography sx={{ fontWeight: "bold",fontSize:"14px" }}>
              Что делалось на этапе
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            }}
          >
            <Typography sx={{ fontSize:"14px", fontWeight: "bold" }}>
              Потраченное время
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            }}
          >
            <Typography sx={{ fontWeight: "bold",fontSize:"14px" }}>Начало</Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            }}
          >
            <Typography sx={{ fontWeight: "bold",fontSize:"14px" }}>Конец</Typography>
          </Grid>

          <Grid
            item
            xs={1.5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            }}
          >
            <Typography sx={{ fontSize:"15px", fontWeight: "bold" }}>
              Тип работы (регулярная / разовая)
            </Typography>
          </Grid>
          <Grid
            item
            xs={1.2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                padding: "2px",
            }}
          >
            <Typography
              sx={{
                fontSize:"14px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              задачи в рамки должностной инструкции?
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            }}
          >
            <Typography sx={{ fontSize: "14", fontWeight: "bold" }}>
              Комментарии
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {/* <==== TABLE BODY SECTION ====> */}
      <Reorder.Group axis="y" onReorder={setItems} values={items}  as="div" >
        {items.map((item, index) => (
          <Reorder.Item key={item.id} value={item}   as="div" >

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderRadius: "5px",
          boxShadow:
            "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            marginBottom: "5px",
            paddingY: "5px",
            paddingX:"4px",
        }}
      >
        <Grid
          container
          sx={{
            height: "auto",
            position: "sticky",
            top: 0,
          }}
        >
          {/* <==== EDIT ====> */}
          <Grid
            item
            xs={0.5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button variant="text" sx={{}}>
              <BorderColorIcon sx={{ color: Colors.nbu }} />
            </Button>
          </Grid>
            {/* <==== DELETE =====> */}
          <Grid
            item
            xs={0.5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button variant="text" sx={{}}>
              <DeleteForeverIcon sx={{ color: "red", }} />
            </Button>
          </Grid>
          {/* <==== WORK TITLE ====> */}
          <Grid
            item
            xs={3.3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              textAlign:"start",
            }}
          >
            <Typography sx={{ height: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",}}>{item.title}</Typography>
          </Grid>
          {/* <==== WORKING TIME =====> */}
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ height: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",}}>{item.workingTime}</Typography>
          </Grid>
          {/* <==== START TIME ====> */}
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ height: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",}}>{item.startTime}</Typography>
          </Grid>
          {/* <==== END TIME ====> */}
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ height: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",}}>{item.endTime}</Typography>
          </Grid>
          {/* <==== WORK TYPE ====> */}
          <Grid
            item
            xs={1.5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ height: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",}}>{item.workType}</Typography>
          </Grid>
          {/* <==== WORK HISTORY ====> */}
          <Grid
            item
            xs={1.2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ height: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",}}>да{item.workHistory}</Typography>
          </Grid>
          {/* <==== WORK COMMENT ====> */}
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ height: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",}}>{item.workComment}</Typography>
          </Grid>
        </Grid>
      </Box>

      </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* <=== CREATE AND SEND BUTTON ====> */}
      <Box sx={{marginY:"10px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Button
          variant="contained"
          sx={{ background: Colors.nbu }}
          endIcon={
            <AddCircleIcon
              sx={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
            />
          }
        >
          <Typography
            sx={{ fontSize: "16px", fontWeight: "bold", color: "white",textTransform: "uppercase"}}
          >
            Yangi Qator qo'shish{" "}
          </Typography>
        </Button>
        <Button
          variant="contained"
          sx={{ background: Colors.nbu }}
          endIcon={
            <SendIcon
              sx={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
            />
          }
        >
          <Typography
            sx={{ fontSize: "16px", fontWeight: "bold", color: "white" ,textTransform: "uppercase" }}
          >
            Yuborish
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default KpiDailiyWorkTable;
