const express = require('express'); // import express
const serverRoutes = require('./device-route');

const app = express(); // an instance of an express app, a 'fake' express app
app.use(serverRoutes); // routes

// Add - Device Mock Response
const mockResponse = require('../mock/mock-response.json');

const error = { error: 'error' };

describe('Device CRUD routes using mock', () => {
  it('/add device - Success', () => {
    const mockAddDeviceRoute = jest.fn(() => mockResponse);
    expect(mockAddDeviceRoute('/add')).toBe(mockResponse);
  });

  it('/add device - Failed', () => {
    const mockAddDeviceRoute = jest.fn(() => error);
    expect(mockAddDeviceRoute('/add')).toBe(error);
  });

  it('/list device - Success', () => {
    const mockListDeviceRoute = jest.fn(() => mockResponse);
    expect(mockListDeviceRoute('/list')).toBe(mockResponse);
  });

  it('/list device - Failed', () => {
    const mockListDeviceRoute = jest.fn(() => error);
    expect(mockListDeviceRoute('/list')).toBe(error);
  });

  it('/edit/:id device - Success', () => {
    const mockEditDeviceRoute = jest.fn(() => mockResponse);
    expect(mockEditDeviceRoute('/edit/:id')).toBe(mockResponse);
  });

  it('/edit/:id device - Failed', () => {
    const mockEditDeviceRoute = jest.fn(() => error);
    expect(mockEditDeviceRoute('/edit/:id')).toBe(error);
  });

  it('/update/:id device - Success', () => {
    const mockUpdateDeviceRoute = jest.fn(() => mockResponse);
    expect(mockUpdateDeviceRoute('/update/:id')).toBe(mockResponse);
  });

  it('/update/:id device - Failed', () => {
    const mockUpdateDeviceRoute = jest.fn(() => error);
    expect(mockUpdateDeviceRoute('/update/:id')).toBe(error);
  });

  it('/del/:id device - Success', () => {
    const mockDelDeviceRoute = jest.fn(() => mockResponse);
    expect(mockDelDeviceRoute('/del/:id')).toBe(mockResponse);
  });

  it('/del/:id device - Failed', () => {
    const mockDelDeviceRoute = jest.fn(() => error);
    expect(mockDelDeviceRoute('/del/:id')).toBe(error);
  });
});
