import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.button`
    display: inline-block;
    ${'' /* width: 100%; */}
    border: 1px solid transparent;
    border-radius: .5rem;
    font-size: ${props => {
        switch(props.size){
            case 'sm':
                return '.8rem';
            case 'lg':
                return '1.2rem';
            default:
                return '1rem';
        }
    }};
    padding: ${props => {
        switch(props.size){
            case 'sm':
                return '.25rem .5rem';
            case 'lg':
                return '.5rem 1rem';
            default:
                return '.375rem .75rem';
        }
    }};
    color: ${props => {
        switch(props.bg){
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
        switch(props.bg){
            case 'primary':
                return 'blue';
            case 'danger':
                return 'red';
            case 'warning':
                return 'yellow';
            case 'success':
                return 'green';
            default:
                return 'transparent';
        }
    }};

    &:hover, &:focus {
        box-shadow: 0 0 0 0.2rem blue;
    }
`;

const WButton = ({bg, size}) => {
        return (
            <Button bg={bg} size={size}>Woca</Button>
        );
}
export default WButton;
