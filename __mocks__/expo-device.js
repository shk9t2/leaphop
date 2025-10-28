module.exports = {
  modelName: 'MockDevice',
  osVersion: '14.0',
  manufacturer: 'MockManufacturer',
  isDevice: true,
  getDeviceTypeAsync: jest.fn().mockResolvedValue('PHONE'),
};
