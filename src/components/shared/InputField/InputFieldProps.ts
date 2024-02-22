export interface IInputFieldProps {
    label: string;
    type: string;
    value: string;
    icon?: any;
    onChange: (newValue: any) => void
    helperText: string;
    error:boolean;
}