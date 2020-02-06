/**
 * Assume these extensions are provided as separate npm modules
 */
const extensions = [
    './sample-extensions/venia-sample-network-activity-logger',
    './sample-extensions/venia-analytics-extension'
];

export const registerTapableHooks = tapableHooks => {
    extensions.map(extension => {
        const { default: registerTapableHooks } = require(`${extension}`);
        registerTapableHooks(tapableHooks);
    });
};

export default extensions;
