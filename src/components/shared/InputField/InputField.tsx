import { IInputFieldProps } from './InputFieldProps'
import { InputAdornment, TextField } from '@mui/material'

const InputField = (props: IInputFieldProps) => {
    return (
        <TextField
            id="input-field"
            label={props.label}
            InputProps={{
                startAdornment: (props.icon ?
                    (
                        <InputAdornment position="start">
                            {props.icon}
                        </InputAdornment>
                    ) : null
                ),
            }}
            variant="standard"
            type={props.type}
            value={props.value}
            onChange={(event) => props.onChange(event.target.value)}
            fullWidth
            helperText={props.helperText}
            error={props.error}
        />
    )
}

export default InputField