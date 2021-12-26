let oneDice = false;
var btnSubmit = document.getElementsByName("submit");
var btnRoll = document.getElementsByClassName("roll");
let chkBoxes = document.getElementsByTagName("input");
var giveUpBtn = document.getElementsByClassName("giveup");
var remSum = 0;
var thisMove = 0;
var unChecked = [];
var sums = [];
var moveExists = false;
var allChecked = true;
btnSubmit[0].disabled = true;
var pairs = [];
var tempArr = [];

function rollDice()
{
   var rand1 = Math.floor(Math.random()*7);
   var result = rand1;
   var rand2 = 0;
   if(oneDice == false)
   {
      rand2 = Math.floor(Math.random()*7);
      result = result + "," + rand2;
   }
   var res = document.getElementsByTagName("span");
   res[0].innerText = result;
   btnSubmit[0].disabled = false;
   btnRoll[0].disabled = true;
   thisMove = rand2+rand1;
   unChecked = [];
   for (let index = 0, i = 0; index < chkBoxes.length; index++)
   {
      if(chkBoxes[index].checked == false)
      {
         unChecked[i++] = chkBoxes[index].value;
      }
   }
   while(sums.length > 0) {
      sums.pop();
  }
   PossibleSums(unChecked);
   moveExists = false;
   for (let index = 0, i = 0; index < sums.length; index++)
   {
      if(sums[index]==thisMove)
      {
         moveExists = true;
      }
   }
   if(moveExists == false)
   {
      finish();
   }
   endGame();
}
function IsValid()
{
   var selected = 0;
   for (let index = 0; index < chkBoxes.length; index++) {
      if(chkBoxes[index].checked && (chkBoxes[index].disabled === false))
      {
         let newScore =parseInt(chkBoxes[index].value);
         selected+=newScore;
      }
   }
   if(selected != thisMove)
   {
      alert("The total of the boxes you selected does not match the dice roll.Please make another selection and try again");
      return false;
   }
   return true;
}
function submitMove()
{
   if(IsValid())
   {
      for (let index = 0; index < chkBoxes.length; index++)
      {
         if(chkBoxes[index].checked)
         {
            chkBoxes[index].disabled = true;
         }
      }
      for (let index = 0; index < chkBoxes.length; index++)
      {
         if(chkBoxes[index].disabled === false)
         {
            remSum += parseInt(chkBoxes[index].value);
         }
      }
      if(remSum <= 6)
      {
         oneDice = true;
      }
      console.log(oneDice);
      console.log(remSum);
      remSum = 0;
      btnSubmit[0].disabled = true;
      btnRoll[0].disabled = false;
   }
}
function endGame()
{
   var end = true;
   for (let index = 0; index < chkBoxes.length; index++)
   {
      if(chkBoxes[index].disabled === false)
      {
         end = false;
      }
   }
   if(end == true) finish();
 }
function giveUp()
{
   finish();
}
function PossibleSums(leftOverBoxs)
{
   sums=[];
  pairs = [];
  tempArr = [];
   var posibleComb = Math.pow(2, leftOverBoxs.length); //2^n combinations for sum
   // console.log(posibleComb);
   for (var i = 0; i < posibleComb; i++)
   {
      tempArr = [];
      for (var index = 0; index < leftOverBoxs.length; index++)
      {
         //combination generation with use of btwise and using masking techique
         // console.log(Math.pow(2, index));
         if ((i & Math.pow(2, index)))
         {
            // console.log(index);
            // console.log(i);
            // console.log(Math.pow(2, index));
               tempArr.push(leftOverBoxs[index]);
         }
      }
      if (tempArr.length != 0)
      {
         pairs.push(tempArr);
      }
   }

   for (var j = 0; j < pairs.length; j++)
   {
      sums[j] = pairs[j].reduce(function(a, b) { return parseInt(a) + parseInt(b); }, 0);
   }
   // console.log(sums);
   // console.log(leftOverBoxs);
}
function finish()
{
   let x = document.createElement("div");
   let a = document.createAttribute("id");
   let y = document.createTextNode("GAME FINISHED!\nSCORE: " + score());
   x.appendChild(y);
   x.setAttributeNodeNS(a);
   a.value="finishDiv";
   document.getElementsByTagName("section")[0].appendChild(x);

   btnSubmit[0].disabled = true;
   btnRoll[0].disabled = true;
   giveUpBtn[0].disabled = true;
   throw new Error('DONT BOTHER PLZ.IT IS JUST TO ABORT THE EXECUTION!');
}
function score()
{
   let score = 0;
   for (let index = 0, i = 0; index < chkBoxes.length; index++)
   {
      if(chkBoxes[index].checked == true && chkBoxes[index].disabled==true)
      {
         score += parseInt(chkBoxes[index].value);
      }
      else
      {
         chkBoxes[index].disabled=true;
      }
   }
   return score;
}
