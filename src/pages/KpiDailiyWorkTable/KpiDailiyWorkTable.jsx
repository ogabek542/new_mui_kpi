import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Colors } from "../../styles/theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";
import { Reorder } from "framer-motion";
// icons //
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SendIcon from "@mui/icons-material/Send";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import dayjs from "dayjs";
import "dayjs/locale/ru";
// for holidays data //
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { t } from "i18next";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const KpiDailiyWorkTable = () => {
  const [open, setOpenChange] = useState(false);
  const [title, titlechange] = useState("");
  const [worktime, worktimechange] = useState("");
  // const [startworktime,startworktimechange] = useState("");
  // const [endworktime,endworktimechange] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [workType, workTypechange] = useState("");
  const [workingHistory, workingHistorychange] = useState("");
  const [workingComment, workingCommentchange] = useState("");
  const [timeError, setTimeError] = useState(""); // To store validation errors
  const [submitError, setSubmitError] = useState(""); // General form submit erro

  const addNewRow = () => {
    openPopup();
  };

  const closePopup = () => {
    setOpenChange(false);
    resetForm();
  };
  const openPopup = () => {
    setOpenChange(true);
  };

  const resetForm = () => {
    titlechange("");
    worktimechange("");
    setStartTime(null);
    setEndTime(null);
    workTypechange("");
    workingHistorychange("");
    workingCommentchange("");
    setTimeError("");
    setSubmitError("");
  };

  useEffect(() => {
    if (!open) {
      resetForm(); // Clear the form whenever the dialog is closed
    }
  }, [open]);

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
      workingType: "регулярная",
      workingHistory: "да",
      workingComment: "-",
    },
    {
      id: 2,
      title: "Оформление договоров",
      workingTime: "30 мин",
      startTime: "9:20",
      endTime: "9:50",
      workingType: "разовая",
      workingHistory: "нет",
      workingComment:
        "Необходимо уточнить детали уточнить детали уточнить детали",
    },
    {
      id: 3,
      title: "Консультация клиентов",
      workingTime: "45 мин",
      startTime: "10:00",
      endTime: "10:45",
      workingType: "регулярная",
      workingHistory: "да",
      workingComment: "Особые случаи",
    },
  ]);

  // <==== CALCULATE WORKING TIME =====> //
  const calculateWorkTime = () => {
    if (startTime && endTime) {
      if (dayjs(endTime).isAfter(dayjs(startTime))) {
        const duration = dayjs(endTime).diff(dayjs(startTime), "minute");
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        worktimechange(`${hours}h ${minutes}min`);
        setTimeError(""); // Clear error
      } else {
        worktimechange(""); // Reset if invalid
        setTimeError("End time must be after Start time."); // Custom error message
      }
    } else {
      setTimeError("Please select both Start Time and End Time."); // Custom error message for missing time fields
    }
  };

  // Whenever startTime or endTime changes, recalculate the work time
  useEffect(() => {
    calculateWorkTime();
  }, [startTime, endTime]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startTime || !endTime) {
      setSubmitError("Please select both Start Time and End Time.");
      return;
    }

    if (!dayjs(endTime).isAfter(dayjs(startTime))) {
      setSubmitError("End time must be later than Start time.");
      return;
    }

    setSubmitError(""); // Clear any previous errors if form is valid

    // Format startTime and endTime into string representations
    const formattedStartTime = dayjs(startTime).format("HH:mm");
    const formattedEndTime = dayjs(endTime).format("HH:mm");

    const object = {
      id: Date.now(), // Assuming you want a unique ID based on timestamp
      title,
      worktime,
      startTime: formattedStartTime, // Use formatted time
      endTime: formattedEndTime, // Use formatted time
      workType,
      workingHistory,
      workingComment,
      stingDateSelected,
    };

    console.log(object);
    closePopup(); // Proceed with form submission
  };

  const stingDateSelected = selectDate.format("DD/MM/YYYY");

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
              maxDate={dayjs()}
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
            sx={{ width: "50%", fontWeight: "bold", textAlign: "start" }}
          >
            {stingDateSelected}
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
          marginBottom: "10px",
          borderRadius: "5px",
          boxShadow:
            "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
        }}
      >
        <Grid
          container
          sx={{
            height: "90px",
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
            xs={3.3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            }}
          >
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", lineHeight: "1" }}
            >
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
            <Typography
              sx={{ fontSize: "14px", fontWeight: "bold", lineHeight: "1" }}
            >
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
            <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
              Начало
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
            <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
              Конец
            </Typography>
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
            <Typography
              sx={{ fontSize: "15px", fontWeight: "bold", lineHeight: "1.1" }}
            >
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
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "capitalize",
                lineHeight: "1.2",
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
            }}
          >
            <Typography
              sx={{ fontSize: "14", fontWeight: "bold", lineHeight: "1" }}
            >
              Комментарии
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {/* <==== TABLE BODY SECTION ====> */}
      <Reorder.Group axis="y" onReorder={setItems} values={items} as="div">
        {items.map((item, index) => (
          <Reorder.Item key={item.id} value={item} as="div">
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
                paddingX: "4px",
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
                <Grid
                  item
                  xs={0.3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{}}>{item.id}</Typography>
                </Grid>

                {/* <==== WORK TITLE ====> */}
                <Grid
                  item
                  xs={3.3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    textAlign: "start",
                  }}
                >
                  <Typography
                    sx={{
                      height: "auto",
                      overflowWrap: "break-word",
                      wordBreak: "break-all",
                      lineHeight: "1.1",
                    }}
                  >
                    {item.title}
                  </Typography>
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
                  <Typography
                    sx={{
                      height: "auto",
                      overflowWrap: "break-word",
                      wordBreak: "break-all",
                      fontSize: "12px",
                    }}
                  >
                    {item.workingTime}
                  </Typography>
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
                  <Typography
                    sx={{
                      height: "auto",
                      overflowWrap: "break-word",
                      wordBreak: "break-all",
                    }}
                  >
                    {item.startTime}
                  </Typography>
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
                  <Typography
                    sx={{
                      height: "auto",
                      overflowWrap: "break-word",
                      wordBreak: "break-all",
                    }}
                  >
                    {item.endTime}
                  </Typography>
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
                  <Typography
                    sx={{
                      height: "auto",
                      overflowWrap: "break-word",
                      wordBreak: "break-all",
                    }}
                  >
                    {item.workingType}
                  </Typography>
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
                  <Typography
                    sx={{
                      height: "auto",
                      overflowWrap: "break-word",
                      wordBreak: "break-all",
                    }}
                  >
                    {item.workingHistory}
                  </Typography>
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
                  <Typography
                    sx={{
                      height: "auto",
                      overflowWrap: "break-word",
                      wordBreak: "break-all",
                      lineHeight: "1.1",
                    }}
                  >
                    {item.workingComment}
                  </Typography>
                </Grid>
                {/* <==== EDIT ====> */}
                <Grid
                  item
                  xs={0.3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="text"
                    sx={{
                      minWidth: "auto", // Ensures the button adjusts to the icon size
                      padding: "0px", // Removes padding around the button
                      margin: "0px", // Ensures no additional margins
                    }}
                  >
                    <ModeEditOutlineIcon
                      sx={{ color: Colors.nbu, width: "25px", height: "25px" }}
                    />
                  </Button>
                </Grid>
                {/* <==== DELETE =====> */}
                <Grid
                  item
                  xs={0.3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="text"
                    sx={{
                      minWidth: "auto", // Ensures the button adjusts to the icon size
                      padding: "0px", // Removes padding around the button
                      margin: "0px", // Ensures no additional margins
                    }}
                  >
                    <DeleteForeverIcon
                      sx={{
                        color: "red",
                        width: "25px", // Adjusted icon width
                        height: "25px", // Adjusted icon height
                      }}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* <=== CREATE AND SEND BUTTON ====> */}
      <Box
        sx={{
          marginY: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={addNewRow}
          variant="contained"
          sx={{ background: Colors.nbu }}
          endIcon={
            <AddCircleIcon
              sx={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
            />
          }
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "white",
              textTransform: "uppercase",
            }}
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
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "white",
              textTransform: "uppercase",
            }}
          >
            Yuborish
          </Typography>
        </Button>
      </Box>

      {/* <==== MAKE MODAL SECTION ====> */}
      <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          <span>ФОТОГРАФИЯ РАБОЧЕГО ДНЯ СОТРУДНИКА</span>
        </DialogTitle>
        <DialogContent>
          {/* <form > */}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} margin={2}>
              {/* !!! NAME TEXT !!! */}
              <TextField
                value={title}
                onChange={(e) => {
                  titlechange(e.target.value);
                }}
                variant="outlined"
                label="Что делалось на этапе"
                required // This makes the field mandatory
              />

              {/* !!!! WORKING TIME !!!! */}
              <TextField
                value={worktime}
                onChange={(e) => {
                  worktimechange(e.target.value);
                }}
                variant="outlined"
                label="Потраченное время"
                required // Mandatory field
                disabled // Disabled because it's calculated automatically
              />
              {/* <==== TIME SLECTION SECTION ====> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* !!!! START TIME !!!! */}
                <TimePicker
                  label="Начало работы"
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                  renderInput={(params) => <TextField {...params} required />}
                  // renderInput={(params) => (
                  //   <TextField
                  //     {...params}
                  //     required
                  //     error={!startTime && Boolean(timeError)}
                  //     helperText={!startTime ? "Start Time is required." : ""}
                  //   />
                  // )}
                  ampm={false}
                />

                {/* !!!! END TIME !!!! */}
                <TimePicker
                  label="Конец работы"
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                  renderInput={(params) => <TextField {...params} required />}
                  // renderInput={(params) => (
                  //   <TextField
                  //     {...params}
                  //     required
                  //     error={!endTime && Boolean(timeError)}
                  //     helperText={!endTime ? "End Time is required." : ""}
                  //   />
                  // )}
                  ampm={false}
                />
              </LocalizationProvider>
              {/* General error for time validation */}
              {timeError && (
                <Typography color="error" sx={{ fontSize: 14 }}>
                  {timeError}
                </Typography>
              )}

              {/* Custom form submit error */}
              {submitError && (
                <Typography color="error" sx={{ fontSize: 14 }}>
                  {submitError}
                </Typography>
              )}

              {/* !!!! WORKING TYPE !!!! */}
              <FormControl variant="outlined" required>
                <InputLabel id="work-type-label">Тип работы</InputLabel>
                <Select
                  labelId="work-type-label"
                  value={workType}
                  onChange={(e) => workTypechange(e.target.value)}
                  label="Work Type"
                >
                  <MenuItem value="onetime">разовая</MenuItem>
                  <MenuItem value="regular">регулярная</MenuItem>
                </Select>
              </FormControl>

              {/* !!!! WORKING HISTORY !!!! */}
              <FormControl variant="outlined" required>
                <InputLabel id="working-history-label">
                  задачи в рамки должностной инструкции
                </InputLabel>
                <Select
                  labelId="working-history-label"
                  value={workingHistory}
                  onChange={(e) => workingHistorychange(e.target.value)}
                  label="задачи в рамки должностной инструкции?"
                >
                  <MenuItem value="yes">да</MenuItem>
                  <MenuItem value="no">нет</MenuItem>
                </Select>
              </FormControl>

              {/* !!!! USER COMMENT !!!! */}
              <TextField
                value={workingComment}
                onChange={(e) => {
                  workingCommentchange(e.target.value);
                }}
                variant="outlined"
                label="Комментарии"
                multiline
                inputProps={{ maxLength: 180 }}
                required // Mandatory field
              />
              {/* <=== SUBMIT BUTTON ====> */}
              <Button
                variant="contained"
                type="submit"
                sx={{ backgroundColor: Colors.nbu }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: Colors.white,
                    textTransform: "uppercase",
                  }}
                >
                  qabul qilish
                </Typography>
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default KpiDailiyWorkTable;
