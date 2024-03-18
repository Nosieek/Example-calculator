const request = require('supertest');
const app = require('../server');

describe('POST /api/calculate', () => {
    it('return correct result for valid expression', async () => {
        const tests = [
            { expression: '1+3*6', expectedResponse: {result: 19}},
            { expression: '10-3/3*3', expectedResponse: {result: 7}},
            { expression: '19*6/3*4', expectedResponse: {result: 152}},
            { expression: '10-5*2', expectedResponse: {result: 0}},
            { expression: '10*21/21*2-5*2/1', expectedResponse: {result: 10}},
            { expression: '10.5*2', expectedResponse: {result: 21}},
            { expression: '10.75*4*2.5/3', expectedResponse: {result: 35.83}},
            { expression: '2+3+', expectedResponse: {result: 5}},
            { expression: '+4+3', expectedResponse: {result: 7}},
        ]
        for(const test of tests){
            const {expression, expectedResponse} = test;
            const response = await request(app)
                .post('/api/calculate')
                .send({ expression })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual(expectedResponse);
        }
    });

    it(' return error for empty expression', async () => {
        const expression = '';
        const expectedError = { error: 'Expression is empty!' };

        const response = await request(app)
            .post('/api/calculate')
            .send({ expression })
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toEqual(expectedError);
    });

    it('return error for invalid expression', async () => {
        const expression = '2';
        const expectedError = { error: 'Invalid expression' };

        const response = await request(app)
            .post('/api/calculate')
            .send({ expression })
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toEqual(expectedError);
    });

});
