const express = require('express'); // import express
const request = require('supertest'); // supertest is a framework that allows to easily test web apis
const serverRoutes = require('./get_router');
// import file we are testing
const app = express(); // an instance of an express app, a 'fake' express app
app.use(serverRoutes); // routes

describe('testing-routes', () => {
  it('GET /aboutus - success', async () => {
    const { text } = await request(app).get('/aboutus'); // uses the request function that calls on express app instance
    expect(text).toEqual('I am the ABOUT US page.');
  });
  it('GET / - success', async () => {
    const { text } = await request(app).get('/'); // uses the request function that calls on express app instance
    expect(text).toEqual('I am sample GET API');
  });
});

describe('Test routes using mock data', () => {
  const mockResponse = 'Test Data';
  const mockGetRouteOne = jest.fn(() => mockResponse);
  it('Test aboutus route', () => {
    expect(mockGetRouteOne('/aboutus')).toBe(mockResponse);
  });

  it('Test root route', () => {
    expect(mockGetRouteOne('/')).toBe(mockResponse);
  });
});
