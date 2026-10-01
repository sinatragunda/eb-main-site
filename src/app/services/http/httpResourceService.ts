import  {MakePaymentResponse , PaymentRequest } from './../../types/paymentrequest.ts';
import {http} from "@/app/services/http/httpClient.ts";

const PAYMENTS_PATH= {
    MAKE_PAYMENT: 'payments',
}

export const httpResourceService ={

    async makePayment(paymentRequest : PaymentRequest) :Promise<MakePaymentResponse>{
        const paymentResponse = await http.post<MakePaymentResponse>(PAYMENTS_PATH.MAKE_PAYMENT, paymentRequest);
        return paymentResponse;
    }

}