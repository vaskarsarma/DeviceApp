const express = require('express'); // import express
const serverRoutes = require('./device-temp-route');

const app = express(); // an instance of an express app, a 'fake' express app
app.use(serverRoutes); // routes

// Add - Device Mock Response
const mockResponse = require('../mock/mock-response.json');

const error = { error: 'error' };

describe('Transaction stats routes using mock', () => {
  it('/add temperature - Success', () => {
    const mockAddTempRoute = jest.fn(() => mockResponse);
    expect(mockAddTempRoute('/add')).toBe(mockResponse);
  });

  it('/add temperature - Failed', () => {
    const mockAddTempRoute = jest.fn(() => error);
    expect(mockAddTempRoute('/add')).toBe(error);
  });

  it('/list/:recCount device - Success', () => {
    const mockListTransCount = jest.fn(() => mockResponse);
    expect(mockListTransCount('/list/:recCount')).toBe(mockResponse);
  });

  it('/list/:recCount device - Failed', () => {
    const mockListTransCount = jest.fn(() => error);
    expect(mockListTransCount('/list/:recCount')).toBe(error);
  });

  it('/transactionlist/:fromDate/:toDate device - Success', () => {
    const mockDateWiseTransStats = jest.fn(() => mockResponse);
    expect(mockDateWiseTransStats('/edit/:id')).toBe(mockResponse);
  });

  it('/del/:deviceId device - Failed', () => {
    const mockListTransCount = jest.fn(() => error);
    expect(mockListTransCount('/list/:recCount')).toBe(error);
  });

  it('/del/:deviceId device - Success', () => {
    const mockDateWiseTransStats = jest.fn(() => mockResponse);
    expect(mockDateWiseTransStats('/del/:deviceId')).toBe(mockResponse);
  });
});
