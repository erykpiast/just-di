/* global suite, test, setup, teardown */

import chai from 'chai';
import { assert } from 'chai';
import spies from 'chai-spies';

chai.use(spies);

import DI from '../src/di';


suite('DI', () => {
    
    suite('module API', () => {
        
        test('should be a function', () => {
            assert.isFunction(DI);
        });
        
        test('should can be instantiated', () => {
            let di;
            
            assert.doesNotThrow(() => {
                di = new DI();
            });
            
            assert.instanceOf(di, DI);
        });
        
    });
    
    
    suite('instance API', () => {
        let di;
        
        setup(() => {
            di = new DI();
        });
        
        teardown(() => {
            di = null;
        });
        
        
        test('should has bunch of methods', () => {
            assert.isFunction(di.define);
            assert.isFunction(di.use);
            assert.isFunction(di.dispose);
        });
        
        
        suite('define method', () => {
            
            test('should return current instance', () => {
                assert.strictEqual(di.define(), di);
            });
            
            test('should allow to redefine already defined dependency', () => {
                di.define('dep', () => 'original');
                
                assert.doesNotThrow(() => {
                    di.define('dep', () => 'overriden'); 
                });
            });
            
            test('should accept any value', () => {
                assert.doesNotThrow(() => {
                    di.define('dep', () => { }); 
                });
                
                assert.doesNotThrow(() => {
                    di.define('dep', {}); 
                });
                
                assert.doesNotThrow(() => {
                    di.define('dep', []); 
                });
                
                assert.doesNotThrow(() => {
                    di.define('dep', null); 
                });
                
                assert.doesNotThrow(() => {
                    di.define('dep', undefined); 
                });
                
                assert.doesNotThrow(() => {
                    di.define('dep', 'value'); 
                });
                
                assert.doesNotThrow(() => {
                    di.define('dep', 1); 
                });
            });
            
        });
        
        
        suite('use method', () => {
            
            test('should accept only function', () => {
                assert.throws(() => {
                    di.use({});
                }, /has to be a function/);
                
                assert.throws(() => {
                    di.use([]);
                }, /has to be a function/);
                
                assert.throws(() => {
                    di.use();
                }, /has to be a function/);
                
                assert.throws(() => {
                    di.use('dep1');
                }, /has to be a function/);
            });
            
        });
        
    });
    
    
    suite('injecting', () => {
        let di;
        let _dep1, _dep2, _dep3;
        
        setup(() => {
            di = new DI();
            
            di
                .define('dep1', _dep1 = chai.spy())
                .define('dep2', _dep2 = { })
                .define('dep3', _dep3 = 'value');
        });
        
        teardown(() => {
            di = _dep1 = _dep2 = _dep3 = null;
        });
        
        test('should inject defined value based on function parameter names', () => {
            di.use((dep1, dep2, dep3) => {
                assert.strictEqual(dep1, _dep1);
                assert.strictEqual(dep2, _dep2);
                assert.strictEqual(dep3, _dep3);
            });
        });
        
        test('should throw if any dependency is not available', () => {
            assert.throws(() => {
                di.use((dep1, dep2, dep3, dep4) => { });
            }, /dependency dep4 not available/);
        });
        
    });
    
});