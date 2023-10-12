import {  OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const message  = document.querySelector(".messages")
const input  = document.querySelector("textarea")
const submit  = document.querySelector("#submit")

async function runCompletion (value) {
  const completion = await openai.completions.create({
    model: "text-davinci-003",
    prompt: value,
    max_tokens:4000
  });
  console.log("Response: ", completion.data.choices[0].text);

  if (completion.data) {
    message.innerHTML += `<p>${completion.data.choices[0].text}</p>`
  }
}

submit.addEventListener("click", () => {
  if (input.value) {
    runCompletion(input.value);

    message.innerHTML = `<p>${input.value}</p>`

    input.value = ''
  } else {
    alert("Empty input value")
  }
})
