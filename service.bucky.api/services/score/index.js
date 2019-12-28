const matrix = require('../matrix');

const getBuckyScore = (clientData, period) => {
    const ageBand = getAgeBand(clientData.dob);

    const salary = period === 'month' ? parseInt(clientData.salary) / 12 : parseInt(clientData.salary);

    const spendRatio = getSpendRatio(clientData.spend, salary);

    const spendRatioBand = getSpendRatioBand(spendRatio);

    return calculateBuckyScore(ageBand, spendRatioBand);
};

const getAgeBand = (dob) => {
    const age = Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e+10);

    if (inRange(age, 18, 25)) {
        ageBand = '18-25';
    }

    if (inRange(age, 26, 35)) {
        ageBand = '26-35';
    }

    if (inRange(age, 36, 45)) {
        ageBand = '36-45';
    }

    if (age > 46) {
        ageBand = '46+';
    }

    return ageBand;
};

const inRange = (x, min, max) => {
    return ((x - min) * (x - max) <= 0);
}

const getSpendRatio = (spend, salary) => {
    return spend / salary;
};

const getSpendRatioBand = (spendRatio) => {
    if (inRange(spendRatio, 0, 0.2)) {
        spendRatioBand = '0-20';
    }

    if (inRange(spendRatio, 0.21, 0.4)) {
        spendRatioBand = '21-40';
    }

    if (inRange(spendRatio, 0.41, 0.6)) {
        spendRatioBand = '41-60';
    }

    if (inRange(spendRatio, 0.61, 0.8)) {
        spendRatioBand = '61-80';
    }

    if (inRange(spendRatio, 0.81, 1)) {
        spendRatioBand = '81-100';
    }

    return spendRatioBand;
};

const calculateBuckyScore = (ageBand, spendRatioBand) => {
    const ageScore = matrix["age"][ageBand];
    const spendScore = matrix["spendRatio"][spendRatioBand];

    return ageScore + spendScore;
};

exports = module.exports = { getBuckyScore };