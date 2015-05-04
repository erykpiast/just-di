/* global suite, test, setUp, teardown */

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
            
        });
        
    });
    
});