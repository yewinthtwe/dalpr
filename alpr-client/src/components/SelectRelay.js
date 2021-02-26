// *https://www.registers.service.gov.uk/registers/country/use-the-api*
// import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as configService from '../services/AlprConfigService';
import http from '../services/httpService';

// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

export default function SelectRelay() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      //const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
      const source = http.getCancelToken();
      const response = await configService.getRelays(source);
      // const countries = await response;
      // await sleep(1e3); // For demo purposes.
      // const countries = await response.json();
      response.map((i)=> console.log(i.relay) );
      if (active) {
        //setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
        //Object.keys(countries).map((key) => console.log(countries[key].item[0]));
        setOptions(response.map((key) => key));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="relay"
      fullWidth
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      // getOptionSelected={(option, value) => option.relay[0] === value.relay[0]}
      // getOptionLabel={(option) => option.relay[0]}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Relay"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
