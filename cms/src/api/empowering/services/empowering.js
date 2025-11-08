'use strict';

/**
 * empowering service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::empowering.empowering');
