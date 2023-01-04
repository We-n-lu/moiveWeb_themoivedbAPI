import { Box } from "@mui/material";

type BoddProps = {
  arr: any[];
  indexOfPage: number;
};

const Bodd: React.FC<BoddProps> = ({ arr, indexOfPage }) => {
  //   console.log("arr", arr);
  if (!arr || arr === undefined) {
    return <div>loading</div>;
  } else {
    return (
      <div>
        {arr.map((i, index) => {
          return (
            <Box
              key={i.id}
              sx={{
                display: "flex",
                paddingTop: "26px",
                alignItems: "center",
                
              }}
            >
              {" "}
              <Box sx={{ display: { xs: "none", md: "none", lg: "flex" } }}>
                <Box
                  sx={{
                    backgroundColor: "orange",
                    width: "15px",
                    height: "19px",
                    marginRight: "-10px",
                  }}
                />
                <Box
                  sx={{
                    marginRight: "5px",
                    borderRadius: "50%",
                    width: "19px",
                    height: "19px",
                    backgroundColor: "orange",
                  }}
                >
                  {index + 1}
                </Box>
              </Box>
              <label style={{fontFamily:'sans-serif'}}>{i.title}</label>
              <Box sx={{ flexGrow: 1 }} />
              <label style={{ color: "gray", fontSize: "11px" }}>
                {i.release_date}
              </label>
            </Box>
          );
        })}
      </div>
    );
  }
};
export default Bodd;
