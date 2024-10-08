import React, { useEffect, useState } from "react";
import {
  Box,
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
  Grid,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Colors } from "../../styles/theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";
import { Reorder } from "framer-motion";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import GetAppIcon from '@mui/icons-material/GetApp';
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';
import { REQUESTS } from "../../api/requests";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const KpiDailiyWorkTable = () => {




  
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpenChange] = useState(false);
  const [title, titlechange] = useState("");
  const [worktime, worktimechange] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [workType, workTypechange] = useState("");
  const [workingHistory, workingHistorychange] = useState("");
  const [workingComment, workingCommentchange] = useState("");
  const [timeError, setTimeError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const { items: storedItems = [] } = useSelector((state) => state.data || {});
  const [items, setItems] = useState(storedItems); // Local state for items
  const [userdata, setUserData] = useState([]);
  
  
  const [selectDate, setSelectDate] = useState(dayjs());
  const formattedDate = dayjs(selectDate).format("DD.MM.YYYY");


  useEffect(() => {
    const getUserData = async () => {
      try {
        const responses = await REQUESTS.user.getUser();
        console.log(responses);
        const propsdata = responses.data[0];
        setUserData(propsdata);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
   
    getUserData();
  }, [setUserData]);

  const addNewRow = () => {
    openPopup();
  };

  const closePopup = () => {
    setOpenChange(false);
    setEditingItemId(null);
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
      resetForm();
    }
  }, [open]);


  const onChangeDate = (newValue) => {
    setSelectDate(newValue);
  };

  const calculateWorkTime = () => {
    if (startTime && endTime) {
      if (dayjs(endTime).isAfter(dayjs(startTime))) {
        const duration = dayjs(endTime).diff(dayjs(startTime), "minute");
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        worktimechange(`${hours}h ${minutes}min`);
        setTimeError("");
      } else {
        worktimechange("");
        setTimeError("End time must be after Start time.");
      }
    } else {
      setTimeError("Please select both Start Time and End Time.");
    }
  };

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

    setSubmitError("");

    const newItem = {
      id: editingItemId || Date.now(), // Use editingItemId if editing
      title,
      workingTime: worktime,
      startTime: dayjs(startTime).format("HH:mm"),
      endTime: dayjs(endTime).format("HH:mm"),
      workingType: workType,
      workingHistory,
      workingComment,
      date: formattedDate,
    };

    let updatedItems;
    if (editingItemId) {
      // Edit existing item
      updatedItems = items.map((item) =>
        item.id === editingItemId ? newItem : item
      );
    } else {
      // Add new item
      updatedItems = [...items, newItem];
    }

    setItems(updatedItems);
    localStorage.setItem("workItems", JSON.stringify(updatedItems));
    closePopup();
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("workItems", JSON.stringify(updatedItems));
  };

  const handleEdit = (item) => {
    setEditingItemId(item.id);
    titlechange(item.title);
    worktimechange(item.workingTime);
    setStartTime(dayjs(item.startTime, "HH:mm"));
    setEndTime(dayjs(item.endTime, "HH:mm"));
    workTypechange(item.workingType);
    workingHistorychange(item.workingHistory);
    workingCommentchange(item.workingComment);
    openPopup();
  };

  const handleSend = () => {
    const itemsForSelectedDate = items.filter(
      (item) => item.date === formattedDate
    );

    const dataToSend = {
      mainDate: formattedDate,
      towDatas: itemsForSelectedDate,
    };

    console.log("Sending data to backend: ", dataToSend);
    dispatch(REQUESTS.data.sendAllData(dataToSend))
      .then((response) => {
        console.log("Data sent successfully: ", response);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  };

  const handleRefresh = () => {
    dispatch(REQUESTS.data.getData())
      .then((response) => {
        const filteredItems = response.data.filter(
          (item) => item.date === formattedDate
        );
        setItems(filteredItems);
        localStorage.setItem("workItems", JSON.stringify(filteredItems));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };


  useEffect(() => {
    // Load data from localStorage on component mount
    const savedItems = JSON.parse(localStorage.getItem("workItems")) || [];
    setItems(savedItems);
  }, []);



  const location = useLocation();




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
              format="DD.MM.YYYY"
              maxDate={dayjs()}
              onClick={handleRefresh}
              renderInput={(params) => <TextField {...params} />}
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
          <Typography sx={{ width: "50%", fontWeight: "bold",textTransform:"uppercase" }}>
            {t("full_name_user")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "bold", textAlign: "start" ,color:"black"}}
          >
            { userdata.name || "нет информации"}
          </Typography>
        </Box>
        {/* <===== WORKER FILIAL/BRANCH SECTION =====> */}
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
            {t("filial")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            {userdata.branch || "нет информации"}
          </Typography>
        </Box>
     
        {/* <=== DIVIDION SECTION ====> */}
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
          <Typography sx={{ width: "50%", fontWeight: "bold",textTransform:"uppercase" }}>
            {t("group_of_worker")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
          {userdata.division || "нет информации"}
          </Typography>
        </Box>
        {/* <===== DEPARTMENT SECTION =====> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #AAAAAE",
            width: "100%",
            paddingLeft: "5px",
            height: "50px",
          }}
        >
          <Typography sx={{ width: "50%", fontWeight: "bold",textTransform:"uppercase" }}>
            {t("sector_of_worker")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            {userdata.department || "нет информации"}
          </Typography>
        </Box>
           {/* <==== WORKER POSITION =====>  */}
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
            {t("positionjob")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            {userdata.position ||  "нет информации"}
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

      <Reorder.Group
        axis="y"
        onReorder={(updatedItems) => setItems(updatedItems)}
        values={items || []}
        as="div"
      >
        {items && items.length > 0 ? (
          items.map((item, index) => (
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
                    {/* <Typography sx={{}}>{item.id}</Typography> */}
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
                      onClick={() => handleEdit(item)}
                    >
                      <ModeEditOutlineIcon
                        sx={{
                          color: Colors.nbu,
                          width: "25px",
                          height: "25px",
                        }}
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
                      onClick={() => handleDelete(item.id)}
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
          ))
        ) : (
          <Typography sx={{ textAlign: "center", margin: "20px" }}>
            No items available
          </Typography>
        )}
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
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
          {/* <=== ADD NEW ROW INFORMATION ====> */}
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
              Ma'lumot qo'shish{" "}
            </Typography>
          </Button>
          {/* <=== REFRESH DATA ===> */}
          <Button
            variant="contained"
            onClick={handleRefresh}
            sx={{ background: Colors.nbu }}
            endIcon={
              <GetAppIcon
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
              Yangilash
            </Typography>
          </Button>

        </Box>
        {/* <=== SENT BUTTON ===> */}
        <Button
          variant="contained"
          onClick={handleSend}
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
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} margin={2}>
              <TextField
                value={title}
                onChange={(e) => titlechange(e.target.value)}
                variant="outlined"
                label="Что делалось на этапе"
                required
              />
              <TextField
                value={worktime}
                onChange={(e) => worktimechange(e.target.value)}
                variant="outlined"
                label="Потраченное время"
                required
                disabled
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Начало работы"
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                  renderInput={(params) => <TextField {...params} required />}
                  ampm={false}
                />
                <TimePicker
                  label="Конец работы"
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                  renderInput={(params) => <TextField {...params} required />}
                  ampm={false}
                />
              </LocalizationProvider>
              {timeError && (
                <Typography color="error" sx={{ fontSize: 14 }}>
                  {timeError}
                </Typography>
              )}
              {submitError && (
                <Typography color="error" sx={{ fontSize: 14 }}>
                  {submitError}
                </Typography>
              )}
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
              <TextField
                value={workingComment}
                onChange={(e) => workingCommentchange(e.target.value)}
                variant="outlined"
                label="Комментарии"
                multiline
                inputProps={{ maxLength: 180 }}
                required
              />
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
