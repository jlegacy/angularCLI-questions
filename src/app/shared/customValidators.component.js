System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CustomValidators;
    return {
        setters: [],
        execute: function () {
            CustomValidators = (function () {
                function CustomValidators() {
                }
                CustomValidators.cannotContainSpace = function (control) {
                    console.log(control.value.trim().length);
                    if (control.value.trim().length > 0)
                        return null;
                    return {
                        cannotContainSpace: true
                    };
                };
                CustomValidators.validEmail = function (control) {
                    var patt = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
                    if (patt.test(control.value.trim()))
                        return null;
                    return {
                        validEmail: null
                    };
                };
                return CustomValidators;
            }());
            exports_1("CustomValidators", CustomValidators);
        }
    };
});
//# sourceMappingURL=customValidators.component.js.map