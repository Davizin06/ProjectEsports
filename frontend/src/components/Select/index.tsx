import type { ReactNode, SelectHTMLAttributes } from 'react'
import { Hint, Label, StyledSelect, Wrapper } from './styles'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string
    hint?: string
    children: ReactNode
}

function Select({ label, hint, id, children, ...selectProps }: SelectProps) {
    return (
        <Wrapper>
            <Label htmlFor={id}>{label}</Label>
            <StyledSelect id={id} {...selectProps}>
                {children}
            </StyledSelect>
            {hint && <Hint>{hint}</Hint>}
        </Wrapper>
    )
}

export default Select
