import styled from 'styled-components';

export const Button = styled.button`
    min-width: 160px;
    width: auto;
    height: 50px;
    letter-spacing: 0.4px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    background-color: black;
    color: white;
    text-transform: uppercase;
    font-family: Arial;
    font-weight: bolder;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid black;

    &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
    }
`;