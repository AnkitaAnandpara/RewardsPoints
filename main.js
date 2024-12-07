 let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function calculateRewards(amount) {
    if (amount >=50 && amount < 100) {
        return amount-50;
    } else if (amount >100){
        return (2*(amount-100) + 50);
    }
    return 0;
}

class Transaction {
    constructor(amount, transactionDate) {
        this.amount = amount;
        this.rewards = calculateRewards(amount);
        this.transactionDate = new Date(transactionDate);
    }
}

class Rewards {
    constructor() {
        this.list = [];
    }

    addTransaction(amount, transactionDate) {
        const transaction = new Transaction(amount, transactionDate);
        this.list.push(transaction);
    }

    getAllTransactions() {
        return this.list.sort((a,b) => b.transactionDate-a.transactionDate);
    }

    getTotalRewards() {
        return this.list.length ? this.list.reduce((acc,key)=>key.rewards+acc, 0) : 0;
    }

    getMonthlyRewards() {
        let monthlyRewards = [];
        for(let i=0; i<3; i++) {
            let filteredList = this.list.filter(trans => trans.transactionDate.getMonth() == (new Date).getMonth() - i );
            filteredList.map(function(value, index) {
                let month = value.transactionDate.getMonth();
                if(monthlyRewards.hasOwnProperty(month)) {
                    monthlyRewards[month] += value.rewards;
                } else {
                    monthlyRewards[month] = value.rewards;
                }
            });
        }
        return monthlyRewards;
    }
}

let myRewards = new Rewards();
myRewards.addTransaction(120, "2024-12-05");
myRewards.addTransaction(54, "2024-11-25");
myRewards.addTransaction(250, "2024-10-25");
myRewards.addTransaction(25, "2024-10-06");
myRewards.addTransaction(125, "2024-09-05");
myRewards.addTransaction(300, "2024-07-05");
let transactions = myRewards.getAllTransactions();
for (let i = 0; i < transactions.length; i++) 
{
  let transaction = transactions[i];
  console.log("Transaction "+(i+1)+" Price: " + transaction.amount+" Reward: " + transaction.rewards+" Date: " + transaction.transactionDate.toLocaleDateString());
}

console.log("Total Rewards: " + myRewards.getTotalRewards());
let monthlyRewards = myRewards.getMonthlyRewards();
monthlyRewards.map(function(value, index) {
  console.log("Rewards For '" + monthNames[index] + "' Month: " + value);
});
