import {FaqModel} from "../models/Faq.models";
import {AMOUNT_MODELS, MINT_DATE, PRICE, THUGS_PER_MODEL} from "./__numbers";

export const faqs: FaqModel[] = [
    {
        question: "How many thugs?",
        answer: `There will be ${AMOUNT_MODELS} models, each with a supply of ${THUGS_PER_MODEL}, which makes a total of ${AMOUNT_MODELS * THUGS_PER_MODEL} infamous thugs`
    },
    {
        question: "How much?",
        answer: `${PRICE} SOL`
    },
    {
        question: "Wen mint?",
        answer: `Now!`
    },
    {
        question: "What's in it for the thugDAO?",
        answer: "25% of the collection will be airdropped to thugbirdz holder. 20% of all royalities."
    },
    {
        question: "Distribution?",
        answer: "25% gets airdropped to members of the thugDAO. Artist will keep max. 15 thugs to share with his (normie) frens and familiy"
    },
    {
        question: "Utility, innovation or even a roadmap?",
        answer: "It's a small artist's project. There is no utility or innovation, just art. Please keep this in mind when you want to mint/buy."
    },
    {
        question: "Will I be considered cool if I buy an infamous thug?",
        answer: "You're damn right you will"
    }
]
