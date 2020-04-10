module.exports = {
  name: 'socketproto',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/socketproto',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
