import { Container, Stack, Typography } from '@mui/material'

const ProfileCard = ({name,email,mobile,username}) => {
  return (
    <Container>
        <Stack
        sx={{
            gap:"2rem"
        }}
        >
            <Typography>
                Name : {name}
            </Typography>
            <Typography>
                E-mail : {email}
            </Typography>
            <Typography>
                Mobile No. : {mobile}
            </Typography>
            <Typography>
                Username : {username}
            </Typography>
        </Stack>
    </Container>
  )
}

export default ProfileCard    