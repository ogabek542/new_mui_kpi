import React, { useEffect, useState, useRef } from "react";
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
  Snackbar,
  Alert,
  Modal ,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Colors } from "../../styles/theme"; // Ensure this path is correct
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";
import { Reorder, color } from "framer-motion";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import GetAppIcon from "@mui/icons-material/GetApp";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid"; // Importing uuid
import {REQUESTS} from "../../api/requests";
// import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PriorityHighTwoToneIcon from '@mui/icons-material/PriorityHighTwoTone';
import { keyframes } from '@emotion/react';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const KpiDailiyWorkTable = () => {
  const { t } = useTranslation();

  // Dialog States
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openNoticeModal, setOpenNoticeModal] = useState(false);

  // Add Form States
  const [addTitle, setAddTitle] = useState("");
  const [addWorkDuration, setAddWorkDuration] = useState(dayjs("00:00", "HH:mm"));
  const [addWorkType, setAddWorkType] = useState("");
  const [addWorkingHistory, setAddWorkingHistory] = useState("");
  const [addWorkingComment, setAddWorkingComment] = useState("");
  const [addStartTime, setAddStartTime] = useState(dayjs("09:00", "HH:mm"));
  const [addEndTime, setAddEndTime] = useState(dayjs("09:00", "HH:mm"));
  const [totalWorkingTime, setTotalWorkingTime] = useState("0h 0m");

  // Edit Form States
  const [editItemId, setEditItemId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editWorkDuration, setEditWorkDuration] = useState(dayjs("00:00", "HH:mm"));
  const [editWorkType, setEditWorkType] = useState("");
  const [editWorkingHistory, setEditWorkingHistory] = useState("");
  const [editWorkingComment, setEditWorkingComment] = useState("");
  const [editStartTime, setEditStartTime] = useState(dayjs("09:00", "HH:mm"));
  const [editEndTime, setEditEndTime] = useState(dayjs("09:00", "HH:mm"));

  // Items and Date States
  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectDate, setSelectDate] = useState(dayjs());
  const formattedDate = dayjs(selectDate).format("DD.MM.YYYY");
  const [defaultStartTime, setDefaultStartTime] = useState(dayjs("09:00", "HH:mm"));


// <=== NOITCE MODAL COLOR ===> //
  const waveAnimation = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0px rgba(255, 193, 7, 0.5), /* Increased opacity to 0.5 */
                0 0 0 10px rgba(255, 193, 7, 0.5), /* Increased opacity to 0.5 */
                0 0 0 20px rgba(255, 193, 7, 0.5); /* Increased opacity to 0.5 */
  }
  50% {
    box-shadow: 0 0 0 10px rgba(255, 193, 7, 0.4), /* Increased opacity to 0.4 */
                0 0 0 20px rgba(255, 193, 7, 0.4), /* Increased opacity to 0.4 */
                0 0 0 30px rgba(255, 193, 7, 0.3); /* Increased opacity to 0.3 */
  }
`;

  // Snackbar State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Overlapping Items State
  const [overlappingIds, setOverlappingIds] = useState([]);

  // Ref for Previous Items (used in Reorder)
  const prevItemsRef = useRef([]);

  // Helper Functions
  // const parseWorkTime = (timeValue) => {
  //   if (!timeValue || !timeValue.isValid()) return 0;
  //   const hours = timeValue.hour();
  //   const minutes = timeValue.minute();
  //   return hours * 60 + minutes;
  // };

  const formatTime = (dayjsObj) => {
    return dayjsObj.format("HH:mm");
  };

  const calculateEndTime = (start, totalMinutes) => {
    const startMoment = dayjs(start, "HH:mm");
    const endMoment = startMoment.add(totalMinutes, "minute");
    return endMoment;
  };

  const calculateWorkingTime = (totalMinutes) => {
    if (totalMinutes <= 0) {
      return "0h 0m";
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Fetch User Data on Mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from API
        const response = await REQUESTS.user.getUser();
        const propsdata = response.data[0];
        setData(propsdata);
      } catch (error) {
        console.error("Error fetching user data:", error);
        showSnackbar("Ошибка при получении данных пользователя.", "error");
      }
    };
    fetchUserData();
  }, []);

  // Check for Time Overlaps
  const findOverlappingItems = (itemsList) => {
    const overlappingIdsSet = new Set();
    // No need to sort since times are recalculated
    for (let i = 0; i < itemsList.length - 1; i++) {
      const currentEnd = dayjs(itemsList[i].endTime, "HH:mm");
      const nextStart = dayjs(itemsList[i + 1].startTime, "HH:mm");
      if (currentEnd.isAfter(nextStart)) {
        overlappingIdsSet.add(itemsList[i].id);
        overlappingIdsSet.add(itemsList[i + 1].id);
      }
    }
    return Array.from(overlappingIdsSet);
  };

  // Function to Recalculate Times
  const recalculateTimes = (itemsList) => {
    let currentTime = defaultStartTime;
    return itemsList.map((item) => {
      const workTimeMinutes = item.workHours * 60 + item.workMinutes;
      const startTime = currentTime;
      const endTime = currentTime.add(workTimeMinutes, "minute");
      const newItem = {
        ...item,
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
      };
      currentTime = endTime;
      return newItem;
    });
  };

  // Handle Reorder with Time Recalculation
  const handleReorder = (reorderedItems) => {
    // Recalculate times based on new order
    const updatedItems = recalculateTimes(reorderedItems);

    // Update state and localStorage
    setItems(updatedItems);
    localStorage.setItem("workItems", JSON.stringify(updatedItems));
    prevItemsRef.current = updatedItems;

    showSnackbar("Строки успешно изменены!", "success");

    // Check for overlaps after reordering
    const overlapping = findOverlappingItems(updatedItems);
    if (overlapping.length > 0) {
      showSnackbar(
        "Внимание: Некоторые строки имеют пересекающиеся времена.",
        "warning"
      );
      setOverlappingIds(overlapping);
    } else {
      setOverlappingIds([]);
    }
  };

  // Handle Add Submit
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    // Validate Required Fields
    if (
      !addTitle ||
      !addWorkType ||
      !addWorkingHistory ||
      !addWorkDuration 
    ) {
      showSnackbar("Пожалуйста, заполните все обязательные поля.", "error");
      return;
    }

    // Validate Time Values
    if (!addWorkDuration.isValid()) {
      showSnackbar("Некорректные значения времени.", "error");
      return;
    }

    const workHours = addWorkDuration.hour();
    const workMinutes = addWorkDuration.minute();
    const workTimeMinutes = workHours * 60 + workMinutes;

    if (workTimeMinutes <= 0) {
      showSnackbar("Время работы должно быть больше 0 минут.", "error");
      return;
    }

    // Generate a unique ID for the new item
    const uniqueId = uuidv4();

    const mapWorkType = (translatedValue) => {
      switch (translatedValue) {
        case t("working_type_value_one"):
          return "onetime";
        case t("working_type_value_two"):
          return "regular";
        default:
          return "";
      }
    };

    const newItem = {
      id: uniqueId, // Assign the unique ID
      title: addTitle,
      workHours: workHours,
      workMinutes: workMinutes,
      workTime: calculateWorkingTime(workTimeMinutes),
      workType: addWorkType,
      workingHistory: addWorkingHistory,
      workingComment: addWorkingComment,
      date: formattedDate,
    };

    try {
      // Add the new item locally
      const updatedItems = [...items, newItem];

      // Recalculate times
      const recalculatedItems = recalculateTimes(updatedItems);

      setItems(recalculatedItems);
      showSnackbar("Строка успешно добавлена!", "success");
      handleCloseAddDialog();
      prevItemsRef.current = recalculatedItems;

      // Save to local storage
      localStorage.setItem("workItems", JSON.stringify(recalculatedItems));
    } catch (error) {
      console.error("Error adding item:", error);
      showSnackbar(error.message || "Ошибка при добавлении строки.", "error");
    }
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Validate Required Fields
    if (
      !editTitle ||
      !editWorkType ||
      !editWorkingHistory ||
      !editWorkDuration
    ) {
      showSnackbar("Пожалуйста, заполните все обязательные поля.", "error");
      return;
    }

    // Validate Time Values
    if (!editWorkDuration.isValid()) {
      showSnackbar("Некорректные значения времени.", "error");
      return;
    }

    const workHours = editWorkDuration.hour();
    const workMinutes = editWorkDuration.minute();
    const workTimeMinutes = workHours * 60 + workMinutes;

    if (workTimeMinutes <= 0) {
      showSnackbar("Время работы должно быть больше 0 минут.", "error");
      return;
    }

    const editedItem = {
      id: editItemId,
      title: editTitle,
      workHours: workHours,
      workMinutes: workMinutes,
      workTime: calculateWorkingTime(workTimeMinutes),
      workType: editWorkType,
      workingHistory: editWorkingHistory,
      workingComment: editWorkingComment,
      date: formattedDate,
    };

    try {
      // Update the item locally
      const editedItemIndex = items.findIndex((item) => item.id === editItemId);
      let updatedItems = [...items];
      updatedItems[editedItemIndex] = editedItem;

      // Recalculate times
      const recalculatedItems = recalculateTimes(updatedItems);

      setItems(recalculatedItems);
      showSnackbar("Строка успешно отредактирована!", "success");
      handleCloseEditDialog();
      prevItemsRef.current = recalculatedItems;

      // Save to local storage
      localStorage.setItem("workItems", JSON.stringify(recalculatedItems));
    } catch (error) {
      console.error("Error editing item:", error);
      showSnackbar(error.message || "Ошибка при редактировании строки.", "error");
    }
  };

  // Handle Delete
  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);

    // Recalculate times
    const recalculatedItems = recalculateTimes(updatedItems);

    setItems(recalculatedItems);
    localStorage.setItem("workItems", JSON.stringify(recalculatedItems));
    showSnackbar("Строка успешно удалена!", "info");
    prevItemsRef.current = recalculatedItems;
  };

  // Handle Send
  const handleSend = async () => {

    setOpenNoticeModal(false)
    
    const itemsForSelectedDate = items.filter(
      (item) => item.date === formattedDate
    );

    const dataToSend = {
      mainDate: formattedDate,
      towDatas: itemsForSelectedDate,
    };
    const itemsToSend = items.map(item => ({
      ...item,
      workType: mapWorkType(item.workType),
    }));

    console.log("Sending data to backend: ", dataToSend);
  
    try {
      // Replace with actual API call
      await REQUESTS.data.sendAllData(dataToSend);
      showSnackbar("Данные успешно отправлены!", "success");
    } catch (error) {
      console.error("Error sending data:", error);
      showSnackbar("Ошибка при отправке данных.", "error");
    }
   
  };

  // Handle Refresh
  const handleRefresh = () => {
    const savedItems = JSON.parse(localStorage.getItem("workItems")) || [];
    const recalculatedItems = recalculateTimes(savedItems);
    setItems(recalculatedItems);
    showSnackbar(t("success_data_refresh_text"), "success");
    prevItemsRef.current = recalculatedItems;

    // Recheck overlaps
    const overlapping = findOverlappingItems(recalculatedItems);
    if (overlapping.length > 0) {
      setOverlappingIds(overlapping);
      showSnackbar(
        t("time_operlaps_error_text"),
        "warning"
      );
    } else {
      setOverlappingIds([]);
    }
  };

  // Handle Date Change
  const onChangeDate = (newDate) => {
    setSelectDate(newDate);
    handleRefresh();
  };

  // Load Items from Local Storage on Mount
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("workItems")) || [];
    const recalculatedItems = recalculateTimes(savedItems);
    setItems(recalculatedItems);
    prevItemsRef.current = recalculatedItems;

    // Check for overlaps on initial load
    const overlapping = findOverlappingItems(recalculatedItems);
    if (overlapping.length > 0) {
      setOverlappingIds(overlapping);
      showSnackbar(
        t("warning_error_text"),
        "warning"
      );
    }
  }, []);

  // Synchronize prevItemsRef whenever items change (excluding reorder)
  useEffect(() => {
    // This ensures that prevItemsRef is always up-to-date except during reorder
    // Prevent updating prevItemsRef inside handleReorder
    // Only update after successful add/edit/delete operations
    // Since handleReorder already updates prevItemsRef
    if (!prevItemsRef.current.length || items !== prevItemsRef.current) {
      prevItemsRef.current = items;
    }
  }, [items]);

  // Reset Add Form
  const resetAddForm = () => {
    setAddTitle("");
    setAddWorkDuration(dayjs("00:00", "HH:mm"));
    setAddWorkType("");
    setAddWorkingHistory("");
    setAddWorkingComment("");
    setAddStartTime(dayjs("09:00", "HH:mm"));
    setAddEndTime(dayjs("09:00", "HH:mm"));
  };

  // Reset Edit Form
  const resetEditForm = () => {
    setEditItemId(null);
    setEditTitle("");
    setEditWorkDuration(dayjs("00:00", "HH:mm"));
    setEditWorkType("");
    setEditWorkingHistory("");
    setEditWorkingComment("");
    setEditStartTime(dayjs("09:00", "HH:mm"));
    setEditEndTime(dayjs("09:00", "HH:mm"));
  };

  // Function to Open Notice Modal
const handleOpenNoticeDialog = () => {
  setOpenNoticeModal(true);
};

// Function to Close Notice Modal
const handleCloseNoticeDialog = () => {
  setOpenNoticeModal(false);
};


  // Open Add Dialog
  const handleOpenAddDialog = () => {
    if (items.length > 0) {
      const lastItem = items[items.length - 1];
      setAddStartTime(dayjs(lastItem.endTime, "HH:mm"));
      setAddEndTime(dayjs(lastItem.endTime, "HH:mm").add(addWorkDuration.hour(), "hour").add(addWorkDuration.minute(), "minute"));
    } else {
      setAddStartTime(defaultStartTime);
      setAddEndTime(defaultStartTime);
    }
    setOpenAddDialog(true);
  };

  // Close Add Dialog
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    resetAddForm();
  };

  // Open Edit Dialog
  const handleOpenEditDialog = (item) => {
    setEditItemId(item.id);
    setEditTitle(item.title);
    setEditWorkDuration(dayjs().hour(item.workHours).minute(item.workMinutes));
    setEditWorkType(item.workType);
    setEditWorkingHistory(item.workingHistory);
    setEditWorkingComment(item.workingComment);
    setEditStartTime(dayjs(item.startTime, "HH:mm"));
    setEditEndTime(dayjs(item.endTime, "HH:mm"));
    setOpenEditDialog(true);
  };

  // Close Edit Dialog
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    resetEditForm();
  };

  // Update End Time when Work Duration changes in Add Dialog
  useEffect(() => {
    if (openAddDialog) {
      const updatedEndTime = addStartTime.add(addWorkDuration.hour(), "hour").add(addWorkDuration.minute(), "minute");
      setAddEndTime(updatedEndTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addWorkDuration, addStartTime]);

  // Update End Time when Work Duration changes in Edit Dialog
  useEffect(() => {
    if (openEditDialog) {
      const updatedEndTime = editStartTime.add(editWorkDuration.hour(), "hour").add(editWorkDuration.minute(), "minute");
      setEditEndTime(updatedEndTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editWorkDuration, editStartTime]);


  const calculateTotalWorkingTime = () => {
    if (items.length === 0) return "0h 0m"; // No items, no working time
  
    // Get the endTime of the last item
    const lastItem = items[items.length - 1];
    const lastEndTime = dayjs(lastItem.endTime, "HH:mm");
  
    // Get the default start time
    const startTime = dayjs(defaultStartTime, "HH:mm"); // Ensure defaultStartTime is a dayjs object
  
    // Calculate the difference in minutes
    const totalMinutes = lastEndTime.diff(startTime, 'minute');
  
    if (totalMinutes <= 0) return "0h 0m"; // Handle non-positive durations
  
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return `${hours}h ${minutes}m`;
  };


    // useEffect to Update Total Working Time Whenever Items Change
    useEffect(() => {
      const calculatedTime = calculateTotalWorkingTime();
      setTotalWorkingTime(calculatedTime);
    }, [items, defaultStartTime]);

  return (
    <Box sx={{ width: "100%", height: "auto", padding: "5px" }}>
      {/* <==== HEADER SECTION =====> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {t("daily_work_main_title")}
        </Typography>
        {/* Calendar select date */}
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
            height: "45px",
          }}
        >
          <Typography
            sx={{
              width: "50%",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {t("full_name_user")}
          </Typography>
          <Typography
            sx={{
              width: "50%",
              fontWeight: "bold",
              textAlign: "start",
              color: "black",
            }}
          >
            {userData.name || "нет информации"}
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
            height: "40px",
          }}
        >
          <Typography sx={{ width: "50%", fontWeight: "bold" }}>
            {t("filial")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            {userData.branch || "нет информации"}
          </Typography>
        </Box>

        {/* <=== DIVISION SECTION ====> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: "2px solid #AAAAAE",
            paddingLeft: "5px",
            height: "40px",
          }}
        >
          <Typography
            sx={{
              width: "50%",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {t("group_of_worker")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            {userData.division || "нет информации"}
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
            height: "40px",
          }}
        >
          <Typography
            sx={{
              width: "50%",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {t("sector_of_worker")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            {userData.department || "нет информации"}
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
            height: "40px",
            borderBottom: "2px solid #AAAAAE",
          }}
        >
          <Typography sx={{ width: "50%", fontWeight: "bold" }}>
            {t("positionjob")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            {userData.position || "нет информации"}
          </Typography>
        </Box>
        {/* <===== START TIME SELECTION SECTION =====> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingLeft: "5px",
            height: "40px",
          }}
        >
          <Typography
            sx={{
              width: "50%",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {t("default_startTime")}
          </Typography>
          {/* <=== START TIME DISPLAY ====> */}
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            {formatTime(defaultStartTime)}
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
            backgroundColor: "white", // Ensure header has background
            zIndex: 1, // Ensure header stays above table rows
          }}
        >
          {/* Index Column */}
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
          {/* Work Title Column */}
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
              {t("table_header_title")}
            </Typography>
          </Grid>
          {/* Work Time Column */}
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
            {t("table_header_workhour")}
            </Typography>
          </Grid>
          {/* Start Time Column */}
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
              {t("start_time")}
            </Typography>
          </Grid>
          {/* End Time Column */}
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
              {t("end_time")}
            </Typography>
          </Grid>
          {/* Work Type Column */}
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
              {t("working_type_text")}
            </Typography>
          </Grid>
          {/* Working History Column */}
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
            {t("working_task_title")}
            </Typography>
          </Grid>
          {/* Comments Column */}
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
              sx={{ fontSize: "14px", fontWeight: "bold", lineHeight: "1" }}
            >
            {t("comment_text")}
            </Typography>
          </Grid>
          {/* Actions Column (Hidden for Table Header) */}
          <Grid
            item
            xs={0.6}
            sx={{
              display: "none",
            }}
          >
            {/* Placeholder for Actions Column */}
          </Grid>
        </Grid>
      </Box>
      {/* <==== TABLE BODY SECTION ====> */}
      {items && items.length > 0 ? (
        <Reorder.Group
          axis="y"
          onReorder={handleReorder}
          values={items}
          as="div"
        >
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
                  backgroundColor: overlappingIds.includes(item.id)
                    ? "#ffcccc"
                    : "white", // Highlight if overlapping
                }}
              >
                <Grid container>
                  {/* <==== INDEX ====> */}
                  <Grid
                    item
                    xs={0.3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography>{index + 1}</Typography>
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
                        paddingX: "4px",
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
                        fontSize: "16px",
                      }}
                    >
                      {item.workTime}
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
                      {item.workType === "regular"
                        ? "регулярная"
                        : "разовая"}
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
                      {item.workingHistory === "yes" ? "да" : "нет"}
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
                        paddingX: "4px",
                      }}
                    >
                      {item.workingComment}
                    </Typography>
                  </Grid>
                  {/* <==== ACTIONS ====> */}
                  <Grid
                    item
                    xs={0.6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Edit Button */}
                    <Button
                      variant="text"
                      sx={{
                        minWidth: "auto",
                        padding: "0px",
                        margin: "0px",
                      }}
                      onClick={() => handleOpenEditDialog(item)}
                    >
                      <ModeEditOutlineIcon
                        sx={{
                          color: Colors.nbu,
                          width: "22px",
                          height: "22px",
                        }}
                      />
                    </Button>
                    {/* Delete Button */}
                    <Button
                      variant="text"
                      sx={{
                        minWidth: "auto",
                        padding: "0px",
                        margin: "0px",
                        marginLeft: "5px",
                      }}
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteForeverIcon
                        sx={{
                          color: "red",
                          width: "22px",
                          height: "22px",
                        }}
                      />
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      ) : (
        <Typography sx={{ textAlign: "center", margin: "20px" }}>
          {t("find_row")}
        </Typography>
      )}

      {/* <=== CREATE AND SEND BUTTON ====> */}
      <Box
        sx={{
          marginY: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          {/* <=== ADD NEW ROW INFORMATION ====> */}
          <Button
            onClick={handleOpenAddDialog}
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
              {t("add_new_row")}
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
              {t("refresh_row_data")}
            </Typography>
          </Button>
        </Box>
        {/* <=== SEND BUTTON ===> */}
        <Button
          variant="contained"
          
          onClick={() => handleOpenNoticeDialog()}
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
            {t("send_rowdata")}
          </Typography>
        </Button>
      </Box>

      {/* <==== ADD ROW MODAL ====> */}
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "20px" }}>
            {t("fotowork_section_title")} {formattedDate} {t("year")}.
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* Display Task Timing */}
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="subtitle1" color="textSecondary">
              {t("start_task_time")}: {formatTime(addStartTime)} {t("end_task_time")} :{" "}
              {formatTime(addEndTime)}
            </Typography>
          </Box>
          <form onSubmit={handleAddSubmit}>
            <Stack
              margin={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              {/* <=== LEFT SIDE ===> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  gap: "10px",
                }}
              >
                {/* <=== TITLE INPUT ===> */}
                <TextField
                  value={addTitle}
                  onChange={(e) => setAddTitle(e.target.value)}
                  variant="outlined"
                  label={t("first_doingwork_inputlabel")}
                  required
                  multiline // To increase the height
                  minRows={6} // Reduced rows for better UX
                  inputProps={{ maxLength: 290 }} // Set the maximum length of the input
                  InputLabelProps={{
                    sx: {
                      color: Colors.nbu, // Custom label text color
                      "&.Mui-focused": {
                        color: Colors.blue_nbu, // Custom label text color on focus
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.blue_nbu, // Custom border color
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on focus
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu, // Custom label text color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu, // Custom label text color on focus
                    },
                  }}
                />
               {/* <=== WORK DURATION INPUT ===> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label={t("spent_timeto_work")}
                    value={addWorkDuration}
                    onChange={(newValue) =>
                      setAddWorkDuration(
                        newValue && newValue.isValid()
                          ? newValue
                          : dayjs("00:00", "HH:mm")
                      )
                    }
                    views={["hours", "minutes"]}
                    format="HH:mm"
                    ampm={false}
                    renderInput={(params) => <TextField {...params} required />}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: Colors.blue_nbu, // Custom border color
                        },
                        "&:hover fieldset": {
                          borderColor: Colors.blue_nbu, // Border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: Colors.blue_nbu, // Border color on focus
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: Colors.blue_nbu, // Custom label text color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: Colors.blue_nbu, // Custom label text color on focus
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
              {/* <=== RIGHT SIDE ====> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  gap: "10px",
                }}
              >
              {/* <=== WORKING TYPE ===> */}
              <FormControl
                  variant="outlined"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.nbu, // Custom border color
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.nbu, // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.nbu, // Border color on focus
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu, // Custom label text color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu, // Custom label text color on focus
                    },
                    "& .MuiSelect-root": {
                      color: Colors.blue_nbu, // Custom text color inside the Select component
                    },
                  }}
                >
                  <InputLabel id="add-work-type-label">{t("working_typeof_task")}</InputLabel>
                  <Select
                    labelId="add-work-type-label"
                    value={addWorkType}
                    onChange={(e) => setAddWorkType(e.target.value)}
                    label={t("working_typeof_task")}
                  >
                    <MenuItem value="onetime">{t("working_type_value_one")}</MenuItem>
                    <MenuItem value="regular">{t("working_type_value_two")}</MenuItem>
                  </Select>
                </FormControl>
                {/* <=== WORKING HISTORY BOOLEAN YES/NO ====> */}
                <FormControl
                  variant="outlined"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.blue_nbu, // Custom border color
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on focus
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu, // Custom label text color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu, // Custom label text color on focus
                    },
                    "& .MuiSelect-root": {
                      color: Colors.blue_nbu, // Custom text color inside the Select component
                    },
                  }}
                >
                  <InputLabel id="add-working-history-label">
                    {t("job_tasks_scope_desctiption")}
                  </InputLabel>
                  <Select
                    labelId="add-working-history-label"
                    value={addWorkingHistory}
                    onChange={(e) => setAddWorkingHistory(e.target.value)}
                    label={t("job_tasks_scope_desctiption")}
                  >
                    <MenuItem value={t("yes")}>{t("yes")}</MenuItem>
                    <MenuItem value={t("no")}>{t("no")}</MenuItem>
                  </Select>
                </FormControl>
                {/* <=== WORKING COMMENT ===> */}
                <TextField
                  value={addWorkingComment}
                  onChange={(e) => setAddWorkingComment(e.target.value)}
                  variant="outlined"
                  label={t("comment_text")}
                  // required
                  multiline // To increase the height
                  minRows={3} // Set the minimum number of rows for the TextField
                  inputProps={{ maxLength: 150 }} // Set the maximum length of the input
                  InputLabelProps={{
                    sx: {
                      color: Colors.nbu, // Custom label text color
                      "&.Mui-focused": {
                        color: Colors.blue_nbu, // Custom label text color on focus
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.blue_nbu, // Custom border color
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on focus
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu, // Custom label text color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu, // Custom label text color on focus
                    },
                  }}
                />
              </Box>
            </Stack>
            {/* <=== SUBMIT BUTTON ===> */}
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: Colors.nbu, width: "100%" }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: Colors.white,
                  textTransform: "uppercase",
                }}
              >
              {t("submit_button_text")}
              </Typography>
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* <==== EDIT ROW MODAL ====> */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "20px" }}>
          {t("fotowork_section_title")} {formattedDate} {t("year")}.
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* Display Task Timing */}
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="subtitle1" color="textSecondary">
            {t("start_task_time")}: {formatTime(editStartTime)} {t("end_task_time")}: {" "}
              {formatTime(editEndTime)}
            </Typography>
          </Box>
          <form onSubmit={handleEditSubmit}>
            <Stack
              margin={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              {/* <=== LEFT SIDE ===> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  gap: "10px",
                }}
              >
                {/* <=== TITLE INPUT ===> */}
                <TextField
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  variant="outlined"
                  label={t("first_doingwork_inputlabel")}
                  required
                  multiline
                  minRows={6}
                  inputProps={{ maxLength: 290 }}
                  InputLabelProps={{
                    sx: {
                      color: Colors.nbu,
                      "&.Mui-focused": {
                        color: Colors.blue_nbu,
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu,
                    },
                  }}
                />
                   {/* <=== WORK DURATION INPUT ===> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label={t("spent_timeto_work")}
                    value={editWorkDuration}
                    onChange={(newValue) =>
                      setEditWorkDuration(
                        newValue && newValue.isValid()
                          ? newValue
                          : dayjs("00:00", "HH:mm")
                      )
                    }
                    views={["hours", "minutes"]}
                    format="HH:mm"
                    ampm={false}
                    renderInput={(params) => <TextField {...params} required />}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: Colors.blue_nbu,
                        },
                        "&:hover fieldset": {
                          borderColor: Colors.blue_nbu,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: Colors.blue_nbu,
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: Colors.blue_nbu,
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: Colors.blue_nbu,
                      },
                    }}
                  />
                </LocalizationProvider>
            
              </Box>
              {/* <=== RIGHT SIDE ====> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  gap: "10px",
                }}
              >
              {/* <=== WORKING TYPE ===> */}
                <FormControl
                  variant="outlined"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.nbu,
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.nbu,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.nbu,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu,
                    },
                    "& .MuiSelect-root": {
                      color: Colors.blue_nbu,
                    },
                  }}
                >
                  <InputLabel id="edit-work-type-label">{t("working_typeof_task")}</InputLabel>
                  <Select
                    labelId="edit-work-type-label"
                    value={editWorkType}
                    onChange={(e) => setEditWorkType(e.target.value)}
                    label={t("working_typeof_task")}
                  >
                    <MenuItem value={t("working_type_value_one")}>{t("working_type_value_one")}</MenuItem>
                    <MenuItem value={t("working_type_value_two")}>{t("working_type_value_two")}</MenuItem>
                  </Select>
                </FormControl>
                {/* <=== WORKING HISTORY BOOLEAN YES/NO ====> */}
                <FormControl
                  variant="outlined"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu,
                    },
                    "& .MuiSelect-root": {
                      color: Colors.blue_nbu,
                    },
                  }}
                >
                  <InputLabel id="edit-working-history-label">
                    {t("job_tasks_scope_desctiption")}
                  </InputLabel>
                  <Select
                    labelId="edit-working-history-label"
                    value={editWorkingHistory}
                    onChange={(e) => setEditWorkingHistory(e.target.value)}
                    label={t("job_tasks_scope_desctiption")}
                  >
                    <MenuItem value={t("yes")}>{t("yes")}</MenuItem>
                    <MenuItem value={t("no")}>{t("no")}</MenuItem>
                  </Select>
                </FormControl>

                {/* <=== WORKING COMMENT ===> */}
                <TextField
                  value={editWorkingComment}
                  onChange={(e) => setEditWorkingComment(e.target.value)}
                  variant="outlined"
                  label={t("comment_text")}
                  required
                  multiline
                  minRows={3}
                  inputProps={{ maxLength: 150 }}
                  InputLabelProps={{
                    sx: {
                      color: Colors.nbu,
                      "&.Mui-focused": {
                        color: Colors.blue_nbu,
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu,
                    },
                  }}
                />
              </Box>
            </Stack>
            {/* <=== SUBMIT BUTTON ===> */}
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: Colors.nbu, width: "100%" }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: Colors.white,
                  textTransform: "uppercase",
                }}
              >
                {t("submit_button_text")}
              </Typography>
            </Button>
          </form>
        </DialogContent>
      </Dialog>

        {/* <=== NOTICE MODAL OF SEND BUTTON ===> */}
        <Modal
        open={openNoticeModal}
        onClose={handleCloseNoticeDialog}
        fullWidth
        maxWidth="md"
        >
        <Box sx={{  
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: "650px",
              bgcolor: Colors.white,
              boxShadow: 24,
              p: 4,
              borderRadius:"5px",
              }}>
                {/* <=== Upper Box of Notice Modal ===> */}
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",height:"80%",gap:"45px"}}>
                <Box
                    sx={{
                      width: "100px",
                      height: "auto",
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      animation: `${waveAnimation} 3s infinite ease-in-out`,
                      borderRadius: '50%',
                      marginLeft:"10px"
                    }}
                  >
                    <PriorityHighTwoToneIcon
                      sx={{
                        width: "100%",
                        height: "100%",
                        color: Colors.yellow_orange,
                      }}
                    /> 
                  </Box>
                    <Box>
                      <Typography sx={{fontSize:"20px", fontWeight:"normal", textTransform:"initial", lineHeight:"1.2", color:Colors.gray, marginBottom:"10px"}}>
                        {t("first_sectionof_noticemodal")} <Box component="span" sx={{color: Colors.nbu,fontWeight:"bold",fontSize:"20px",}}>{formattedDate}</Box> {t("second_sectionof_noticemodal")}<Box component="span" sx={{color: Colors.nbu,fontWeight:"bold",fontSize:"20px",}}> {totalWorkingTime}</Box> 
                      </Typography>
                        <Typography sx={{fontSize:"20px",fontWeight:"normal",textTransform:"initial",lineHeight:"1.2",color:Colors.gray}}>
                            {t("notice_info_text")}
                        </Typography>
                        {/* <=== ModalButtons Section ===> */}
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"15px"}}>
                            <Button 
                            variant="contained"
                            sx={{bgcolor:Colors.nbu,color:Colors.white ,fontWeight:"bold",textTransform:"uppercase"}}
                            onClick={handleSend}
                            >
                              {t("yes")}
                            </Button>
                            <Button 
                            variant="contained" 
                            sx={{bgcolor:Colors.blue_box,color:Colors.nbu ,fontWeight:"bold", textTransform:"uppercase",'&:hover': {
                              bgcolor:Colors.red, color:Colors.white
                            }}}
                            onClick={handleCloseNoticeDialog}
                            >
                              {t("no")}
                            </Button>
                        </Box>
                    </Box>

                  </Box>
        </Box>
      </Modal>

      {/* <==== SNACKBAR FOR USER FEEDBACK ====> */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default KpiDailiyWorkTable; 