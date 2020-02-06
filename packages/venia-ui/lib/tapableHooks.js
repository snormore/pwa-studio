import { tapableHooks as peregrineTapableHooks } from '@magento/peregrine/lib/tapableHooks';

import { SyncBailHook } from 'tapable';

export const GenerateAdsSyncBailHook = new SyncBailHook([
    'componentSetter',
    'userPreferences'
]);

export const tapableHooks = {
    GenerateAdsSyncBailHook,
    ...peregrineTapableHooks
};
