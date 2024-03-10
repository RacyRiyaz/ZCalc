// Function to formatNumberWithCommas
function formatNumberWithCommas(value) {
    // Remove existing commas and spaces
    value = value.replace(/,/g, "").replace(/\s/g, "");

    // Convert the value to a number
    var number = parseFloat(value);

    // Check if the input is a valid number
    if (!isNaN(number)) {
        // Format the number with commas as thousands separators
        return number.toLocaleString('en-IN');
    } else {
        // If the input is not a valid number, return the original value
        return value;
    }
}

// Function to calculate SIP
function calculateSIP() {
    var investmentAmount = parseFloat(document.getElementById("sipInvestmentAmount").value.replace(/,/g, ""));
    var rateOfInterest = parseFloat(document.getElementById("sipRateOfInterest").value);
    var investmentPeriod = parseFloat(document.getElementById("sipInvestmentPeriod").value);

    var monthlyRateOfInterest = rateOfInterest / 12 / 100;
    var totalMonths = investmentPeriod * 12;
    var sipAmount = investmentAmount * ((Math.pow((1 + monthlyRateOfInterest), totalMonths) - 1) / monthlyRateOfInterest) * (1 + monthlyRateOfInterest);

    document.getElementById("sipResult").innerText = "Total Amount after " + investmentPeriod + " years: ₹" + formatNumberWithCommas(sipAmount.toFixed(2));
}

// Function to calculate SWP
function calculateSWP() {
    var investmentAmount = parseFloat(document.getElementById("swpInvestmentAmount").value.replace(/,/g, ""));
    var rateOfInterest = parseFloat(document.getElementById("swpRateOfInterest").value);
    var timePeriod = parseFloat(document.getElementById("swpTimePeriod").value);
    var monthlyWithdrawalAmount = parseFloat(document.getElementById("swpMonthlyWithdrawalAmount").value.replace(/,/g, ""));
    var monthlyRateOfInterest = rateOfInterest / 12 / 100;
    var totalMonths = timePeriod * 12;
    var balance = investmentAmount;

    // Loop through each month and calculate the balance after withdrawal
    for (var i = 0; i < totalMonths; i++) {
        const monthlyReturn = balance * monthlyRateOfInterest;
        balance += monthlyReturn - monthlyWithdrawalAmount;
    }

    // Display the result
    var swpResultElement = document.getElementById("swpResult");
    swpResultElement.innerText = "Total Amount after " + timePeriod + " years: ₹" + formatNumberWithCommas(balance.toFixed(2));
}

// Function to calculate Lumpsum
function calculateLumpsum() {
    var investmentAmount = parseFloat(document.getElementById("lumsumpAmount").value.replace(/,/g, ""));
    var rateOfInterest = parseFloat(document.getElementById("rateOfInterest").value);
    var investmentPeriod = parseFloat(document.getElementById("investmentPeriod").value);
    var invPeriod = investmentPeriod;
    var increment = 1 + rateOfInterest / 100; // Convert percentage to decimal

    while (invPeriod > 0) {
        investmentAmount *= increment; // Add interest to the investment amount
        invPeriod--;
    }

    document.getElementById("lumsumpResult").innerText = "Total Amount after " + investmentPeriod + " years: ₹" + formatNumberWithCommas(investmentAmount.toFixed(2));
}
