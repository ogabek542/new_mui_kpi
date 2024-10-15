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
import GetAppIcon from "@mui/icons-material/GetApp";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useTranslation } from "react-i18next";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const KpiDailiyWorkTable = () => {
  const { t } = useTranslation();

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [addTitle, setAddTitle] = useState("");
  const [addWorkHours, setAddWorkHours] = useState("");
  const [addWorkMinutes, setAddWorkMinutes] = useState("");
  const [addWorkType, setAddWorkType] = useState("");
  const [addWorkingHistory, setAddWorkingHistory] = useState("");
  const [addWorkingComment, setAddWorkingComment] = useState("");
  const [addStartTime, setAddStartTime] = useState(null);

  const [editItemId, setEditItemId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editWorkHours, setEditWorkHours] = useState("");
  const [editWorkMinutes, setEditWorkMinutes] = useState("");
  const [editWorkType, setEditWorkType] = useState("");
  const [editWorkingHistory, setEditWorkingHistory] = useState("");
  const [editWorkingComment, setEditWorkingComment] = useState("");
  const [editStartTime, setEditStartTime] = useState(null);

  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectDate, setSelectDate] = useState(dayjs());
  const formattedDate = dayjs(selectDate).format("DD.MM.YYYY");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const prevItemsRef = useRef([]);

  const parseWorkTime = (hours, minutes) => {
    const h = parseInt(hours, 10);
    const m = parseInt(minutes, 10);
    if (isNaN(h) || isNaN(m)) return 0;
    return h * 60 + m;
  };

  const formatTime = (dayjsObj) => {
    return dayjsObj.format("HH:mm");
  };

  const calculateEndTime = (start, totalMinutes) => {
    const startMoment = dayjs(start, "HH:mm");
    const endMoment = startMoment.add(totalMinutes, "minute");
    return formatTime(endMoment);
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

  useEffect(() => {
    const getUserData = async () => {
      try {
        setUserData({
          name: "Иван Иванов",
          branch: "Филиал 1",
          division: "Отдел продаж",
          department: "Маркетинг",
          position: "Менеджер",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUserData();
  }, []);

  const resetAddForm = () => {
    setAddTitle("");
    setAddWorkHours("");
    setAddWorkMinutes("");
    setAddWorkType("");
    setAddWorkingHistory("");
    setAddWorkingComment("");
    setAddStartTime(null);
  };

  const resetEditForm = () => {
    setEditItemId(null);
    setEditTitle("");
    setEditWorkHours("");
    setEditWorkMinutes("");
    setEditWorkType("");
    setEditWorkingHistory("");
    setEditWorkingComment("");
    setEditStartTime(null);
  };

  const handleOpenAddDialog = () => {
    if (items.length > 0) {
      const lastItem = items[items.length - 1];
      setAddStartTime(dayjs(lastItem.endTime, "HH:mm"));
    } else {
      setAddStartTime(dayjs("09:00", "HH:mm"));
    }
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    resetAddForm();
  };

  const handleOpenEditDialog = (item) => {
    setEditItemId(item.id);
    setEditTitle(item.title);
    setEditWorkHours(item.workHours);
    setEditWorkMinutes(item.workMinutes);
    setEditWorkType(item.workType);
    setEditWorkingHistory(item.workingHistory);
    setEditWorkingComment(item.workingComment);
    setEditStartTime(dayjs(item.startTime, "HH:mm"));
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    resetEditForm();
  };

//   const assignTimesBasedOnOrder = (itemsList) => {
//     let updatedItems = [...itemsList];
  
//     // Loop through each item and reassign the times based on the previous item
//     for (let i = 0; i < updatedItems.length; i++) {
//       if (i === 0) {
//         // For the first item, use its startTime or default to '07:00'
//         updatedItems[i].startTime = updatedItems[i].startTime || "07:00";
//       } else {
//         // For subsequent items, set the startTime based on the previous item's endTime
//         updatedItems[i].startTime = updatedItems[i - 1].endTime;
//       }
  
//       // Calculate the work time in minutes
//       const workTimeMinutes = parseWorkTime(updatedItems[i].workHours, updatedItems[i].workMinutes);
  
//       // Calculate the endTime based on the current startTime and workTime
//       updatedItems[i].workTime = calculateWorkingTime(workTimeMinutes);
//       updatedItems[i].endTime = calculateEndTime(updatedItems[i].startTime, workTimeMinutes);
//     }
  
//     return updatedItems;
//   };
  
const assignTimesBasedOnOrder = (itemsList) => {
    let updatedItems = [...itemsList];
  
    // Loop through each item and reassign the times based on the previous item
    for (let i = 0; i < updatedItems.length; i++) {
      if (i === 0) {
        // For the first item, use its startTime or default to '07:00'
        updatedItems[i].startTime = updatedItems[i].startTime || "07:00";
      } else {
        // For subsequent items, set the startTime based on the previous item's endTime
        updatedItems[i].startTime = updatedItems[i - 1].endTime;
      }
  
      // Calculate the work time in minutes
      const workTimeMinutes = parseWorkTime(updatedItems[i].workHours, updatedItems[i].workMinutes);
  
      // Calculate the endTime based on the current startTime and workTime
      updatedItems[i].workTime = calculateWorkingTime(workTimeMinutes);
      updatedItems[i].endTime = calculateEndTime(updatedItems[i].startTime, workTimeMinutes);
    }
  
    return updatedItems;
  };
  

  const isTimeOverlap = (
    newStart,
    newEnd,
    itemsList,
    currentEditingId = null
  ) => {
    return itemsList.some((item) => {
      if (currentEditingId && item.id === currentEditingId) {
        return false;
      }
      const existingStart = dayjs(item.startTime, "HH:mm");
      const existingEnd = dayjs(item.endTime, "HH:mm");
      return newStart.isBefore(existingEnd) && newEnd.isAfter(existingStart);
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    if (
      !addTitle ||
      addWorkHours === "" ||
      addWorkMinutes === "" ||
      !addWorkType ||
      !addWorkingHistory ||
      !addStartTime
    ) {
      showSnackbar("Please fill in all required fields.", "error");
      return;
    }

    const workTimeMinutes = parseWorkTime(addWorkHours, addWorkMinutes);
    if (workTimeMinutes <= 0) {
      showSnackbar("Work Time must be greater than 0 minutes.", "error");
      return;
    }

    const calculatedEndTime = calculateEndTime(
      formatTime(addStartTime),
      workTimeMinutes
    );

    const startMoment = dayjs(formatTime(addStartTime), "HH:mm");
    const endMoment = dayjs(calculatedEndTime, "HH:mm");
    if (!endMoment.isAfter(startMoment)) {
      showSnackbar("End Time must be after Start Time.", "error");
      return;
    }

    if (isTimeOverlap(startMoment, endMoment, items)) {
      showSnackbar(
        "Diqqat Xato !! 'Kiritilgan Vaqtlar oralig'i boshqa Vaqt ortaliqlari bilan mos emas!!!'",
        "error"
      );
      return;
    }

    const newItem = {
      id: Date.now(),
      title: addTitle,
      workHours: addWorkHours,
      workMinutes: addWorkMinutes,
      workTime: calculateWorkingTime(workTimeMinutes),
      startTime: formatTime(startMoment),
      endTime: calculatedEndTime,
      workType: addWorkType,
      workingHistory: addWorkingHistory,
      workingComment: addWorkingComment,
      date: formattedDate,
    };

    const updatedItems = [...items, newItem];
    const reassignedItems = assignTimesBasedOnOrder(updatedItems);

    for (let i = 0; i < reassignedItems.length - 1; i++) {
      const currentEnd = dayjs(reassignedItems[i].endTime, "HH:mm");
      const nextStart = dayjs(reassignedItems[i + 1].startTime, "HH:mm");
      if (currentEnd.isAfter(nextStart)) {
        showSnackbar("Time overlaps detected after assignment.", "error");
        return;
      }
    }

    setItems(reassignedItems);
    localStorage.setItem("workItems", JSON.stringify(reassignedItems));
    showSnackbar("Row added successfully!", "success");
    handleCloseAddDialog();
    prevItemsRef.current = reassignedItems;
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
  
    if (
      !editTitle ||
      editWorkHours === "" ||
      editWorkMinutes === "" ||
      !editWorkType ||
      !editWorkingHistory ||
      !editStartTime
    ) {
      showSnackbar("Please fill in all required fields.", "error");
      return;
    }
  
    const workTimeMinutes = parseWorkTime(editWorkHours, editWorkMinutes);
    if (workTimeMinutes <= 0) {
      showSnackbar("Work Time must be greater than 0 minutes.", "error");
      return;
    }
  
    const calculatedEndTime = calculateEndTime(
      formatTime(editStartTime),
      workTimeMinutes
    );
  
    const startMoment = dayjs(formatTime(editStartTime), "HH:mm");
    const endMoment = dayjs(calculatedEndTime, "HH:mm");
    if (!endMoment.isAfter(startMoment)) {
      showSnackbar("End Time must be after Start Time.", "error");
      return;
    }
  
    const editedItem = {
      id: editItemId,
      title: editTitle,
      workHours: editWorkHours,
      workMinutes: editWorkMinutes,
      workTime: calculateWorkingTime(workTimeMinutes),
      startTime: formatTime(startMoment),
      endTime: calculatedEndTime,
      workType: editWorkType,
      workingHistory: editWorkingHistory,
      workingComment: editWorkingComment,
      date: formattedDate,
    };
  
    const editedItemIndex = items.findIndex((item) => item.id === editItemId);
    let updatedItems = [...items];
    updatedItems[editedItemIndex] = editedItem;
  
    // Adjust subsequent items
    for (let i = editedItemIndex + 1; i < updatedItems.length; i++) {
      const prevItem = updatedItems[i - 1];
      const currentItem = updatedItems[i];
      
      currentItem.startTime = prevItem.endTime;
      const currentWorkTimeMinutes = parseWorkTime(currentItem.workHours, currentItem.workMinutes);
      currentItem.endTime = calculateEndTime(currentItem.startTime, currentWorkTimeMinutes);
    }
  
    // Check for time overlaps
    for (let i = 0; i < updatedItems.length - 1; i++) {
      const currentEnd = dayjs(updatedItems[i].endTime, "HH:mm");
      const nextStart = dayjs(updatedItems[i + 1].startTime, "HH:mm");
      if (currentEnd.isAfter(nextStart)) {
        showSnackbar("Time overlaps detected after adjustment.", "error");
        return;
      }
    }
  
    setItems(updatedItems);
    localStorage.setItem("workItems", JSON.stringify(updatedItems));
    showSnackbar("Row edited and subsequent rows adjusted successfully!", "success");
    handleCloseEditDialog();
    prevItemsRef.current = updatedItems;
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    const reassignedItems = assignTimesBasedOnOrder(updatedItems);
    setItems(reassignedItems);
    localStorage.setItem("workItems", JSON.stringify(reassignedItems));
    showSnackbar("Row deleted successfully!", "info");
    prevItemsRef.current = reassignedItems;
  };

  const handleSend = async () => {
    const itemsForSelectedDate = items.filter((item) => item.date === formattedDate);

    const dataToSend = {
      mainDate: formattedDate,
      towDatas: itemsForSelectedDate,
    };

    console.log("Sending data to backend: ", dataToSend);
    try {
      showSnackbar("Data sent successfully!", "success");
    } catch (error) {
      console.error("Error sending data:", error);
      showSnackbar("Error sending data.", "error");
    }
  };

  const handleRefresh = () => {
    const savedItems = JSON.parse(localStorage.getItem("workItems")) || [];
    const reassignedItems = assignTimesBasedOnOrder(savedItems);
    setItems(reassignedItems);
    localStorage.setItem("workItems", JSON.stringify(reassignedItems));
    showSnackbar("Data refreshed successfully!", "success");
    prevItemsRef.current = reassignedItems;
  };

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("workItems")) || [];
    const reassignedItems = assignTimesBasedOnOrder(savedItems);
    setItems(reassignedItems);
    prevItemsRef.current = reassignedItems;
  }, []);

//   const handleReorder = (reorderedItems) => {
//     const prevItems = prevItemsRef.current;
//     const newItems = reorderedItems;

//     const prevItemsMap = new Map(prevItems.map((item) => [item.id, item]));

//     const updatedItems = newItems.map((item, index) => {
//       const prevItem = prevItemsMap.get(item.id);
//       if (!prevItem) return item;

//       return {
//         ...item,
//         title: prevItem.title,
//         workType: prevItem.workType,
//         workingHistory: prevItem.workingHistory,
//         workingComment: prevItem.workingComment,
//         startTime: item.startTime,
//         endTime: item.endTime,
//         workTime: item.workTime,
//       };
//     });

//     for (let i = 0; i < updatedItems.length - 1; i++) {
//       const currentEnd = dayjs(updatedItems[i].endTime, "HH:mm");
//       const nextStart = dayjs(updatedItems[i + 1].startTime, "HH:mm");
//       if (currentEnd.isAfter(nextStart)) {
//         showSnackbar("Time overlaps detected after reordering.", "error");
//         return;
//       }
//     }

//     setItems(updatedItems);
//     localStorage.setItem("workItems", JSON.stringify(updatedItems));
//     showSnackbar("Rows reordered and data swapped successfully!", "success");
//     prevItemsRef.current = updatedItems;
//   };

const handleReorder = (reorderedItems) => {
    const prevItems = prevItemsRef.current; // The original list of items before reordering
    const newItems = [...reorderedItems]; // The reordered items
  
    const updatedItems = newItems.map((item, newIndex) => {
      const prevItem = prevItems[newIndex]; // Item in the original position (before reorder)
  
      // Swap timing fields between the reordered element and the one in its new position
      return {
        ...item, // Keep everything else the same for the item
        startTime: prevItem.startTime, // Adopt the startTime from the element now in this position
        endTime: prevItem.endTime, // Adopt the endTime from the element now in this position
        workHours: prevItem.workHours, // Adopt the workHours from the element now in this position
      };
    });
  
    // Update the state with the newly updated items
    setItems(updatedItems);
    localStorage.setItem("workItems", JSON.stringify(updatedItems)); // Store updated items
    showSnackbar("Items reordered successfully!", "success");
  
    // Update the reference for the next reorder operation
    prevItemsRef.current = updatedItems;
  };
  
  
  
  
  
  
  

  const onChangeDate = (newDate) => {
    setSelectDate(newDate);
    handleRefresh();
  };

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
          ФОТОГРАФИЯ РАБОЧЕГО ДНЯ СОТРУДНИКА
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
              onChange={onChangeDate} // Now defined
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
              Что делалось на этапе
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
              Потраченное время
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
              Начало
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
              Конец
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
              Тип работы (регулярная / разовая)
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
              задачи в рамки должностной инструкции?
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
              Комментарии
            </Typography>
          </Grid>
          {/* Action Column */}
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
            <Typography sx={{}}>Actions</Typography>
          </Grid>
        </Grid>
      </Box>
      {/* <==== TABLE BODY SECTION ====> */}
      {items && items.length > 0 ? (
        <Reorder.Group axis="y" onReorder={handleReorder} values={items} as="div">
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
                <Grid container>
                  {/* <==== INDEX ====> */}
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
                      {item.workType === "regular" ? "регулярная" : "разовая"}
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
                      }}
                    >
                      {item.workingComment}
                    </Typography>
                  </Grid>
                  {/* <==== ACTIONS ====> */}
                  <Grid
                    item
                    xs={0.3}
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
                          width: "25px",
                          height: "25px",
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
                          width: "25px",
                          height: "25px",
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
          No items available
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
              Ma'lumot qo'shish
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
        {/* <=== SEND BUTTON ===> */}
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

      {/* <==== ADD ROW MODAL ====> */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "20px" }}>
            ФОТОГРАФИЯ РАБОЧЕГО ДНЯ СОТРУДНИКА ЗА {formattedDate} г.
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* Display Previous End Time if exists */}
          {items.length > 0 && (
            <Box sx={{ marginBottom: "10px" }}>
              <Typography variant="subtitle1" color="textSecondary">
                {`Предыдущий конец времени: ${items[items.length - 1].endTime}`}
              </Typography>
            </Box>
          )}
          <form onSubmit={handleAddSubmit}>
            <Stack
              margin={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
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
                  label="Что делалось на этапе"
                  required
                  multiline // To increase the height
                  minRows={3} // Reduced rows for better UX
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
                  <InputLabel id="add-work-type-label">Тип работы</InputLabel>
                  <Select
                    labelId="add-work-type-label"
                    value={addWorkType}
                    onChange={(e) => setAddWorkType(e.target.value)}
                    label="Тип работы"
                  >
                    <MenuItem value="onetime">разовая</MenuItem>
                    <MenuItem value="regular">регулярная</MenuItem>
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
                    задачи в рамки должностной инструкции
                  </InputLabel>
                  <Select
                    labelId="add-working-history-label"
                    value={addWorkingHistory}
                    onChange={(e) => setAddWorkingHistory(e.target.value)}
                    label="задачи в рамки должностной инструкции?"
                  >
                    <MenuItem value="yes">да</MenuItem>
                    <MenuItem value="no">нет</MenuItem>
                  </Select>
                </FormControl>
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
                {/* <=== START TIME INPUT ====> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Начало работы"
                    value={addStartTime}
                    onChange={(newValue) => setAddStartTime(newValue)}
                    renderInput={(params) => <TextField {...params} required />}
                    ampm={false}
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
                        color: Colors.nbu, // Custom label text color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: Colors.nbu, // Custom label text color on focus
                      },
                      "& .MuiOutlinedInput-input": {
                        color: "#000", // Custom text color
                      },
                      "& .MuiIconButton-root": {
                        color: Colors.nbu, // Custom color for the TimePicker icon
                      },
                    }}
                  />
                </LocalizationProvider>
                {/* <=== WORK HOURS INPUT ===> */}
                <TextField
                  value={addWorkHours}
                  onChange={(e) => setAddWorkHours(e.target.value)}
                  variant="outlined"
                  label="Потраченное время - Часы"
                  required
                  type="number"
                  inputProps={{ min: 0, step: 1 }}
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
                {/* <=== WORK MINUTES INPUT ===> */}
                <TextField
                  value={addWorkMinutes}
                  onChange={(e) => setAddWorkMinutes(e.target.value)}
                  variant="outlined"
                  label="Потраченное время - Минуты"
                  required
                  type="number"
                  inputProps={{ min: 0, max: 59, step: 1 }}
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

                {/* <=== WORKING COMMENT ===> */}
                <TextField
                  value={addWorkingComment}
                  onChange={(e) => setAddWorkingComment(e.target.value)}
                  variant="outlined"
                  label="Комментарии"
                  required
                  multiline // To increase the height
                  minRows={4} // Set the minimum number of rows for the TextField
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
                Qabul qilish
              </Typography>
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* <==== EDIT ROW MODAL ====> */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "20px" }}>
            ФОТОГРАФИЯ РАБОЧЕГО ДНЯ СОТРУДНИКА ЗА {formattedDate} г.
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* No need to display Previous End Time when editing */}
          <form onSubmit={handleEditSubmit}>
            <Stack
              margin={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
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
                  label="Что делалось на этапе"
                  required
                  multiline // To increase the height
                  minRows={3} // Reduced rows for better UX
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
                  <InputLabel id="edit-work-type-label">Тип работы</InputLabel>
                  <Select
                    labelId="edit-work-type-label"
                    value={editWorkType}
                    onChange={(e) => setEditWorkType(e.target.value)}
                    label="Тип работы"
                  >
                    <MenuItem value="onetime">разовая</MenuItem>
                    <MenuItem value="regular">регулярная</MenuItem>
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
                  <InputLabel id="edit-working-history-label">
                    задачи в рамки должностной инструкции
                  </InputLabel>
                  <Select
                    labelId="edit-working-history-label"
                    value={editWorkingHistory}
                    onChange={(e) => setEditWorkingHistory(e.target.value)}
                    label="задачи в рамки должностной инструкции?"
                  >
                    <MenuItem value="yes">да</MenuItem>
                    <MenuItem value="no">нет</MenuItem>
                  </Select>
                </FormControl>
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
                {/* <=== START TIME INPUT ====> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Начало работы"
                    value={editStartTime}
                    onChange={(newValue) => setEditStartTime(newValue)}
                    renderInput={(params) => <TextField {...params} required />}
                    ampm={false}
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
                        color: Colors.nbu, // Custom label text color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: Colors.nbu, // Custom label text color on focus
                      },
                      "& .MuiOutlinedInput-input": {
                        color: "#000", // Custom text color
                      },
                      "& .MuiIconButton-root": {
                        color: Colors.nbu, // Custom color for the TimePicker icon
                      },
                    }}
                  />
                </LocalizationProvider>
                {/* <=== WORK HOURS INPUT ===> */}
                <TextField
                  value={editWorkHours}
                  onChange={(e) => setEditWorkHours(e.target.value)}
                  variant="outlined"
                  label="Потраченное время - Часы"
                  required
                  type="number"
                  inputProps={{ min: 0, step: 1 }}
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
                {/* <=== WORK MINUTES INPUT ===> */}
                <TextField
                  value={editWorkMinutes}
                  onChange={(e) => setEditWorkMinutes(e.target.value)}
                  variant="outlined"
                  label="Потраченное время - Минуты"
                  required
                  type="number"
                  inputProps={{ min: 0, max: 59, step: 1 }}
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

                {/* <=== WORKING COMMENT ===> */}
                <TextField
                  value={editWorkingComment}
                  onChange={(e) => setEditWorkingComment(e.target.value)}
                  variant="outlined"
                  label="Комментарии"
                  required
                  multiline // To increase the height
                  minRows={4} // Set the minimum number of rows for the TextField
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
                Qabul qilish
              </Typography>
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* <==== EDIT ROW MODAL ====> */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "20px" }}>
            ФОТОГРАФИЯ РАБОЧЕГО ДНЯ СОТРУДНИКА ЗА {formattedDate} г.
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* No need to display Previous End Time when editing */}
          <form onSubmit={handleEditSubmit}>
            <Stack
              margin={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
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
                  label="Что делалось на этапе"
                  required
                  multiline // To increase the height
                  minRows={3} // Reduced rows for better UX
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
                  <InputLabel id="edit-work-type-label">Тип работы</InputLabel>
                  <Select
                    labelId="edit-work-type-label"
                    value={editWorkType}
                    onChange={(e) => setEditWorkType(e.target.value)}
                    label="Тип работы"
                  >
                    <MenuItem value="onetime">разовая</MenuItem>
                    <MenuItem value="regular">регулярная</MenuItem>
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
                  <InputLabel id="edit-working-history-label">
                    задачи в рамки должностной инструкции
                  </InputLabel>
                  <Select
                    labelId="edit-working-history-label"
                    value={editWorkingHistory}
                    onChange={(e) => setEditWorkingHistory(e.target.value)}
                    label="задачи в рамки должностной инструкции?"
                  >
                    <MenuItem value="yes">да</MenuItem>
                    <MenuItem value="no">нет</MenuItem>
                  </Select>
                </FormControl>
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
                {/* <=== START TIME INPUT ====> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Начало работы"
                    value={editStartTime}
                    onChange={(newValue) => setEditStartTime(newValue)}
                    renderInput={(params) => <TextField {...params} required />}
                    ampm={false}
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
                        color: Colors.nbu, // Custom label text color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: Colors.nbu, // Custom label text color on focus
                      },
                      "& .MuiOutlinedInput-input": {
                        color: "#000", // Custom text color
                      },
                      "& .MuiIconButton-root": {
                        color: Colors.nbu, // Custom color for the TimePicker icon
                      },
                    }}
                  />
                </LocalizationProvider>
                {/* <=== WORK HOURS INPUT ===> */}
                <TextField
                  value={editWorkHours}
                  onChange={(e) => setEditWorkHours(e.target.value)}
                  variant="outlined"
                  label="Потраченное время - Часы"
                  required
                  type="number"
                  inputProps={{ min: 0, step: 1 }}
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
                {/* <=== WORK MINUTES INPUT ===> */}
                <TextField
                  value={editWorkMinutes}
                  onChange={(e) => setEditWorkMinutes(e.target.value)}
                  variant="outlined"
                  label="Потраченное время - Минуты"
                  required
                  type="number"
                  inputProps={{ min: 0, max: 59, step: 1 }}
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

                {/* <=== WORKING COMMENT ===> */}
                <TextField
                  value={editWorkingComment}
                  onChange={(e) => setEditWorkingComment(e.target.value)}
                  variant="outlined"
                  label="Комментарии"
                  required
                  multiline // To increase the height
                  minRows={4} // Set the minimum number of rows for the TextField
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
                Qabul qilish
              </Typography>
            </Button>
          </form>
        </DialogContent>
      </Dialog>

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
