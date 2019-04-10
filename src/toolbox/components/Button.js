import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

const Button = styled.button`
    display: inline-block;
    vertical-align:middle;
    ${'' /* width: 100%; */}
    border: 1px solid transparent;
    border-radius: .35rem;
    font-size: ${props => {
        switch (props.size) {
            case 'sm':
                return '.875rem';
            case 'lg':
                return '1.25rem';
            default:
                return '1rem';
        }
    }};
    padding: ${props => {
        switch (props.size) {
            case 'sm':
                return '.25rem .5rem';
            case 'lg':
                return '.5rem 1rem';
            default:
                return '.375rem .75rem';
        }
    }};
    color: ${props => {
        switch (props.bg) {
            case 'primary':
                return 'white';
            case 'danger':
                return 'white';
            case 'warning':
                return 'black';
            case 'success':
                return 'white';
            default:
                return 'black';
        }
    }};
    background-color: ${props => {
        switch (props.bg) {
            case 'primary':
                return props.theme.primary;
            case 'danger':
                return props.theme.danger;
            case 'warning':
                return props.theme.warning;
            case 'success':
                return props.theme.success;
            case 'secondary':
                return props.theme.secondary;
            case 'light':
                return props.theme.light;
            default:
                return 'transparent';
        }
    }};

    &:hover, &:focus {
        opacity: 0.8;
        cursor: pointer;
        ${'' /* box-shadow: 0 0 0 0.2rem blue; */}
    }
`;


const theme = {
    primary:    '#007bff',
    success:    '#28a745',
    danger:     '#dc3545',
    warning:    '#ffc107',
    light:      '#f8f9fa',
    secondary:  '#6c757d',
    default:    '#'
};

const WButton = ({ bg, size }) => {
    return (
        <ThemeProvider theme={theme}>
            <Button bg={bg} size={size}>Woca</Button>
        </ThemeProvider>
    );
}
export default WButton;
