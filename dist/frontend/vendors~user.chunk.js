"use strict";
(self["webpackChunkhungvvpd06596_asmfinal"] = self["webpackChunkhungvvpd06596_asmfinal"] || []).push([["vendors-node_modules_autobind-decorator_lib_esm_index_js-node_modules_class-validator_esm5_de-157a7d"],{

/***/ "./node_modules/autobind-decorator/lib/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/autobind-decorator/lib/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ autobind)
/* harmony export */ });
/* unused harmony exports boundMethod, boundClass */
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */
function boundMethod(target, key, descriptor) {
  var fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new TypeError("@boundMethod decorator can only be applied to methods not: ".concat(_typeof(fn)));
  } // In IE11 calling Object.defineProperty has a side-effect of evaluating the
  // getter for the property which is being replaced. This causes infinite
  // recursion and an "Out of stack space" error.


  var definingProperty = false;
  return {
    configurable: true,
    get: function get() {
      // eslint-disable-next-line no-prototype-builtins
      if (definingProperty || this === target.prototype || this.hasOwnProperty(key) || typeof fn !== 'function') {
        return fn;
      }

      var boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        configurable: true,
        get: function get() {
          return boundFn;
        },
        set: function set(value) {
          fn = value;
          delete this[key];
        }
      });
      definingProperty = false;
      return boundFn;
    },
    set: function set(value) {
      fn = value;
    }
  };
}
/**
 * Use boundMethod to bind all methods on the target.prototype
 */

function boundClass(target) {
  // (Using reflect to get all keys including symbols)
  var keys; // Use Reflect if exists

  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    keys = Reflect.ownKeys(target.prototype);
  } else {
    keys = Object.getOwnPropertyNames(target.prototype); // Use symbols if support is provided

    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
    }
  }

  keys.forEach(function (key) {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key); // Only methods need binding

    if (typeof descriptor.value === 'function') {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });
  return target;
}
function autobind() {
  if (arguments.length === 1) {
    return boundClass.apply(void 0, arguments);
  }

  return boundMethod.apply(void 0, arguments);
}

/***/ }),

/***/ "./node_modules/class-validator/esm5/container.js":
/*!********************************************************!*\
  !*** ./node_modules/class-validator/esm5/container.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFromContainer": () => (/* binding */ getFromContainer)
/* harmony export */ });
/* unused harmony export useContainer */
/**
 * Container to be used by this library for inversion control. If container was not implicitly set then by default
 * container simply creates a new instance of the given class.
 */
var defaultContainer = new (/** @class */ (function () {
    function class_1() {
        this.instances = [];
    }
    class_1.prototype.get = function (someClass) {
        var instance = this.instances.find(function (instance) { return instance.type === someClass; });
        if (!instance) {
            instance = { type: someClass, object: new someClass() };
            this.instances.push(instance);
        }
        return instance.object;
    };
    return class_1;
}()))();
var userContainer;
var userContainerOptions;
/**
 * Sets container to be used by this library.
 */
function useContainer(iocContainer, options) {
    userContainer = iocContainer;
    userContainerOptions = options;
}
/**
 * Gets the IOC container used by this library.
 */
function getFromContainer(someClass) {
    if (userContainer) {
        try {
            var instance = userContainer.get(someClass);
            if (instance)
                return instance;
            if (!userContainerOptions || !userContainerOptions.fallback)
                return instance;
        }
        catch (error) {
            if (!userContainerOptions || !userContainerOptions.fallbackOnErrors)
                throw error;
        }
    }
    return defaultContainer.get(someClass);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/IsNotEmpty.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/IsNotEmpty.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IsNotEmpty": () => (/* binding */ IsNotEmpty)
/* harmony export */ });
/* unused harmony exports IS_NOT_EMPTY, isNotEmpty */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");

var IS_NOT_EMPTY = 'isNotEmpty';
/**
 * Checks if given value is not empty (!== '', !== null, !== undefined).
 */
function isNotEmpty(value) {
    return value !== '' && value !== null && value !== undefined;
}
/**
 * Checks if given value is not empty (!== '', !== null, !== undefined).
 */
function IsNotEmpty(validationOptions) {
    return (0,_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__.ValidateBy)({
        name: IS_NOT_EMPTY,
        validator: {
            validate: function (value, args) { return isNotEmpty(value); },
            defaultMessage: (0,_common_ValidateBy__WEBPACK_IMPORTED_MODULE_0__.buildMessage)(function (eachPrefix) { return eachPrefix + '$property should not be empty'; }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/common/ValidateBy.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateBy": () => (/* binding */ ValidateBy),
/* harmony export */   "buildMessage": () => (/* binding */ buildMessage)
/* harmony export */ });
/* harmony import */ var _register_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../register-decorator */ "./node_modules/class-validator/esm5/register-decorator.js");

function buildMessage(impl, validationOptions) {
    return function (validationArguments) {
        var eachPrefix = validationOptions && validationOptions.each ? 'each value in ' : '';
        return impl(eachPrefix, validationArguments);
    };
}
function ValidateBy(options, validationOptions) {
    return function (object, propertyName) {
        (0,_register_decorator__WEBPACK_IMPORTED_MODULE_0__.registerDecorator)({
            name: options.name,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: options.constraints,
            validator: options.validator,
        });
    };
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/decorator/string/Length.js":
/*!**********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/decorator/string/Length.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Length": () => (/* binding */ Length)
/* harmony export */ });
/* unused harmony exports IS_LENGTH, length */
/* harmony import */ var _common_ValidateBy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/ValidateBy */ "./node_modules/class-validator/esm5/decorator/common/ValidateBy.js");
/* harmony import */ var validator_lib_isLength__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! validator/lib/isLength */ "./node_modules/validator/lib/isLength.js");
/* harmony import */ var validator_lib_isLength__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isLength__WEBPACK_IMPORTED_MODULE_0__);


var IS_LENGTH = 'isLength';
/**
 * Checks if the string's length falls in a range. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
function length(value, min, max) {
    return typeof value === 'string' && validator_lib_isLength__WEBPACK_IMPORTED_MODULE_0___default()(value, { min: min, max: max });
}
/**
 * Checks if the string's length falls in a range. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
function Length(min, max, validationOptions) {
    return (0,_common_ValidateBy__WEBPACK_IMPORTED_MODULE_1__.ValidateBy)({
        name: IS_LENGTH,
        constraints: [min, max],
        validator: {
            validate: function (value, args) { return length(value, args === null || args === void 0 ? void 0 : args.constraints[0], args === null || args === void 0 ? void 0 : args.constraints[1]); },
            defaultMessage: (0,_common_ValidateBy__WEBPACK_IMPORTED_MODULE_1__.buildMessage)(function (eachPrefix, args) {
                var isMinLength = (args === null || args === void 0 ? void 0 : args.constraints[0]) !== null && (args === null || args === void 0 ? void 0 : args.constraints[0]) !== undefined;
                var isMaxLength = (args === null || args === void 0 ? void 0 : args.constraints[1]) !== null && (args === null || args === void 0 ? void 0 : args.constraints[1]) !== undefined;
                if (isMinLength && (!args.value || args.value.length < (args === null || args === void 0 ? void 0 : args.constraints[0]))) {
                    return eachPrefix + '$property must be longer than or equal to $constraint1 characters';
                }
                else if (isMaxLength && args.value.length > (args === null || args === void 0 ? void 0 : args.constraints[1])) {
                    return eachPrefix + '$property must be shorter than or equal to $constraint2 characters';
                }
                return (eachPrefix +
                    '$property must be longer than or equal to $constraint1 and shorter than or equal to $constraint2 characters');
            }, validationOptions),
        },
    }, validationOptions);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/index.js":
/*!****************************************************!*\
  !*** ./node_modules/class-validator/esm5/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
/* unused harmony exports validateOrReject, validateSync, registerSchema */
/* harmony import */ var _metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metadata/MetadataStorage */ "./node_modules/class-validator/esm5/metadata/MetadataStorage.js");
/* harmony import */ var _validation_Validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validation/Validator */ "./node_modules/class-validator/esm5/validation/Validator.js");
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./container */ "./node_modules/class-validator/esm5/container.js");



// -------------------------------------------------------------------------
// Export everything api users needs
// -------------------------------------------------------------------------












/**
 * Validates given object by object's decorators or given validation schema.
 */
function validate(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions) {
    if (typeof schemaNameOrObject === 'string') {
        return (0,_container__WEBPACK_IMPORTED_MODULE_0__.getFromContainer)(_validation_Validator__WEBPACK_IMPORTED_MODULE_1__.Validator).validate(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions);
    }
    else {
        return (0,_container__WEBPACK_IMPORTED_MODULE_0__.getFromContainer)(_validation_Validator__WEBPACK_IMPORTED_MODULE_1__.Validator).validate(schemaNameOrObject, objectOrValidationOptions);
    }
}
/**
 * Validates given object by object's decorators or given validation schema and reject on error.
 */
function validateOrReject(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions) {
    if (typeof schemaNameOrObject === 'string') {
        return (0,_container__WEBPACK_IMPORTED_MODULE_0__.getFromContainer)(_validation_Validator__WEBPACK_IMPORTED_MODULE_1__.Validator).validateOrReject(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions);
    }
    else {
        return (0,_container__WEBPACK_IMPORTED_MODULE_0__.getFromContainer)(_validation_Validator__WEBPACK_IMPORTED_MODULE_1__.Validator).validateOrReject(schemaNameOrObject, objectOrValidationOptions);
    }
}
/**
 * Validates given object by object's decorators or given validation schema.
 * Note that this method completely ignores async validations.
 * If you want to properly perform validation you need to call validate method instead.
 */
function validateSync(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions) {
    if (typeof schemaNameOrObject === 'string') {
        return (0,_container__WEBPACK_IMPORTED_MODULE_0__.getFromContainer)(_validation_Validator__WEBPACK_IMPORTED_MODULE_1__.Validator).validateSync(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions);
    }
    else {
        return (0,_container__WEBPACK_IMPORTED_MODULE_0__.getFromContainer)(_validation_Validator__WEBPACK_IMPORTED_MODULE_1__.Validator).validateSync(schemaNameOrObject, objectOrValidationOptions);
    }
}
/**
 * Registers a new validation schema.
 */
function registerSchema(schema) {
    (0,_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_2__.getMetadataStorage)().addValidationSchema(schema);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/metadata/ConstraintMetadata.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/metadata/ConstraintMetadata.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConstraintMetadata": () => (/* binding */ ConstraintMetadata)
/* harmony export */ });
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../container */ "./node_modules/class-validator/esm5/container.js");

/**
 * This metadata interface contains information for custom validators.
 */
var ConstraintMetadata = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ConstraintMetadata(target, name, async) {
        if (async === void 0) { async = false; }
        this.target = target;
        this.name = name;
        this.async = async;
    }
    Object.defineProperty(ConstraintMetadata.prototype, "instance", {
        // -------------------------------------------------------------------------
        // Accessors
        // -------------------------------------------------------------------------
        /**
         * Instance of the target custom validation class which performs validation.
         */
        get: function () {
            return (0,_container__WEBPACK_IMPORTED_MODULE_0__.getFromContainer)(this.target);
        },
        enumerable: false,
        configurable: true
    });
    return ConstraintMetadata;
}());



/***/ }),

/***/ "./node_modules/class-validator/esm5/metadata/MetadataStorage.js":
/*!***********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/metadata/MetadataStorage.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MetadataStorage": () => (/* binding */ MetadataStorage),
/* harmony export */   "getMetadataStorage": () => (/* binding */ getMetadataStorage)
/* harmony export */ });
/* harmony import */ var _validation_schema_ValidationSchemaToMetadataTransformer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation-schema/ValidationSchemaToMetadataTransformer */ "./node_modules/class-validator/esm5/validation-schema/ValidationSchemaToMetadataTransformer.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./node_modules/class-validator/esm5/utils/get-global.util.js");
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};


/**
 * Storage all metadatas.
 */
var MetadataStorage = /** @class */ (function () {
    function MetadataStorage() {
        // -------------------------------------------------------------------------
        // Private properties
        // -------------------------------------------------------------------------
        this.validationMetadatas = new Map();
        this.constraintMetadatas = new Map();
    }
    Object.defineProperty(MetadataStorage.prototype, "hasValidationMetaData", {
        get: function () {
            return !!this.validationMetadatas.size;
        },
        enumerable: false,
        configurable: true
    });
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Adds a new validation metadata.
     */
    MetadataStorage.prototype.addValidationSchema = function (schema) {
        var _this = this;
        var validationMetadatas = new _validation_schema_ValidationSchemaToMetadataTransformer__WEBPACK_IMPORTED_MODULE_0__.ValidationSchemaToMetadataTransformer().transform(schema);
        validationMetadatas.forEach(function (validationMetadata) { return _this.addValidationMetadata(validationMetadata); });
    };
    /**
     * Adds a new validation metadata.
     */
    MetadataStorage.prototype.addValidationMetadata = function (metadata) {
        var existingMetadata = this.validationMetadatas.get(metadata.target);
        if (existingMetadata) {
            existingMetadata.push(metadata);
        }
        else {
            this.validationMetadatas.set(metadata.target, [metadata]);
        }
    };
    /**
     * Adds a new constraint metadata.
     */
    MetadataStorage.prototype.addConstraintMetadata = function (metadata) {
        var existingMetadata = this.constraintMetadatas.get(metadata.target);
        if (existingMetadata) {
            existingMetadata.push(metadata);
        }
        else {
            this.constraintMetadatas.set(metadata.target, [metadata]);
        }
    };
    /**
     * Groups metadata by their property names.
     */
    MetadataStorage.prototype.groupByPropertyName = function (metadata) {
        var grouped = {};
        metadata.forEach(function (metadata) {
            if (!grouped[metadata.propertyName])
                grouped[metadata.propertyName] = [];
            grouped[metadata.propertyName].push(metadata);
        });
        return grouped;
    };
    /**
     * Gets all validation metadatas for the given object with the given groups.
     */
    MetadataStorage.prototype.getTargetValidationMetadatas = function (targetConstructor, targetSchema, always, strictGroups, groups) {
        var e_1, _a;
        var includeMetadataBecauseOfAlwaysOption = function (metadata) {
            // `metadata.always` overrides global default.
            if (typeof metadata.always !== 'undefined')
                return metadata.always;
            // `metadata.groups` overrides global default.
            if (metadata.groups && metadata.groups.length)
                return false;
            // Use global default.
            return always;
        };
        var excludeMetadataBecauseOfStrictGroupsOption = function (metadata) {
            if (strictGroups) {
                // Validation is not using groups.
                if (!groups || !groups.length) {
                    // `metadata.groups` has at least one group.
                    if (metadata.groups && metadata.groups.length)
                        return true;
                }
            }
            return false;
        };
        // get directly related to a target metadatas
        var filteredForOriginalMetadatasSearch = this.validationMetadatas.get(targetConstructor) || [];
        var originalMetadatas = filteredForOriginalMetadatasSearch.filter(function (metadata) {
            if (metadata.target !== targetConstructor && metadata.target !== targetSchema)
                return false;
            if (includeMetadataBecauseOfAlwaysOption(metadata))
                return true;
            if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
                return false;
            if (groups && groups.length > 0)
                return metadata.groups && !!metadata.groups.find(function (group) { return groups.indexOf(group) !== -1; });
            return true;
        });
        // get metadatas for inherited classes
        var filteredForInheritedMetadatasSearch = [];
        try {
            for (var _b = __values(this.validationMetadatas.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                if (targetConstructor.prototype instanceof key) {
                    filteredForInheritedMetadatasSearch.push.apply(filteredForInheritedMetadatasSearch, __spreadArray([], __read(value), false));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var inheritedMetadatas = filteredForInheritedMetadatasSearch.filter(function (metadata) {
            // if target is a string it's means we validate against a schema, and there is no inheritance support for schemas
            if (typeof metadata.target === 'string')
                return false;
            if (metadata.target === targetConstructor)
                return false;
            if (metadata.target instanceof Function && !(targetConstructor.prototype instanceof metadata.target))
                return false;
            if (includeMetadataBecauseOfAlwaysOption(metadata))
                return true;
            if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
                return false;
            if (groups && groups.length > 0)
                return metadata.groups && !!metadata.groups.find(function (group) { return groups.indexOf(group) !== -1; });
            return true;
        });
        // filter out duplicate metadatas, prefer original metadatas instead of inherited metadatas
        var uniqueInheritedMetadatas = inheritedMetadatas.filter(function (inheritedMetadata) {
            return !originalMetadatas.find(function (originalMetadata) {
                return (originalMetadata.propertyName === inheritedMetadata.propertyName &&
                    originalMetadata.type === inheritedMetadata.type);
            });
        });
        return originalMetadatas.concat(uniqueInheritedMetadatas);
    };
    /**
     * Gets all validator constraints for the given object.
     */
    MetadataStorage.prototype.getTargetValidatorConstraints = function (target) {
        return this.constraintMetadatas.get(target) || [];
    };
    return MetadataStorage;
}());

/**
 * Gets metadata storage.
 * Metadata storage follows the best practices and stores metadata in a global variable.
 */
function getMetadataStorage() {
    var global = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getGlobal)();
    if (!global.classValidatorMetadataStorage) {
        global.classValidatorMetadataStorage = new MetadataStorage();
    }
    return global.classValidatorMetadataStorage;
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/metadata/ValidationMetadata.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/metadata/ValidationMetadata.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidationMetadata": () => (/* binding */ ValidationMetadata)
/* harmony export */ });
/**
 * This metadata contains validation rules.
 */
var ValidationMetadata = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ValidationMetadata(args) {
        /**
         * Validation groups used for this validation.
         */
        this.groups = [];
        /**
         * Specifies if validated value is an array and each of its item must be validated.
         */
        this.each = false;
        /*
         * A transient set of data passed through to the validation result for response mapping
         */
        this.context = undefined;
        this.type = args.type;
        this.name = args.name;
        this.target = args.target;
        this.propertyName = args.propertyName;
        this.constraints = args === null || args === void 0 ? void 0 : args.constraints;
        this.constraintCls = args.constraintCls;
        this.validationTypeOptions = args.validationTypeOptions;
        if (args.validationOptions) {
            this.message = args.validationOptions.message;
            this.groups = args.validationOptions.groups;
            this.always = args.validationOptions.always;
            this.each = args.validationOptions.each;
            this.context = args.validationOptions.context;
        }
    }
    return ValidationMetadata;
}());



/***/ }),

/***/ "./node_modules/class-validator/esm5/register-decorator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/class-validator/esm5/register-decorator.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerDecorator": () => (/* binding */ registerDecorator)
/* harmony export */ });
/* harmony import */ var _metadata_ConstraintMetadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metadata/ConstraintMetadata */ "./node_modules/class-validator/esm5/metadata/ConstraintMetadata.js");
/* harmony import */ var _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./metadata/ValidationMetadata */ "./node_modules/class-validator/esm5/metadata/ValidationMetadata.js");
/* harmony import */ var _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation/ValidationTypes */ "./node_modules/class-validator/esm5/validation/ValidationTypes.js");
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./container */ "./node_modules/class-validator/esm5/container.js");
/* harmony import */ var _metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./metadata/MetadataStorage */ "./node_modules/class-validator/esm5/metadata/MetadataStorage.js");





/**
 * Registers a custom validation decorator.
 */
function registerDecorator(options) {
    var constraintCls;
    if (options.validator instanceof Function) {
        constraintCls = options.validator;
        var constraintClasses = (0,_container__WEBPACK_IMPORTED_MODULE_0__.getFromContainer)(_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_1__.MetadataStorage).getTargetValidatorConstraints(options.validator);
        if (constraintClasses.length > 1) {
            throw "More than one implementation of ValidatorConstraintInterface found for validator on: ".concat(options.target.name, ":").concat(options.propertyName);
        }
    }
    else {
        var validator_1 = options.validator;
        constraintCls = /** @class */ (function () {
            function CustomConstraint() {
            }
            CustomConstraint.prototype.validate = function (value, validationArguments) {
                return validator_1.validate(value, validationArguments);
            };
            CustomConstraint.prototype.defaultMessage = function (validationArguments) {
                if (validator_1.defaultMessage) {
                    return validator_1.defaultMessage(validationArguments);
                }
                return '';
            };
            return CustomConstraint;
        }());
        (0,_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_1__.getMetadataStorage)().addConstraintMetadata(new _metadata_ConstraintMetadata__WEBPACK_IMPORTED_MODULE_2__.ConstraintMetadata(constraintCls, options.name, options.async));
    }
    var validationMetadataArgs = {
        type: options.name && _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_3__.ValidationTypes.isValid(options.name) ? options.name : _validation_ValidationTypes__WEBPACK_IMPORTED_MODULE_3__.ValidationTypes.CUSTOM_VALIDATION,
        name: options.name,
        target: options.target,
        propertyName: options.propertyName,
        validationOptions: options.options,
        constraintCls: constraintCls,
        constraints: options.constraints,
    };
    (0,_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_1__.getMetadataStorage)().addValidationMetadata(new _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_4__.ValidationMetadata(validationMetadataArgs));
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/utils/convert-to-array.util.js":
/*!**************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/utils/convert-to-array.util.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertToArray": () => (/* binding */ convertToArray)
/* harmony export */ });
/**
 * Convert Map, Set to Array
 */
function convertToArray(val) {
    if (val instanceof Map) {
        return Array.from(val.values());
    }
    return Array.isArray(val) ? val : Array.from(val);
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/utils/get-global.util.js":
/*!********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/utils/get-global.util.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getGlobal": () => (/* binding */ getGlobal)
/* harmony export */ });
/**
 * This function returns the global object across Node and browsers.
 *
 * Note: `globalThis` is the standardized approach however it has been added to
 * Node.js in version 12. We need to include this snippet until Node 12 EOL.
 */
function getGlobal() {
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    if (typeof __webpack_require__.g !== 'undefined') {
        return __webpack_require__.g;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Cannot find name 'window'.
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Cannot find name 'window'.
        return window;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Cannot find name 'self'.
    if (typeof self !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Cannot find name 'self'.
        return self;
    }
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/utils/is-promise.util.js":
/*!********************************************************************!*\
  !*** ./node_modules/class-validator/esm5/utils/is-promise.util.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isPromise": () => (/* binding */ isPromise)
/* harmony export */ });
// https://github.com/TylorS/typed-is-promise/blob/abf1514e1b6961adfc75765476b0debb96b2c3ae/src/index.ts
function isPromise(p) {
    return p !== null && typeof p === 'object' && typeof p.then === 'function';
}


/***/ }),

/***/ "./node_modules/class-validator/esm5/validation-schema/ValidationSchemaToMetadataTransformer.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation-schema/ValidationSchemaToMetadataTransformer.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidationSchemaToMetadataTransformer": () => (/* binding */ ValidationSchemaToMetadataTransformer)
/* harmony export */ });
/* harmony import */ var _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata/ValidationMetadata */ "./node_modules/class-validator/esm5/metadata/ValidationMetadata.js");

/**
 * Used to transform validation schemas to validation metadatas.
 */
var ValidationSchemaToMetadataTransformer = /** @class */ (function () {
    function ValidationSchemaToMetadataTransformer() {
    }
    ValidationSchemaToMetadataTransformer.prototype.transform = function (schema) {
        var metadatas = [];
        Object.keys(schema.properties).forEach(function (property) {
            schema.properties[property].forEach(function (validation) {
                var validationOptions = {
                    message: validation.message,
                    groups: validation.groups,
                    always: validation.always,
                    each: validation.each,
                };
                var args = {
                    type: validation.type,
                    name: validation.name,
                    target: schema.name,
                    propertyName: property,
                    constraints: validation.constraints,
                    validationTypeOptions: validation.options,
                    validationOptions: validationOptions,
                };
                metadatas.push(new _metadata_ValidationMetadata__WEBPACK_IMPORTED_MODULE_0__.ValidationMetadata(args));
            });
        });
        return metadatas;
    };
    return ValidationSchemaToMetadataTransformer;
}());



/***/ }),

/***/ "./node_modules/class-validator/esm5/validation/ValidationError.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation/ValidationError.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidationError": () => (/* binding */ ValidationError)
/* harmony export */ });
/**
 * Validation error description.
 */
var ValidationError = /** @class */ (function () {
    function ValidationError() {
    }
    /**
     *
     * @param shouldDecorate decorate the message with ANSI formatter escape codes for better readability
     * @param hasParent true when the error is a child of an another one
     * @param parentPath path as string to the parent of this property
     * @param showConstraintMessages show constraint messages instead of constraint names
     */
    ValidationError.prototype.toString = function (shouldDecorate, hasParent, parentPath, showConstraintMessages) {
        var _this = this;
        if (shouldDecorate === void 0) { shouldDecorate = false; }
        if (hasParent === void 0) { hasParent = false; }
        if (parentPath === void 0) { parentPath = ""; }
        if (showConstraintMessages === void 0) { showConstraintMessages = false; }
        var boldStart = shouldDecorate ? "\u001B[1m" : "";
        var boldEnd = shouldDecorate ? "\u001B[22m" : "";
        var constraintsToString = function () { var _a; return (showConstraintMessages ? Object.values : Object.keys)((_a = _this.constraints) !== null && _a !== void 0 ? _a : {}).join(", "); };
        var propConstraintFailed = function (propertyName) {
            return " - property ".concat(boldStart).concat(parentPath).concat(propertyName).concat(boldEnd, " has failed the following constraints: ").concat(boldStart).concat(constraintsToString()).concat(boldEnd, " \n");
        };
        if (!hasParent) {
            return ("An instance of ".concat(boldStart).concat(this.target ? this.target.constructor.name : 'an object').concat(boldEnd, " has failed the validation:\n") +
                (this.constraints ? propConstraintFailed(this.property) : "") +
                (this.children
                    ? this.children
                        .map(function (childError) { return childError.toString(shouldDecorate, true, _this.property, showConstraintMessages); })
                        .join("")
                    : ""));
        }
        else {
            // we format numbers as array indexes for better readability.
            var formattedProperty_1 = Number.isInteger(+this.property)
                ? "[".concat(this.property, "]")
                : "".concat(parentPath ? "." : "").concat(this.property);
            if (this.constraints) {
                return propConstraintFailed(formattedProperty_1);
            }
            else {
                return this.children
                    ? this.children
                        .map(function (childError) {
                        return childError.toString(shouldDecorate, true, "".concat(parentPath).concat(formattedProperty_1), showConstraintMessages);
                    })
                        .join("")
                    : "";
            }
        }
    };
    return ValidationError;
}());



/***/ }),

/***/ "./node_modules/class-validator/esm5/validation/ValidationExecutor.js":
/*!****************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation/ValidationExecutor.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidationExecutor": () => (/* binding */ ValidationExecutor)
/* harmony export */ });
/* harmony import */ var _ValidationError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ValidationError */ "./node_modules/class-validator/esm5/validation/ValidationError.js");
/* harmony import */ var _ValidationTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ValidationTypes */ "./node_modules/class-validator/esm5/validation/ValidationTypes.js");
/* harmony import */ var _ValidationUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ValidationUtils */ "./node_modules/class-validator/esm5/validation/ValidationUtils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./node_modules/class-validator/esm5/utils/is-promise.util.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./node_modules/class-validator/esm5/utils/convert-to-array.util.js");
/* harmony import */ var _metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metadata/MetadataStorage */ "./node_modules/class-validator/esm5/metadata/MetadataStorage.js");
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};





/**
 * Executes validation over given object.
 */
var ValidationExecutor = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ValidationExecutor(validator, validatorOptions) {
        this.validator = validator;
        this.validatorOptions = validatorOptions;
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this.awaitingPromises = [];
        this.ignoreAsyncValidations = false;
        // -------------------------------------------------------------------------
        // Private Properties
        // -------------------------------------------------------------------------
        this.metadataStorage = (0,_metadata_MetadataStorage__WEBPACK_IMPORTED_MODULE_0__.getMetadataStorage)();
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    ValidationExecutor.prototype.execute = function (object, targetSchema, validationErrors) {
        var _this = this;
        var _a, _b;
        /**
         * If there is no metadata registered it means possibly the dependencies are not flatterned and
         * more than one instance is used.
         *
         * TODO: This needs proper handling, forcing to use the same container or some other proper solution.
         */
        if (!this.metadataStorage.hasValidationMetaData && ((_a = this.validatorOptions) === null || _a === void 0 ? void 0 : _a.enableDebugMessages) === true) {
            console.warn("No validation metadata found. No validation will be  performed. There are multiple possible reasons:\n" +
                "  - There may be multiple class-validator versions installed. You will need to flatten your dependencies to fix the issue.\n" +
                "  - This validation runs before any file with validation decorator was parsed by NodeJS.");
        }
        var groups = this.validatorOptions ? this.validatorOptions.groups : undefined;
        var strictGroups = (this.validatorOptions && this.validatorOptions.strictGroups) || false;
        var always = (this.validatorOptions && this.validatorOptions.always) || false;
        /** Forbid unknown values are turned on by default and any other value than false will enable it. */
        var forbidUnknownValues = ((_b = this.validatorOptions) === null || _b === void 0 ? void 0 : _b.forbidUnknownValues) === undefined || this.validatorOptions.forbidUnknownValues !== false;
        var targetMetadatas = this.metadataStorage.getTargetValidationMetadatas(object.constructor, targetSchema, always, strictGroups, groups);
        var groupedMetadatas = this.metadataStorage.groupByPropertyName(targetMetadatas);
        if (this.validatorOptions && forbidUnknownValues && !targetMetadatas.length) {
            var validationError = new _ValidationError__WEBPACK_IMPORTED_MODULE_1__.ValidationError();
            if (!this.validatorOptions ||
                !this.validatorOptions.validationError ||
                this.validatorOptions.validationError.target === undefined ||
                this.validatorOptions.validationError.target === true)
                validationError.target = object;
            validationError.value = undefined;
            validationError.property = undefined;
            validationError.children = [];
            validationError.constraints = { unknownValue: 'an unknown value was passed to the validate function' };
            validationErrors.push(validationError);
            return;
        }
        if (this.validatorOptions && this.validatorOptions.whitelist)
            this.whitelist(object, groupedMetadatas, validationErrors);
        // General validation
        Object.keys(groupedMetadatas).forEach(function (propertyName) {
            var value = object[propertyName];
            var definedMetadatas = groupedMetadatas[propertyName].filter(function (metadata) { return metadata.type === _ValidationTypes__WEBPACK_IMPORTED_MODULE_2__.ValidationTypes.IS_DEFINED; });
            var metadatas = groupedMetadatas[propertyName].filter(function (metadata) { return metadata.type !== _ValidationTypes__WEBPACK_IMPORTED_MODULE_2__.ValidationTypes.IS_DEFINED && metadata.type !== _ValidationTypes__WEBPACK_IMPORTED_MODULE_2__.ValidationTypes.WHITELIST; });
            if (value instanceof Promise &&
                metadatas.find(function (metadata) { return metadata.type === _ValidationTypes__WEBPACK_IMPORTED_MODULE_2__.ValidationTypes.PROMISE_VALIDATION; })) {
                _this.awaitingPromises.push(value.then(function (resolvedValue) {
                    _this.performValidations(object, resolvedValue, propertyName, definedMetadatas, metadatas, validationErrors);
                }));
            }
            else {
                _this.performValidations(object, value, propertyName, definedMetadatas, metadatas, validationErrors);
            }
        });
    };
    ValidationExecutor.prototype.whitelist = function (object, groupedMetadatas, validationErrors) {
        var _this = this;
        var notAllowedProperties = [];
        Object.keys(object).forEach(function (propertyName) {
            // does this property have no metadata?
            if (!groupedMetadatas[propertyName] || groupedMetadatas[propertyName].length === 0)
                notAllowedProperties.push(propertyName);
        });
        if (notAllowedProperties.length > 0) {
            if (this.validatorOptions && this.validatorOptions.forbidNonWhitelisted) {
                // throw errors
                notAllowedProperties.forEach(function (property) {
                    var _a;
                    var validationError = _this.generateValidationError(object, object[property], property);
                    validationError.constraints = (_a = {}, _a[_ValidationTypes__WEBPACK_IMPORTED_MODULE_2__.ValidationTypes.WHITELIST] = "property ".concat(property, " should not exist"), _a);
                    validationError.children = undefined;
                    validationErrors.push(validationError);
                });
            }
            else {
                // strip non allowed properties
                notAllowedProperties.forEach(function (property) { return delete object[property]; });
            }
        }
    };
    ValidationExecutor.prototype.stripEmptyErrors = function (errors) {
        var _this = this;
        return errors.filter(function (error) {
            if (error.children) {
                error.children = _this.stripEmptyErrors(error.children);
            }
            if (Object.keys(error.constraints).length === 0) {
                if (error.children.length === 0) {
                    return false;
                }
                else {
                    delete error.constraints;
                }
            }
            return true;
        });
    };
    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    ValidationExecutor.prototype.performValidations = function (object, value, propertyName, definedMetadatas, metadatas, validationErrors) {
        var customValidationMetadatas = metadatas.filter(function (metadata) { return metadata.type === _ValidationTypes__WEBPACK_IMPORTED_MODULE_2__.ValidationTypes.CUSTOM_VALIDATION; });
        var nestedValidationMetadatas = metadatas.filter(function (metadata) { return metadata.type === _ValidationTypes__WEBPACK_IMPORTED_MODULE_2__.ValidationTypes.NESTED_VALIDATION; });
        var conditionalValidationMetadatas = metadatas.filter(function (metadata) { return metadata.type === _ValidationTypes__WEBPACK_IMPORTED_MODULE_2__.ValidationTypes.CONDITIONAL_VALIDATION; });
        var validationError = this.generateValidationError(object, value, propertyName);
        validationErrors.push(validationError);
        var canValidate = this.conditionalValidations(object, value, conditionalValidationMetadatas);
        if (!canValidate) {
            return;
        }
        // handle IS_DEFINED validation type the special way - it should work no matter skipUndefinedProperties/skipMissingProperties is set or not
        this.customValidations(object, value, definedMetadatas, validationError);
        this.mapContexts(object, value, definedMetadatas, validationError);
        if (value === undefined && this.validatorOptions && this.validatorOptions.skipUndefinedProperties === true) {
            return;
        }
        if (value === null && this.validatorOptions && this.validatorOptions.skipNullProperties === true) {
            return;
        }
        if ((value === null || value === undefined) &&
            this.validatorOptions &&
            this.validatorOptions.skipMissingProperties === true) {
            return;
        }
        this.customValidations(object, value, customValidationMetadatas, validationError);
        this.nestedValidations(value, nestedValidationMetadatas, validationError);
        this.mapContexts(object, value, metadatas, validationError);
        this.mapContexts(object, value, customValidationMetadatas, validationError);
    };
    ValidationExecutor.prototype.generateValidationError = function (object, value, propertyName) {
        var validationError = new _ValidationError__WEBPACK_IMPORTED_MODULE_1__.ValidationError();
        if (!this.validatorOptions ||
            !this.validatorOptions.validationError ||
            this.validatorOptions.validationError.target === undefined ||
            this.validatorOptions.validationError.target === true)
            validationError.target = object;
        if (!this.validatorOptions ||
            !this.validatorOptions.validationError ||
            this.validatorOptions.validationError.value === undefined ||
            this.validatorOptions.validationError.value === true)
            validationError.value = value;
        validationError.property = propertyName;
        validationError.children = [];
        validationError.constraints = {};
        return validationError;
    };
    ValidationExecutor.prototype.conditionalValidations = function (object, value, metadatas) {
        return metadatas
            .map(function (metadata) { return metadata.constraints[0](object, value); })
            .reduce(function (resultA, resultB) { return resultA && resultB; }, true);
    };
    ValidationExecutor.prototype.customValidations = function (object, value, metadatas, error) {
        var _this = this;
        metadatas.forEach(function (metadata) {
            _this.metadataStorage.getTargetValidatorConstraints(metadata.constraintCls).forEach(function (customConstraintMetadata) {
                if (customConstraintMetadata.async && _this.ignoreAsyncValidations)
                    return;
                if (_this.validatorOptions &&
                    _this.validatorOptions.stopAtFirstError &&
                    Object.keys(error.constraints || {}).length > 0)
                    return;
                var validationArguments = {
                    targetName: object.constructor ? object.constructor.name : undefined,
                    property: metadata.propertyName,
                    object: object,
                    value: value,
                    constraints: metadata.constraints,
                };
                if (!metadata.each || !(Array.isArray(value) || value instanceof Set || value instanceof Map)) {
                    var validatedValue = customConstraintMetadata.instance.validate(value, validationArguments);
                    if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isPromise)(validatedValue)) {
                        var promise = validatedValue.then(function (isValid) {
                            if (!isValid) {
                                var _a = __read(_this.createValidationError(object, value, metadata, customConstraintMetadata), 2), type = _a[0], message = _a[1];
                                error.constraints[type] = message;
                                if (metadata.context) {
                                    if (!error.contexts) {
                                        error.contexts = {};
                                    }
                                    error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
                                }
                            }
                        });
                        _this.awaitingPromises.push(promise);
                    }
                    else {
                        if (!validatedValue) {
                            var _a = __read(_this.createValidationError(object, value, metadata, customConstraintMetadata), 2), type = _a[0], message = _a[1];
                            error.constraints[type] = message;
                        }
                    }
                    return;
                }
                // convert set and map into array
                var arrayValue = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.convertToArray)(value);
                // Validation needs to be applied to each array item
                var validatedSubValues = arrayValue.map(function (subValue) {
                    return customConstraintMetadata.instance.validate(subValue, validationArguments);
                });
                var validationIsAsync = validatedSubValues.some(function (validatedSubValue) {
                    return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.isPromise)(validatedSubValue);
                });
                if (validationIsAsync) {
                    // Wrap plain values (if any) in promises, so that all are async
                    var asyncValidatedSubValues = validatedSubValues.map(function (validatedSubValue) {
                        return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.isPromise)(validatedSubValue) ? validatedSubValue : Promise.resolve(validatedSubValue);
                    });
                    var asyncValidationIsFinishedPromise = Promise.all(asyncValidatedSubValues).then(function (flatValidatedValues) {
                        var validationResult = flatValidatedValues.every(function (isValid) { return isValid; });
                        if (!validationResult) {
                            var _a = __read(_this.createValidationError(object, value, metadata, customConstraintMetadata), 2), type = _a[0], message = _a[1];
                            error.constraints[type] = message;
                            if (metadata.context) {
                                if (!error.contexts) {
                                    error.contexts = {};
                                }
                                error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
                            }
                        }
                    });
                    _this.awaitingPromises.push(asyncValidationIsFinishedPromise);
                    return;
                }
                var validationResult = validatedSubValues.every(function (isValid) { return isValid; });
                if (!validationResult) {
                    var _b = __read(_this.createValidationError(object, value, metadata, customConstraintMetadata), 2), type = _b[0], message = _b[1];
                    error.constraints[type] = message;
                }
            });
        });
    };
    ValidationExecutor.prototype.nestedValidations = function (value, metadatas, error) {
        var _this = this;
        if (value === void 0) {
            return;
        }
        metadatas.forEach(function (metadata) {
            if (metadata.type !== _ValidationTypes__WEBPACK_IMPORTED_MODULE_2__.ValidationTypes.NESTED_VALIDATION && metadata.type !== _ValidationTypes__WEBPACK_IMPORTED_MODULE_2__.ValidationTypes.PROMISE_VALIDATION) {
                return;
            }
            else if (_this.validatorOptions &&
                _this.validatorOptions.stopAtFirstError &&
                Object.keys(error.constraints || {}).length > 0) {
                return;
            }
            if (Array.isArray(value) || value instanceof Set || value instanceof Map) {
                // Treats Set as an array - as index of Set value is value itself and it is common case to have Object as value
                var arrayLikeValue = value instanceof Set ? Array.from(value) : value;
                arrayLikeValue.forEach(function (subValue, index) {
                    _this.performValidations(value, subValue, index.toString(), [], metadatas, error.children);
                });
            }
            else if (value instanceof Object) {
                var targetSchema = typeof metadata.target === 'string' ? metadata.target : metadata.target.name;
                _this.execute(value, targetSchema, error.children);
            }
            else {
                var _a = __read(_this.createValidationError(metadata.target, value, metadata), 2), type = _a[0], message = _a[1];
                error.constraints[type] = message;
            }
        });
    };
    ValidationExecutor.prototype.mapContexts = function (object, value, metadatas, error) {
        var _this = this;
        return metadatas.forEach(function (metadata) {
            if (metadata.context) {
                var customConstraint = void 0;
                if (metadata.type === _ValidationTypes__WEBPACK_IMPORTED_MODULE_2__.ValidationTypes.CUSTOM_VALIDATION) {
                    var customConstraints = _this.metadataStorage.getTargetValidatorConstraints(metadata.constraintCls);
                    customConstraint = customConstraints[0];
                }
                var type = _this.getConstraintType(metadata, customConstraint);
                if (error.constraints[type]) {
                    if (!error.contexts) {
                        error.contexts = {};
                    }
                    error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
                }
            }
        });
    };
    ValidationExecutor.prototype.createValidationError = function (object, value, metadata, customValidatorMetadata) {
        var targetName = object.constructor ? object.constructor.name : undefined;
        var type = this.getConstraintType(metadata, customValidatorMetadata);
        var validationArguments = {
            targetName: targetName,
            property: metadata.propertyName,
            object: object,
            value: value,
            constraints: metadata.constraints,
        };
        var message = metadata.message || '';
        if (!metadata.message &&
            (!this.validatorOptions || (this.validatorOptions && !this.validatorOptions.dismissDefaultMessages))) {
            if (customValidatorMetadata && customValidatorMetadata.instance.defaultMessage instanceof Function) {
                message = customValidatorMetadata.instance.defaultMessage(validationArguments);
            }
        }
        var messageString = _ValidationUtils__WEBPACK_IMPORTED_MODULE_5__.ValidationUtils.replaceMessageSpecialTokens(message, validationArguments);
        return [type, messageString];
    };
    ValidationExecutor.prototype.getConstraintType = function (metadata, customValidatorMetadata) {
        var type = customValidatorMetadata && customValidatorMetadata.name ? customValidatorMetadata.name : metadata.type;
        return type;
    };
    return ValidationExecutor;
}());



/***/ }),

/***/ "./node_modules/class-validator/esm5/validation/ValidationTypes.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation/ValidationTypes.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidationTypes": () => (/* binding */ ValidationTypes)
/* harmony export */ });
/**
 * Validation types.
 */
var ValidationTypes = /** @class */ (function () {
    function ValidationTypes() {
    }
    /**
     * Checks if validation type is valid.
     */
    ValidationTypes.isValid = function (type) {
        var _this = this;
        return (type !== 'isValid' &&
            type !== 'getMessage' &&
            Object.keys(this)
                .map(function (key) { return _this[key]; })
                .indexOf(type) !== -1);
    };
    /* system */
    ValidationTypes.CUSTOM_VALIDATION = 'customValidation'; // done
    ValidationTypes.NESTED_VALIDATION = 'nestedValidation'; // done
    ValidationTypes.PROMISE_VALIDATION = 'promiseValidation'; // done
    ValidationTypes.CONDITIONAL_VALIDATION = 'conditionalValidation'; // done
    ValidationTypes.WHITELIST = 'whitelistValidation'; // done
    ValidationTypes.IS_DEFINED = 'isDefined'; // done
    return ValidationTypes;
}());



/***/ }),

/***/ "./node_modules/class-validator/esm5/validation/ValidationUtils.js":
/*!*************************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation/ValidationUtils.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidationUtils": () => (/* binding */ ValidationUtils)
/* harmony export */ });
/* unused harmony export constraintToString */
/**
 * Convert the constraint to a string to be shown in an error
 */
function constraintToString(constraint) {
    if (Array.isArray(constraint)) {
        return constraint.join(', ');
    }
    if (typeof constraint === 'symbol') {
        constraint = constraint.description;
    }
    return "".concat(constraint);
}
var ValidationUtils = /** @class */ (function () {
    function ValidationUtils() {
    }
    ValidationUtils.replaceMessageSpecialTokens = function (message, validationArguments) {
        var messageString;
        if (message instanceof Function) {
            messageString = message(validationArguments);
        }
        else if (typeof message === 'string') {
            messageString = message;
        }
        if (messageString && Array.isArray(validationArguments.constraints)) {
            validationArguments.constraints.forEach(function (constraint, index) {
                messageString = messageString.replace(new RegExp("\\$constraint".concat(index + 1), 'g'), constraintToString(constraint));
            });
        }
        if (messageString &&
            validationArguments.value !== undefined &&
            validationArguments.value !== null &&
            typeof validationArguments.value === 'string')
            messageString = messageString.replace(/\$value/g, validationArguments.value);
        if (messageString)
            messageString = messageString.replace(/\$property/g, validationArguments.property);
        if (messageString)
            messageString = messageString.replace(/\$target/g, validationArguments.targetName);
        return messageString;
    };
    return ValidationUtils;
}());



/***/ }),

/***/ "./node_modules/class-validator/esm5/validation/Validator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/class-validator/esm5/validation/Validator.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Validator": () => (/* binding */ Validator)
/* harmony export */ });
/* harmony import */ var _ValidationExecutor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidationExecutor */ "./node_modules/class-validator/esm5/validation/ValidationExecutor.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

/**
 * Validator performs validation of the given object based on its metadata.
 */
var Validator = /** @class */ (function () {
    function Validator() {
    }
    /**
     * Performs validation of the given object based on decorators or validation schema.
     */
    Validator.prototype.validate = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        return this.coreValidate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions);
    };
    /**
     * Performs validation of the given object based on decorators or validation schema and reject on error.
     */
    Validator.prototype.validateOrReject = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.coreValidate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions)];
                    case 1:
                        errors = _a.sent();
                        if (errors.length)
                            return [2 /*return*/, Promise.reject(errors)];
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Performs validation of the given object based on decorators or validation schema.
     */
    Validator.prototype.validateSync = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        var object = typeof objectOrSchemaName === 'string' ? objectOrValidationOptions : objectOrSchemaName;
        var options = typeof objectOrSchemaName === 'string' ? maybeValidatorOptions : objectOrValidationOptions;
        var schema = typeof objectOrSchemaName === 'string' ? objectOrSchemaName : undefined;
        var executor = new _ValidationExecutor__WEBPACK_IMPORTED_MODULE_0__.ValidationExecutor(this, options);
        executor.ignoreAsyncValidations = true;
        var validationErrors = [];
        executor.execute(object, schema, validationErrors);
        return executor.stripEmptyErrors(validationErrors);
    };
    // -------------------------------------------------------------------------
    // Private Properties
    // -------------------------------------------------------------------------
    /**
     * Performs validation of the given object based on decorators or validation schema.
     * Common method for `validateOrReject` and `validate` methods.
     */
    Validator.prototype.coreValidate = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        var object = typeof objectOrSchemaName === 'string' ? objectOrValidationOptions : objectOrSchemaName;
        var options = typeof objectOrSchemaName === 'string' ? maybeValidatorOptions : objectOrValidationOptions;
        var schema = typeof objectOrSchemaName === 'string' ? objectOrSchemaName : undefined;
        var executor = new _ValidationExecutor__WEBPACK_IMPORTED_MODULE_0__.ValidationExecutor(this, options);
        var validationErrors = [];
        executor.execute(object, schema, validationErrors);
        return Promise.all(executor.awaitingPromises).then(function () {
            return executor.stripEmptyErrors(validationErrors);
        });
    };
    return Validator;
}());



/***/ }),

/***/ "./node_modules/validator/lib/isLength.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/isLength.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isLength;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable prefer-rest-params */
function isLength(str, options) {
  (0, _assertString.default)(str);
  var min;
  var max;

  if (_typeof(options) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isLength(str, min [, max])
    min = arguments[1] || 0;
    max = arguments[2];
  }

  var presentationSequences = str.match(/(\uFE0F|\uFE0E)/g) || [];
  var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
  var len = str.length - presentationSequences.length - surrogatePairs.length;
  return len >= min && (typeof max === 'undefined' || len <= max);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/util/assertString.js":
/*!*********************************************************!*\
  !*** ./node_modules/validator/lib/util/assertString.js ***!
  \*********************************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = assertString;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function assertString(input) {
  var isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    var invalidType = _typeof(input);

    if (input === null) invalidType = 'null';else if (invalidType === 'object') invalidType = input.constructor.name;
    throw new TypeError("Expected a string but received a ".concat(invalidType));
  }
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ })

}]);
//# sourceMappingURL=vendors-node_modules_autobind-decorator_lib_esm_index_js-node_modules_class-validator_esm5_de-157a7d.bundle.js.map