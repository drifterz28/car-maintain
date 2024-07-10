import React, { useEffect, useState } from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Modal,
  Typography,
  Button,
  Box,
} from '@mui/material';

import { getCarsYear } from './helpers';

const style = {
  position: 'absolute' as const,
  color: '#000',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface AddVehicleProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

const AddVehicle: React.FC<AddVehicleProps> = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  // const [, setUserMetadata] = useSaveUserMetadata();
  // const { data } = useUserMetadata();

  const [carData, setCarData] = useState({});
  const [carMakes, setCarMakes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [bodyStyle, setBodyStyle] = useState([]);
  const [yearPulled, setYearPulled] = useState('');
  const [formData, setFormData] = useState({
    year: '',
    make: '',
    model: '',
    bodyStyle: '',
    isClean: false,
  });

  const handleChange = (e: unknown) => {
    // @ts-expect-error Event is defined
    const { name, value } = e.target;
    if (name === 'year' && formData.year !== value) {
      setFormData({
        year: value,
        make: '',
        model: '',
        bodyStyle: '',
        isClean: false,
      });
    } else {
      const isClean =
        !!formData.make &&
        !!formData.model &&
        !!formData.year &&
        (!!formData.bodyStyle || (name === 'bodyStyle' && !!value));
      setFormData({ ...formData, [name]: value, isClean });
    }
  };

  useEffect(() => {
    const dataFunc = async () => {
      const cleanCarData = await getCarsYear(formData.year);
      setCarData(cleanCarData);
      setYearPulled(formData.year);
      // @ts-expect-error Car data is there
      setCarMakes(Object.keys(cleanCarData));
    };

    if (formData.year !== yearPulled) {
      dataFunc();
    }
    if (formData.make) {
      // @ts-expect-error Car data is there
      setCarModels(Object.keys(carData[formData.make]));
    }
    // @ts-expect-error Car data is there
    if (formData.model && carData[formData.make][formData.model].length > 1) {
      // @ts-expect-error Car data is there
      setBodyStyle(carData[formData.make][formData.model]);
    } else if (
      formData.model &&
      // @ts-expect-error Car data is there
      carData[formData.make][formData.model].length === 1
    ) {
      setFormData({
        ...formData,
        // @ts-expect-error Car data is there
        bodyStyle: carData[formData.make][formData.model],
        isClean: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.year, formData.make, formData.model, formData.bodyStyle]);

  const saveCar = () => {
    // setUserMetadata(formData);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add your vehicle
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="year-label">Year</InputLabel>
          <Select
            labelId="year-label"
            id="year"
            name="year"
            value={formData?.year}
            label="year"
            onChange={handleChange}
          >
            <MenuItem value="">Select Year</MenuItem>
            <MenuItem value="1992">1992</MenuItem>
            <MenuItem value="1993">1993</MenuItem>
            <MenuItem value="1994">1994</MenuItem>
            <MenuItem value="1995">1995</MenuItem>
            <MenuItem value="1996">1996</MenuItem>
            <MenuItem value="1997">1997</MenuItem>
            <MenuItem value="1998">1998</MenuItem>
            <MenuItem value="1999">1999</MenuItem>
            <MenuItem value="2000">2000</MenuItem>
            <MenuItem value="2001">2001</MenuItem>
            <MenuItem value="2002">2002</MenuItem>
            <MenuItem value="2003">2003</MenuItem>
            <MenuItem value="2004">2004</MenuItem>
            <MenuItem value="2005">2005</MenuItem>
            <MenuItem value="2006">2006</MenuItem>
            <MenuItem value="2007">2007</MenuItem>
            <MenuItem value="2008">2008</MenuItem>
            <MenuItem value="2009">2009</MenuItem>
            <MenuItem value="2010">2010</MenuItem>
            <MenuItem value="2011">2011</MenuItem>
            <MenuItem value="2012">2012</MenuItem>
            <MenuItem value="2013">2013</MenuItem>
            <MenuItem value="2014">2014</MenuItem>
            <MenuItem value="2015">2015</MenuItem>
            <MenuItem value="2016">2016</MenuItem>
            <MenuItem value="2017">2017</MenuItem>
            <MenuItem value="2018">2018</MenuItem>
            <MenuItem value="2019">2019</MenuItem>
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2025">2025</MenuItem>
            <MenuItem value="2026">2026</MenuItem>
          </Select>
        </FormControl>
        <Typography sx={{ mt: 2 }}>Make</Typography>
        <FormControl fullWidth>
          <InputLabel id="make-label">Make</InputLabel>
          <Select
            labelId="make-label"
            id="make"
            name="make"
            value={formData.make}
            label="make"
            onChange={handleChange}
          >
            <MenuItem value="">Select Make</MenuItem>
            {carMakes.map((make, i) => (
                <MenuItem key={i} value={make}>
                  {make}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Typography sx={{ mt: 2 }}>Model</Typography>
        <FormControl fullWidth>
          <InputLabel id="model-label">Model</InputLabel>
          <Select
            labelId="model-label"
            id="model"
            name="model"
            value={formData.model}
            label="model"
            onChange={handleChange}
          >
            <MenuItem value="">Select model</MenuItem>
            {carModels.map((model, i) => (
                <MenuItem key={i} value={model}>
                  {model}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {bodyStyle.length > 0 && (
          <>
            <Typography sx={{ mt: 2 }}>Body style</Typography>
            <FormControl fullWidth>
              <InputLabel id="bodyStyle-label">Body style</InputLabel>
              <Select
                labelId="bodyStyle-label"
                id="bodyStyle"
                name="bodyStyle"
                value={formData?.bodyStyle}
                label="bodyStyle"
                onChange={handleChange}
              >
                <MenuItem value="">Select body style</MenuItem>
                {bodyStyle.map((style, i) => (
                    <MenuItem key={i} value={style}>
                      {style}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </>
        )}
        <Box mt={2}>
          <Button
            variant="contained"
            disabled={!formData.isClean}
            onClick={saveCar}
          >
            Add Car
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddVehicle;
