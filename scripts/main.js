//  take a look at the expected behavior for Part 1 here: https://youtu.be/WH2TbnkirpQ
//
// assume you have access to 2 provided functions:
// 1. later(targetQuery, callback) finds a valediction that is appropriate for a targetQuery.
//    targetQuery: to whom you'd like to offer an appropriate valediction (https://en.wikipedia.org/wiki/Valediction)
//                  (if it is a substring of a known target, the corresponding valediction will be provided,
//                   otherwise a random one will be selected)
//    callback: function that you want later to call with the valediction result when it's ready.
//              this function will be called with the following argument:
//        result: an object with the keys:
//            target: to whom the result is intended to go
//            valediction: what to say to the target
// 2. options(callback, query) finds all known valediction targets or those that include the substring specified in query, if it's provided.
//    callback: function that you want options to call with the known valediction targets, when they're ready.
//              this function will be called with the following argument:
//        keys: an array of known valediction targets
//    query: a constraint on which valediction targets to include. Only those of which query is a substring will be included.

// get refs to the input and output elements in the page
const input = document.getElementById("target");
const output = document.querySelector("output");
const list = document.getElementById("available-targets")

// when the input has focus and enter is pressed, invoke the function named later
input.addEventListener("keydown", (ev) => {
  console.debug("keydown", ev.key);

  if (ev.key === "Enter") {

    options((keys) => setOptions(keys), input.value);
    /*
    console.log("Enter detected. current value:", input.value);
    later(input.value, (valediction) => setOutput(valediction.target, valediction.valediction));*/
  }

});

// when you have the result from this function, update(replace) the content of the output element with the result formatted as:
// "RESULT, TARGET" // where the all caps are placeholders for the corresponding values
// example:
// if the result of invoking later() with a target of "alligator"
// is "see you later", the output element should be updated to read:
// see you later, alligator

//
const setOutput = (target, valediction) => {
  console.log("setOutput", target, valediction);
  const outputString = '' + valediction + ', ' + target;
  output.textContent = outputString;
};

const setOptions = (options) => {
  console.log(options);
  options.forEach((option) => generateOptionButton(option));
}

const generateOptionButton = (option) =>{
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.textContent = option;
  button.classList.add(option);
  button.addEventListener("click", ()=> { later(option, (valediction) => setOutput(valediction.target, valediction.valediction))});
  li.appendChild(button);
  list.appendChild(li);
}

// for Part 2
// change the code so that rather than directly requesting a valediction with the user's input,
// the page instead queries for matching targets using the provided option() function
// (if the user hasn't entered anything, simply exclude the query argument in your invocation to options).
// add each of the resulting target options as buttons in list items in the ul.
// when any of these buttons are clicked, user the later() function to request the corresponding valediction and update the output element as in Part 1
