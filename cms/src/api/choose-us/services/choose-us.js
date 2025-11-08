'use strict';

/**
 * choose-us service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::choose-us.choose-us');
