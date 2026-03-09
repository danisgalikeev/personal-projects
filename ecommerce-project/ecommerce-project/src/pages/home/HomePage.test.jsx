import {it , expect, describe, vi, beforeEach} from 'vitest';
import {render, screen, within} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import axios from "axios";
import {HomePage} from './HomePage';
import {userEvent} from "@testing-library/user-event";
vi.mock('axios')

describe('HomePage component', () => {
    let user;
    let loadCart;
    beforeEach(() => {
        user = userEvent.setup();
        loadCart = vi.fn();
        axios.get.mockImplementation(async (urlPath) => {
            if(urlPath==='/api/products'){
                return {
                    data: [{
                        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                        rating: {
                            stars: 4.5,
                            count: 87
                        },
                        priceCents: 1090,
                        keywords: ["socks", "sports", "apparel"]
                    },
                        {
                            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                            image: "images/products/intermediate-composite-basketball.jpg",
                            name: "Intermediate Size Basketball",
                            rating: {
                                stars: 4,
                                count: 127
                            },
                            priceCents: 2095,
                            keywords: ["sports", "basketballs"]
                        }]
                }
            }
        })
    })

    it('displays products correctly', async () => {

        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart}/>
            </MemoryRouter>

        );
        const productContainers=  await screen.findAllByTestId('product-container');
        expect(productContainers.length).toBe(2);
        expect(
        within(productContainers[0])
            .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs'))
            .toBeInTheDocument();
        expect(
            within(productContainers[1])
                .getByText('Intermediate Size Basketball'))
            .toBeInTheDocument();
    })

    it('add to cart button works', async () => {
        render(

            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart}/>
            </MemoryRouter>
        )
        const productContainers=  await screen.findAllByTestId('product-container');

        const selector1 = within(productContainers[0]).getByTestId('product-quantity-selector');
        await user.selectOptions(selector1, '2');

        const firstBut=(within(productContainers[0]).getByTestId('add-to-cart-button'));
        await user.click(firstBut);

        const selector2 = within(productContainers[1]).getByTestId('add-to-cart-button');
        await user.selectOptions(selector2, '3');

        const secondBut = within(productContainers[1]).getByTestId('add-to-cart-button');
        await user.click(secondBut);

        expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items', {
            productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity:2
        });
        expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items', {
            productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity:3
        });
        expect(loadCart).toHaveBeenCalledTimes(2)
    })
})