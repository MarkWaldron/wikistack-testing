var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);

it('will invoke a function once per element', function () {
    var arr = ['x','y','z'];
    function logNth (val, idx) {
        console.log('Logging elem #'+idx+':', val);
    }
    logNth = chai.spy(logNth);
    arr.forEach(logNth);
    expect(logNth).to.have.been.called.exactly(arr.length);
});
