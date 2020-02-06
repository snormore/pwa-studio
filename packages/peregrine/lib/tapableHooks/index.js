import { AsyncParallelHook } from 'tapable';

export const SignoutAsyncParallelHook = new AsyncParallelHook(['options']);

export const tapableHooks = {
    SignoutAsyncParallelHook
};
