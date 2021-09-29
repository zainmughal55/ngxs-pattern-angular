function push(target, key, mapTo) {
	target['_list_'].push({ key, mapTo });
}

function isObjectDefined(obj) {
	return (obj !== undefined && obj !== null);
}

function checkKeys(mapTo, key, obj) {
	if (isObjectDefined(obj) && mapTo in obj) {
		return obj[mapTo];
	} else if (isObjectDefined(obj)) {
		return obj[key];
	} else {
		return null;
	}
}

function isDecoratorObject(obj) {
	return isObjectDefined(obj) && typeof obj === 'object' && 'setModelValues' in obj;
}

function isRawObject(obj) {
	return isObjectDefined(obj) && typeof obj === 'object' && !('setModelValues' in obj);
}

function copyRawObjectValue(src) {
	const obj = {};
	if (src) {
		const recurseObject = (source, dist) => {
			Object.keys(source).forEach((key) => {
				if (isRawObject(source[key])) {
					recurseObject(source[key], dist[key]);
				} else {
					dist[key] = source[key];
				}
			});
		};
		recurseObject(src, obj);
		return obj;
	}
	return null;
}

function defineSetModelValues(target) {
	Reflect.defineProperty(target, 'setModelValues', {
		value: function (json) {
			const self = this;
			this['_list_'].forEach((item) => {
				if (isDecoratorObject(self[item.key])) {
					self[item.key].setModelValues(checkKeys(item.mapTo, item.key, json));
				} else if (Array.isArray(self[item.key])) {
					const value = checkKeys(item.mapTo, item.key, json);
					self[item.key] = isObjectDefined(value) ? value : self[item.key];
				} else if (isRawObject(self[item.key])) {
					self[item.key] = { ...self[item.key], ...copyRawObjectValue(checkKeys(item.mapTo, item.key, json)) };
				} else {
					const value = checkKeys(item.mapTo, item.key, json);
					self[item.key] = isObjectDefined(value) ? value : self[item.key];
				}
			});
			return this;
		}
	});
}


function defineGetModelValues(target) {
	Reflect.defineProperty(target, 'getModelValues', {
		value: function () {
			const self = this;
			const json = {};
			this['_list_'].map((item) => {
				if (item.mapTo) {
					if (isDecoratorObject(self[item.key])) {
						json[item.mapTo] = self[item.key].getModelValues();
					} else if (Array.isArray(self[item.key])) {
						json[item.mapTo] = self[item.key];
					} else if (isRawObject(self[item.key])) {
						json[item.mapTo] = copyRawObjectValue(self[item.key]);
					} else {
						json[item.mapTo] = self[item.key];
					}
				} else if (item.key) {
					if (isDecoratorObject(self[item.key])) {
						json[item.key] = self[item.key].getModelValues();
					} else if (Array.isArray(self[item.key])) {
						json[item.key] = self[item.key];
					} else if (isRawObject(self[item.key])) {
						json[item.key] = copyRawObjectValue(self[item.key]);
					} else {
						json[item.key] = self[item.key];
					}
				}
			});
			return json;
		}
	});
}


// modelProperty decorator
function ModelProperty(mapTo = null) {
	return function (target, key) {
		if ('_list_' in target) {
			push(target, key, mapTo);
		} else {
			target['_list_'] = [];
			push(target, key, mapTo);
		}
		defineSetModelValues(target);
		defineGetModelValues(target);
	};
}


interface IModelFunctions {
	setModelValues: (any) => any;
	getModelValues: () => any;
}

export {
	ModelProperty,
	IModelFunctions,
};
