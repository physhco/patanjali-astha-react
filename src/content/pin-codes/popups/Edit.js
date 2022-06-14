import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Typography,
  Zoom
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  getPinCodeItem,
  updatePinCode,
  getPinCodes
} from 'src/slices/pinCode';
import { useDispatch, useSelector } from 'src/store';
import { useSnackbar } from 'notistack';
import Loader from 'src/components/SuspenseLoader';
import Form from '../blocks/Form';


function Edit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  const pinCodeState = useSelector((state) => state.pinCode);

  const [pinCode, setPinCode] = useState({});
  const [isPinCode, setIsPinCode] = useState(false);
  const [error, setError] = useState("");

  useEffect(async () => {
    const response = await getPinCodeItem(id);
    if (response.status === 400) {
      if (response.data.Id) {
        setError(response.data.Id[0]);
      }
    }
    
    setPinCode(response);
    setIsPinCode(true);
  }, []);

  const onUpdate = async (values, setSubmitting, setFieldError) => {
    try {
      await updatePinCode(id, values);
      dispatch(getPinCodes(pinCodeState))

      enqueueSnackbar(('Edited successfully'), {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        TransitionComponent: Zoom
      });

      navigate('/pin-codes')
    } catch (error) {
      setSubmitting(false);
      const response = error.response;

      if (response.status === 400) {
        if (response.data.Name) {
          setFieldError("Name", response.data.Name[0])
        };
      };
    };
  };

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open
    >
      {isPinCode ? (
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
                  Edit Pin Code
                </Typography>
              </Grid>

              <Grid item>
                <Link to="/pin-codes">
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
              p={2}
            >
              <Grid item xs={12}>
                {error ? (
                  <Box width={1}>
                    <Alert variant="filled" severity="error">
                      {error}
                    </Alert>
                  </Box>
                ) : (
                  <Form
                    pinCode={pinCode}
                    handleSubmit={onUpdate}
                    buttonLabel="Update Pin Code"
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Loader />
      )}
    </Drawer>
  )
}

export default Edit
