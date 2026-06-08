import type { InputHTMLAttributes } from 'react'
import { Hint, Input, Label, Wrapper } from './styles'

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    hint?: string
}

function Field({ label, hint, id, ...inputProps }: FieldProps) {
    return (
        <Wrapper>
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} {...inputProps} />
            {hint && <Hint>{hint}</Hint>}
        </Wrapper>
    )
}

export default Field
