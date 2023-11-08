"use strict";

const mockData = require("./mockData.js").data;
const prompt = require("prompt-sync")();

// console.log(mockData)

// PART 1

const user = {
  first_name: "",
  last_name: "",
  age: undefined,
  gender: "",
  gender_interest: "",
  location: "",
  min_age_interest: undefined,
  max_age_interest: undefined,
};

const questions = [
  "What is your first name? ",
  "What is your last name? ",
  "What is your age? ",
  "What is your gender? ",
  "Which genders are you interested in dating? ",
  "Where do you live? ",
  "What is your minimum age interest? ",
  "What is your maximum age interest? ",
];

const answers = [];

for (let i = 0; i < questions.length; i++) {
  let answer = prompt(questions[i]);
  if (i === 0 || i === 1) {
    while (answer.trim() === "" || Number(answer)) {
      console.log("Please enter a name");

      answer = prompt(questions[i]);
    }
    answer = answer.charAt(0).toUpperCase() + answer.slice(1);
  } else if (i === 3 || i === 4) {
    while (
      answer.toUpperCase() !== "M" &&
      answer.toUpperCase() !== "F" &&
      answer.toUpperCase() !== "X"
    ) {
      console.log("Please choose between M, F, or X.");
      answer = prompt(questions[i]);
    }
    answer = answer.toUpperCase();
  } else if (i === 2 || i === 6 || i === 7) {
    while (isNaN(answer) || answer < 18) {
      console.log("Please enter a valid number (18+).");
      answer = prompt(questions[i]);
      answer = Number(answer);
    }

    if (i === 6) {
      user.min_age_interest = answer;
    } else if (i === 7) {
      while (user.max_age_interest <= user.min_age_interest) {
        console.log(
          "Maximum age interest must be higher than the minimum age interest."
        );
        answer = prompt(questions[i]);
        user.max_age_interest = Number(answer);
      }
    }
  } else if (i === 5) {
    while (
      answer.toLowerCase() !== "rural" &&
      answer.toLowerCase() !== "city"
    ) {
      console.log('Please choose between "rural" or "city"');
      answer = prompt(questions[i]);
    }
  }
  answers.push(answer);
}

const userKeys = Object.keys(user);
for (let i = 0; i < userKeys.length; i++) {
  if (
    userKeys[i] === "age" ||
    userKeys[i] === "min_age_interest" ||
    userKeys[i] === "max_age_interest"
  ) {
    user[userKeys[i]] = Number(answers[i]);
  } else {
    user[userKeys[i]] = answers[i];
  }
}

// console.log(user);
console.log("");
// PART 2

// const fakeUser = {
//   first_name: "Patrick",
//   last_name: "Mankaryous",
//   age: 27,
//   gender: "M",
//   gender_interest: "F",
//   location: "city",
//   min_age_interest: 25,
//   max_age_interest: 30,
// };

let count = 0;
for (let i = 0; i < mockData.length; i++) {
  if (
    user.gender === mockData[i].gender_interest &&
    user.gender_interest === mockData[i].gender &&
    user.location === mockData[i].location &&
    mockData[i].age >= user.min_age_interest &&
    mockData[i].age <= user.max_age_interest
  ) {
    count++;
    console.log(
      `${mockData[i].first_name} ${mockData[i].last_name} (${mockData[i].age}) from ${mockData[i].location}`
    );
  }
}

console.log("");

if (count === 0) {
  console.log("No match for u...");
} else if (count === 1) {
  console.log(`You have ${count} match!`);
} else {
  console.log(`You have ${count} matches!`);
}
