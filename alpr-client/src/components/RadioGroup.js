import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState('Relay0');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Relays</FormLabel>
      <RadioGroup aria-label="relay" name="relay" value={value} onChange={handleChange}>
        <FormControlLabel value="Relay0" control={<Radio />} label="Relay Output 0" />
        <FormControlLabel value="Relay1" control={<Radio />} label="Relay Output 1" />
        <FormControlLabel value="Relay2" control={<Radio />} label="Relay Output 2" />
        <FormControlLabel value="Relay3" control={<Radio />} label="Relay Output 3" />
        <FormControlLabel value="Relay4" control={<Radio />} label="Relay Output 4" />
        <FormControlLabel value="Relay5" control={<Radio />} label="Relay Output 5" />
        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
      </RadioGroup>
    </FormControl>
  );
}
