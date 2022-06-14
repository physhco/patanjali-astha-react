import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getMisItem } from 'src/slices/mis';
import {
  Alert,
  Drawer,
  IconButton,
  Typography,
  Grid,
  Divider,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import QrCodeIcon from '@mui/icons-material/QrCode';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DetailBox from 'src/components/DetailBox';
import SuspenseLoader from 'src/components/SuspenseLoader';

function Item() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mis, setMis] = useState({});
  const [isMis, setIsMis] = useState(false);
  const [error, setError] = useState("");

  useEffect(async () => {
    // Getting mis item
    const response = await getMisItem(id);

    if (response.status === 400) {
      if (response.data.Id) {
        setError(response.data.Id[0]);
      }
    };

    setMis(response);
    setIsMis(true);
  }, []);

  return (
    <Drawer
      variant="temporary"
      anchor='right'
      onClose={() => navigate('/miss')}
      open
    >

      {isMis ? (
        <Grid
          container
          maxWidth={500}
          
        >
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="space-between"
              p={2}
            >
              <Grid item>
                <Typography variant="h3" gutterBottom>
                  MIS Details
                </Typography>
              </Grid>

              <Grid item>
                <Link to="/miss">
                  <IconButton
                    color="error"
                  >
                    <CloseIcon fontSize='medium' />
                  </IconButton>
                </Link>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
            >
              {error ? (
                <Grid
                  item
                  xs={12}
                  p={2}
                >
                  <Alert variant="filled" severity="error">
                    {error}
                  </Alert>
                </Grid>
              ) : (
                <>
                  <Grid item xs={12} borderBottom="1px solid #ECECEC">
                    <DetailBox
                      icon={<QrCodeIcon color="secondary" />}
                      label="Employee Code"
                      value={mis.EmpCode}
                    />
                  </Grid>
                  <Grid item xs={12} borderBottom="1px solid #ECECEC">
                    <DetailBox
                      icon={<AssignmentIndIcon color="secondary" />}
                      label="Name"
                      value={mis.Name}
                    />
                  </Grid>
                  <Grid item xs={12} borderBottom="1px solid #ECECEC">
                    <DetailBox
                      icon={<MailOutlineIcon color="secondary" />}
                      label="Email"
                      value={mis.Email}
                    />
                  </Grid>
                  <Grid item xs={12} borderBottom="1px solid #ECECEC">
                    <DetailBox
                      icon={<PhoneIcon color="secondary" />}
                      label="Contact Number"
                      value={mis.ContactNumber}
                    />
                  </Grid>
                  <Grid item xs={12} borderBottom="1px solid #ECECEC">
                    <DetailBox
                      icon={<PersonOutlineIcon color="secondary" />}
                      label="Username"
                      value={mis.Username}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : <SuspenseLoader />
      }
    </Drawer >
  )
}

export default Item