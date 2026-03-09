import {formatMoney} from "../../utils/money.js";
import axios from "axios";
import {useNavigate} from "react-router";

export function PaymentSummary({paymentSummary, loadCart}) {
    const navigate = useNavigate();
    const createOrder = async () =>{
        await axios.post('/api/orders');
        await loadCart();
        navigate('/orders');
    }
    return (
        <div className="payment-summary">
            <div className="payment-summary-title">
                Payment Summary
            </div>

            {paymentSummary && (<>
                    <div data-testid="payment-summary-product-cost" className="payment-summary-row">
                        <div>Items ({paymentSummary.totalItems}):</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
                    </div>

                    <div data-testid="payment-summary-shipping-cost" className="payment-summary-row">
                        <div>Shipping &amp; handling:</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
                    </div>

                    <div data-testid="payment-summary-total-before-tax" className="payment-summary-row subtotal-row">
                        <div>Total before tax:</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.
                            totalCostBeforeTaxCents)}</div>
                    </div>

                    <div data-testid="payment-summary-tax" className="payment-summary-row">
                        <div>Estimated tax (10%):</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
                    </div>

                    <div data-testid="payment-summary-total" className="payment-summary-row total-row">
                        <div>Order total:</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
                    </div>

                    <button data-testid="place-order-button" onClick={createOrder} className="place-order-button button-primary">
                        Place your order
                    </button></>

            )}


        </div>
    )
}