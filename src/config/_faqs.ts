import { FaqModel } from "../models/Faq.models";
import { AMOUNT_MODELS, PRICE, THUGS_PER_MODEL } from "./__numbers";

/**
 * ISSUES
 */
export const faqsIssues: FaqModel[] = [
  {
    question: "My update process went wrong. What to do?",
    answer:
      "Please contact us in our discord and refer to either your transaction signature, your thug or your wallet's public key",
  },
];

/**
 * BURN
 */
export const faqsBurn: FaqModel[] = [
  {
    question: "Can i go back to the unburnt version of my thug?",
    answer: "No, you can't",
  },
  {
    question: "Can i customize a burnt thug?",
    answer: "Yes, you can",
  },
];

/**
 * UPDATES
 */
export const faqsUpdates: FaqModel[] = [
  {
    question: "Do upgrades or customization effect the ranking",
    answer:
      "Yes, there will be a certain dynamic, but it won't be turned upside down.",
  },
  {
    question: "How that?",
    answer:
      "Not every update/customization is available for every thug. For instance, a thug without a hat can't upgrade to a hat. Special traits are generally unavailable like the hoodie",
  },
  {
    question:
      "Is your ranking the official one? What's up with moonrank and howrareis?",
    answer:
      "Please note: This is an art project. It's not about ranking. If you like rankings as orientation go with the one you like the most. You can adjust the weight of every trait type according to your own preferences",
  },
  {
    question: "So, why a ranking at all?",
    answer: "As an orientation. And to show changes live",
  },
];

/**
 * STAKE
 */
export const faqsStake: FaqModel[] = [
  {
    question: "How can i get $Butter?",
    answer:
      "Please connect with your wallet. Go to 'My Gang' and click on the Button 'Make me Butter'.",
  },
  {
    question: "Can i move my thug into others wallets after earning starts?",
    answer:
      "Yes, you can move it around, but you need to claim your rewards with your thug in the same wallet, you started earning. If you start the earning from another wallet the timer will be reset",
  },
  {
    question: "Will there be bonus rewards for certain attributes?",
    answer:
      "Currently not, but in one of the next patches there will be a small bonus for enforcer, underbosses and the boss.",
  },
];

/**
 * GENERAL
 */
export const faqs: FaqModel[] = [
  {
    question: "How many thugs?",
    answer: `There are ${AMOUNT_MODELS} models, each with a supply of ${THUGS_PER_MODEL}, which makes a total of ${
      AMOUNT_MODELS * THUGS_PER_MODEL
    } Infamous Thugs`,
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
      "It's a small artist's project. There is no roadmap. Project should be fun. Please keep this in mind when you want to buy.",
  },
  {
    question: "Will I be considered cool if I buy an Infamous Thug?",
    answer: "You're damn right you will.",
  },
];
