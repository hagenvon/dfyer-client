import { FaqModel } from "../models/Faq.models";
import { AMOUNT_MODELS, MINT_DATE, PRICE, THUGS_PER_MODEL } from "./__numbers";

export const faqs: FaqModel[] = [
  {
    question: "How can i get $Butter?",
    answer:
      "Please connect with your wallet. Go to 'My Gang' and click on the Button 'Make me Butter'",
  },
  {
    question: "How many thugs?",
    answer: `There will be ${AMOUNT_MODELS} models, each with a supply of ${THUGS_PER_MODEL}, which makes a total of ${
      AMOUNT_MODELS * THUGS_PER_MODEL
    } infamous thugs`,
  },
  {
    question: "How much was the mint?",
    answer: `${PRICE} SOL`,
  },
  {
    question: "Wen mint?",
    answer: `October 2021!`,
  },
  {
    question: "Roadmap?",
    answer:
      "It's a small artist's project. There is no roadmap. If i come up with an interesting idea, i will go for it - maybe. Please keep this in mind when you want to buy.",
  },
  {
    question: "Will I be considered cool if I buy an infamous thug?",
    answer: "You're damn right you will",
  },
];
