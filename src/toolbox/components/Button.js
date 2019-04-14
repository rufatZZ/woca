import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled.button`
    display: inline-block;
    vertical-align:middle;
    margin: 5px 5px 0px 0px;
    ${'' /* width: 100%; */}
    border: 1px solid transparent;
    border-radius: 1rem;
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
            case 'light':
                return 'black';
            case 'success':
                return 'white';
            default:
                return 'white';
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
                return props.theme.default;
        }
    }};

    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

    &:hover {
        opacity: 0.9;
        text-decoration: none;
        color: ${props => {
        switch (props.bg) {
            case 'primary':
                return 'white';
            case 'danger':
                return 'white';
            case 'warning':
                return 'black';
            case 'light':
                return 'black';
            case 'success':
                return 'white';
            default:
                return 'white';
        }
    }}; 
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 0.2rem ${props => {
        switch (props.bg) {
            case 'primary':
                return props.theme.primary + '80';
            case 'danger':
                return props.theme.danger + '80';
            case 'warning':
                return props.theme.warning + '80';
            case 'success':
                return props.theme.success + '80';
            case 'secondary':
                return props.theme.secondary + '80';
            case 'light':
                return props.theme.secondary + '80';
            default:
                return props.theme.default + '80';
        }
    }
    }
    }

    &:disabled{
        cursor: not-allowed;
    }
`;

const theme = {
    primary: '#007bff',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    light: '#f8f9fa',
    secondary: '#6c757d',
    default: '#852dc8'
};

const WButton = ({ as: tag = 'button', children, ...props }) => {

    let _tag = (tag === 'Link') ? Link : tag;
    const Composed = Button.withComponent(_tag);

    return (

        <ThemeProvider theme={theme}>
            <Composed {...props}>{children}</Composed>
        </ThemeProvider>

    );
}
export default WButton;
