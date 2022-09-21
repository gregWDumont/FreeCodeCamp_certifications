const checkCashRegister = (price, cash, cid) => {
  const UNIT_AMOUNT = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.10,
    "QUARTER": 0.25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
  };  
  
  let totalCID = 0;
  for (let item of cid) {
    totalCID += item[1];
  }
  totalCID = totalCID.toFixed(2);  let changeToGive = cash - price;
  const changeArray = [];
  if (changeToGive > totalCID) {
    return { status: "INSUFFICIENT_FUNDS", change: changeArray };
  } else if (changeToGive.toFixed(2) === totalCID) {
    return { status: "CLOSED", change: cid };
  } else {
    cid = cid.reverse();
    for (let item of cid) {
      let prov = [item[0], 0];
      while (changeToGive >= UNIT_AMOUNT[item[0]] && item[1] > 0) {
        prov[1] += UNIT_AMOUNT[item[0]];
        item[1] -= UNIT_AMOUNT[item[0]];
        changeToGive -= UNIT_AMOUNT[item[0]];
        changeToGive = changeToGive.toFixed(2);
      }      if (prov[1] > 0) {
        changeArray.push(prov);
      }
    }
  }  if (changeToGive > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }  return { status: "OPEN", change: changeArray};
}