import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import MovingIcon from "@mui/icons-material/Moving";
import MainPageCostBarchart from "../MainPageCostBarchart/MainPageCostBarchart";
import { Colors } from "../../styles/theme";

  const insertSpaces = (text) => {
    if (!text) return ""; // Handle empty or undefined text

    // Convert to string and ensure no more than 6 characters
    const str = text.toString().slice(0, 6);

    // Add spaces every 3 digits
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
const BankExpenceCard = ({
    title,
    titleone,
    titletwo,
    percentageTitle,
    nopercentageExpenseTitle,
    totalExpenses,
    totalExpensePercentage,
    percentageExpense,
    nopercentageExpense,
    percentageCostPercentage,
    nopercentageCostPercentage,
    onButtonClick,
    buttonText,
}) => {

  return (

    <Grid
    item
    xs={12}
    sm={9}
    md={6}
    lg={4}
    sx={{
      height: { xs: "400px", md: "500px" },
      padding: "5px",
      position: "relative",
      "&:hover .hovers-button": {
        opacity: 1, // Show button when hovering over the box
      },
    }}
  >
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "5px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        bgcolor: Colors.gray_footer,
      }}
    >
      <Typography
        sx={{
          textAlign: "start",
          fontWeight: "800",
          fontSize: { xs: "12px", md: "20px" },
        }}
      >
        {/* {t("ninthText")} */}
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "90%",
          width: "100%",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "28%",
          }}
        >
          {/* top side of div */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontWeight: "bold", textAlign: "start" }}
            >
              {/* {insertSpaces(item?.bankIncomes?.totalIncomes || 0)} */}
                  {insertSpaces(totalExpenses)}
            </Typography>
            <Typography
              sx={{
                color: Colors.gray,
                width: "auto",
                lineHeight: "1.2",
                fontStyle: "italic",
                fontWeight: "500",
                wordWrap: "break-word",
              }}
            >
              {/* {t("partoneBillion")} */}
              {titleone}
              <br />
              {/* {t("parttwoBillion")} */}
              {titletwo}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            {/* Box containing Icon and percentage */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MovingIcon
                sx={{
                  color:
                  //   item?.bankIncomes?.totalIncomesPercentage <= 99
                  totalExpensePercentage <= 100
                  ? Colors.green_dark
                      : Colors.red,
                  fontSize: "48px",
                  padding: "0px",
                  transform:
                  //   item?.bankIncomes?.totalIncomesPercentage <= 99
                  totalExpensePercentage <= 100
                  ? "rotate(0deg)"
                      : "rotate(180deg)",
                  transition: "transform 0.3s ease",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color:
                      // item?.bankIncomes?.totalIncomesPercentage <= 99
                      totalExpensePercentage <= 100
                      ? Colors.green_dark
                        : Colors.red,
                    fontWeight: "800",
                    lineHeight: "1",
                  }}
                >
                  {/* {item?.bankIncomes?.totalIncomesPercentage || 0}{" "} */}
                  {totalExpensePercentage}
                  <span
                    style={{
                      color:
                      //   item?.bankIncomes?.totalIncomesPercentage <= 99
                      totalExpensePercentage <= 100
                      ? Colors.green_dark
                          : Colors.red,
                      fontSize: "20px",
                      lineHeight: "1",
                    }}
                  >
                    %
                  </span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            height: "70%",
          }}
        >
          {/* pie chart section  */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "60%",
              height: "100%",
            }}
          >
        
              <MainPageCostBarchart
                percentageCost={percentageCostPercentage || 0}
                nopercentageCost={nopercentageCostPercentage || 0}
                />
          </Box>
          {/* right side Texts */}
          <Box sx={{}}>
            {/* top side light blue */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: Colors.dark,
                    fontWeight: "bold",
                    textAlign: "left",
                    lineHeight: "1",
                    textTransform: "uppercase",
                  }}
                >
                  {/* {t("percentageIncomeText")} */}
                  {percentageTitle}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "rgba(54, 100, 200, 1)",
                      fontSize: "32px",
                      fontWeight: "bold",
                      width: "auto",
                      lineHeight: "1.1",
                      textAlign: "start",
                    }}
                  >
                    {/* {insertSpaces(item?.bankIncomes?.percentageIncome || 0)} */}
                    {insertSpaces(percentageExpense || 0)}
                  </Typography>
                  <Typography
                    sx={{
                      color: Colors.gray,
                      fontSize: "12px",
                      width: "50px",
                      wordWrap: "break-word",
                      textAlign: "end",
                      lineHeight: "1",
                    }}
                  >
                    {/* {t("partoneBillion")} */}
                    {titleone}
                    <br />
                    {/* {t("parttwoBillion")} */}
                    {titletwo}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* bottom side dark_blue national  */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: Colors.dark,
                    fontWeight: "bold",
                    textAlign: "left",
                    lineHeight: "1",
                    textTransform: "uppercase",
                  }}
                >
                  {/* {t("noPercenteageIncomeText")} */}
                  {nopercentageExpenseTitle}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-betweeen",
                    gap: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "rgba(60, 179, 113, 1)",
                      fontSize: "32px",
                      fontWeight: "bold",
                      width: "auto",
                      lineHeight: "1.1",
                      textAlign: "start",
                    }}
                  >
                    {/* {insertSpaces(item?.bankIncomes?.nopercentageIncome || 0)} */}
                    {insertSpaces(nopercentageExpense || 0)}
                  </Typography>
                  <Typography
                    sx={{
                      color: Colors.gray,
                      fontSize: "12px",
                      width: "50px",
                      wordWrap: "break-word",
                      textAlign: "end",
                      lineHeight: "1",
                      marginLeft: "18px",
                    }}
                  >
                    {/* {t("partoneBillion")} */}
                    {titleone}
                    <br />
                    {/* {t("parttwoBillion")} */}
                    {titletwo}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* button section */}
      <Box
        className="hovers-button"
        sx={{
          textAlign: "end",
          position: "absolute",
          bottom: "15px",
          right: "15px",
          opacity: 0, // Initially hidden
          transition: "opacity 300ms ease", // Smooth transition for hover
        }}
      >
        <Button
          variant="contained"
          size={"medium"}
          // onClick={
          //   acceptNavigate ? handleOpenAcceptModal : handleOpenAuthModal
          // }
          onClick={
               onButtonClick
            }
        >
          <Typography
            sx={{
              color: Colors.white,
              fontWeight: "800",
              textTransform: "uppercase",
            }}
          >
            {/* {t("infobutton")} */}
            {buttonText}
          </Typography>
        </Button>
      </Box>
    </Box>
  </Grid>

  )
}

export default BankExpenceCard
