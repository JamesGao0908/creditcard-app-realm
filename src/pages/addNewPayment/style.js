import styled from 'styled-components';
import headImg from '../../statics/backgrounds/headImg.jpeg';
import tailImg from '../../statics/backgrounds/tailImg.jpeg';

export const Card = styled.div`
  width: 380px;
  height: 250px;
  max-width:430px;
  min-width: 300px;
  max-height: 300px;
  min-height: 200px;
  box-sizing: border-box;
  box-shadow: 0 20px 60px 0 rgb(14 42 90 / 55%);
  border-radius: 14px;
  text-shadow: 7px 6px 10px rgb(14 42 90 / 80%);
  font-family: "Source Code Pro", monospace;
  z-index:15;

  transition: transform 2s;
  transform-style: preserve-3d;

  &.active {
    transform: rotateX(180deg);
  }

  :hover{
    transform: rotateX(180deg);
  }
`;

export const CardFront = styled.div`
  position:absolute;  
  width:100%;
  height: 100%;
  padding: 25px 15px; 
  box-sizing: border-box;
  background-image: url(${headImg});
  border-radius: 14px;
  color:white;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;

  .cardfrontlevel1{
    display:flex;
    margin: 20px 10px;
    height: 4vh;
  }

  .cardfrontlevel2{
    font-size:27px;
    margin-bottom: 35px;
    padding: 10px 15px;
    cursor: pointer;
  }
  
  .cardfrontlevel3{
    display:flex;
  }
`;

export const CardBack = styled.div`
  width:100%;
  height:100%;
  border-radius:14px;
  background-image: url(${tailImg});
  position:absolute;
  transform: rotateX(180deg);
  backface-visibility: hidden;

  .cardbacklevel0{
    height: 5vh;
  }
  .cardbacklevel1{
    background-color:black;
    height: 5vh;
  }
  .cardbacklevel2{
    color:white;
    margin: 20px 10px 5px 10px;
    text-align: end;
  }
  .cardbacklevel3{
    background-color:white;
    color:black;
    padding: 0 10px;
    height: 3vh;
    line-height: 3vh;
    box-sizing: border-box;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 5px;
    text-align:end;
  }
  
  .cardbacklevel4{
    text-align: end;
    margin: 20px 10px;
  }
  
`;

export const CreditcardForm = styled.div`
  width: 50vw;
  max-width: 500px;
  min-width: 300px;

  background-color: white;
  border-radius: 20px;
  padding: 150px 30px 30px 30px;

  // height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-top:-125px;
}

  .creditcardformlevel3{
    display:flex;
    grid-column-gap: 30px;
    align-items:center;
  }
`;