module.exports = {
  modelName: 'MockDevice',
  osVersion: '14.0',
  manufacturer: 'MockManufacturer',
  getDeviceTypeAsync: jest.fn().mockResolvedValue('PHONE'),
};
