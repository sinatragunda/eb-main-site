import {CreditCard, LucideIcon} from "lucide-react";
import {CartItem} from "@/app/types/marketplace.ts";

export enum PAYMENT_TYPE {
    DEBIT_CREDIT_CARD= "DEBIT_CREDIT_CARD",
    BANK_TRANSFER = "BANK_TRANSFER",
    WALLET = "WALLET",
}

export type PaymentRequest = {
    email: string,
    name?: string,
    cartItems : CartItem[],
    paymentType : PAYMENT_TYPE,
    paymentDetails: unknown,
}


export type MakePaymentResponse = {
    id: string,
    paymentType : PAYMENT_TYPE,

}

export type PaymentOptions = {
    id: string,
    paymentType : PAYMENT_TYPE ,
    label:string,
    icon: LucideIcon,

}