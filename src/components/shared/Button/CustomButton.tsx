import Button from '@mui/material/Button'
import { ICustomButtonProps } from './CustomButtonProps'

const CustomButton = (props: ICustomButtonProps) => {
    return (
        <Button
            color="secondary"
            variant="contained"
            onClick={props.onClick}
        >
            {props.text}
        </Button>

    )
}

export default CustomButton