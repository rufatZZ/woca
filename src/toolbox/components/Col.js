import React from 'react';
import styled from 'styled-components';

const WCol = styled.div`
    width: 100%;
    padding: 0px 15px;
    max-width: ${props => props.grid ? 100/12*props.grid : 100 } %;
    flex-grow: ${props => props.grid ? 0 : 1 };
    flex-shrink: 0;
    flex-basis: ${props => props.grid ? 100/12*props.grid : 100 }%;
`;


const Col = ({children, ...props}) => {
    return(
        <WCol {...props}>{children}</WCol>
    );
}

export default Col;