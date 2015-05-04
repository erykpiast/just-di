import getParameterNames from 'get-parameter-names';


function _assertNotDisposed(obj) {
    if(!obj.hasOwnProperty('_modules')) {
        throw new Error('instance was disposed and is no longer usable!');
    }
}


export default class DI {
    constructor() {
        this._modules = {};
    }
    
    define(name, value) {
        _assertNotDisposed(this);
        
        this._modules[name] = value;
        
        return this; // allow chaining
    }
    
    use(fn) {
        _assertNotDisposed(this);
        
        if ('function' !== typeof fn) {
            throw new Error('you can use Depender only with functions!');
        }
        
        let args = getParameterNames(fn).map((fnName) => {
            if(!this._modules.hasOwnProperty(fnName)) {
                throw new Error(`dependency ${fnName} not available!`);
            } else {
                return this._modules[fnName];
            }
        });
        
        return fn(...args);
    }
    
    dispose() {
        _assertNotDisposed(this);
        
        delete this._modules;
    }
}
