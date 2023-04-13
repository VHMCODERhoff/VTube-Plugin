import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
flex-wrap: wrap;
`

export const Card = styled.div`
  background-color: #FFFFFF; 
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 400px;
  margin: 0 auto;
  margin-top: 100px;
  text-align: center;
`

export const Subcard = styled.div`
  background-color: #FFFFFF;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: auto;
`

export const ButtonSelect = styled.button`
width: 130px;
    color: white;
    padding: 10px;
    border: 1px solid rgb(255 255 255);
    border-radius: 5px;
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: bolder;
    background-color: rgb(193 88 136);
  &:hover {
    background-color: #FF9AC8;
    transition: 0.5s;
    cursor: pointer;
  }
`




export const Logo = styled.img`
  width: 20rem;
  margin-top: 50px;
  margin: 0 auto;
  display: block;
`

export const Input = styled.input`
    width: 80%;
    height: 1.5rem;
    padding: 10px;
    border: 1px solid #e8e8e8;
    outline: none;
    border-radius: 12px;
    margin-top: 20px;
    margin-bottom: 10px;
    color: 818181;
    background: #F8FAFC;

    &::placeholder {
        color: #697586;
    }

    &:focus {
        border: 1px solid #FF5DA7;
    }

    &:hover { 
      border: 1px solid #FF9AC8;
      transition: 0.5s;
      color: #697586;
      transition: 0.5s;
    }
`

export const Button = styled.button`
    width: 80%;
    padding: 10px;
    border: 1px solid #ccc;
    color: #FFFFFF; 
    font-weight: bolder;
    border-radius: 5px;
    margin-top: 20px;
    margin-bottom: 10px;
    background-color: #FF5DA7;
    cursor: pointer;

    &:hover {
        background-color: #FF9AC8;
        transition: 0.5s;
    }
`

export const Label = styled.label`
    text-align: center;
    font-size: 1.3rem;
    font-weight: bolder;
    line-height: 24px;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 5px;
    color: rgb(255 0 116);
`

export const Description = styled.p`
    text-align: left;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 24px;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 5px;
    color: rgb(255 76 158);
`

export const Description2 = styled.p`
    text-align: left;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 24px;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 5px;
    color: rgb(133 133 133);
`

export const Line = styled.div`
    width: 100%;  
    height: 1px;
    background-color: #e8e8e8;
    margin-bottom: 10px;
    margin-top: 30px;
    margin-left: 10px;
    margin-right: 10px;
`

export const CardContainer = styled.div`
    display: flex;
    max-height: 20rem;
    overflow-y: auto;
    flex-direction: column;
`
