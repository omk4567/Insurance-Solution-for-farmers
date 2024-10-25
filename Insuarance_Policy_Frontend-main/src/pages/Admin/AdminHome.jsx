import { Box, Paper, Stack } from '@mui/material';
import { LinkComponent } from '../../components/styles/StyledComponents';

const AdminHome = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 4rem)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper>
        <Stack
          sx={{
            gap: "2rem",
            padding: "4rem",
            border: "1px solid black",
            "& > div": {
              cursor: "pointer",
            },
          }}
        >
          <Box>
            <LinkComponent to={"/admin/insurance/new"}>
              Create New Insurance
            </LinkComponent>
          </Box>
          <Box>
            <LinkComponent to={"/admin/insurance/view"}>
              View Insurance
            </LinkComponent>
          </Box>
          <Box>
            <LinkComponent to={"/admin/claims/view"}>
              View Claim Requests
            </LinkComponent>
          </Box>
          <Box>
            <LinkComponent to={"/admin/applications"}>
              Applications
            </LinkComponent>
          </Box>
          <Box>
            <LinkComponent to={"/admin/feedbacks"}>
              Feedbacks
            </LinkComponent>
          </Box>
        </Stack>
      </Paper>
    </div>
  );
};

export default AdminHome;
 