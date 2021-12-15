function checkCashRegister(price, cash, cid) {

    // Constant to store all the currency units
    const currencyUnits = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  
    // 2D array to reverse and store the cid parameter
    let cidBalance = cid.reverse();
  
    // 2D array to store the differences made to the cidBalance after subtracting changeDue
    let cidBalanceDiff = [];
    for (let a = 0; a < cidBalance.length; a++){
      cidBalanceDiff.push([cidBalance[a][0], 0]);
    }
  
    // Variable to store the change due
    let changeDue = cash - price;
  
    // For loop to subtract the initial changeDue with however much can be subtracted from cidBalance
    // Each time changeDue is subtracted, the changeDue variable is updated for the next loop
    for (let b = 0; b < currencyUnits.length; b++){
      if (changeDue >= currencyUnits[b]){
        let cashNeeded = Math.floor(changeDue / currencyUnits[b]);
        let cashAvailable = Math.round(cidBalance[b][1] / currencyUnits[b]);
  
        if (cashNeeded == cashAvailable){
          let differenceAsString = ((cashNeeded * currencyUnits[b]).toFixed(2)).toString();
          let differenceAsNum = parseFloat(differenceAsString);
          let changeDueAsString = ((changeDue).toFixed(2)).toString();
          let changeDueAsNum = parseFloat(changeDueAsString);
          cidBalanceDiff[b][1] += differenceAsNum;
          changeDue = changeDueAsNum;
          changeDue -= differenceAsNum;
          
        }else if (cashAvailable > cashNeeded){
          for (let c = 0; c < cashNeeded; c++){
            let differenceAsString = ((currencyUnits[b]).toFixed(2)).toString();
            let differenceAsNum = parseFloat(differenceAsString);
            let changeDueAsString = ((changeDue).toFixed(2)).toString();
            let changeDueAsNum = parseFloat(changeDueAsString);
            cidBalanceDiff[b][1] += differenceAsNum;
            changeDue = changeDueAsNum;
            changeDue -= differenceAsNum;
          }
        
        }else if (cashNeeded > cashAvailable){
          for (let d = 0; d < cashAvailable; d++){
            let differenceAsString = ((currencyUnits[b]).toFixed(2)).toString();
            let differenceAsNum = parseFloat(differenceAsString);
            let changeDueAsString = ((changeDue).toFixed(2)).toString();
            let changeDueAsNum = parseFloat(changeDueAsString);
            cidBalanceDiff[b][1] += differenceAsNum;
            changeDue = changeDueAsNum;
            changeDue -= differenceAsNum;
          }
        }
      }
    }
  
    // Checks if all the change due has been met
    // If changeDue is equal to 0, the total balance of the cash register is compared against how much will be subtracted from it
    if (changeDue == 0){
      let cidBalanceTotal = 0;
      let cidBalanceDiffTotal = 0;
      for (let e = 0; e < cidBalance.length; e++){
        cidBalanceTotal += cidBalance[e][1];
        cidBalanceDiffTotal += cidBalanceDiff[e][1];
      }
  
      // If the total balance of the cash register is equal to the amount which will be subtracted, the CLOSED result will be outputted
      if (cidBalanceTotal == cidBalanceDiffTotal){
        let output = {
          status: "CLOSED",
          change: cid.reverse()
        }
        return output;
  
      // If the total balance of the cash register is different to the amount which will be subtracted, the OPEN result will be outputted
      }else {
        let change = [];
        for (let f = 0; f < cidBalanceDiff.length; f++){
          if (cidBalanceDiff[f][1] > 0){
            change.push(cidBalanceDiff[f]);
          }
        }
        let output = {
          status: "OPEN",
          change: change
        }
        return output;
      }
      
    // If changeDue is not equal to 0 and there is not enough money in the cash register to supply the change, the INSUFFICIENT FUNDS result will be outputted
    }else {
      let output = {
        status: "INSUFFICIENT_FUNDS",
        change: []
      }
      return output;
    }
  }
  
  // Test for OPEN result
  checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
  
  // Test for OPEN result
  //checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
  
  // Test for INSUFFICIENT FUNDS result
  //checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
  
  // Test for CLOSED result
  //checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);